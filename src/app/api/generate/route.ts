import OpenAI from "openai";

const MAX_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildDataUrl(base64: string, mimeType = "image/png") {
  return `data:${mimeType};base64,${base64}`;
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: "OPENAI_API_KEY is missing." }, { status: 500 });
    }

    const formData = await request.formData();
    const image = formData.get("image");
    const promptValue = formData.get("prompt");

    if (!(image instanceof File)) {
      return Response.json({ error: "Image file is required." }, { status: 400 });
    }

    if (typeof promptValue !== "string" || !promptValue.trim()) {
      return Response.json({ error: "Prompt is required." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(image.type)) {
      return Response.json({ error: "Invalid image type. Use JPEG, PNG, or WebP." }, { status: 400 });
    }

    if (image.size > MAX_SIZE) {
      return Response.json({ error: "Image must be 4MB or smaller." }, { status: 400 });
    }

    const prompt = `${promptValue.trim()} Preserve identity lock: keep exactly the same face, hairstyle/hairline, expression, skin tone, body posture, camera angle, and framing as the source image. Keep newborn anatomy and proportions unchanged. Apply only theme-specific clothing, props, background, and lighting. Output must be photorealistic, like a real professional camera photo, with natural skin texture and subtle fine detail. Do not generate animation, cartoon, illustration, painting, CGI, 3D render look, plastic skin, face swap, age change, extra limbs, or distorted anatomy.`;

    let base64 = "";

    try {
      const response = await client.images.edit({
        model: "gpt-image-1",
        image,
        prompt,
        size: "1024x1024",
      });

      base64 = response.data?.[0]?.b64_json ?? "";
    } catch {
      const fallback = await client.images.edit({
        model: "dall-e-2",
        image,
        prompt,
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
