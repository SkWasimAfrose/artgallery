import type { Gallery, Booking, Settings } from "@/types";

export const mockGalleries: Gallery[] = [
  {
    slug: "royal-jaipur-palace",
    title: "Royal Jaipur Palace",
    description: "A couture celebration across candlelit soirées and palace reveilles.",
    heroImage: {
      publicId: "photography/gallery_jaipur_hero",
      url: "https://res.cloudinary.com/bae2g/image/upload/f_auto,q_auto,w_1600,c_fill,g_auto:subject/v1763239276/jaipur_yuuwwc.webp",
      width: 1600,
      height: 900,
      alt: "Royal Jaipur Palace wedding reception",
      dominantColor: "#2a1f1a",
    },
    images: [
      {
        publicId: "photography/gallery_jaipur_detail_1",
        url: "https://res.cloudinary.com/bae2g/image/upload/f_auto,q_auto,w_1600/v1763188284/IMG_20240126_154919_598_d9uvxc.jpg",
        width: 1600,
        height: 900,
      },
      {
        publicId: "photography/gallery_jaipur_detail_2",
        url: "https://res.cloudinary.com/bae2g/image/upload/f_auto,q_auto,w_1600/v1763188284/IMG_20240126_175137_171_pqtfhe.jpg",
        width: 1600,
        height: 900,
      },
    ],
    categories: ["wedding", "destination"],
    eventDate: new Date("2024-02-11"),
    location: "Jaipur, India",
    featured: true,
  },
  {
    slug: "maldives-sunrise-vows",
    title: "Maldives Sunrise Vows",
    description: "An intimate beachfront elopement with sail-away brunch and champagne wishes.",
    heroImage: {
      publicId: "photography/gallery_maldives_hero",
      url: "https://res.cloudinary.com/bae2g/image/upload/f_auto,q_auto,w_1600,c_fill,g_auto:subject/v1763239354/Maldives_nwmsox.webp",
      width: 1600,
      height: 900,
      alt: "Couple kissing during Maldives sunrise vows",
      dominantColor: "#0d1a24",
    },
    images: [],
    categories: ["elopement", "destination"],
    eventDate: new Date("2023-11-05"),
    location: "Maldives",
    featured: true,
  },
];

export const mockSettings: Settings = {
  heroTagline: "Cinematic storytelling for the modern romantic.",
  heroDescription:
    "From opulent palace weddings to windswept elopements, Lumina Atelier crafts heirloom imagery across the globe.",
  servicesCopy:
    "Our concierge team curates bespoke coverage, film production, and fine-art albums tailored to your celebrations.",
  testimonials: [
    {
      quote: "They preserved the laughter, the tears, and every whispered promise.",
      name: "Ishita & Vihaan",
      location: "Udaipur, India",
    },
    {
      quote: "The cinematic film had our families in tears — pure luxury throughout.",
      name: "Nadia & Omar",
      location: "Doha, Qatar",
    },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/skwasimafrose" },
    { label: "YouTube", href: "https://youtube.com/@skwasimafrose" },
  ],
};

export const mockBookings: Booking[] = [
  {
    coupleName: "Aanya & Raj",
    email: "aanya.raj@example.com",
    phone: "+911234567890",
    eventDate: new Date("2025-01-15"),
    eventLocation: "Lake Como, Italy",
    servicesInterested: ["Signature Wedding Weekend", "Cinematic Film"],
    message: "We are planning a three-day Italian celebration and would love full coverage.",
    status: "new",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function delay<T>(ms: number, value: T) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getMockGalleries() {
  return delay(120, mockGalleries);
}

export async function getMockSettings() {
  return delay(80, mockSettings);
}

export async function getMockBookings() {
  return delay(100, mockBookings);
}

export async function addMockBooking(booking: Booking) {
  mockBookings.unshift({ ...booking, createdAt: new Date(), updatedAt: new Date() });
  return delay(60, mockBookings[0]);
}

export async function updateMockBookingStatus(id: string, status: Booking["status"]) {
  const booking = mockBookings.find((item) => item.email === id);

  if (!booking) {
    return null;
  }

  booking.status = status;
  booking.updatedAt = new Date();

  return delay(50, booking);
}
