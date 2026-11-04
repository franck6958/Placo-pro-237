export type ServiceSlug =
  | "faux-plafonds"
  | "cloisons-doublages"
  | "staff-corniches"
  | "eclairage-integre"
  | "decoration-interieure"
  | "enduits-peinture";

export type Service = {
  slug: ServiceSlug;
  title: string;
  short: string;
  intro: string;
  features: string[];
  benefits: { title: string; text: string }[];
  ideal: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "faux-plafonds",
    title: "Faux plafonds",
    short:
      "Plafonds suspendus en plaque de plâtre, plats ou à caissons, adaptés aux salons, chambres, bureaux et commerces.",
    intro:
      "Le faux plafond transforme une pièce : il masque les gaines, corrige les défauts, améliore l'acoustique et accueille un éclairage sur mesure. Nous concevons des plafonds plats, à caissons ou à plusieurs niveaux, toujours alignés au millimètre.",
    features: ["Plafonds à caissons et à niveaux", "Gorges lumineuses LED", "Spots encastrés", "Plaques hydrofuges pour pièces humides"],
    benefits: [
      { title: "Esthétique", text: "Des volumes redessinés et des lignes parfaitement nettes." },
      { title: "Technique", text: "Câbles, gaines et climatisation dissimulés proprement." },
      { title: "Confort", text: "Meilleure isolation thermique et acoustique." },
    ],
    ideal: ["Salons", "Chambres", "Bureaux", "Commerces", "Hôtels"],
  },
  {
    slug: "cloisons-doublages",
    title: "Cloisons & doublages",
    short:
      "Cloisons en plaque de plâtre pour créer ou redistribuer des espaces rapidement, sans gros œuvre.",
    intro:
      "Besoin d'une chambre en plus, d'un bureau fermé ou d'un open space cloisonné ? Les cloisons sur ossature métallique permettent de redistribuer vos espaces vite, proprement et sans travaux lourds.",
    features: ["Cloisons de séparation", "Doublage de murs", "Isolation phonique et thermique", "Intégration de portes et passages"],
    benefits: [
      { title: "Rapidité", text: "Pose sèche, sans temps de séchage du maçonné." },
      { title: "Modularité", text: "Des espaces qui évoluent avec vos besoins." },
      { title: "Isolation", text: "Laine minérale intégrée pour le calme et la fraîcheur." },
    ],
    ideal: ["Open spaces", "Appartements", "Boutiques", "Cliniques"],
  },
  {
    slug: "staff-corniches",
    title: "Staff & corniches",
    short:
      "Moulures, corniches, rosaces et éléments décoratifs pour donner du caractère à vos plafonds et murs.",
    intro:
      "Le staff apporte la touche d'élégance qui fait la différence : corniches, moulures, rosaces et habillages de poutres, posés et raccordés avec soin pour un rendu classique ou contemporain.",
    features: ["Corniches et moulures", "Rosaces décoratives", "Habillage de poutres", "Pièces sur mesure"],
    benefits: [
      { title: "Caractère", text: "Une signature décorative qui valorise la pièce." },
      { title: "Finition", text: "Raccords invisibles et angles parfaitement repris." },
      { title: "Durabilité", text: "Matériaux stables, adaptés au climat local." },
    ],
    ideal: ["Salles à manger", "Salons", "Halls d'entrée", "Restaurants"],
  },
  {
    slug: "eclairage-integre",
    title: "Éclairage intégré",
    short:
      "Intégration des spots, rubans LED et luminaires directement dans les ouvrages en plâtre pour une ambiance sur mesure.",
    intro:
      "La lumière fait partie de l'ouvrage. Nous prévoyons dès la conception les réservations pour spots, gorges LED et luminaires, afin d'obtenir une ambiance douce, homogène et sans câbles apparents.",
    features: ["Rubans LED en gorge", "Spots et downlights", "Mise en valeur d'éléments", "Scénarios d'ambiance"],
    benefits: [
      { title: "Ambiance", text: "Une lumière indirecte, chaleureuse et maîtrisée." },
      { title: "Économie", text: "LED basse consommation, longue durée de vie." },
      { title: "Intégration", text: "Aucun câble visible, tout est encastré." },
    ],
    ideal: ["Salons", "Chambres", "Vitrines", "Réceptions"],
  },
  {
    slug: "decoration-interieure",
    title: "Décoration intérieure",
    short:
      "Niches murales, meubles TV en plâtre, têtes de lit, habillages et agencements décoratifs.",
    intro:
      "Nous créons des éléments décoratifs intégrés à l'architecture : meubles TV, niches éclairées, têtes de lit, habillages muraux. Des pièces uniques, pensées pour votre intérieur.",
    features: ["Niches et étagères intégrées", "Meubles TV et têtes de lit", "Habillages muraux", "Conseil en aménagement"],
    benefits: [
      { title: "Sur mesure", text: "Chaque élément est dessiné pour votre espace." },
      { title: "Rangement", text: "Des niches utiles qui libèrent la pièce." },
      { title: "Cohérence", text: "Un style homogène, du plafond aux murs." },
    ],
    ideal: ["Salons", "Chambres", "Bureaux de direction", "Hôtels"],
  },
  {
    slug: "enduits-peinture",
    title: "Enduits & peinture",
    short: "Bandes, enduits, ponçage et mise en peinture pour une finition prête à vivre.",
    intro:
      "La qualité d'un ouvrage en plâtre se juge à sa finition. Bandes, enduits, ponçage et peinture : nous livrons des surfaces lisses, sans joints visibles, prêtes à vivre.",
    features: ["Bandes et joints", "Enduits de finition", "Ponçage soigné", "Peinture intérieure"],
    benefits: [
      { title: "Lisse", text: "Des surfaces uniformes, même en lumière rasante." },
      { title: "Clé en main", text: "Vous emménagez sans autre intervention." },
      { title: "Propreté", text: "Ponçage et nettoyage maîtrisés." },
    ],
    ideal: ["Neuf", "Rénovation", "Bureaux", "Logements"],
  },
];

