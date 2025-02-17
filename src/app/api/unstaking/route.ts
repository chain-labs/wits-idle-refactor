import { NextResponse } from "next/server";
import { calculateMaterials } from "../calculate";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address, tokenId, stakingTimeInSecs } = body;
    const materials = calculateMaterials(stakingTimeInSecs, tokenId, address);

    return NextResponse.json({ status: "success", materials });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 },
    );
  }
}
