"use client";

import useNFTs from "@/abi/Nfts";
import usePayMaster from "@/abi/PayMaster";
import { useWriteContractSponsored } from "@abstract-foundation/agw-react";
import { useCallback } from "react";
import { getGeneralPaymasterInput } from "viem/zksync";
import { useGameContext } from "./GameContext";
import { LOCKING_NFT_TIME_PERIODS } from "./constants";
import useStaking from "@/abi/Staking";
import { useAccount, useConnectors } from "wagmi";
import ShareAdventure from "@/components/game/ShareAdventure";
import { useNFTManager } from "./useNFTManager";
import { IMAGEKIT_IMAGES } from "@/images";

export default function useSponsoredGame() {
  const { writeContractSponsoredAsync } = useWriteContractSponsored();
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
  const { setStakedNfts, stakedNfts } = useNFTManager(
    account.address as `0x${string}`,
  );

  const mintNFT = useCallback(
    async (tokenId: number) => {
      await writeContractSponsoredAsync({
        abi: nftContract.abi as any,
        address: nftContract.address as `0x${string}`,
        functionName: "mint",
        args: [BigInt(tokenId)],
        paymaster: paymaster.address as `0x${string}`,
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
      });
    },
    [writeContractSponsoredAsync, nftContract, paymaster],
  );

  async function stakingNFTs() {
    const selectedTimelineDetails = LOCKING_NFT_TIME_PERIODS.find(
      (row) => `select-time-${row.time}` === selectedTimeline,
    );

    console.log({ connector });

    await connector[0].connect();

    if (!selectedTimelineDetails) return;
    try {
      const tx = await writeContractSponsoredAsync({
        abi: staking.abi as [],
        address: staking.address as `0x${string}`,
        functionName: "batchStakeNFTs",
        account: account.address as `0x${string}`,
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
              changeTheStateToAdventureInProgress();
            }}
          />,
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      setButtonLoading(false);
    }
  }

  function changeTheStateToAdventureInProgress() {
    console.log("changeTheStateToAdventureInProgress");
    const selectedTimelineDetails = LOCKING_NFT_TIME_PERIODS.find(
      (row) => `select-time-${row.time}` === selectedTimeline,
    );
    setStakedNfts([
      {
        icon: IMAGEKIT_IMAGES.NFT_ICON,
        endTime: String(
          new Date().getTime() / 1000 + (selectedTimelineDetails?.secs ?? 0),
        ),
        tokenId: Array.from(selectedNFTs)[0],
        stakeId: BigInt(Array.from(selectedNFTs)[0]),
      },
    ]);
    setState("adventureInProgress");
  }

  async function unstakeNfts() {
    const stakeIds = stakedNfts.map((nft) => nft.stakeId);

    console.log({
      abi: staking.abi as [],
      address: staking.address as `0x${string}`,
      functionName: "batchUnstakeNFTs",
      account: account.address as `0x${string}`,
      args: [stakeIds],
      paymaster: paymaster.address as `0x${string}`,
      paymasterInput: getGeneralPaymasterInput({
        innerInput: "0x",
      }),
    });

    try {
      await writeContractSponsoredAsync({
        abi: staking.abi as [],
        address: staking.address as `0x${string}`,
        functionName: "batchUnstakeNFTs",
        account: account.address as `0x${string}`,
        args: [stakeIds],
        paymaster: paymaster.address as `0x${string}`,
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
      });

      window.location.href = "/craft";
      // router.push("/craft");
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
  };
}
