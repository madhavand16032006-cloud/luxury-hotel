"use client";

export interface Reservation {
  id: string;
  guestName: string;
  phone: string;
  email: string;
  branchId: "puducherry" | "tindivanam" | "chennai" | string;
  branchName: string;
  roomType: string;
  rate: string;
  rateNumeric: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: string;
  totalAmount: number;
  status: "Confirmed" | "Checked In" | "Pending" | "Checked Out" | "Cancelled";
  paymentStatus: "Pay at Hotel" | "Paid Online" | "Advance Paid";
  specialRequest?: string;
  createdAt: string;
}

export interface SiteMediaConfig {
  // Home Hero Slides
  heroPuducherryVideo: string;
  heroPuducherryPoster: string;
  heroTindivanamVideo: string;
  heroTindivanamPoster: string;
  heroChennaiVideo: string;
  heroChennaiPoster: string;

  // Inner Pages Hero
  pageHeroVideo: string;
  pageHeroImage: string;

  // Rooms Photography
  roomNormal: string;
  roomDeluxe: string;
  roomChettinad: string;
  roomPenthouse: string;

  // Facilities Photography
  facilityPool: string;
  facilityDining: string;
  facilityParking: string;
  facilityWifi: string;
}

export const DEFAULT_MEDIA_CONFIG: SiteMediaConfig = {
  heroPuducherryVideo: "/videos/resort-8k.mp4",
  heroPuducherryPoster: "/images/hotel-hero.jpg",
  heroTindivanamVideo: "/videos/cafe-8k.mp4",
  heroTindivanamPoster: "/images/facility-dining.jpg",
  heroChennaiVideo: "/videos/resort.mp4",
  heroChennaiPoster: "/images/room-chettinad-suite.jpg",

  pageHeroVideo: "/videos/resort-8k.mp4",
  pageHeroImage: "/images/hotel-hero.jpg",

  roomNormal: "/images/room-normal-ac.jpg",
  roomDeluxe: "/images/room-deluxe-ac.jpg",
  roomChettinad: "/images/room-chettinad-suite.jpg",
  roomPenthouse: "/images/room-presidential.jpg",

  facilityPool: "/images/facility-pool.jpg",
  facilityDining: "/images/facility-dining.jpg",
  facilityParking: "/images/facility-parking.jpg",
  facilityWifi: "/images/facility-wifi.jpg",
};

