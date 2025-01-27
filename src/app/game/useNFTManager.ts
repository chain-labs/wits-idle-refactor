"use client";

import { useState, useEffect } from "react";
import { useGQLFetch } from "@/hooks/api/useGraphQLClient";
import { GET_USER_NFTS } from "@/graphql/queries";
import { NFTData, StakedNFT } from "./game";
import { IMAGEKIT_IMAGES } from "@/images";
import { NFTUserDataGQL } from "@/graphql/queryTypes";
import { multicall } from "viem/actions";
import useNFTs from "@/abi/Nfts";
import { abstractTestnet } from "viem/chains";
import { createPublicClient, http } from "viem";

export const useNFTManager = (account: `0x${string}` | undefined) => {
  const [ownedNfts, setOwnedNfts] = useState<NFTData[]>([]);
  const [stakedNfts, setStakedNfts] = useState<StakedNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(true);
  const nftContract = useNFTs();

  const {
    data: userData,
    refetch: refetchData,
    isFetching,
    isFetched,
    isRefetching,
  } = useGQLFetch<NFTUserDataGQL>(
    ["userData"],
    GET_USER_NFTS,
    {
      address: account?.toLowerCase() ?? "",
    },
    { enabled: !!account && trigger },
  );

  const refetch = () => {
    refetchData();
    console.log("refetching");
    setTrigger(true);
  };

  async function fetchURLData(
    tokenIDS: string[],
    tokenAddresses: `0x${string}`[],
  ): Promise<Record<string, string> | undefined> {
    if (account) {
      const client = createPublicClient({
        chain: abstractTestnet,
        transport: http("https://api.testnet.abs.xyz"),
      });

      const response = await multicall(client, {
        contracts: tokenIDS.map((tokenID, idx) => ({
          address: tokenAddresses[idx] as `0x${string}`,
          abi: nftContract.abi as any[],
          functionName: "tokenURI",
          args: [tokenID],
        })),
      });

      console.log("response", response);

      return response.reduce(
        (acc, { result }, index) => ({
          ...acc,
          [tokenIDS[index]]: result,
        }),
        {},
      );
    }
  }

  useEffect(() => {
    (async () => {
      if (userData) {
        console.log("account", account);

        const tokenIDS = [
          ...userData?.users?.items[0]?.ownedNfts?.items?.map(
            (token) => token.nftTokenId,
          ),
          ...userData?.users?.items[0]?.stakes?.items
            ?.filter((token) => !token.unstakeTxId)
            .map((token) => token.nft.tokenId),
        ];

        const tokenAddresses = [
          ...userData?.users?.items[0]?.ownedNfts?.items?.map(
            (token) => token.nftContractAddress as `0x${string}`,
          ),
          ...userData?.users?.items[0]?.stakes?.items
            ?.filter((token) => !token.unstakeTxId)
            .map((token) => token.nftContract.contract as `0x${string}`),
        ];

        const tokenURIs = (await fetchURLData(tokenIDS, tokenAddresses)) ?? {};

        const user = userData?.users?.items[0];
        const owned =
          user?.ownedNfts?.items?.map((token) => ({
            icon: !!tokenURIs[token.nftTokenId]
              ? tokenURIs[token.nftTokenId]
              : IMAGEKIT_IMAGES.NFT_ICON,
            tokenId: token.nftTokenId,
          })) ?? [];
        const stakes =
          user?.stakes?.items
            ?.filter((token) => !token.unstakeTxId)
            .map((token) => ({
              stakeId: BigInt(token.contractStakeId),
              icon: !!tokenURIs[token.nft.tokenId]
                ? tokenURIs[token.nft.tokenId]
                : IMAGEKIT_IMAGES.NFT_ICON,
              endTime: token.endTime,
              tokenId: token.nft.tokenId,
            })) ?? [];

        console.log("userData", user);
        console.log("owned", owned);
        console.log("stakes", stakes);

        setOwnedNfts(owned);
        setStakedNfts(stakes);
        setLoading(false);
        setTrigger(false);
      }
    })();
  }, [userData, isFetched]);

  return {
    ownedNfts,
    stakedNfts,
    loading,
    setStakedNfts,
    refetch,
  };
};
