export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Lumina Atelier",
  title: "Cinematic Wedding & Event Photography | Lumina Atelier",
  description:
    "Premium wedding and event photography with cinematic storytelling, luxe albums, and concierge-level service across India.",
  url: "https://lumina-atelier.example.com",
  ogImage:
    "https://res.cloudinary.com/bae2g/image/upload/f_auto,q_auto,c_fill,w_1600/v1763232902/a3e4fbea4e1dd46e2a19ad7111cc7de0_vccgr8.jpg",
  contactEmail: "wasimafrose2020@gmail.com",
  studioPhone: "+918101389536",
  whatsappNumber: "+918101389536",
  address: {
    street: "17 Altamount Road",
    city: "Kolkata",
    region: "West Bengal",
    postalCode: "700001",
    country: "IN",
  },
  nav: [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Booking", href: "/booking" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
  social: [
    { label: "Instagram", href: "https://instagram.com/skwasimafrose" },
    { label: "YouTube", href: "https://youtube.com/@skwasimafrose" },
    { label: "Pinterest", href: "https://pinterest.com/skwasimafrose" },
  ] as SocialLink[],
  keywords: [
    "wedding photographer",
    "luxury photography",
    "destination weddings",
    "event photographer",
    "cinematic photography",
  ],
};

export const photographerSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  image: siteConfig.ogImage,
  url: siteConfig.url,
  telephone: siteConfig.studioPhone,
  email: siteConfig.contactEmail,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  sameAs: siteConfig.social.map((item) => item.href),
  priceRange: "₹₹₹",
  description: siteConfig.description,
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};
