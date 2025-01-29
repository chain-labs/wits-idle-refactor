import { abstractTestnet, abstract } from "viem/chains";

interface IContract {
  address?: `0x${string}`;
  abi?: object[];
}

import abi from "./abi.json";
import { CONTRACTS } from "../config";
import { zeroAddress } from "viem";
import { useEffect, useState } from "react";
import { envVars } from "@/envVars";

const useNFTs = () => {
  const [contract, setContract] = useState<IContract>({
    abi: [],
    address: zeroAddress,
  });

  useEffect(() => {
    const chainId = envVars.TEST_NETWORK ? abstractTestnet.id : abstract.id;
    const address = CONTRACTS.nft[chainId];
    if (address) {
      setContract({ address, abi });
    }
  }, []);

  return contract;
};

export default useNFTs;
