import { StakeTimePeriod } from "./game";

export const LOCKING_NFT_TIME_PERIODS: StakeTimePeriod[] = [
  {
    time: "1 HOUR",
    common: 0,
    uncommon: 0,
    rare: 0,
    legendary: 0,
    mythic: 0,
    secs: 3600,
  },
  {
    time: "24 HOURS",
    common: 70,
    uncommon: 20,
    rare: 7,
    legendary: 2.5,
    mythic: 0.5,
    secs: 86400,
  },
  {
    time: "48 HOURS",
    common: 60,
    uncommon: 25,
    rare: 10,
    legendary: 4,
    mythic: 1,
    secs: 172800,
  },
  {
    time: "72 HOURS",
    common: 50,
    uncommon: 30,
    rare: 13,
    legendary: 5.5,
    mythic: 1.5,
    secs: 259200,
  },
  {
    time: "1 WEEK",
    common: 40,
    uncommon: 35,
    rare: 15,
    legendary: 7,
    mythic: 3,
    secs: 604800,
  },
];
