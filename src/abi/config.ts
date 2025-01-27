import { abstractTestnet } from "viem/chains";

type Address = `0x${string}`;

interface ContractAddresses {
  nft: Record<number, Address>;
  staking: Record<number, Address>;
  payMaster: Record<number, Address>;
}

export const CONTRACTS: ContractAddresses = {
  nft: {
    [abstractTestnet.id]: "0x8c85541F0fba33077B4bba3FF59E677ED1584BA3",
  },
  staking: {
    [abstractTestnet.id]: "0xc7EA500a11e2491D1217EDe3C6F3931F699c5716",
  },
  payMaster: {
    // [abstractTestnet.id]: "0x62aff60940841bBe7261dc6C4bb873F6f91fFdb3",
    [abstractTestnet.id]: "0x5407B5040dec3D339A9247f3654E59EEccbb6391",
  },
};
