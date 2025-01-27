import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      status: "success",
      message: "Rewards added successfully",
      data: {
        rewardImageUrl: "https://example.com/reward.png",
        rewardName: "NFT IP Pack"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 }
    );
  }
}