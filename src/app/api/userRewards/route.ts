import { NextResponse } from "next/server";

export async function GET() {
  const mockRewards: Reward[] = [
    {
      rewardId: "1",
      rewardImageUrl:
        "https://www.apple.com/newsroom/images/product/iphone/geo/apple_iphone-12_new-design_geo_10132020_big.jpg.large.jpg",
      rewardName: "NFT IP Pack",
      dateTimeInSecs: Date.now(),
      rewardRarity: "rare",
    },
  ];

  return NextResponse.json({
    status: "success",
    data: { rewardsList: mockRewards },
  });
}
