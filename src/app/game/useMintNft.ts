"use client";

import useNFTs from "@/abi/Nfts";
import usePayMaster from "@/abi/PayMaster";
import { useGQLFetch } from "@/hooks/api/useGraphQLClient";
import { useWriteContractSponsored } from "@abstract-foundation/agw-react";
import { gql } from "graphql-request";
import { useCallback, useEffect } from "react";
import { getGeneralPaymasterInput } from "viem/zksync";
import { useAccount } from "wagmi";
import { useGameContext } from "./GameContext";
import useSessionKeyState from "@/hooks/useSessionKey";
import { abstractTestnet } from "viem/chains";

const useMintNft = () => {
  const { session } = useSessionKeyState();
  const nftContract = useNFTs();
  const paymaster = usePayMaster();
  const { setButtonLoading } = useGameContext();

  const { data: nft } = useGQLFetch<{
    nftOwnerships: {
      items: {
        id: string;
        nftTokenId: string;
      }[];
    };
  }>(
    ["nft"],
    gql`
      query MyQuery {
        nftOwnerships(orderBy: "nftTokenId", orderDirection: "desc", limit: 4) {
          items {
            id
            nftTokenId
          }
        }
      }
    `,
    {},
  );

  const mintNFT = useCallback(
    async (refechNfts: () => void) => {
      if (!session) return;
      const id = Number(nft?.nftOwnerships.items[3].nftTokenId) + 1;
      try {
        await session?.writeContract({
          abi: nftContract.abi as any,
          address: nftContract.address as `0x${string}`,
          account: session.account,
          chain: abstractTestnet,
          functionName: "mint",
          args: [BigInt(id)],
          paymaster: paymaster.address as `0x${string}`,
          paymasterInput: getGeneralPaymasterInput({
            innerInput: "0x",
          }),
        });
      } catch (e) {
        console.error("Minting NFT error:", e);
      } finally {
        refechNfts();
        setButtonLoading(false);
      }
    },
    [nftContract, paymaster, nft, session],
  );

  return { mintNFT };
};

export default useMintNft;
