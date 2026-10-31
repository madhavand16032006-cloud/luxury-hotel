export type Product = {
  id: string;
  name: string;
  italian: string;
  category: "coffee" | "pasticceria";
  price: string;
  origin: string;
  notes: string[];
  description: string;
  image: string;
  tone: string;
};

export const products: Product[] = [
  {
    id: "espresso",
    name: "Espresso",
    italian: "Caffè Classico",
    category: "coffee",
    price: "€3.50",
    origin: "Single-Origin Arabica · Sidama & San Marcos Blend",
    notes: ["Dark Cocoa", "Toasted Hazelnut", "Orange Zest Crema"],
    description: "A short, dense pull with an unctuous hazelnut crema. Served on warm porcelain, alongside chilled sparkling water with citrus rind.",
    image: "/images/espresso.jpg",
    tone: "linear-gradient(160deg, #e8dcc8 0%, #b89872 100%)",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    italian: "Cappuccino Tradizionale",
    category: "coffee",
    price: "€4.80",
    origin: "Velluto Medium Roast · Alpine Microfoam",
    notes: ["Velvet Microfoam", "Brown Butter", "Dusted Pure Cacao"],
    description: "Alpine whole milk steamed to silky micro-texture, folded into an espresso foundation and finished with a dusting of 70% dark cocoa.",
    image: "/images/cappuccino.jpg",
    tone: "linear-gradient(160deg, #f3ebdd 0%, #c9a65b 100%)",
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    italian: "Tiramisù della Casa",
    category: "pasticceria",
    price: "€8.50",
    origin: "Lombard Farm Mascarpone · Marsala Superiore",
    notes: ["Whipped Mascarpone", "Espresso Savoiardi", "Bitter Valrhona Cocoa"],
    description: "Savoiardi ladyfingers steeped in fresh double-shot espresso and aged Marsala, layered with hand-whipped sweet mascarpone and chilled for 24 hours.",
    image: "/images/tiramisu.jpg",
    tone: "linear-gradient(160deg, #efe4d2 0%, #8e6b4f 100%)",
  },
  {
    id: "pastry",
    name: "Fresh Pastry",
    italian: "Sfogliatella Riccia",
    category: "pasticceria",
    price: "€5.20",
    origin: "Neapolitan Heritage Recipe · Baked at 6:00 AM",
    notes: ["Crisp Shell Layers", "Warm Citrus Ricotta", "Candied Orange Peel"],
    description: "Hundreds of wafer-thin, butter-brushed pastry strata shatter upon first bite, giving way to a warm filling of sheep's milk ricotta and candied citrus.",
    image: "/images/pastry.jpg",
    tone: "linear-gradient(160deg, #f6eedf 0%, #6b6b3a 100%)",
  },
];

