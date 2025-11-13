import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BookingModel from "@/models/booking";
import { getMockBookings, updateMockBookingStatus } from "@/data/mock-data";

const { ADMIN_SECRET } = process.env;

if (!ADMIN_SECRET) {
  throw new Error("ADMIN_SECRET is not defined in environment variables.");
}

function isAuthorized(request: Request) {
  const headerSecret = request.headers.get("x-admin-secret");
  const bearerSecret = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return headerSecret === ADMIN_SECRET || bearerSecret === ADMIN_SECRET;
}

function serializeBooking(booking: any) {
  return {
    ...booking,
    _id: booking._id?.toString(),
    createdAt: booking.createdAt?.toISOString(),
    updatedAt: booking.updatedAt?.toISOString(),
  };
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const bookings = await BookingModel.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json({ data: bookings.map(serializeBooking) });
  } catch (error) {
    console.error("Failed to fetch bookings from MongoDB", error);

    const fallback = await getMockBookings();

    return NextResponse.json({ data: fallback, fallback: true }, { status: 200 });
  }
}

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);

  if (!json) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const { id, status } = json as { id?: string; status?: string };

  if (!id || !status) {
    return NextResponse.json({ error: "id and status are required." }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const booking = await BookingModel.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true },
    )
      .lean()
      .exec();

    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ data: serializeBooking(booking) });
  } catch (error) {
    console.error("Failed to update booking status, falling back to mock store.", error);

    const mockBooking = await updateMockBookingStatus(id, status as any);

    if (!mockBooking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ data: mockBooking, fallback: true });
  }
}
