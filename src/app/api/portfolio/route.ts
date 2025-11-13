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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const featuredParam = url.searchParams.get("featured");
  const onlyFeatured = featuredParam === "true";

  try {
    await connectToDatabase();

    const query = onlyFeatured ? { featured: true } : {};
    const galleries = await GalleryModel.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json({
      data: galleries.map(serializeGallery),
    });
  } catch (error) {
    console.error("Failed to fetch galleries from MongoDB", error);

    const fallback = onlyFeatured
      ? mockGalleries.filter((gallery) => gallery.featured)
      : mockGalleries;

    return NextResponse.json(
      {
        data: fallback,
        fallback: true,
      },
      { status: 200 },
    );
  }
}