export const INITIAL_SAMPLE_RESERVATIONS: Reservation[] = [
  {
    id: "BRV-849201",
    guestName: "Anand Rajagopalan",
    phone: "+91 98410 44219",
    email: "anand.r@gmail.com",
    branchId: "chennai",
    branchName: "Luxury Hotel (Chennai)",
    roomType: "Royal Penthouse & Family Suite",
    rate: "₹8,999",
    rateNumeric: 8999,
    checkIn: "2026-11-02",
    checkOut: "2026-11-05",
    nights: 3,
    guests: "4 Guests (2 Adults, 2 Kids)",
    totalAmount: 26997,
    status: "Confirmed",
    paymentStatus: "Paid Online",
    specialRequest: "Airport transfer pickup requested at 4:30 PM. High floor preferred.",
    createdAt: "2026-10-31T14:20:00Z",
  },
  {
    id: "BRV-731940",
    guestName: "Priya & Karthik Sundaram",
    phone: "+91 94432 11880",
    email: "priyakarthik@outlook.com",
    branchId: "puducherry",
    branchName: "Luxury Hotel (Pondicherry)",
    roomType: "Heritage Chettinad Teak Suite",
    rate: "₹6,499",
    rateNumeric: 6499,
    checkIn: "2026-11-01",
    checkOut: "2026-11-04",
    nights: 3,
    guests: "2 Guests",
    totalAmount: 19497,
    status: "Checked In",
    paymentStatus: "Pay at Hotel",
    specialRequest: "Anniversary celebration — floral bed styling & extra towels requested.",
    createdAt: "2026-10-30T10:15:00Z",
  },
  {
    id: "BRV-652814",
    guestName: "Dr. Vijay Raghavan",
    phone: "+91 97890 55432",
    email: "dr.raghavan@apollo.org",
    branchId: "tindivanam",
    branchName: "Luxury Hotel (Tindivanam)",
    roomType: "Deluxe Luxury AC Room",
    rate: "₹4,499",
    rateNumeric: 4499,
    checkIn: "2026-11-01",
    checkOut: "2026-11-03",
    nights: 2,
    guests: "2 Guests",
    totalAmount: 8998,
    status: "Checked In",
    paymentStatus: "Paid Online",
    specialRequest: "Quiet room away from highway facing inner courtyard. Extra coffee sachets.",
    createdAt: "2026-10-31T09:40:00Z",
  },
  {
    id: "BRV-590123",
    guestName: "Deepa Swaminathan",
    phone: "+91 98840 90123",
    email: "deepa.swami@yahoo.com",
    branchId: "chennai",
    branchName: "Luxury Hotel (Chennai)",
    roomType: "Deluxe Luxury AC Room",
    rate: "₹4,499",
    rateNumeric: 4499,
    checkIn: "2026-11-03",
    checkOut: "2026-11-06",
    nights: 3,
    guests: "2 Guests",
    totalAmount: 13497,
    status: "Confirmed",
    paymentStatus: "Advance Paid",
    specialRequest: "Late check-in past 10 PM expected due to flight arrival.",
    createdAt: "2026-10-31T18:05:00Z",
  },
  {
    id: "BRV-481902",
    guestName: "Rohan Mehta",
    phone: "+91 98201 34910",
    email: "rohan.mehta@fintech.in",
    branchId: "puducherry",
    branchName: "Luxury Hotel (Pondicherry)",
    roomType: "Standard Normal AC Room",
    rate: "₹2,999",
    rateNumeric: 2999,
    checkIn: "2026-10-29",
    checkOut: "2026-11-01",
    nights: 3,
    guests: "1 Guest",
    totalAmount: 8997,
    status: "Checked Out",
    paymentStatus: "Paid Online",
    specialRequest: "Corporate GST invoice required in name of Fintech Solutions India.",
    createdAt: "2026-10-28T11:30:00Z",
  },
  {
    id: "BRV-329841",
    guestName: "Meenakshi Sundaram",
    phone: "+91 94441 87654",
    email: "meena.sun@gmail.com",
    branchId: "tindivanam",
    branchName: "Luxury Hotel (Tindivanam)",
    roomType: "Heritage Chettinad Teak Suite",
    rate: "₹6,499",
    rateNumeric: 6499,
    checkIn: "2026-11-04",
    checkOut: "2026-11-06",
    nights: 2,
    guests: "3 Guests",
    totalAmount: 12998,
    status: "Pending",
    paymentStatus: "Pay at Hotel",
    specialRequest: "Ground floor accessible room with walk-in shower for elderly parents.",
    createdAt: "2026-11-01T08:12:00Z",
  },
  {
    id: "BRV-219405",
    guestName: "Arjun Venkatesh",
    phone: "+91 99620 44321",
    email: "arjun.v@tcs.com",
    branchId: "chennai",
    branchName: "Luxury Hotel (Chennai)",
    roomType: "Standard Normal AC Room",
    rate: "₹2,999",
    rateNumeric: 2999,
    checkIn: "2026-11-05",
    checkOut: "2026-11-07",
    nights: 2,
    guests: "2 Guests",
    totalAmount: 5998,
    status: "Confirmed",
    paymentStatus: "Pay at Hotel",
    specialRequest: "Early check-in at 10 AM requested if room available.",
    createdAt: "2026-11-01T09:45:00Z",
  },
  {
    id: "BRV-108472",
    guestName: "Suresh Natarajan",
    phone: "+91 98402 77109",
    email: "suresh.n@rediffmail.com",
    branchId: "puducherry",
    branchName: "Luxury Hotel (Pondicherry)",
    roomType: "Deluxe Luxury AC Room",
    rate: "₹4,499",
    rateNumeric: 4499,
    checkIn: "2026-10-27",
    checkOut: "2026-10-30",
    nights: 3,
    guests: "2 Guests",
    totalAmount: 13497,
    status: "Checked Out",
    paymentStatus: "Paid Online",
    specialRequest: "Arranged rental scooter during stay.",
    createdAt: "2026-10-26T16:00:00Z",
  },
];

