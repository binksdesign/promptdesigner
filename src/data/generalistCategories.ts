export const generalistCategories = {
  technique: {
    name: "Technique",
    keywords: [
      "digital photography", "film photography", "manga art style", "3D rendering", "comic art style",
      "vintage comic style", "watercolor painting", "oil painting", "digital painting", "pencil drawing",
      "charcoal drawing", "vector illustration", "pixel art", "low poly 3D", "realistic 3D",
      "stylized 3D", "concept art", "architectural rendering", "isometric art", "flat illustration",
      "collage art", "mixed media", "gouache painting", "acrylic painting", "ink drawing",
      "linocut print", "woodblock print", "etching", "lithography", "screenprint",
      "airbrush art", "graffiti art", "mosaic art", "stained glass", "ceramic art",
      "no technique"
    ],
    description: "La technique artistique utilisée"
  },
  style: {
    name: "Style",
    keywords: [
      "minimalist", "maximalist", "abstract", "realistic", "surrealist",
      "impressionist", "expressionist", "art deco", "art nouveau", "baroque",
      "gothic", "cyberpunk", "steampunk", "vaporwave", "retro",
      "vintage", "modern", "contemporary", "traditional", "folk",
      "pop art", "bauhaus", "brutalist", "classical", "romantic",
      "futuristic", "primitive", "naive", "outsider art", "street art",
      "no style"
    ],
    description: "Le style artistique"
  },
  mainObject: {
    name: "Sujet Principal",
    keywords: [
      "a person", "a landscape", "a cityscape", "a building", "a vehicle",
      "an animal", "a plant", "an object", "a machine", "a character",
      "a group of people", "a crowd", "a couple", "a family", "a child",
      "an elderly person", "a professional", "an athlete", "an artist", "a musician",
      "a dancer", "a warrior", "a mythical creature", "a robot", "a cyborg",
      "a monster", "a hero", "a villain", "a deity", "an alien",
      "no main object"
    ],
    description: "Le sujet principal de l'œuvre"
  },
  context: {
    name: "Contexte/Scène",
    keywords: [
      "urban environment", "natural landscape", "fantasy world", "sci-fi setting", "historical scene",
      "post-apocalyptic world", "underwater scene", "space setting", "desert landscape", "tropical paradise",
      "mountain range", "forest setting", "beach scene", "industrial zone", "residential area",
      "commercial district", "ancient ruins", "modern city", "rural setting", "suburban area",
      "battlefield", "peaceful garden", "mystical realm", "alternate dimension", "parallel universe",
      "dream world", "nightmare realm", "virtual reality", "abstract space", "void space",
      "no context"
    ],
    description: "Le contexte ou la scène"
  },
  lighting: {
    name: "Éclairage",
    keywords: [
      "natural daylight", "artificial lighting", "dramatic lighting", "soft lighting", "harsh lighting",
      "neon lighting", "candlelight", "moonlight", "sunset lighting", "sunrise lighting",
      "studio lighting", "ambient lighting", "spotlighting", "backlight", "rim light",
      "volumetric lighting", "atmospheric lighting", "cinematic lighting", "high-key lighting", "low-key lighting",
      "colored lighting", "fluorescent lighting", "LED lighting", "fire light", "starlight",
      "no lighting"
    ],
    description: "Le type d'éclairage"
  },
  cameraAngle: {
    name: "Angle de Vue",
    keywords: [
      "eye level shot", "low angle shot", "high angle shot", "bird's eye view", "worm's eye view",
      "dutch angle", "over the shoulder", "front view", "side view", "three-quarter view",
      "back view", "aerial view", "isometric view", "perspective view", "panoramic view",
      "close-up shot", "extreme close-up", "medium shot", "wide shot", "extreme wide shot",
      "tracking shot", "dolly shot", "crane shot", "establishing shot", "point of view shot",
      "no camera angle"
    ],
    description: "L'angle de prise de vue"
  },
  ambiance: {
    name: "Ambiance",
    keywords: [
      "peaceful", "mysterious", "energetic", "melancholic", "romantic",
      "dramatic", "whimsical", "nostalgic", "futuristic", "dystopian",
      "utopian", "magical", "ethereal", "dark", "light",
      "chaotic", "orderly", "serene", "tense", "relaxed",
      "playful", "serious", "dreamy", "nightmarish", "heavenly",
      "no ambiance"
    ],
    description: "L'ambiance générale"
  },
  detailLevel: {
    name: "Niveau de Détail",
    keywords: [
      "highly detailed", "moderately detailed", "minimally detailed", "ultra detailed", "simple",
      "complex", "intricate", "basic", "elaborate", "refined",
      "rough", "polished", "sketchy", "finished", "complete",
      "incomplete", "precise", "loose", "exact", "approximate",
      "meticulous", "casual", "careful", "relaxed", "studied",
      "no detail level"
    ],
    description: "Le niveau de détail"
  },
  dominantColors: {
    name: "Couleurs Dominantes",
    keywords: [
      "warm colors", "cool colors", "monochromatic", "complementary colors", "analogous colors",
      "triadic colors", "split complementary", "neutral colors", "pastel colors", "vibrant colors",
      "muted colors", "earth tones", "jewel tones", "neon colors", "metallic colors",
      "iridescent colors", "gradient colors", "rainbow colors", "black and white", "sepia tones",
      "no dominant colors"
    ],
    description: "Les couleurs dominantes"
  },
  resolution: {
    name: "Résolution",
    keywords: [
      "8K resolution", "4K resolution", "HD resolution", "standard resolution", "low resolution",
      "ultra high resolution", "medium resolution", "print quality", "web quality", "studio quality",
      "professional quality", "cinematic quality", "broadcast quality", "premium quality", "draft quality",
      "no resolution"
    ],
    description: "La qualité de résolution"
  }
} as const;