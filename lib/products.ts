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
    name: "Kumbakonam Degree Coffee",
    italian: "Kumbakonam Filter Coffee",
    category: "coffee",
    price: "₹120",
    origin: "Plantation A & Peaberry Blend · Nilgiris & Shevaroy",
    notes: ["Dense Decoction", "Frothy A2 Milk", "Pure Brass Davarah"],
    description: "First-drip dark chicory decoction infused into frothy, unpasteurized A2 cow's milk. Poured with a high arc in heirloom brass davarah for the iconic crown.",
    image: "/images/espresso.jpg",
    tone: "linear-gradient(160deg, #e8dcc8 0%, #b89872 100%)",
  },
  {
    id: "cappuccino",
    name: "Madras Golden Filter Cappuccino",
    italian: "Madras Signature Coffee",
    category: "coffee",
    price: "₹180",
    origin: "Shevaroy Peaberry · Velvety Microfoam",
    notes: ["Velvet Microfoam", "Jaggery Undertones", "Cardamom Aroma"],
    description: "A contemporary tribute to Madras coffee culture. Silky micro-textured organic milk poured over double-strength filter decoction with green cardamom.",
    image: "/images/cappuccino.jpg",
    tone: "linear-gradient(160deg, #f3ebdd 0%, #c9a65b 100%)",
  },
  {
    id: "tiramisu",
    name: "Tirunelveli Halwa Soufflé",
    italian: "Tirunelveli Wheat Halwa",
    category: "pasticceria",
    price: "₹240",
    origin: "Tamirabarani River Water Recipe · Pure Thanjavur Ghee",
    notes: ["Slow-Stirred Wheat Milk", "Golden Pure Ghee", "Toasted Cashews"],
    description: "Traditional fermented wheat milk simmered for hours over wood fire with pure golden ghee and wild cane sugar, layered with delicate chilled cream.",
    image: "/images/tiramisu.jpg",
    tone: "linear-gradient(160deg, #efe4d2 0%, #8e6b4f 100%)",
  },
  {
    id: "pastry",
    name: "Chettinad Nei Appam & Crisps",
    italian: "Chettinad Sweet Appam",
    category: "pasticceria",
    price: "₹160",
    origin: "Heritage Chettinad Royal Kitchens · Morning Bake",
    notes: ["Crisp Outer Crust", "Soft Cardamom Jaggery Core", "Golden Ghee Fry"],
    description: "Crispy on the outside, tender and aromatic within. Hand-fermented rice and jaggery batter pan-fried in pure ghee, scented with crushed green cardamom.",
    image: "/images/pastry.jpg",
    tone: "linear-gradient(160deg, #f6eedf 0%, #6b6b3a 100%)",
  },
];

