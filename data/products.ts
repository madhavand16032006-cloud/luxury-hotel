export interface Product {
  id: string;
  name: string;
  category: CategoryName;
  price: number;
  originalPrice: number;
  quantity: string;
  availability: "In Stock" | "Fresh Batch Today" | "Only Few Left";
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeColor?: "green" | "amber" | "blue" | "red";
  description: string;
  features: string[];
  image: string;
  nutrition?: {
    calories?: string;
    protein?: string;
    shelfLife?: string;
    origin?: string;
  };
}

export type CategoryName =
  | "Fresh Vegetables"
  | "Fruits"
  | "Milk & Dairy"
  | "Rice & Groceries"
  | "Snacks & Beverages"
  | "Household Essentials";

export interface CategoryInfo {
  id: string;
  name: CategoryName;
  description: string;
  itemCount: number;
  iconName: string;
  image: string;
  badge: string;
  bgColor: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "vegetables",
    name: "Fresh Vegetables",
    description: "Farm-picked greens, roots & daily cooking staples harvested at dawn.",
    itemCount: 45,
    iconName: "Carrot",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    badge: "Farm Harvested Daily",
    bgColor: "from-emerald-500/10 to-green-600/20",
  },
  {
    id: "fruits",
    name: "Fruits",
    description: "Sweet, juicy seasonal & exotic fruits rich in vitamins and nutrients.",
    itemCount: 38,
    iconName: "Apple",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80",
    badge: "100% Naturally Ripened",
    bgColor: "from-amber-500/10 to-orange-500/20",
  },
  {
    id: "dairy",
    name: "Milk & Dairy",
    description: "Pure farm milk, artisanal malai paneer, fresh curd, and aromatic desi ghee.",
    itemCount: 28,
    iconName: "Milk",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
    badge: "Morning Fresh Supply",
    bgColor: "from-blue-500/10 to-cyan-500/20",
  },
  {
    id: "groceries",
    name: "Rice & Groceries",
    description: "Aged basmati rice, unpolished lentils, stone-ground flour, and cold-pressed oils.",
    itemCount: 62,
    iconName: "Wheat",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    badge: "Purity Tested",
    bgColor: "from-yellow-600/10 to-amber-700/20",
  },
  {
    id: "snacks",
    name: "Snacks & Beverages",
    description: "Freshly roasted dry fruits, premium Assam teas, juices, and wholesome munchies.",
    itemCount: 54,
    iconName: "Coffee",
    image: "https://images.unsplash.com/photo-1508061252966-f72fb9b1f73b?w=600&auto=format&fit=crop&q=80",
    badge: "Crisp & Healthy",
    bgColor: "from-orange-500/10 to-rose-500/20",
  },
  {
    id: "household",
    name: "Household Essentials",
    description: "Herbal dishwashing liquids, eco-cleaners, paper towels, and laundry care.",
    itemCount: 40,
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80",
    badge: "Family Safe",
    bgColor: "from-teal-500/10 to-emerald-600/20",
  },
];

