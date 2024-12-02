export const isolatedCategories = {
  photographicStyle: {
    name: "Style Photographique",
    keywords: ["studio photography", "minimalist photography", "high-end photography", "commercial photography", "fashion photography", "product photography", "portrait photography", "still life photography", "conceptual photography", "advertising photography", "editorial photography", "clean photography", "professional photography", "luxury photography", "contemporary photography", "no style"],
    description: "Le style photographique global"
  },
  subject: {
    name: "Sujet",
    keywords: [
      // People
      "featuring a male model", "featuring a female model", "featuring a child", "featuring a teenager", "featuring an elderly person", "featuring a business person", "featuring an athlete",
      // Body parts
      "showing hands", "presenting a face", "capturing full body", "featuring eyes", "showing profile",
      // Fashion
      "showcasing clothing", "displaying accessories", "presenting jewelry", "featuring watches", "showing shoes",
      // Beauty & Cosmetics
      "featuring perfume bottle", "displaying makeup product", "showing skincare product", "presenting beauty tools", "featuring nail polish",
      // Electronics
      "featuring smartphone", "displaying laptop", "showing headphones", "presenting smartwatch", "featuring tablet",
      // Home & Lifestyle
      "featuring furniture piece", "displaying home decor", "showing kitchenware", "presenting stationery", "featuring art piece",
      // Food & Beverage
      "featuring beverage bottle", "displaying food product", "showing coffee packaging", "presenting tea packaging",
      // Other Products
      "featuring luxury item", "displaying book cover", "showing sports equipment", "presenting musical instrument",
      "no subject"
    ],
    description: "Le sujet principal de la photo"
  },
  background: {
    name: "Fond",
    keywords: ["isolated on pure white background", "isolated on pure black background", "no background"],
    description: "Le fond de l'image"
  },
  angle: {
    name: "Angle de Vue",
    keywords: [
      "captured in close-up shot", "captured in extreme close-up", "shot in medium shot", "photographed in wide shot",
      "captured from low angle", "shot from high angle", "photographed at eye level", "captured in dutch angle",
      "shot in isometric view", "photographed in front view", "captured in side view", "shot in three-quarter view",
      "photographed in profile view", "captured in overhead shot", "shot in worm's eye view", "photographed in bird's eye view",
      "captured in diagonal view", "shot in straight-on view", "photographed in angled view", "captured in perspective view",
      "no angle"
    ],
    description: "L'angle de prise de vue"
  },
  lighting: {
    name: "Éclairage",
    keywords: ["lit professionally", "illuminated cleanly", "highlighted precisely", "lit dramatically", "illuminated softly", "lit from above", "illuminated from sides", "backlit elegantly", "lit uniformly", "illuminated with rim light", "lit with butterfly lighting", "illuminated with Rembrandt lighting", "lit with split lighting", "illuminated with loop lighting", "no lighting"],
    description: "L'éclairage utilisé"
  },
  emotion: {
    name: "Émotion",
    keywords: ["expressing confidence", "showing serenity", "conveying strength", "displaying elegance", "projecting professionalism", "radiating calmness", "showing determination", "expressing sophistication", "conveying authority", "displaying grace", "no emotion"],
    description: "L'émotion exprimée"
  },
  detail: {
    name: "Détail",
    keywords: ["capturing fine details", "emphasizing texture", "showing sharp features", "highlighting contours", "revealing subtle nuances", "focusing on patterns", "detailing surface quality", "emphasizing form", "capturing intricate elements", "no detail"],
    description: "Les détails mis en valeur"
  },
  technique: {
    name: "Technique",
    keywords: ["shot with shallow depth", "captured with perfect focus", "photographed with precision", "executed with technical excellence", "created with studio mastery", "produced with professional quality", "rendered with clarity", "captured with accuracy", "shot with expertise", "no technique"],
    description: "La technique photographique"
  },
  finish: {
    name: "Finition",
    keywords: ["finished in high resolution", "rendered professionally", "produced in studio quality", "completed with perfect retouching", "refined with color grading", "enhanced with contrast", "perfected with post-processing", "polished to commercial standard", "finished with attention to detail", "no finish"],
    description: "La finition de l'image"
  }
} as const;