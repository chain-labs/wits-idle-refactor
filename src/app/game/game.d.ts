export type StakeTimePeriod = {
  time: string;
  common: number;
  uncommon: number;
  rare: number;
  legendary: number;
  mythic: number;
  secs: number;
};

export type GameState =
  | "selectNFT"
  | "sendingNFTsToAdventure"
  | "adventureInProgress";

export type NFTData = {
  icon: string;
  tokenId: string;
};

export type StakedNFT = NFTData & {
  endTime: string;
  stakeId: bigint;
  duration: string;
};
