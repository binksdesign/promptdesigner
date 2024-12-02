export const categories = {
  photographicStyle: {
    name: "Style Photographique",
    keywords: ["cinematic photography", "minimalistic photography", "vintage photography", "modern photography", "hyper-realistic photography", "polaroid photography", "macro photography", "surrealistic photography", "moody photography", "dreamlike photography", "documentary photography", "noir photography", "dramatic photography", "high contrast photography", "low contrast photography", "soft focus photography", "editorial photography", "artistic photography", "black and white photography", "colorful photography", "product photography", "no style"],
    description: "Définit l'approche visuelle globale de l'image"
  },
  object: {
    name: "Objet",
    keywords: ["featuring a blank t-shirt", "featuring a blank hoodie", "featuring a blank mug", "featuring a blank box", "featuring a blank bottle", "featuring a blank notebook", "featuring a blank shoes", "featuring a blank hat", "featuring a blank bag", "featuring a blank socks", "featuring a blank poster", "featuring a blank phone case", "featuring a blank laptop", "featuring a blank watch", "featuring a blank jewelry", "featuring a blank backpack", "featuring a blank wallet", "featuring a blank cushion", "featuring a blank blanket", "featuring a blank scarf", "featuring a blank bucket hat", "featuring a blank cap", "featuring a blank baseball cap", "featuring a blank oversize t-shirt", "featuring a blank balaclava", "featuring a blank beauty product", "featuring a blank perfume bottle", "featuring a blank bomber jacket", "featuring a blank jacket", "featuring a blank A4 flyer", "featuring a blank A5 flyer", "featuring a blank business card", "no object"],
    description: "L'objet principal à mettre en valeur"
  },
  objectColor: {
    name: "Couleur de l'Objet",
    keywords: ["colored in red", "colored in blue", "colored in green", "colored in yellow", "colored in purple", "colored in orange", "colored in black", "colored in white", "colored in grey", "colored in pink", "colored in teal", "colored in navy", "colored in brown", "colored in beige", "colored in gold", "colored in silver", "displaying a red to blue gradient", "displaying a purple to pink gradient", "displaying a green to yellow gradient", "displaying a black to white gradient", "no color"],
    description: "La couleur dominante de l'objet"
  },
  model: {
    name: "Porté par",
    keywords: ["presented by male model", "presented by female model", "displayed on mannequin", "held in one hand", "held in both hands", "floating in air", "placed on table", "carried by child", "carried by teenager", "carried by adult", "carried by elderly person", "showcased by family", "showcased by couple", "showcased by group of friends", "modeled by athlete", "modeled by business person", "modeled by hipster", "modeled by artist", "modeled by professional", "styled casually", "styled formally", "no model"],
    description: "Le sujet qui présente l'objet"
  },
  scene: {
    name: "Scène",
    keywords: ["set in product showcase", "set in studio environment", "set in outdoor lifestyle", "set in street fashion", "arranged in flat lay", "styled for e-commerce", "captured in lifestyle shot", "shown in use", "captured in close-up", "placed in workspace", "arranged in retail display", "set in nature", "placed in urban environment", "set in abstract scene", "situated in kitchen", "situated in bathroom", "situated in living room", "situated in bedroom", "situated in office", "no scene"],
    description: "Le type de mise en scène"
  },
  setting: {
    name: "Décor",
    keywords: ["located at beach", "located in forest", "positioned on urban street", "positioned in industrial warehouse", "positioned on mountain cliff", "situated in cozy room", "placed in flower field", "against abstract background", "positioned in desert", "situated by lake", "situated by river", "against city skyline", "located in countryside", "situated at farm", "positioned on rooftop", "situated in café", "situated in restaurant", "situated in hotel", "situated in library", "no setting"],
    description: "L'environnement spécifique"
  },
  angle: {
    name: "Angle de Vue",
    keywords: ["shot in close-up", "shot in extreme close-up", "captured in medium shot", "captured in wide shot", "captured in extreme wide shot", "photographed from low angle", "photographed from high angle", "viewed from bird's eye", "viewed from worm's eye", "composed with dutch angle", "framed over-the-shoulder", "captured from point of view", "shot from aerial perspective", "using tracking shot", "using dolly movement", "presented in establishing shot", "detailed in insert shot", "composed in master shot", "framed in two shot", "arranged in group shot", "captured in profile", "viewed from front", "viewed from back", "viewed from side", "viewed at three-quarter angle", "shot from overhead", "captured at eye-level", "styled with canted angle", "composed with tilt", "shot in reverse angle", "no angle"],
    description: "L'angle de prise de vue"
  },
  lighting: {
    name: "Éclairage",
    keywords: ["illuminated by soft light", "illuminated by hard light", "bathed in natural light", "captured during golden hour", "lit with studio lights", "enhanced by neon lights", "featuring dramatic shadows", "illuminated from behind", "lit from the side", "highlighted with rim light", "focused with spotlight", "surrounded by ambient light", "softened with diffused light", "emphasized by harsh light", "photographed at sunset", "photographed at sunrise", "shot in overcast light", "emphasized by key light", "balanced with fill light", "highlighted from back", "detailed with hair light", "enhanced by practical lighting", "softened with bounce light", "featuring specular highlights", "enhanced by atmospheric lighting", "styled with colored lighting", "shaped by directional lighting", "accented with focused light", "set in mood lighting", "no lighting"],
    description: "Le type d'éclairage utilisé"
  },
  shadow: {
    name: "Ombres",
    keywords: ["displaying cast shadows", "enhanced with drop shadow", "softened by gentle shadows", "defined by hard shadows", "featuring gradient shadows", "styled with layered shadows", "showing dynamic shadows", "including projected shadows", "featuring transparent shadows", "accented with colored shadows", "detailed with textured shadows", "surrounded by atmospheric shadows", "enhanced by volumetric shadows", "highlighted with rim shadows", "grounded with contact shadows", "shaped by directional shadows", "softened with diffused shadows", "featuring scattered shadows", "emphasized by deep shadows", "styled with dramatic shadows", "complemented by natural shadows", "enhanced by artificial shadows", "featuring geometric shadows", "showing organic shadows", "detailed with complex shadows", "accented with minimal shadows", "layered with multiple shadows", "styled with overlapping shadows", "defined by sharp shadows", "no shadow"],
    description: "Les effets d'ombres dans l'image"
  },
  mood: {
    name: "Ambiance",
    keywords: ["expressing cozy atmosphere", "conveying luxury", "maintaining minimal aesthetic", "expressing grungy feel", "radiating brightness", "conveying dark atmosphere", "creating dreamy atmosphere", "expressing playful energy", "maintaining serene atmosphere", "expressing elegant mood", "conveying rustic feel", "expressing modern aesthetic", "maintaining industrial feel", "creating romantic atmosphere", "conveying mysterious mood", "radiating vibrant energy", "maintaining calm atmosphere", "expressing chaotic energy", "no mood"],
    description: "L'atmosphère générale de l'image"
  },
  resolution: {
    name: "Résolution et Finition",
    keywords: ["rendered in 4K", "produced in high resolution", "captured with sharp focus", "styled with blurred background", "enhanced with bokeh effect", "finished with grain texture", "finished with matte effect", "finished with glossy effect", "enhanced with vignette", "rendered with soft edges", "detailed with crisp definition", "finished with smooth texture", "enhanced with texture details", "styled with pixelation", "rendered in HDR", "produced in low resolution", "styled with artistic blur", "enhanced with motion blur", "no resolution"],
    description: "La qualité et le style de l'image"
  }
} as const;