export const textureCategories = {
  textureType: {
    name: "Type de Texture",
    keywords: [
      "grainy texture", "grunge texture", "scratch texture", "holographic texture", 
      "metallic texture", "paper texture", "concrete texture", "glass texture", 
      "halftone texture", "wood texture", "leather texture", "fabric texture",
      "marble texture", "stone texture", "brushed metal texture", "carbon fiber texture",
      "rusted texture", "patina texture", "woven texture", "knitted texture",
      "cork texture", "rubber texture", "plastic texture", "ceramic texture",
      "sand texture", "silk texture", "velvet texture", "denim texture",
      "canvas texture", "mesh texture", "diamond plate texture", "perforated texture",
      "ribbed texture", "corrugated texture", "crumpled texture", "distressed texture",
      "embossed texture", "hammered texture", "woven metal texture", "crystalline texture",
      "no texture"
    ],
    description: "Le type de texture principal"
  },
  color: {
    name: "Couleur",
    keywords: [
      "in black color", "in white color", "with holographic effect", 
      "with rainbow gradient", "in gold finish", "in silver finish",
      "in copper finish", "in bronze finish", "in chrome finish",
      "with blue to purple gradient", "with red to orange gradient",
      "with green to blue gradient", "with pink to purple gradient",
      "in brushed aluminum finish", "in gunmetal finish", "in rose gold finish",
      "with iridescent effect", "with color shifting effect", "with metallic sheen",
      "with pearlescent finish", "with matte black finish", "with glossy white finish",
      "with oxidized patina", "with aged brass finish", "with weathered copper finish",
      "no color"
    ],
    description: "La couleur ou finition de la texture"
  },
  detailLevel: {
    name: "Niveau de Détail",
    keywords: [
      "showing low detail", "displaying medium detail", "featuring high detail",
      "with minimal detail", "with intricate detail", "with fine detail",
      "with subtle detail", "with complex detail", "with rich detail",
      "with sharp detail", "with crisp detail", "with elaborate detail",
      "no detail"
    ],
    description: "Le niveau de détail de la texture"
  },
  condition: {
    name: "État",
    keywords: [
      "in new condition", "showing slight wear", "displaying moderate wear",
      "with heavy wear", "in pristine condition", "with light aging",
      "with natural patina", "showing weathering", "with vintage wear",
      "displaying aged character", "with authentic distressing", "showing time-worn details",
      "no condition"
    ],
    description: "L'état ou l'usure de la texture"
  },
  lighting: {
    name: "Éclairage",
    keywords: [
      "under direct lighting", "with soft illumination", "featuring dramatic lighting",
      "with side lighting", "under studio lighting", "with ambient lighting",
      "showing specular highlights", "with diffused lighting", "featuring rim lighting",
      "with natural lighting", "under controlled lighting", "with accent lighting",
      "no lighting"
    ],
    description: "L'éclairage utilisé pour capturer la texture"
  },
  resolution: {
    name: "Résolution",
    keywords: [
      "in 8K resolution", "in 4K resolution", "in high resolution",
      "with seamless tiling", "with perfect clarity", "with ultra-sharp detail",
      "featuring macro detail", "with microscopic precision", "in studio quality",
      "with professional finish", "with perfect focus", "with enhanced sharpness",
      "no resolution"
    ],
    description: "La qualité et résolution de l'image"
  }
} as const;