export const PRODUCTS: Product[] = [
  // --- FRESH VEGETABLES ---
  {
    id: "veg-01",
    name: "Farm Fresh Vine Tomatoes",
    category: "Fresh Vegetables",
    price: 38,
    originalPrice: 48,
    quantity: "1 kg",
    availability: "Fresh Batch Today",
    rating: 4.8,
    reviewsCount: 142,
    badge: "20% OFF",
    badgeColor: "green",
    description:
      "Plump, naturally sun-ripened farm tomatoes picked at peak maturity. Ideal for gravies, curries, rich soups, and fresh salads.",
    features: ["Locally sourced daily", "Zero chemical ripening", "Rich in Lycopene and Vitamin C"],
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "18 kcal/100g", shelfLife: "4-5 Days", origin: "Local Maharashtra Farms" },
  },
  {
    id: "veg-02",
    name: "Crisp Baby Spinach (Palak)",
    category: "Fresh Vegetables",
    price: 24,
    originalPrice: 32,
    quantity: "250 g bunch",
    availability: "Fresh Batch Today",
    rating: 4.9,
    reviewsCount: 89,
    badge: "Harvested Today",
    badgeColor: "green",
    description:
      "Tender, hydro-cleaned baby spinach leaves with rich green chlorophyll. Delivers instant freshness for palak paneer, dal, or healthy morning smoothies.",
    features: ["Hydro-washed & trimmed", "Iron & Vitamin A powerhouse", "Tender stems, sweet taste"],
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "23 kcal/100g", shelfLife: "3 Days", origin: "Hydroponic Greenhouse" },
  },
  {
    id: "veg-03",
    name: "Nashik Red Onions (Premium)",
    category: "Fresh Vegetables",
    price: 42,
    originalPrice: 55,
    quantity: "1 kg",
    availability: "In Stock",
    rating: 4.7,
    reviewsCount: 210,
    badge: "23% OFF",
    badgeColor: "amber",
    description:
      "Firm, multi-layered Nashik red onions with strong pungent flavor and crisp crunch. Essential base for all Indian cooking and tadkas.",
    features: ["Properly sun-cured skins", "Uniform medium-large sizing", "Long shelf life"],
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "40 kcal/100g", shelfLife: "2-3 Weeks", origin: "Nashik, India" },
  },
  {
    id: "veg-04",
    name: "Crisp Green Capsicum",
    category: "Fresh Vegetables",
    price: 48,
    originalPrice: 60,
    quantity: "500 g",
    availability: "In Stock",
    rating: 4.8,
    reviewsCount: 64,
    badge: "Crunchy Fresh",
    badgeColor: "green",
    description:
      "Glossy, thick-walled bell peppers perfect for stir-fries, pizza toppings, noodles, and stuffed capsicum recipes.",
    features: ["Thick juicy flesh", "High Vitamin C content", "Hand-selected for firmness"],
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "20 kcal/100g", shelfLife: "5-7 Days", origin: "Polyhouse Farms" },
  },

  // --- FRUITS ---
  {
    id: "frt-01",
    name: "Royal Gala Kashmir Apples",
    category: "Fruits",
    price: 139,
    originalPrice: 175,
    quantity: "4 pcs (~600g)",
    availability: "In Stock",
    rating: 4.9,
    reviewsCount: 178,
    badge: "20% OFF",
    badgeColor: "red",
    description:
      "Crisp, sweet, and aromatic Kashmiri Royal Gala apples with thin blush skin and dense, juicy white flesh.",
    features: ["Natural orchard sweetness", "Wax-free natural skin", "Rich in dietary fiber"],
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "52 kcal/100g", shelfLife: "10-12 Days", origin: "Kashmir Orchards" },
  },
  {
    id: "frt-02",
    name: "Fresh Robusta Bananas",
    category: "Fruits",
    price: 54,
    originalPrice: 65,
    quantity: "1 dozen",
    availability: "Fresh Batch Today",
    rating: 4.8,
    reviewsCount: 310,
    badge: "Naturally Ripened",
    badgeColor: "amber",
    description:
      "Spotless golden bananas naturally ripened without carbide. Ideal source of potassium and sustained clean energy.",
    features: ["Carbide-free guarantee", "Energy booster for kids & sports", "Smooth creamy texture"],
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "89 kcal/100g", shelfLife: "3-4 Days", origin: "Kerala & TN Plantations" },
  },
  {
    id: "frt-03",
    name: "Nagpur Sweet Oranges (Santra)",
    category: "Fruits",
    price: 89,
    originalPrice: 110,
    quantity: "1 kg",
    availability: "In Stock",
    rating: 4.7,
    reviewsCount: 95,
    badge: "High Vitamin C",
    badgeColor: "amber",
    description:
      "Juicy, tangy-sweet Nagpur oranges with easy-peel skins. Splendid for fresh morning juice or healthy snacking.",
    features: ["Loaded with citrus juice", "Natural immune booster", "Fresh seasonal harvest"],
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "47 kcal/100g", shelfLife: "6-7 Days", origin: "Nagpur, Maharashtra" },
  },
  {
    id: "frt-04",
    name: "Fresh Ruby Pomegranate (Anar)",
    category: "Fruits",
    price: 115,
    originalPrice: 140,
    quantity: "2 pcs (~500g)",
    availability: "In Stock",
    rating: 4.9,
    reviewsCount: 112,
    badge: "Superfood",
    badgeColor: "red",
    description:
      "Large rubies packed with antioxidant-rich arils. Hand-graded for dark ruby seed color and high sweetness index.",
    features: ["Deep red sweet arils", "Cardiovascular health support", "Graded for high seed yield"],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "83 kcal/100g", shelfLife: "1 Week", origin: "Solapur, India" },
  },

  // --- MILK & DAIRY ---
  {
    id: "dry-01",
    name: "Farm Pure Cow Milk (Full Cream)",
    category: "Milk & Dairy",
    price: 68,
    originalPrice: 75,
    quantity: "1 Litre",
    availability: "Fresh Batch Today",
    rating: 4.9,
    reviewsCount: 420,
    badge: "Morning Fresh",
    badgeColor: "blue",
    description:
      "Chilled pure cow milk with natural 4.2%+ fat. Free of adulterants, pasteurized under hygienic German lines for rich malai and tea.",
    features: ["Zero hormones & antibiotics", "Cold chain delivered at 4°C", "Thick rich natural cream"],
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "62 kcal/100ml", protein: "3.4g", shelfLife: "2 Days Chilled", origin: "Organic Dairy Co-op" },
  },
  {
    id: "dry-02",
    name: "Artisanal Fresh Malai Paneer",
    category: "Milk & Dairy",
    price: 92,
    originalPrice: 110,
    quantity: "200 g",
    availability: "Fresh Batch Today",
    rating: 4.9,
    reviewsCount: 285,
    badge: "Melt-In-Mouth",
    badgeColor: "green",
    description:
      "Velvety soft, vacuum-packed cottage cheese made from whole milk. Never rubbery, absorbs masala deeply for paneer butter masala or tikka.",
    features: ["18g protein per serving", "Zero cornstarch or preservatives", "Porous & sponge soft"],
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "265 kcal/100g", protein: "18.3g", shelfLife: "10 Days Sealed", origin: "Fresh Dairy Unit" },
  },
  {
    id: "dry-03",
    name: "Fresh Probiotic Set Curd (Dahi)",
    category: "Milk & Dairy",
    price: 45,
    originalPrice: 50,
    quantity: "400 g tub",
    availability: "Fresh Batch Today",
    rating: 4.8,
    reviewsCount: 160,
    badge: "Gut Friendly",
    badgeColor: "green",
    description:
      "Thick, traditional set curd fermented with live probiotic cultures. Silky texture with mild pleasant tanginess for raitas and meals.",
    features: ["Active probiotic cultures", "No sour aftertaste", "Set firmly in food-grade tubs"],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "60 kcal/100g", protein: "3.8g", shelfLife: "7 Days Chilled", origin: "Dairy Co-op" },
  },
  {
    id: "dry-04",
    name: "Pure A2 Cow Desi Ghee (Bilona Style)",
    category: "Milk & Dairy",
    price: 449,
    originalPrice: 520,
    quantity: "500 ml glass jar",
    availability: "In Stock",
    rating: 5.0,
    reviewsCount: 340,
    badge: "Best Seller",
    badgeColor: "amber",
    description:
      "Golden, granular desi ghee slowly simmered from cultured cow butter using the traditional bilona churning technique. Heavenly aroma.",
    features: ["Traditional bilona churning", "Aromatic Danedar texture", "Packed in reusable glass jar"],
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "897 kcal/100g", shelfLife: "9 Months", origin: "Saurashtra Gir Cows" },
  },

  // --- RICE & GROCERIES ---
  {
    id: "grc-01",
    name: "Royal Aged Basmati Rice (XXL Grain)",
    category: "Rice & Groceries",
    price: 145,
    originalPrice: 170,
    quantity: "1 kg pack",
    availability: "In Stock",
    rating: 4.9,
    reviewsCount: 230,
    badge: "2-Year Aged",
    badgeColor: "amber",
    description:
      "Aged for 24 months in climate-controlled silos. Long pearl grains expand up to 2.5x during cooking without breaking, offering royal aroma.",
    features: ["Extra-long slender grain", "Non-sticky, fluffy texture", "Ideal for biryani & pulao"],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "350 kcal/100g", shelfLife: "12 Months", origin: "Foothills of Himalayas" },
  },
  {
    id: "grc-02",
    name: "Organic Unpolished Toor Dal",
    category: "Rice & Groceries",
    price: 158,
    originalPrice: 185,
    quantity: "1 kg",
    availability: "In Stock",
    rating: 4.8,
    reviewsCount: 165,
    badge: "Unpolished",
    badgeColor: "green",
    description:
      "Pristine toor dal without synthetic water or oil polishing. Retains natural dietary fiber, plant proteins, and earthy homemade taste.",
    features: ["No artificial colors or polish", "Rich source of vegetarian protein", "Cooks into a creamy dal"],
    image: "https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "343 kcal/100g", protein: "22g", shelfLife: "6 Months", origin: "Latur, Maharashtra" },
  },
  {
    id: "grc-03",
    name: "Cold-Pressed Kachi Ghani Mustard Oil",
    category: "Rice & Groceries",
    price: 189,
    originalPrice: 220,
    quantity: "1 Litre",
    availability: "In Stock",
    rating: 4.7,
    reviewsCount: 190,
    badge: "Wood Pressed",
    badgeColor: "amber",
    description:
      "Pure pungent mustard oil extracted in traditional wooden kolhu without heating. Retains Omega-3 fatty acids and natural pungent aroma.",
    features: ["Zero chemical refinement", "Authentic pungent kick for tadka", "High smoke point for frying"],
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "884 kcal/100ml", shelfLife: "9 Months", origin: "Rajasthan Yellow Mustard" },
  },
  {
    id: "grc-04",
    name: "100% Chakki Fresh Whole Wheat Atta",
    category: "Rice & Groceries",
    price: 225,
    originalPrice: 260,
    quantity: "5 kg bag",
    availability: "In Stock",
    rating: 4.9,
    reviewsCount: 450,
    badge: "Super Value",
    badgeColor: "green",
    description:
      "Slow-ground from heavy MP Sharbati wheat grains. Retains 100% bran and germ for soft, fluffy rotis that stay tender for hours.",
    features: ["0% Maida, 100% whole grain", "High fiber for smooth digestion", "Extra soft roti guarantee"],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "364 kcal/100g", shelfLife: "3 Months", origin: "Sehore Sharbati Fields" },
  },

  // --- SNACKS & BEVERAGES ---
  {
    id: "snk-01",
    name: "Roasted & Salted California Almonds",
    category: "Snacks & Beverages",
    price: 235,
    originalPrice: 280,
    quantity: "250 g zipper pouch",
    availability: "In Stock",
    rating: 4.9,
    reviewsCount: 180,
    badge: "Crunchy Premium",
    badgeColor: "amber",
    description:
      "Hand-selected jumbo California badam lightly roasted in pink Himalayan salt. Packed with Vitamin E, protein, and healthy fats.",
    features: ["Zero added oil roasting", "Pink Himalayan rock salt", "Resealable nitrogen-flushed pouch"],
    image: "https://images.unsplash.com/photo-1508061252966-f72fb9b1f73b?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "579 kcal/100g", protein: "21g", shelfLife: "6 Months", origin: "California, USA" },
  },
  {
    id: "snk-02",
    name: "Premium Assam Golden CTC Black Tea",
    category: "Snacks & Beverages",
    price: 195,
    originalPrice: 230,
    quantity: "500 g pack",
    availability: "In Stock",
    rating: 4.8,
    reviewsCount: 140,
    badge: "Strong Kadak",
    badgeColor: "amber",
    description:
      "Selected from upper Assam tea estates. Granular CTC leaves brew an intensely rich amber liquor with bold aroma, perfect with cow milk.",
    features: ["Rich kadak aroma", "Rich red malt liquor", "Morning revitalizer"],
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "0 kcal", shelfLife: "12 Months", origin: "Assam Valley" },
  },
  {
    id: "snk-03",
    name: "Pure Alphonso Mango Nectar (Cold Pressed)",
    category: "Snacks & Beverages",
    price: 110,
    originalPrice: 125,
    quantity: "1 Litre bottle",
    availability: "In Stock",
    rating: 4.8,
    reviewsCount: 95,
    badge: "Real Fruit Pulp",
    badgeColor: "amber",
    description:
      "Crafted with 100% Ratnagiri Alphonso mango pulp. Thick, aromatic, and free from synthetic preservatives.",
    features: ["Real mango pulp", "No artificial sweeteners", "Chilled refreshing sip"],
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80",
    nutrition: { calories: "64 kcal/100ml", shelfLife: "4 Months", origin: "Ratnagiri, Maharashtra" },
  },

  // --- HOUSEHOLD ESSENTIALS ---
  {
    id: "hsd-01",
    name: "Herbal Lemon Dishwash Gel Concentrate",
    category: "Household Essentials",
    price: 135,
    originalPrice: 165,
    quantity: "750 ml pump bottle",
    availability: "In Stock",
    rating: 4.8,
    reviewsCount: 160,
    badge: "Grease Fighter",
    badgeColor: "green",
    description:
      "Powered by real lime juice and plant enzymes. Cuts tough burnt ghee and turmeric stains easily while staying gentle on hands.",
    features: ["Tough on oil, gentle on skin", "Antibacterial lime formula", "Economic 1-spoon concentrated wash"],
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80",
    nutrition: { shelfLife: "24 Months", origin: "Eco-Chemical Lab" },
  },
  {
    id: "hsd-02",
    name: "Natural Pine Floor & Surface Cleaner",
    category: "Household Essentials",
    price: 165,
    originalPrice: 199,
    quantity: "1 Litre bottle",
    availability: "In Stock",
    rating: 4.7,
    reviewsCount: 88,
    badge: "99.9% Germ Kill",
    badgeColor: "blue",
    description:
      "Triple-action disinfectant cleaner with natural Himalayan pine extract. Leaves tiles spotless with a soothing fresh alpine fragrance.",
    features: ["Safe around kids & pets", "Streak-free marble & tile shine", "Long-lasting botanical aroma"],
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&auto=format&fit=crop&q=80",
    nutrition: { shelfLife: "24 Months", origin: "Certified Clean Standards" },
  },
  {
    id: "hsd-03",
    name: "Virgin Bamboo Kitchen Paper Towel",
    category: "Household Essentials",
    price: 110,
    originalPrice: 135,
    quantity: "2 Rolls (120 pulls each)",
    availability: "In Stock",
    rating: 4.9,
    reviewsCount: 115,
    badge: "Extra Absorbent",
    badgeColor: "green",
    description:
      "Ultra-absorbent 2-ply kitchen towel rolls made from sustainable virgin bamboo pulp. Perfect for absorbing excess oil from fried snacks.",
    features: ["Food contact certified safe", "Quick-lock liquid absorption", "Eco-friendly zero plastic pulp"],
    image: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=600&auto=format&fit=crop&q=80",
    nutrition: { shelfLife: "Indefinite", origin: "Sustainable Forestry" },
  },
];

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  itemPurchased: string;
}

