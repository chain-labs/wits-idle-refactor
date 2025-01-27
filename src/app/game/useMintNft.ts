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

const useMintNft = () => {
  const nftContract = useNFTs();
  const paymaster = usePayMaster();
  const account = useAccount();
  const { setButtonLoading } = useGameContext();
  const { writeContractSponsoredAsync: mintNFTWrite } =
    useWriteContractSponsored();

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
      const id = Number(nft?.nftOwnerships.items[3].nftTokenId) + 1;
      try {
        await mintNFTWrite({
          abi: nftContract.abi as any,
          address: nftContract.address as `0x${string}`,
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
    [mintNFTWrite, nftContract, paymaster, nft],
  );

  return { mintNFT };
};

export default useMintNft;
