// import { MaterialType, RewardRarity } from "./types";

// Types remain the same
interface Materials {
  common: number;
  uncommon: number;
  rare: number;
  legendary: number;
  mythic: number;
}

interface ShippingDetails {
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  province: string;
  postalCode: string;
  optional: string;
  rewardId: string;
}

interface Reward {
  rewardId: string;
  rewardImageUrl: string;
  rewardName: string;
  dateTime: number;
  rewardRarity: string;
}

// Helper function remains the same
function calculateMaterials(stakingTimeInSecs: number): Materials {
  const hours = stakingTimeInSecs / 3600;
  let probabilities;

  if (hours <= 24) {
    probabilities = {
      common: 70,
      uncommon: 20,
      rare: 7,
      legendary: 2.5,
      mythic: 0.5,
    };
  } else if (hours <= 48) {
    probabilities = {
      common: 60,
      uncommon: 25,
      rare: 10,
      legendary: 4,
      mythic: 1,
    };
  } else if (hours <= 72) {
    probabilities = {
      common: 50,
      uncommon: 30,
      rare: 13,
      legendary: 5.5,
      mythic: 1.5,
    };
  } else {
    probabilities = {
      common: 40,
      uncommon: 35,
      rare: 15,
      legendary: 7,
      mythic: 3,
    };
  }

  // Generate random materials based on probabilities
  const materials: Materials = {
    common: Math.floor(Math.random() * 3),
    uncommon: Math.floor(Math.random() * 2),
    rare: Math.floor(Math.random() * 2),
    legendary: Math.floor(Math.random()),
    mythic: Math.floor(Math.random()),
  };

  return materials;
}

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const server = Bun.serve({
  port: 8000,
  async fetch(req) {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    const url = new URL(req.url);

    try {
      // Handle different routes
      if (req.method === "POST" && url.pathname === "/unstaking") {
        const body = await req.json();
        const { address, tokenId, stakingTimeInSecs } = body;
        const materials = calculateMaterials(stakingTimeInSecs);

        return Response.json(
          { status: "success", materials },
          { headers: corsHeaders },
        );
      }

      if (req.method === "GET" && url.pathname.startsWith("/userMaterials")) {
        const materials: Materials = {
          common: 10,
          uncommon: 5,
          rare: 3,
          legendary: 1,
          mythic: 0,
        };

        return Response.json(
          { status: "success", materials },
          { headers: corsHeaders },
        );
      }

      if (req.method === "POST" && url.pathname === "/reward") {
        const body = await req.json();

        return Response.json(
          {
            status: "success",
            message: "Rewards added successfully",
            data: {
              rewardImageUrl: "https://example.com/reward.png",
              rewardName: "NFT IP Pack",
            },
          },
          { headers: corsHeaders },
        );
      }

      if (req.method === "GET" && url.pathname.startsWith("/userRewards")) {
        const mockRewards: Reward[] = [
          {
            rewardId: "1",
            rewardImageUrl: "https://example.com/reward.png",
            rewardName: "NFT IP Pack",
            dateTime: Date.now(),
            rewardRarity: "rare",
          },
        ];

        return Response.json(
          {
            status: "success",
            data: [
              {
                rewardsList: mockRewards,
              },
            ],
          },
          { headers: corsHeaders },
        );
      }

      if (req.method === "POST" && url.pathname === "/shipping") {
        const shippingDetails: ShippingDetails = await req.json();

        return Response.json(
          {
            status: "success",
            message: "Shipping details added successfully",
          },
          { headers: corsHeaders },
        );
      }

      // Handle 404
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    } catch (error) {
      // Handle errors
      return Response.json(
        {
          status: "error",
          message: (error as Error).message,
        },
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }
  },
});

console.log(`🦊 Server is running at http://localhost:${server.port}`);
