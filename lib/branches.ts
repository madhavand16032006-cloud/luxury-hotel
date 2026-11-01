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
    id: "puducherry",
    name: "Luxury Hotel (Pondicherry)",
    city: "Pondicherry",
    tagline: "Colonial Promenade & Coastal Elegance",
    code: "PDY",
    address: "ABC Address, Pondicherry",
    phone: "+91 1234567890",
    whatsapp: "+91 1234567890",
    rating: "4.9 ★ (820+ reviews)",
    image: "/images/hotel-hero.jpg",
    startingRate: "₹2,999",
    highlights: [
      "100% Inverter AC Suites",
      "Free Guarded Covered Parking",
      "Complimentary High-Speed Wi-Fi",
      "24/7 Front Desk Concierge",
    ],
  },
  {
    id: "tindivanam",
    name: "Luxury Hotel (Tindivanam)",
    city: "Tindivanam",
    tagline: "Culinary Sanctuary & Luxury Suites",
    code: "TMV",
    address: "ABC Address, Tindivanam",
    phone: "+91 1234567890",
    whatsapp: "+91 1234567890",
    rating: "4.9 ★ (460+ reviews)",
    image: "/images/facility-dining.jpg",
    startingRate: "₹2,999",
    highlights: [
      "Authentic Royal Virundhu Dining",
      "Whisper-Quiet Climate Control AC",
      "Highway Transit Sanctuary",
      "Free Valet Parking",
    ],
  },
  {
    id: "chennai",
    name: "Luxury Hotel (Chennai)",
    city: "Chennai",
    tagline: "Flagship Metro Sanctuary & Suites",
    code: "CHN",
    address: "XYZ Address, Chennai",
    phone: "+91 1234567890",
    whatsapp: "+91 1234567890",
    rating: "4.9 ★ (650+ reviews)",
    image: "/images/room-chettinad-suite.jpg",
    startingRate: "₹3,499",
    highlights: [
      "Metro Grandeur & Luxury Living",
      "Palatial Penthouse & Suites",
      "Free Valet & Covered Parking",
      "VIP Airport Transfers Available",
    ],
  },
];
