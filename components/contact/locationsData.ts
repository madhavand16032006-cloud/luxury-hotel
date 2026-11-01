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
    city: "Pondicherry",
    hotelTitle: "Luxury Hotel",
    badge: "MAIN BRANCH",
    badgeType: "main",
    description:
      "Our premier sanctuary in Pondicherry, offering quiet luxury and personalized hospitality.",
    addressShort: [
      "ABC Address",
      "Pondicherry",
    ],
    addressFull: "ABC Address, Pondicherry",
    mobile: "+91 1234567890",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Pondicherry&t=&z=14&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl:
      "https://maps.google.com/?q=Pondicherry",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Pondicherry",
  },
  {
    id: "tindivanam",
    city: "Tindivanam",
    hotelTitle: "Luxury Hotel",
    badge: "SECOND BRANCH",
    badgeType: "second",
    description:
      "Our second branch in Tindivanam — delivering authentic culinary excellence and premium suites.",
    addressShort: [
      "ABC Address",
      "Tindivanam",
    ],
    addressFull: "ABC Address, Tindivanam",
    mobile: "+91 1234567890",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Tindivanam&t=&z=14&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl:
      "https://maps.google.com/?q=Tindivanam",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Tindivanam",
  },
  {
    id: "chennai",
    city: "Chennai",
    hotelTitle: "Luxury Hotel",
    badge: "FLAGSHIP METRO",
    badgeType: "metro",
    description:
      "Our flagship metro sanctuary in Chennai, providing palatial suites and executive luxury.",
    addressShort: [
      "XYZ Address",
      "Chennai",
    ],
    addressFull: "XYZ Address, Chennai",
    mobile: "+91 1234567890",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Chennai&t=&z=14&ie=UTF8&iwloc=&output=embed",
    googleMapsUrl:
      "https://maps.google.com/?q=Chennai",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Chennai",
  },
];