const RESERVATIONS_STORAGE_KEY = "br_hotel_reservations_v1";
const MEDIA_STORAGE_KEY = "br_hotel_media_v1";

export function getStoredReservations(): Reservation[] {
  if (typeof window === "undefined") return INITIAL_SAMPLE_RESERVATIONS;
  try {
    const raw = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_RESERVATIONS));
      return INITIAL_SAMPLE_RESERVATIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading stored reservations:", err);
    return INITIAL_SAMPLE_RESERVATIONS;
  }
}

export function saveReservations(list: Reservation[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("br-reservations-updated", { detail: list }));
  } catch (err) {
    console.error("Error saving reservations:", err);
  }
}

export function addReservation(item: Reservation): void {
  const current = getStoredReservations();
  const updated = [item, ...current];
  saveReservations(updated);
}

export function updateReservationStatus(id: string, newStatus: Reservation["status"]): void {
  const current = getStoredReservations();
  const updated = current.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
  saveReservations(updated);
}

export function deleteReservation(id: string): void {
  const current = getStoredReservations();
  const updated = current.filter((r) => r.id !== id);
  saveReservations(updated);
}

export function resetReservationsToDefault(): Reservation[] {
  if (typeof window !== "undefined") {
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_RESERVATIONS));
    window.dispatchEvent(new CustomEvent("br-reservations-updated", { detail: INITIAL_SAMPLE_RESERVATIONS }));
  }
  return INITIAL_SAMPLE_RESERVATIONS;
}

export function getStoredMedia(): SiteMediaConfig {
  if (typeof window === "undefined") return DEFAULT_MEDIA_CONFIG;
  try {
    const raw = localStorage.getItem(MEDIA_STORAGE_KEY);
    if (!raw) return DEFAULT_MEDIA_CONFIG;
    return { ...DEFAULT_MEDIA_CONFIG, ...JSON.parse(raw) };
  } catch (err) {
    console.error("Error reading stored media:", err);
    return DEFAULT_MEDIA_CONFIG;
  }
}

export function saveStoredMedia(media: SiteMediaConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(media));
    window.dispatchEvent(new CustomEvent("br-media-updated", { detail: media }));
  } catch (err) {
    console.error("Error saving media:", err);
  }
}

export function resetMediaToDefault(): SiteMediaConfig {
  if (typeof window !== "undefined") {
    localStorage.removeItem(MEDIA_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("br-media-updated", { detail: DEFAULT_MEDIA_CONFIG }));
  }
  return DEFAULT_MEDIA_CONFIG;
}

export function exportReservationsCSV(list: Reservation[]): void {
  if (typeof window === "undefined") return;
  const headers = [
    "Booking Ref",
    "Guest Name",
    "Phone",
    "Email",
    "Branch",
    "Room Type",
    "Check-In",
    "Check-Out",
    "Nights",
    "Guests",
    "Total (INR)",
    "Status",
    "Payment",
    "Notes",
    "Created Date",
  ];

  const rows = list.map((r) => [
    r.id,
    `"${r.guestName.replace(/"/g, '""')}"`,
    `"${r.phone}"`,
    `"${r.email}"`,
    `"${r.branchName}"`,
    `"${r.roomType}"`,
    r.checkIn,
    r.checkOut,
    r.nights,
    `"${r.guests}"`,
    r.totalAmount,
    r.status,
    r.paymentStatus,
    `"${(r.specialRequest || "").replace(/"/g, '""')}"`,
    r.createdAt,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `Luxury_Hotel_Reservations_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

