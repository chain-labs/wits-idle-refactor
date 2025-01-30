import { NextRequest, NextResponse } from "next/server";
import sha1 from "sha1";
import { Materials } from "../../types";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ address: string }> },
) {
  const { address } = await params;

  const hash = sha1(address ?? "0x");
  const hashNum = parseInt(hash.substring(0, 8), 16);

  // Adjust material quantities based on hash
  const multiplier = (hashNum % 5) + 1; // 1 to 5
  const divisor = ((hashNum >> 8) % 3) + 2; // 2 to 4

  // Now use multiplier and divisor to modify the material quantities in
  // the used, unused, and progress objects below

  const used: Materials = {
    common: 5 * multiplier,
    uncommon: 2 * multiplier,
    rare: 1 * multiplier,
    legendary: 0,
    mythic: 0,
  };
  const unused: Materials = {
    common: 10 * divisor,
    uncommon: 5 * divisor,
    rare: 2 * divisor,
    legendary: 0,
    mythic: 0,
  };
  const progress: Materials = {
    common: 2 * divisor,
    uncommon: 1 * divisor,
    rare: 0,
    legendary: 0,
    mythic: 0,
  };

  return NextResponse.json({
    status: "success",
    materials: { used, unused, progress },
  });
}
