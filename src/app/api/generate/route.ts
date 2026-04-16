import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";
import { THEMES } from "../../../../lib/themes";

const MAX_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildDataUrl(base64: string, mimeType = "image/png") {
  return `data:${mimeType};base64,${base64}`;
}

interface BabyDescription {
  pose: string;
  face: string;
}

async function describeBaby(imageBase64: string, mimeType: string): Promise<BabyDescription> {
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 400,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: `data:${mimeType};base64,${imageBase64}`, detail: "high" },
          },
          {
            type: "text",
            text: `Analyze this baby photo and return a JSON object with exactly two keys:
"pose": Describe the baby's exact body pose and position in precise anatomical terms — body orientation (prone/supine/sitting/etc.), head direction and tilt, limb positions (arms, legs, hands, feet), body curvature. 2-3 sentences.
"face": Describe the baby's facial features in precise detail — exact skin tone (e.g. "warm peach with pink undertones"), face shape, eye shape and spacing (even if closed), nose shape and size, lip shape, cheek fullness, chin shape, any distinctive marks. 2-3 sentences.
Return only valid JSON, no markdown.`,
          },
        ],
      },
    ],
  });

  try {
    const content = response.choices[0]?.message?.content?.trim() ?? "{}";
    const parsed = JSON.parse(content) as { pose?: string; face?: string };
    return {
      pose: parsed.pose ?? "",
      face: parsed.face ?? "",
    };
  } catch {
    return { pose: "", face: "" };
  }
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: "OPENAI_API_KEY is missing." }, { status: 500 });
    }

    const formData = await request.formData();
    const image = formData.get("image");
    const themeId = formData.get("themeId");

    if (!(image instanceof File)) {
      return Response.json({ error: "Image file is required." }, { status: 400 });
    }

    if (typeof themeId !== "string" || !themeId.trim()) {
      return Response.json({ error: "Theme ID is required." }, { status: 400 });
    }

    const theme = THEMES.find((t) => t.id === themeId);
    if (!theme) {
      return Response.json({ error: "Invalid theme ID." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(image.type)) {
      return Response.json({ error: "Invalid image type. Use JPEG, PNG, or WebP." }, { status: 400 });
    }

    if (image.size > MAX_SIZE) {
      return Response.json({ error: "Image must be 4MB or smaller." }, { status: 400 });
    }

    // Step 1: extract exact pose + face description from source image
    const imageBuffer = await image.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");
    const { pose, face } = await describeBaby(imageBase64, image.type);

    const poseLock = pose
      ? `EXACT POSE REQUIREMENT — the generated baby must match this pose precisely: ${pose} Do not alter this pose in any way.`
      : "STRICT POSE LOCK: preserve the baby's exact body position, orientation, and limb placement from the source image unchanged.";

    const faceLock = face
      ? `EXACT FACE REQUIREMENT — the generated baby must have these exact facial features: ${face} Do not change the face in any way.`
      : "STRICT FACE LOCK: preserve the baby's exact facial features, skin tone, and identity from the source image.";

    let backgroundFile: File | null = null;
    let clothingFile: File | null = null;

    try {
      const themeDir = path.join(process.cwd(), "public", "themes", themeId);
      const bgPath = path.join(themeDir, "background.png");
      const clothingPath = path.join(themeDir, "clothing.png");

      try {
        const bgBuffer = await fs.readFile(bgPath);
        backgroundFile = new File([bgBuffer], "background.png", { type: "image/png" });
      } catch {
        // Background image optional
      }

      try {
        const clothingBuffer = await fs.readFile(clothingPath);
        clothingFile = new File([clothingBuffer], "clothing.png", { type: "image/png" });
      } catch {
        // Clothing image optional
      }
    } catch {
      // Proceed with text-only prompt if assets unavailable
    }

    const assetImages: File[] = [];
    if (backgroundFile) assetImages.push(backgroundFile);
    if (clothingFile) assetImages.push(clothingFile);

    const hasAssets = assetImages.length > 0;

    // Step 2: inject pose + face descriptions into edit prompt
    const prompt = hasAssets
      ? `${poseLock} ${faceLock} ${theme.compositePrompt} Full-body framing head to toes, nothing cropped. Photorealistic professional newborn photography; no cartoon, CGI, illustration, or plastic skin.`
      : `${poseLock} ${faceLock} Edit this baby photo to match the following theme: ${theme.description}. ${theme.prompt} Only change the background, environment, and costume — never the pose or face. Full-body framing head to toes, nothing cropped. Photorealistic professional newborn photography; no cartoon, CGI, illustration, or distorted anatomy.`;

    const editImages: File | [File, ...File[]] = hasAssets
      ? [image, ...assetImages]
      : image;

    let base64 = "";

    try {
      const response = await client.images.edit({
        model: "gpt-image-1",
        image: editImages,
        prompt,
        size: "1024x1024",
      });

      base64 = response.data?.[0]?.b64_json ?? "";
    } catch {
      const fallback = await client.images.edit({
        model: "dall-e-2",
        image,
        prompt: `${poseLock} ${faceLock} ${theme.description}. ${theme.prompt} Full-body, no crop. Photorealistic.`,
        size: "1024x1024",
        response_format: "b64_json",
      });

      base64 = fallback.data?.[0]?.b64_json ?? "";
    }

    if (!base64) {
      return Response.json({ error: "Could not generate an image." }, { status: 502 });
    }

    return Response.json({ imageUrl: buildDataUrl(base64) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Image generation failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}
