"use client";

import Image from "next/image";
import { cn } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import GradientSideBorder from "../border/GradientSideBorder";
import { IMAGEKIT_IMAGES } from "@/images";
import { LOCKING_NFT_TIME_PERIODS } from "@/app/game/constants";

function SingleNFTIcon({ id, icon }: { id: string; icon: string | undefined }) {
  if (!icon) {
    return (
      <Link
        href="/game"
        className={cn(
          "relative p-[9px] rounded-[8px] bg-black border-[1px] border-[#62647233] text-[#333333]",
        )}
      >
        <div className="flex justify-center items-center w-[100px] h-[100px]">
          
          <FaPlus />
        </div>
      </Link>
    );
  }
  return (
    <div
      className={cn(
        "relative p-[9px] rounded-[8px] bg-black border-[1px] border-[#62647233]",
      )}
    >
      <input
        id={id}
        type="radio"
        name="select-nft"
        className="absolute inset-0 w-full h-full rounded-[inherit] cursor-pointer opacity-0"
      />
      <Image
        src={icon}
        alt="nft-icon"
        width={100}
        height={100}
        className="rounded-full w-[100px] h-[100px]"
      />
    </div>
  );
}

export default function StakingNFTs({
  selectedNFTs,
  selectedTimeline,
  setSelectedTimeline,
}: {
  selectedNFTs: Set<string>;
  selectedTimeline: string | null;
  setSelectedTimeline: Dispatch<SetStateAction<string | null>>;
}) {
  const nfts = [
    ...Array.from({ length: selectedNFTs.size }, () => ({
      icon: IMAGEKIT_IMAGES.NFT_ICON,
    })),
    ...Array.from({ length: 6 - selectedNFTs.size }, () => ({
      icon: undefined,
    })),
  ];

  function handleTimelineSelect(e: React.FormEvent<HTMLFormElement>) {
    setSelectedTimeline((e.target as HTMLInputElement).id);
  }

  return (
    <div className="relative bg-[#020708BF] flex flex-col justify-center items-center gap-[24px] mx-[10vw] mt-[50px] px-[10vw] max-h-[65vh]">
      <GradientSideBorder />
      <GradientSideBorder className="rotate-180" />
      <div className="flex flex-col justify-center items-center gap-[0px] pt-[50px] z-10">
        <h2 className="text-[20px] text-lightGold uppercase tracking-widest">
          SELECT YOUR NFT
        </h2>
        <p className="text-[12px] text-lightGold uppercase tracking-wide">
          Embark on an Adventure with Your Chosen NFTs
        </p>
      </div>

      <div className="flex flex-col justify-start items-center gap-[50px] h-fit w-full overflow-auto pr-[10px] z-10">
        <div className="flex justify-center items-center w-full z-10">
          <div className="grid grid-cols-3 gap-[10px] p-[14px] border-[1px] border-[#8C8C7380] bg-[#090909]">
            {nfts.map((nft, idx) => (
              <SingleNFTIcon
                key={`select-nft-${idx}`}
                id={`select-nft-${idx}`}
                icon={nft.icon}
              />
            ))}
          </div>
        </div>

        <form
          onChange={handleTimelineSelect}
          className="z-10 w-full max-w-[1000px] mb-[50px]"
        >
          <table className="w-full flex flex-col gap-[10px]">
            <thead className="flex flex-col gap-[10px]">
              <tr className="bg-black uppercase text-[#8C8C73] text-center text-[12px] rounded-[4px] grid grid-cols-7 place-items-center gap-[10px] py-[10px]">
                <th></th>
                <th className="place-self-start">TIME</th>
                <th>COMMON</th>
                <th>UNCOMMON</th>
                <th>RARE</th>
                <th>LEGENDARY</th>
                <th>MYTHIC</th>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-[10px] w-full font-lato text-mediumGold">
              {LOCKING_NFT_TIME_PERIODS.map((row, idx) => (
                <tr
                  key={row.time}
                  className={cn(
                    "relative h-fit text-center z-0 w-full grid grid-cols-7 place-items-center gap-[10px] rounded-[4px] border-[1px] border-[#292929] bg-[#090909] py-[12px]",
                    selectedTimeline === `select-time-${row.time}` &&
                      "border-lightGold",
                  )}
                >
                  {/* <div
                  className={cn(
                    "absolute top-0 left-0 w-full h-full rounded-[4px] my-[5px] border-[1px] border-[#292929] bg-[#090909] z-[-1]",
                    selectedTimeline === `select-time-${idx}` &&
                      "border-lightGold",
                  )}
                ></div> */}
                  <td className="flex justify-center items-center mx-auto">
                    <label
                      htmlFor={`select-time-${row.time}`}
                      className={cn(
                        "w-[20px] h-[20px] flex justify-center items-center aspect-square rounded-[4px] border-[2px] border-[#8C8C73] cursor-pointer",
                        selectedTimeline === `select-time-${row.time}` &&
                          "bg-gradient-to-b from-[#FFFED0] to-[#8C8C73]",
                      )}
                    >
                      <input
                        type="radio"
                        name="select-time"
                        id={`select-time-${row.time}`}
                        className="opacity-0"
                      />
                    </label>
                  </td>
                  <td className="my-auto place-self-start">{row.time}</td>
                  <td>{row.common}%</td>
                  <td>{row.uncommon}%</td>
                  <td>{row.rare}%</td>
                  <td>{row.legendary}%</td>
                  <td>{row.mythic}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}
