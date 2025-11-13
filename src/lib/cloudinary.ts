import { v2 as cloudinary } from "cloudinary";

const {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

if (!NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set in environment variables.");
}

if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error("CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET is missing in environment variables.");
}

const cloudName = NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = CLOUDINARY_API_KEY;
const cloudinaryApiSecret = CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
  secure: true,
});

export type CloudinaryTransformOptions = {
  width?: number;
  height?: number;
  quality?: number | "auto";
  crop?: "fill" | "scale" | "fit" | "thumb" | "limit";
  gravity?: string;
  format?: string;
};

export function getCloudinaryUrl(publicId: string, options: CloudinaryTransformOptions = {}) {
  return cloudinary.url(publicId, {
    transformation: [
      {
        fetch_format: options.format ?? "auto",
        quality: options.quality ?? "auto",
        crop: options.crop ?? "fill",
        gravity: options.gravity ?? "auto",
        width: options.width,
        height: options.height,
      },
    ],
    secure: true,
  });
}

export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // Allow full URLs (e.g., direct Cloudinary URLs) to pass through untouched.
  if (src.startsWith("http")) {
    return src;
  }

  return getCloudinaryUrl(src, {
    width,
    quality: quality ?? "auto",
    crop: "fill",
    gravity: "auto",
  });
}

export function createUploadSignature({
  folder,
  publicId,
  timestamp = Math.round(Date.now() / 1000),
  eager,
}: {
  folder?: string;
  publicId?: string;
  timestamp?: number;
  eager?: string;
}) {
  const params: Record<string, string | number | undefined> = {
    timestamp,
    folder,
    public_id: publicId,
    eager,
  };

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ""),
  );

  const signature = cloudinary.utils.api_sign_request(filteredParams, cloudinaryApiSecret);

  return {
    signature,
    timestamp,
    apiKey: cloudinaryApiKey,
    cloudName,
    params: filteredParams,
  };
}

export { cloudinary };