export type ProjectCat = "plafond" | "cloison" | "deco";

export const CATEGORIES: { key: ProjectCat | "all"; label: string }[] = [
  { key: "all", label: "Tout" },
  { key: "plafond", label: "Faux plafonds" },
  { key: "cloison", label: "Cloisons" },
  { key: "deco", label: "Décoration" },
];

export type Project = {
  slug: string;
  title: string;
  cat: ProjectCat;
  label: string;
  city: "Douala" | "Yaoundé";
  type: string;
  summary: string;
  scope: string[];
  service: ServiceSlug;
  tone: "warm" | "sand" | "night";
};

export const PROJECTS: Project[] = [
  {
    slug: "salon-caisson-led",
    title: "Salon — plafond à caisson LED",
    cat: "plafond",
    label: "Faux plafond",
    city: "Douala",
    type: "Résidence privée",
    summary:
      "Création d'un caisson central avec gorge lumineuse périphérique et spots encastrés pour structurer un grand séjour.",
    scope: ["Ossature et plaques BA13", "Gorge LED périphérique", "8 spots encastrés", "Enduits et peinture"],
    service: "faux-plafonds",
    tone: "warm",
  },
  {
    slug: "meuble-tv-niches",
    title: "Meuble TV et niches intégrées",
    cat: "deco",
    label: "Décoration",
    city: "Yaoundé",
    type: "Appartement",
    summary:
      "Mur TV en plâtre avec niches éclairées et rangements intégrés, en continuité avec le plafond.",
    scope: ["Structure du meuble TV", "Niches éclairées LED", "Passage de câbles masqué", "Finition peinture"],
    service: "decoration-interieure",
    tone: "night",
  },
  {
    slug: "open-space-cloisonnement",
    title: "Bureaux — cloisonnement d'open space",
    cat: "cloison",
    label: "Cloisons",
    city: "Douala",
    type: "Bureaux",
    summary:
      "Redistribution d'un plateau en bureaux fermés et salle de réunion, avec isolation phonique renforcée.",
    scope: ["Cloisons sur ossature", "Isolation laine minérale", "Intégration des portes", "Bandes et enduits"],
    service: "cloisons-doublages",
    tone: "sand",
  },
  {
    slug: "chambre-deux-niveaux",
    title: "Chambre — plafond à deux niveaux",
    cat: "plafond",
    label: "Faux plafond",
    city: "Yaoundé",
    type: "Villa",
    summary:
      "Plafond à double niveau avec éclairage indirect au-dessus du lit pour une atmosphère apaisante.",
    scope: ["Double niveau", "Ruban LED blanc chaud", "Spots orientables", "Peinture mate"],
    service: "faux-plafonds",
    tone: "warm",
  },
  {
    slug: "corniches-rosace",
    title: "Corniches et rosace de salle à manger",
    cat: "deco",
    label: "Décoration",
    city: "Douala",
    type: "Résidence privée",
    summary:
      "Pose de corniches moulurées et d'une rosace centrale pour mettre en valeur le lustre de la salle à manger.",
    scope: ["Corniches staff", "Rosace centrale", "Raccords et reprises", "Mise en peinture"],
    service: "staff-corniches",
    tone: "sand",
  },
  {
    slug: "commerce-doublage",
    title: "Commerce — doublage et habillage",
    cat: "cloison",
    label: "Cloisons",
    city: "Yaoundé",
    type: "Boutique",
    summary:
      "Doublage des murs et habillage de la vitrine pour un espace de vente net et lumineux.",
    scope: ["Doublage des murs", "Habillage de poteaux", "Éclairage vitrine", "Finitions"],
    service: "cloisons-doublages",
    tone: "night",
  },
];

