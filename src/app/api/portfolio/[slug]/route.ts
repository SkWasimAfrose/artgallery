import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import GalleryModel from "@/models/gallery";
import { mockGalleries } from "@/data/mock-data";

function serializeGallery(gallery: any) {
  return {
    ...gallery,
    _id: gallery._id?.toString(),
    createdAt: gallery.createdAt?.toISOString(),
    updatedAt: gallery.updatedAt?.toISOString(),
  };
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;

  try {
    await connectToDatabase();

    const galleryDoc = await GalleryModel.findOne({ slug }).lean().exec();

    if (!galleryDoc) {
      return NextResponse.json({ error: "Gallery not found." }, { status: 404 });
    }

    return NextResponse.json({ data: serializeGallery(galleryDoc) });
  } catch (error) {
    console.error("Failed to fetch gallery from MongoDB", error);

    const fallback = mockGalleries.find((gallery) => gallery.slug === slug);

    if (!fallback) {
      return NextResponse.json({ error: "Gallery not found." }, { status: 404 });
    }

    return NextResponse.json({ data: fallback, fallback: true });
  }
}