export const REVIEWS_DATA: CustomerReview[] = [
  {
    id: "rev-01",
    name: "Pooja Deshmukh",
    location: "City Center, Mumbai",
    rating: 5,
    date: "2 days ago",
    verified: true,
    comment:
      "The milk and paneer from National Shopping Mall are unmatched! Paneer was so soft, tasted like it was made minutes ago. Delivery arrived in 35 minutes flat. Will never buy dairy from supermarkets again.",
    itemPurchased: "Farm Pure Cow Milk & Malai Paneer",
  },
  {
    id: "rev-02",
    name: "Rajesh Kulkarni",
    location: "Model Town, Pune",
    rating: 5,
    date: "4 days ago",
    verified: true,
    comment:
      "The vegetables are genuinely farm fresh. The tomatoes and baby spinach had that earthy fragrance you only get from morning village markets. Ordering was so fast on mobile, highly impressed with the service!",
    itemPurchased: "Vine Tomatoes & Baby Spinach",
  },
  {
    id: "rev-03",
    name: "Meenakshi Sundaram",
    location: "Green Avenue, Bengaluru",
    rating: 5,
    date: "1 week ago",
    verified: true,
    comment:
      "Aged Basmati Rice is pure restaurant grade! The grains cooked up long and fragrant. Also loved that we could choose Cash on Delivery and pay via UPI directly at the door.",
    itemPurchased: "Royal Aged Basmati Rice 1kg",
  },
  {
    id: "rev-04",
    name: "Amitabh Verma",
    location: "Kalyani Nagar",
    rating: 5,
    date: "1 week ago",
    verified: true,
    comment:
      "Great pricing and trustworthy quality. Their customer support on WhatsApp answered my query about morning delivery slot within two minutes. National Shopping Mall is our new go-to grocery stop.",
    itemPurchased: "Chakki Atta 5kg & Desi Ghee",
  },
];

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQS_DATA: FaqItem[] = [
  {
    id: 1,
    question: "How can I place an order?",
    answer:
      "Placing an order is simple! Browse our catalogue by category or use the search bar to find your required groceries and dairy items. Click 'Add to Cart' or 'Buy Now'. When ready, open your Cart, enter your name, phone number, and delivery address, and proceed to checkout to confirm your order via UPI, Cards, or Cash on Delivery.",
  },
  {
    id: 2,
    question: "Do you sell dairy products and groceries?",
    answer:
      "Yes, absolutely! National Shopping Mall is your complete one-stop daily store. We specialize in farm-fresh pure cow milk, creamy paneer, set curd, bilona desi ghee, fresh seasonal vegetables and fruits, grains, pulses, spices, snacks, and daily household cleaning essentials.",
  },
  {
    id: 3,
    question: "Can I order multiple products together?",
    answer:
      "Yes! You can add products across any number of categories — vegetables, dairy, rice, and household items — into a single shopping cart. They will all be bundled together and delivered in one single sanitized delivery bag.",
  },
  {
    id: 4,
    question: "What payment methods are available?",
    answer:
      "We offer flexible and 100% secure payment options including UPI (Google Pay, PhonePe, Paytm, BHIM), Credit and Debit Cards (Visa, Mastercard, RuPay), Net Banking, and Cash on Delivery (COD). You can also scan and pay via QR code on delivery.",
  },
  {
    id: 5,
    question: "Can I track my order?",
    answer:
      "Yes! As soon as your order is confirmed, you will receive an Order ID on screen along with an instant SMS/WhatsApp notification. You can also click our 'Track Order on WhatsApp' button to receive live real-time dispatch and delivery executive updates.",
  },
  {
    id: 6,
    question: "Can I cancel my order?",
    answer:
      "You can cancel your order free of charge before the order is dispatched for delivery by calling our hotline (+91 98765 43210) or messaging our WhatsApp support. For fresh dairy and vegetables, we process orders quickly to ensure maximum morning freshness.",
  },
  {
    id: 7,
    question: "Do you provide home delivery?",
    answer:
      "Yes, we provide doorstep home delivery across all local neighborhoods. Orders above ₹499 qualify for completely FREE delivery! For urgent needs, our express delivery option delivers within 30-45 minutes.",
  },
  {
    id: 8,
    question: "How can I contact customer support?",
    answer:
      "Our customer care team is available 7 days a week from 7:00 AM to 10:30 PM. You can click the floating WhatsApp button on screen, call our direct line at +91 98765 43210, email support@nationalshoppingmall.com, or fill out the contact form below on our website.",
  },
];

