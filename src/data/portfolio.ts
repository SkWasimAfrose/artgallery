import { connectToDatabase } from "@/lib/mongodb";
import GalleryModel from "@/models/gallery";
import { mockGalleries } from "@/data/mock-data";
import type { Gallery } from "@/types";

function normalizeGallery(doc: any): Gallery {
  return {
    ...doc,
    eventDate: doc.eventDate ? new Date(doc.eventDate) : undefined,
    createdAt: doc.createdAt ? new Date(doc.createdAt) : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : undefined,
  };
}

export async function fetchGalleries({
  featuredOnly = false,
}: { featuredOnly?: boolean } = {}): Promise<Gallery[]> {
  try {
    await connectToDatabase();

    const query = featuredOnly ? { featured: true } : {};
    const galleries = await GalleryModel.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .lean()
      .exec();

    return galleries.map(normalizeGallery);
  } catch (error) {
    console.error("Falling back to mock galleries", error);
    return featuredOnly
      ? mockGalleries.filter((gallery) => gallery.featured)
      : mockGalleries;
  }
}

export async function fetchGalleryBySlug(slug: string): Promise<Gallery | null> {
  try {
    await connectToDatabase();

    const gallery = await GalleryModel.findOne({ slug }).lean().exec();
    return gallery ? normalizeGallery(gallery) : null;
  } catch (error) {
    console.error(`Falling back to mock gallery for slug ${slug}`, error);
    return mockGalleries.find((gallery) => gallery.slug === slug) ?? null;
  }
}
