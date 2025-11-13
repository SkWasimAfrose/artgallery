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
    "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,w_1600/v1728900000/photography/hero_couple.jpg",
  contactEmail: "hello@luminaatelier.com",
  studioPhone: "+919876543210",
  whatsappNumber: "+919876543210",
  address: {
    street: "17 Altamount Road",
    city: "Mumbai",
    region: "Maharashtra",
    postalCode: "400026",
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
    { label: "Instagram", href: "https://instagram.com/lumina.atelier" },
    { label: "YouTube", href: "https://youtube.com/@luminaatelier" },
    { label: "Pinterest", href: "https://pinterest.com/luminaatelier" },
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
