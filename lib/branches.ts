export interface HotelBranch {
  id: string;
  name: string;
  city: string;
  tagline: string;
  code: string;
  address: string;
  phone: string;
  whatsapp: string;
  rating: string;
  image: string;
  startingRate: string;
  highlights: string[];
}

export const HOTEL_BRANCHES: HotelBranch[] = [
  {
    id: "chennai",
    name: "Chennai Flagship & ECR Resort",
    city: "Chennai, Tamil Nadu",
    tagline: "Metro Grandeur & Beachfront Serenity",
    code: "CHN",
    address: "Anna Salai (Mount Road) & ECR Beachfront, Chennai 600002",
    phone: "+91 44 2845 1984",
    whatsapp: "+91 94440 12345",
    rating: "4.9 ★ (820+ reviews)",
    image: "/images/hotel-hero.jpg",
    startingRate: "₹2,999",
    highlights: [
      "Free Valet & Covered Parking",
      "100% Inverter AC Suites",
      "Free High-Speed Wi-Fi 6",
      "Near Central Metro & Airport",
    ],
  },
  {
    id: "madurai",
    name: "Madurai & Chettinad Palace",
    city: "Madurai & Chettinad, Tamil Nadu",
    tagline: "Authentic Athangudi Heritage & Mansions",
    code: "MDU",
    address: "West Perumal Maistry Street, Madurai & Kanadukathan, Chettinad 625001",
    phone: "+91 452 234 1984",
    whatsapp: "+91 94440 12346",
    rating: "4.9 ★ (460+ reviews)",
    image: "/images/room-chettinad-suite.jpg",
    startingRate: "₹2,999",
    highlights: [
      "Original Athangudi Tiled Courtyard",
      "Century-Old Teakwood Suites",
      "Dakshin Royal Dining Pavilion",
      "Free Guarded Car Parking",
    ],
  },
  {
    id: "puducherry",
    name: "Puducherry Heritage French Quarter",
    city: "Puducherry (Pondicherry)",
    tagline: "Colonial Promenade & Beachfront Elegance",
    code: "PDY",
    address: "Rue Romain Rolland, White Town & Reddiarpalayam, Puducherry 605001",
    phone: "+91 413 222 1984",
    whatsapp: "+91 94440 12347",
    rating: "4.8 ★ (320+ reviews)",
    image: "/images/facility-pool.jpg",
    startingRate: "₹3,499",
    highlights: [
      "Promenade Beach Walking Access",
      "Emerald Courtyard Pool & Cabanas",
      "Boutique 100% AC Suites",
      "Free Secure Parking on Site",
    ],
  },
];

