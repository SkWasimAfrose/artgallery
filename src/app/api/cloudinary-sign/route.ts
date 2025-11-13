import { NextResponse } from "next/server";
import { createUploadSignature } from "@/lib/cloudinary";

const { ADMIN_SECRET } = process.env;

if (!ADMIN_SECRET) {
  throw new Error("ADMIN_SECRET is not defined in environment variables.");
}

function isAuthorized(request: Request) {
  const headerSecret = request.headers.get("x-admin-secret");
  const bearerSecret = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return headerSecret === ADMIN_SECRET || bearerSecret === ADMIN_SECRET;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);

  if (!json) {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const { folder, publicId, eager, timestamp } = json as {
    folder?: string;
    publicId?: string;
    eager?: string;
    timestamp?: number;
  };

  try {
    const signature = createUploadSignature({ folder, publicId, eager, timestamp });
    return NextResponse.json({ data: signature });
  } catch (error) {
    console.error("Failed to generate Cloudinary signature", error);
    return NextResponse.json({ error: "Unable to generate signature." }, { status: 500 });
  }
}
