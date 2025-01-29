"use client";

import useNFTs from "@/abi/Nfts";
import usePayMaster from "@/abi/PayMaster";
import { useGQLFetch } from "@/hooks/api/useGraphQLClient";
import { useWriteContractSponsored } from "@abstract-foundation/agw-react";
import { gql } from "graphql-request";
import { useCallback, useEffect } from "react";
import { getGeneralPaymasterInput } from "viem/zksync";
import { useAccount, useCall } from "wagmi";
import { useGameContext } from "./GameContext";
import useSessionKeyState from "@/hooks/useSessionKey";
import { abstract, abstractTestnet } from "viem/chains";
import { envVars } from "@/envVars";
import { useNFTManager } from "./useNFTManager";

const useMintNft = ({
  optimisticNFTAdd,
}: {
  optimisticNFTAdd: (tokenId: string) => void;
}) => {
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

  const mintNFT = envVars.TEST_NETWORK
    ? useCallback(
        async (refechNfts: () => void) => {
          if (!session) return;
          const id = Number(nft?.nftOwnerships.items[3].nftTokenId) + 1;
          try {
            await session?.writeContract({
              abi: nftContract.abi as any,
              address: nftContract.address as `0x${string}`,
              account: session.account,
              chain: envVars.TEST_NETWORK ? abstractTestnet : abstract,
              functionName: "mint",
              args: [BigInt(id)],
              paymaster: paymaster.address as `0x${string}`,
              paymasterInput: getGeneralPaymasterInput({
                innerInput: "0x",
              }),
            });
            optimisticNFTAdd(id.toString());
          } catch (e) {
            console.error("Minting NFT error:", e);
          } finally {
            refechNfts();
            setButtonLoading(false);
          }
        },
        [nftContract, paymaster, nft, session],
      )
    : useCallback(() => {
        window.open(envVars.MINT_URL ?? "", "_blank");
      }, []);

  return { mintNFT };
};

export default useMintNft;
