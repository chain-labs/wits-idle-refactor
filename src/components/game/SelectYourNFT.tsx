"use client";

import Image from "next/image";
import { cn } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import GradientSideBorder from "../border/GradientSideBorder";
import useMintNft from "@/app/game/useMintNft";
import Button from "../ui/Button";
import useSponsoredGame from "@/app/game/useSponsoredGame";
import { useGameContext } from "@/app/game/GameContext";
import { SessionClient } from "@abstract-foundation/agw-client/sessions";

function SingleNFTIcon({
  id,
  icon,
  active,
}: {
  id: string;
  icon: string;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "relative p-[9px] rounded-[8px] bg-black border-[1px] border-black w-[100px] h-[100px] aspect-square",
        active && "border-lightGold",
      )}
    >
      <input
        id={id}
        type="checkbox" // Changed from radio to checkbox
        name="select-nft"
        className="absolute inset-0 w-full h-full rounded-[inherit] cursor-pointer opacity-0"
      />
      <Image
        src={icon}
        alt="nft-icon"
        width={100}
        height={100}
        className="rounded-full w-full h-full aspect-square"
      />
    </div>
  );
}

export default function SelectingNFTS({
  selectedNFTs,
  setSelectedNFTs,
  refetchNfts,
  ownedNfts,
  sessionClient,
  optimisticAddNFTs,
}: {
  selectedNFTs: Set<string>;
  setSelectedNFTs: Dispatch<SetStateAction<Set<string>>>;
  ownedNfts: {
    icon: string;
    tokenId: string;
  }[];
  refetchNfts: () => void;
  optimisticAddNFTs: (tokenId: string) => void;
  sessionClient: SessionClient | null;
}) {
  function handleNFTSelect(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    setSelectedNFTs((prev) => {
      const newSet = new Set(prev);
      if (target.checked) {
        newSet.add(target.id);
      } else {
        newSet.delete(target.id);
      }
      return newSet;
    });
  }

  const { mintNFT } = useMintNft({ optimisticNFTAdd: optimisticAddNFTs });

  const { setButtonLoading, buttonLoading } = useGameContext();

  return (
    <div className="relative bg-[#020708BF] flex flex-col justify-center items-center gap-[24px] mx-[10vw] mt-[50px] px-[10vw] max-h-[65vh]">
      <GradientSideBorder />
      <GradientSideBorder className="rotate-180" />
      <div className="flex flex-col justify-center items-center gap-[0px] pt-[50px] z-10">
        <h2 className="text-[20px] text-lightGold uppercase tracking-widest">
          Send on an adventure
        </h2>
        <p className="text-[12px] text-lightGold uppercase tracking-wide">
          These nfts will be locked in the smart contract for the selected time
          period and unable to be traded or sent.
        </p>
      </div>
      <div className="h-[50vh] overflow-y-auto">
        {ownedNfts.length ? (
          <form
            onChange={handleNFTSelect}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 mb-[20px] p-4 overflow-auto z-10"
          >
            {ownedNfts.map((nft, idx) => (
              <SingleNFTIcon
                key={nft.tokenId}
                id={nft.tokenId}
                icon={nft.icon}
                active={selectedNFTs.has(BigInt(nft.tokenId).toString())}
              />
            ))}
          </form>
        ) : (
          <div className="mt-[200px] flex justify-center items-center flex-col">
            <p className="text-lightGold">
              You don't have any NFTs to send on an adventure.
            </p>
            <Button
              isLoading={buttonLoading}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setButtonLoading(true);
                mintNFT(refetchNfts);
              }}
              className="mt-[20px]"
            >
              Mint NFT
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
