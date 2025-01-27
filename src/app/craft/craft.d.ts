export type CraftState = "materialsWon" | "crafting" | "reward";

export type CraftMaterial = {
  rarity: "common" | "uncommon" | "rare" | "legendary" | "mythic";
  quantity: number;
  icon: string;
};

export type NFTCraftMaterial = {
  tokenId: string;
  nftIcon: string;
  materials: CraftMaterial[];
};
