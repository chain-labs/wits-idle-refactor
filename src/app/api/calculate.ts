import { Materials } from "./types";
import sha1 from "sha1";

export function calculateMaterials(
  stakingTimeInSecs: number,
  tokenId: string,
  address: `0x${string}`,
): Materials {
  const hours = stakingTimeInSecs / 3600;
  let probabilities;
  const uniqueId = sha1(`${address}-${tokenId}-${stakingTimeInSecs}`);

  if (hours <= 1) {
    probabilities = {
      common: 90,
      uncommon: 5,
      rare: 3,
      legendary: 1,
      mythic: 1,
    };
  } else if (hours <= 24) {
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

  // Convert uniqueId to a number sequence for consistent randomization
  const hash = BigInt(`0x${uniqueId}`);
  const rand = Number(hash % BigInt(10000)) / 400; // Get a number between 0-100

  // Determine materials based on probability thresholds
  return {
    common: Math.floor((rand / 100) * probabilities.common),
    uncommon: Math.floor((rand / 100) * probabilities.uncommon),
    rare: Math.floor((rand / 100) * probabilities.rare),
    legendary: Math.floor((rand / 100) * probabilities.legendary),
    mythic: Math.floor((rand / 100) * probabilities.mythic),
  };
}
