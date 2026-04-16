export type PortraitTheme = {
  id: "forest" | "underwater" | "space";
  name: string;
  emoji: string;
  description: string;
  prompt: string;
  compositePrompt: string;
  color: string;
};

export const THEMES: PortraitTheme[] = [
  {
    id: "forest",
    name: "Forest",
    emoji: "🌲",
    description: "Enchanted woodland with nature and warm earth tones.",
    prompt:
      "Create a hyper-realistic forest baby portrait. Keep the exact same baby identity, face, hairline, and body posture from the original photo. Style details: baby nestled in natural woodland setting with soft moss, tree foliage, wildflowers, earthy cream and sage tones, dappled forest light filtering through leaves, shallow depth of field with forest bokeh.",
    compositePrompt:
      "Composite 3 images into one seamless studio-quality baby portrait: (1) Baby photo = preserve face, hair, posture, features exactly, (2) Background scene = enchanted forest with moss, trees, wildflowers, and dappled sunlight through leaves, (3) Clothing = soft earth-tone infant outfit blending with nature. Blend them so the baby wears the natural outfit nestled in the woodland setting with warm forest lighting and shallow depth of field. Use full-body framing from head to toes with no crop. Keep baby identity 100% unchanged. Output as realistic professional newborn photography.",
    color: "#8b7d6b",
  },
  {
    id: "underwater",
    name: "Underwater Ocean",
    emoji: "🌊",
    description: "Magical aquatic world with serene blue tones and gentle bubbles.",
    prompt:
      "Create a photorealistic underwater ocean baby portrait while preserving exact facial identity, hair, and body posture from the source image. Style details: baby floating peacefully in clear turquoise water, surrounded by soft coral, gentle sea vegetation, shimmering light rays from the surface, delicate bubbles, cool blue and teal color grading, peaceful serene mood with shallow depth of field.",
    compositePrompt:
      "Composite 3 images into one seamless studio-quality baby portrait: (1) Baby photo = preserve face, hair, posture, features exactly, (2) Background scene = peaceful underwater ocean setting with coral, sea plants, light rays from surface, and gentle bubbles, (3) Clothing = soft ocean-blue or mermaid-inspired infant outfit. Blend them so the baby wears the aquatic outfit floating peacefully in the underwater scene with blue-teal lighting and gentle ray effects. Use full-body framing from head to toes with no crop. Keep baby identity 100% unchanged. Output as realistic professional newborn photography.",
    color: "#b3dee2",
  },
  {
    id: "space",
    name: "Space",
    emoji: "🚀",
    description: "Cosmic adventure with stars, planets, and celestial wonder.",
    prompt:
      "Create a hyper-realistic, highly detailed portrait of the same baby from the original image with the exact same face, hair, and posture. Dress the baby in a pristine white astronaut suit with realistic fabric stitching and a transparent spherical helmet. Set the scene in outer space with deep dark background, blue-white stardust, nebula clouds, distant planets, and soft glowing cosmic elements. Use cinematic lighting with realistic helmet reflections, subtle lens flares, and shallow depth of field. Keep anatomy natural and newborn proportions correct.",
    compositePrompt:
      "Composite 3 images into one seamless studio-quality baby portrait: (1) Baby photo = preserve face, hair, posture, features exactly, (2) Background scene = deep outer space with nebula, stardust, distant planets, and cosmic lighting effects, (3) Clothing = pristine white astronaut suit with transparent spherical helmet. Blend them so the baby wears the astronaut suit in the cosmic scene with helmet reflections and cinematic space lighting. Use full-body framing from head to toes with no crop. Keep baby identity 100% unchanged. Output as hyper-realistic professional newborn photography.",
    color: "#4a5f7f",
  },
];
