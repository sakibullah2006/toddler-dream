# Theme Assets

Each theme folder contains:
- `background.png` - The theme background scene for compositing
- `clothing.png` - The theme outfit/clothing for the baby

## Folder Structure

```
/public/themes/
  ├── forest/
  │   ├── background.png      (Enchanted woodland scene)
  │   └── clothing.png        (Earth-tone infant outfit)
  ├── underwater/
  │   ├── background.png      (Aquatic ocean setting)
  │   └── clothing.png        (Ocean-blue infant outfit)
  └── space/
      ├── background.png      (Cosmic nebula scene)
      └── clothing.png        (Astronaut suit)
```

## Themes

### Forest 🌲
Enchanted woodland with nature and warm earth tones.
- **background.png**: Forest scene with moss, trees, wildflowers, dappled sunlight
- **clothing.png**: Earth-tone infant outfit blending with nature

### Underwater Ocean 🌊
Magical aquatic world with serene blue tones and gentle bubbles.
- **background.png**: Underwater ocean setting with coral, sea plants, light rays
- **clothing.png**: Ocean-blue or mermaid-inspired infant outfit

### Space 🚀
Cosmic adventure with stars, planets, and celestial wonder.
- **background.png**: Deep outer space with nebula, stardust, distant planets
- **clothing.png**: Pristine white astronaut suit with transparent spherical helmet

## Image Requirements

- **Format**: PNG with transparency preferred for overlays
- **Size**: Recommend 1024x1024 or similar square format
- **Background**: Full scene/setting that will appear behind the baby
- **Clothing**: Outfit/clothing layer that will be composited onto the baby

## How It Works

When a user:
1. Uploads a baby photo
2. Selects a theme (Forest, Underwater, or Space)
3. Clicks "Generate"

The API:
1. Loads the baby photo (user upload)
2. Loads `background.png` from the theme folder
3. Loads `clothing.png` from the theme folder
4. Sends all 3 images to gpt-image-1 with instructions to composite them seamlessly
5. Returns a studio-quality baby portrait with theme styling applied
