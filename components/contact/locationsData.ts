export interface LocationBranch {
  id: string;
  city: string;
  hotelTitle: string;
  badge: string;
  badgeType: "main" | "second" | "metro";
  description: string;
  addressShort: string[];
  addressFull: string;
  mobile: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
  directionsUrl: string;
}

export const BRANCH_LOCATIONS: LocationBranch[] = [
  {
    id: "puducherry",
    city: "Puducherry",
    hotelTitle: "Le Prestige Residency",
    badge: "MAIN BRANCH",
    badgeType: "main",
    description:
      "Our flagship property on Villianur Main Road — the original Le Prestige experience, in the heart of Puducherry.",
    addressShort: [
      "Villianur Main Road",
      "Kamban Nagar",
      "Reddiarpalayam",
      "Puducherry - 605010",
    ],
    addressFull:
      "TRENDS Building, Villianur Main Road, Kamban Nagar, Reddiarpalayam, Puducherry - 605010",
    mobile: "+91 96777 51329",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=TRENDS+Building+Villianur+Main+Road+Kamban+Nagar+Reddiarpalayam+Puducherry+605010&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl:
      "https://maps.google.com/?q=TRENDS+Building,+Villianur+Main+Road,+Kamban+Nagar,+Reddiarpalayam,+Puducherry+605010",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=TRENDS+Building,+Villianur+Main+Road,+Kamban+Nagar,+Reddiarpalayam,+Puducherry+605010",
  },
  {
    id: "tindivanam",
    city: "Tindivanam",
    hotelTitle: "Le Prestige Residency",
    badge: "SECOND BRANCH",
    badgeType: "second",
    description:
      "Our second branch in Tindivanam — delivering the same quiet luxury and premium stay experience.",
    addressShort: [
      "No. 15/1B, Indhra Nagar",
      "Marakanam Road",
      "Tindivanam, Villupuram",
      "Tamil Nadu - 604001",
    ],
    addressFull:
      "No. 15/1B, Indhra Nagar, Marakanam Road, Tindivanam, Villupuram, Tamil Nadu - 604001",
    mobile: "+91 72006 51329",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Marakanam+Road+Tindivanam+Villupuram+Tamil+Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl:
      "https://maps.google.com/?q=No.+15/1B,+Indhra+Nagar,+Marakanam+Road,+Tindivanam,+Villupuram,+Tamil+Nadu",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=No.+15/1B,+Indhra+Nagar,+Marakanam+Road,+Tindivanam,+Villupuram,+Tamil+Nadu",
  },
  {
    id: "chennai",
    city: "Chennai",
    hotelTitle: "BR Vasantham Grand",
    badge: "FLAGSHIP METRO",
    badgeType: "metro",
    description:
      "Our premier luxury sanctuary on Anna Salai & ECR Beachfront, offering authentic heritage hospitality.",
    addressShort: [
      "Anna Salai (Mount Road)",
      "ECR Beachfront",
      "Chennai",
      "Tamil Nadu - 600002",
    ],
    addressFull:
      "Anna Salai (Mount Road) & ECR Beachfront, Chennai, Tamil Nadu - 600002",
    mobile: "+91 94440 12345",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Anna+Salai+Chennai+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl:
      "https://maps.google.com/?q=Anna+Salai+Chennai+Tamil+Nadu",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Anna+Salai+Chennai+Tamil+Nadu",
  },
];
