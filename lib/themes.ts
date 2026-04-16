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
      "Create a hyper-realistic forest baby portrait. CRITICAL: Preserve the exact body pose, position, and posture from the source photo — do not change how the baby is positioned. Keep the exact same baby identity, face, hairline, and body posture. Style details: place the baby in a natural woodland setting with soft moss, tree foliage, wildflowers, earthy cream and sage tones, dappled forest light filtering through leaves, shallow depth of field with forest bokeh. Only change the background and costume — the pose must remain identical to the source.",
    compositePrompt:
      "Composite 3 images into one seamless studio-quality baby portrait: (1) Baby photo = CRITICAL: preserve the exact body pose, position, and orientation — do not alter the pose in any way; also preserve face, hair, and all physical features exactly, (2) Background scene = enchanted forest with moss, trees, wildflowers, and dappled sunlight through leaves, (3) Clothing = soft earth-tone infant outfit blending with nature. Blend them so the baby wears the natural outfit in the woodland setting with warm forest lighting and shallow depth of field. The baby's pose must be IDENTICAL to the source photo. Use full-body framing from head to toes with no crop. Output as realistic professional newborn photography.",
    color: "#8b7d6b",
  },
  {
    id: "underwater",
    name: "Underwater Ocean",
    emoji: "🌊",
    description: "Magical aquatic world with serene blue tones and gentle bubbles.",
    prompt:
      "Create a photorealistic underwater ocean baby portrait. CRITICAL: Preserve the exact body pose, position, and posture from the source photo — do not change how the baby is positioned. Keep exact facial identity, hair, and body posture from the source image. Style details: place the baby in a clear turquoise underwater environment surrounded by soft coral, gentle sea vegetation, shimmering light rays from the surface, delicate bubbles, cool blue and teal color grading, shallow depth of field. Only change the background and costume — the pose must remain identical to the source.",
    compositePrompt:
      "Composite 3 images into one seamless studio-quality baby portrait: (1) Baby photo = CRITICAL: preserve the exact body pose, position, and orientation — do not alter the pose in any way; also preserve face, hair, and all physical features exactly, (2) Background scene = peaceful underwater ocean setting with coral, sea plants, light rays from surface, and gentle bubbles, (3) Clothing = soft ocean-blue or mermaid-inspired infant outfit. Blend them so the baby wears the aquatic outfit in the underwater scene with blue-teal lighting and gentle ray effects. The baby's pose must be IDENTICAL to the source photo. Use full-body framing from head to toes with no crop. Output as realistic professional newborn photography.",
    color: "#b3dee2",
  },
  {
    id: "space",
    name: "Space",
    emoji: "🚀",
    description: "Cosmic adventure with stars, planets, and celestial wonder.",
    prompt:
      "Create a hyper-realistic, highly detailed portrait of the same baby from the original image. CRITICAL: Preserve the exact body pose, position, and posture from the source photo — do not change how the baby is positioned. Keep the exact same face, hair, and posture. Dress the baby in a pristine white astronaut suit with realistic fabric stitching and a transparent spherical helmet. Set the scene in outer space with deep dark background, blue-white stardust, nebula clouds, distant planets, and soft glowing cosmic elements. Use cinematic lighting with realistic helmet reflections, subtle lens flares, and shallow depth of field. The baby's pose must be IDENTICAL to the source photo.",
    compositePrompt:
      "Composite 3 images into one seamless studio-quality baby portrait: (1) Baby photo = CRITICAL: preserve the exact body pose, position, and orientation — do not alter the pose in any way; also preserve face, hair, and all physical features exactly, (2) Background scene = deep outer space with nebula, stardust, distant planets, and cosmic lighting effects, (3) Clothing = pristine white astronaut suit with transparent spherical helmet. Blend them so the baby wears the astronaut suit in the cosmic scene with helmet reflections and cinematic space lighting. The baby's pose must be IDENTICAL to the source photo. Use full-body framing from head to toes with no crop. Output as hyper-realistic professional newborn photography.",
    color: "#4a5f7f",
  },
];
