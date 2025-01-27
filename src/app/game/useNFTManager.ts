"use client";

import { useState, useEffect } from "react";
import { useGQLFetch } from "@/hooks/api/useGraphQLClient";
import { GET_USER_NFTS } from "@/graphql/queries";
import { NFTData, StakedNFT } from "./game";
import { IMAGEKIT_IMAGES } from "@/images";
import { NFTUserDataGQL } from "@/graphql/queryTypes";

export const useNFTManager = (account: `0x${string}` | undefined) => {
  const [ownedNfts, setOwnedNfts] = useState<NFTData[]>([]);
  const [stakedNfts, setStakedNfts] = useState<StakedNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(true);

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

  useEffect(() => {
    if (userData) {
      console.log("account", account);

      const user = userData?.users?.items[0];
      const owned =
        user?.ownedNfts?.items?.map((token) => ({
          icon: IMAGEKIT_IMAGES.NFT_ICON,
          tokenId: token.nftTokenId,
        })) ?? [];
      const stakes =
        user?.stakes?.items
          ?.filter((token) => !token.unstakeTxId)
          .map((token) => ({
            stakeId: BigInt(token.contractStakeId),
            icon: IMAGEKIT_IMAGES.NFT_ICON,
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
  }, [userData, isFetched]);

  return {
    ownedNfts,
    stakedNfts,
    loading,
    setStakedNfts,
    refetch,
  };
};
