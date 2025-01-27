import { NextResponse } from 'next/server';

export async function GET() {
  const used: Materials = {
    common: 10, uncommon: 5, rare: 3, legendary: 1, mythic: 0
  };
  const unused: Materials = {
    common: 4, uncommon: 3, rare: 2, legendary: 1, mythic: 1
  };
  const progress: Materials = {
    common: 5, uncommon: 2, rare: 1, legendary: 0, mythic: 0
  };

  return NextResponse.json({
    status: "success",
    materials: { used, unused, progress }
  });
}