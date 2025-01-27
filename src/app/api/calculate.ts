import { Materials } from "./types";

export function calculateMaterials(stakingTimeInSecs: number): Materials {
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

  return {
    common: Math.floor(Math.random() * 3),
    uncommon: Math.floor(Math.random() * 2),
    rare: Math.floor(Math.random() * 2),
    legendary: Math.floor(Math.random()),
    mythic: Math.floor(Math.random()),
  };
}
