"use client";

import useNFTs from "@/abi/Nfts";
import usePayMaster from "@/abi/PayMaster";
import { useWriteContractSponsored } from "@abstract-foundation/agw-react";
import { useCallback, useEffect, useState } from "react";
import { getGeneralPaymasterInput } from "viem/zksync";
import { useGameContext } from "./GameContext";
import { LOCKING_NFT_TIME_PERIODS } from "./constants";
import useStaking from "@/abi/Staking";
import { useAccount, useConnectors, useReadContract } from "wagmi";
import ShareAdventure from "@/components/game/ShareAdventure";
import { useNFTManager } from "./useNFTManager";
import { IMAGEKIT_IMAGES } from "@/images";
import useSessionKey from "@/hooks/useSessionKey";
import { SessionClient } from "@abstract-foundation/agw-client/sessions";
import { abstractTestnet } from "viem/chains";

export default function useSponsoredGame({
  sessionClient,
}: {
  sessionClient: SessionClient | null;
}) {
  const [isApproved, setIsApproved] = useState(false);

  const {
    selectedNFTs,
    selectedTimeline,
    setOpenModal,
    setTimeInSecs,
    setState,
    setButtonLoading,
  } = useGameContext();
  const nftContract = useNFTs();
  const paymaster = usePayMaster();
  const connector = useConnectors();
  const staking = useStaking();
  const account = useAccount();
  const { setStakedNfts, stakedNfts, refetch } = useNFTManager(
    account.address as `0x${string}`,
  );

  const { data: isApprovedForAllData, isFetched: approvalFetched } =
    useReadContract({
      abi: nftContract.abi as [],
      address: nftContract.address as `0x${string}`,
      functionName: "isApprovedForAll",
      account: account.address as `0x${string}`,
      args: [
        account.address as `0x${string}`,
        staking.address as `0x${string}`,
      ],
    });

  useEffect(() => {
    if (approvalFetched) {
      console.log({ isApprovedForAllData, bool: !!isApprovedForAllData });
      setIsApproved(!!isApprovedForAllData);
    }
  }, [isApprovedForAllData, approvalFetched]);

  const approveNFT = useCallback(async () => {
    if (!sessionClient?.account) return;
    try {
      await sessionClient?.writeContract({
        abi: nftContract.abi as any,
        address: nftContract.address as `0x${string}`,
        account: sessionClient.account,
        chain: abstractTestnet, // TODO: change to mainnet
        functionName: "setApprovalForAll",
        args: [staking.address as `0x${string}`, true],
        paymaster: paymaster.address as `0x${string}`,
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
      });
      setIsApproved(true);
    } catch (e) {
      console.log(e);
    } finally {
      setButtonLoading(false);
    }
  }, [sessionClient, nftContract, staking, paymaster]);

  const mintNFT = useCallback(
    async (tokenId: number) => {
      if (!sessionClient?.account) return;

      await sessionClient?.writeContract({
        abi: nftContract.abi as any,
        address: nftContract.address as `0x${string}`,
        account: sessionClient.account,
        chain: abstractTestnet, // TODO: change to mainnet
        functionName: "mint",
        args: [BigInt(tokenId)],
        paymaster: paymaster.address as `0x${string}`,
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
      });
    },
    [sessionClient, nftContract, paymaster],
  );

  async function stakingNFTs() {
    const selectedTimelineDetails = LOCKING_NFT_TIME_PERIODS.find(
      (row) => `select-time-${row.time}` === selectedTimeline,
    );

    if (!sessionClient?.account) return;
    if (!selectedTimelineDetails) return;

    await connector[0].connect();

    try {
      const tx = await sessionClient.writeContract({
        abi: staking.abi as [],
        address: staking.address as `0x${string}`,
        functionName: "batchStakeNFTs",
        account: sessionClient.account,
        chain: abstractTestnet, // TODO: change to mainnet
        args: [
          nftContract.address as `0x${string}`,
          Array.from(selectedNFTs).map((nft) => BigInt(nft)),
          BigInt(selectedTimelineDetails.secs),
        ],
        paymaster: paymaster.address as `0x${string}`,
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
      });

      if (tx) {
        setTimeInSecs(selectedTimelineDetails.secs);
        setOpenModal(
          <ShareAdventure
            closeModal={() => {
              setOpenModal(null);
              changeTheStateToAdventureInProgress(selectedTimelineDetails.secs);
            }}
          />,
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setButtonLoading(false);
      refetch();
    }
  }

  function changeTheStateToAdventureInProgress(secs: number) {
    setStakedNfts([
      {
        icon: IMAGEKIT_IMAGES.NFT_ICON,
        endTime: String(new Date().getTime() / 1000 + (secs ?? 0)),
        tokenId: Array.from(selectedNFTs)[0],
        stakeId: BigInt(Array.from(selectedNFTs)[0]),
      },
    ]);
    setState("adventureInProgress");
  }

  async function unstakeNfts() {
    if (!sessionClient?.account) return;
    const stakeIds = stakedNfts.map((nft) => nft.stakeId);

    try {
      await sessionClient.writeContract({
        abi: staking.abi as [],
        address: staking.address as `0x${string}`,
        functionName: "batchUnstakeNFTs",
        chain: abstractTestnet, // TODO: change to mainnet
        account: sessionClient.account,
        args: [stakeIds],
        paymaster: paymaster.address as `0x${string}`,
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
      });

      window.location.href = "/craft";
    } catch (e) {
      console.log(e);
    } finally {
      setButtonLoading(false);
    }
  }

  return {
    mintNFT,
    stakingNFTs,
    unstakeNfts,
    approveNFT,
    isApproved,
  };
}
