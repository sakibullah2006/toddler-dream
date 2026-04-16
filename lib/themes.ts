export type PortraitTheme = {
  id: "cozy" | "floral" | "dreamlike" | "winter" | "autumn" | "royal";
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
      "Create a highly realistic cozy baby portrait with true-to-life skin texture, natural pores, realistic hair strands, and accurate facial identity from the source photo. Style details: soft knit blanket layers, warm neutral wardrobe, creamy beige and blush tones, gentle window light from one side, subtle bokeh background, and professional newborn studio composition.",
    color: "#e27396",
  },
  {
    id: "floral",
    name: "Floral",
    emoji: "🌸",
    description: "Delicate blossoms with a springtime portrait feel.",
    prompt:
      "Create a photorealistic floral newborn portrait with authentic baby features and natural skin detail preserved from the original photo. Style details: cream and blush flowers around a soft nest, airy botanical arrangement, diffused daylight, gentle highlights, shallow depth of field, and premium studio color grading in pastel pink and ivory.",
    color: "#ea9ab2",
  },
  {
    id: "dreamlike",
    name: "Dreamlike",
    emoji: "☁️",
    description: "Ethereal glow and whimsical fairytale softness.",
    prompt:
      "Generate a realistic dreamlike baby portrait while preserving exact identity and proportions. Style details: soft cloud-like bedding, mint and lilac pastel haze, cinematic but natural lighting, subtle glow around highlights, gentle floating atmosphere, and crisp focus on face with realistic skin texture.",
    color: "#efcfe3",
  },
  {
    id: "winter",
    name: "Winter",
    emoji: "❄️",
    description: "Soft snowy ambiance and frosty elegance.",
    prompt:
      "Create a realistic winter baby portrait with true facial likeness and authentic skin tone. Style details: pearl-white knit outfit, soft faux snow textures, cool daylight tones with warm skin balance, delicate snow bokeh, and editorial studio framing with clean winter atmosphere.",
    color: "#eaf2d7",
  },
  {
    id: "autumn",
    name: "Autumn",
    emoji: "🍂",
    description: "Golden leaves and rich, warm seasonal tones.",
    prompt:
      "Generate a photorealistic autumn baby portrait preserving identity, expression, and natural skin texture. Style details: warm caramel knitwear, amber and cinnamon palette, soft leaf accents, golden-hour style key light, rich but natural contrast, and studio-quality shallow depth of field.",
    color: "#b3dee2",
  },
  {
    id: "royal",
    name: "Royal",
    emoji: "👑",
    description: "Classic regal styling with elegant composition.",
    prompt:
      "Create a highly realistic royal baby portrait that keeps the baby's exact facial identity and natural proportions. Style details: elegant heirloom-inspired outfit, subtle crown or regal accessory, tasteful ornate textures in soft cream and rose tones, museum-style portrait lighting, and refined editorial finish without looking artificial.",
    color: "#ea9ab2",
  },
];