export const STEPS = [
  { title: "Prise de contact", text: "Vous nous décrivez votre besoin par téléphone, WhatsApp ou via le formulaire." },
  { title: "Visite & mesures", text: "Nous passons sur place pour prendre les mesures et comprendre vos attentes." },
  { title: "Devis & design", text: "Vous recevez un devis détaillé et une proposition de design à valider." },
  { title: "Réalisation", text: "Pose, finitions, nettoyage du chantier et réception des travaux avec vous." },
];

export const VALUES = [
  { title: "Précision", text: "Des lignes droites, des angles nets, des joints invisibles." },
  { title: "Transparence", text: "Un devis détaillé, sans frais cachés." },
  { title: "Fiabilité", text: "Un planning annoncé et suivi." },
  { title: "Créativité", text: "Des propositions adaptées à votre style." },
];

export const STRENGTHS = [
  "Devis détaillé et gratuit",
  "Délais annoncés et respectés",
  "Finitions soignées",
  "Chantier propre et rangé",
];

export const FAQS = [
  { q: "Le devis est-il vraiment gratuit ?", a: "Oui. Après une visite et la prise de mesures, nous vous remettons un devis détaillé, sans engagement." },
  { q: "Combien de temps durent les travaux ?", a: "Cela dépend de la surface et de la complexité du design. Le délai est précisé dans le devis, avant tout démarrage." },
  { q: "Fournissez-vous les matériaux ?", a: "Oui, nous pouvons fournir l'ensemble des matériaux (plaques, ossatures, enduits, éclairages) ou travailler avec ceux que vous avez déjà achetés." },
  { q: "Travaillez-vous pour les entreprises ?", a: "Oui : bureaux, boutiques, hôtels, restaurants et autres locaux professionnels." },
  { q: "Le faux plafond résiste-t-il à l'humidité ?", a: "Pour les pièces humides (salles de bain, cuisines), nous utilisons des plaques hydrofuges adaptées." },
  { q: "Intervenez-vous hors de Douala et Yaoundé ?", a: "Contactez-nous : nous étudions chaque demande au cas par cas selon la taille du chantier." },
];

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Autre"];
export const CITY_OPTIONS = ["Douala", "Yaoundé", "Autre"];
