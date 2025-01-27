import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const shippingDetails: ShippingDetails = await request.json();
    return NextResponse.json({
      status: "success",
      message: "Shipping details added successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 },
    );
  }
}
