export type PortraitTheme = {
  id: "cozy" | "floral" | "dreamlike" | "winter" | "autumn" | "royal" | "astronaut";
  name: string;
  emoji: string;
  description: string;
  prompt: string;
  color: string;
};

export const THEMES: PortraitTheme[] = [
  {
    id: "cozy",
    name: "Cozy",
    emoji: "🧸",
    description: "Warm blankets, gentle light, and comforting tones.",
    prompt:
      "Create a hyper-realistic cozy baby portrait. Keep the exact same baby identity, face, hairline, and body posture from the original photo. Style details: soft layered knit blankets, plush neutral nursery props, warm cream-and-blush color grading, natural window side light, and shallow depth of field with gentle bokeh. Outfit should be realistic cozy knitwear that fits newborn styling.",
    color: "#e27396",
  },
  {
    id: "floral",
    name: "Floral",
    emoji: "🌸",
    description: "Delicate blossoms with a springtime portrait feel.",
    prompt:
      "Create a photorealistic floral newborn portrait while preserving exact facial identity, hair, and body posture from the source image. Style details: baby wrapped in soft floral-themed fabric, cream and blush flowers around a nest, airy botanical background, diffused daylight, natural highlights, and premium portrait depth of field.",
    color: "#ea9ab2",
  },
  {
    id: "dreamlike",
    name: "Dreamlike",
    emoji: "☁️",
    description: "Ethereal glow and whimsical fairytale softness.",
    prompt:
      "Generate a photorealistic dreamlike baby portrait. Preserve exact identity, hairstyle, and pose from the source photo. Style details: cloud-like bedding, pastel mint and lilac tones, soft atmospheric haze, natural cinematic lighting, and gentle dreamy backdrop with realistic skin detail and newborn proportions.",
    color: "#efcfe3",
  },
  {
    id: "winter",
    name: "Winter",
    emoji: "❄️",
    description: "Soft snowy ambiance and frosty elegance.",
    prompt:
      "Create a highly realistic winter baby portrait with the same face, hair, and original posture. Style details: pearl-white knit outfit, frosty textured blankets, delicate snow-like bokeh, cool ambient tones balanced with natural skin warmth, and realistic seasonal background styling.",
    color: "#eaf2d7",
  },
  {
    id: "autumn",
    name: "Autumn",
    emoji: "🍂",
    description: "Golden leaves and rich, warm seasonal tones.",
    prompt:
      "Generate a photorealistic autumn baby portrait keeping the exact original face, hair, and posture. Style details: caramel knitwear, amber and cinnamon tones, subtle fall leaves and natural textures, golden-hour inspired lighting, warm cozy background mood, and realistic studio depth of field.",
    color: "#b3dee2",
  },
  {
    id: "royal",
    name: "Royal",
    emoji: "👑",
    description: "Classic regal styling with elegant composition.",
    prompt:
      "Create a highly realistic royal baby portrait. Preserve exact baby identity, hairstyle, and posture from the source image. Style details: elegant heirloom-inspired clothing, subtle regal accessory, refined ornate background textures, soft cream and rose palette, museum-style portrait lighting, and realistic editorial finish.",
    color: "#ea9ab2",
  },
  {
    id: "astronaut",
    name: "Astronaut",
    emoji: "🚀",
    description: "Space explorer vibe with realistic cosmic lighting.",
    prompt:
      "Create a hyper-realistic, highly detailed portrait of the same baby from the original image with the exact same face, hair, and posture. Dress the baby in a pristine white astronaut suit with realistic fabric stitching and a transparent spherical helmet. Set the scene in outer space with deep dark background, blue-white stardust, and soft glowing nebula elements. Use cinematic lighting with realistic helmet reflections, subtle lens flares, and shallow depth of field. Keep anatomy natural and newborn proportions correct.",
    color: "#b3dee2",
  },
];
