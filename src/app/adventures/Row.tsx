"use client";

import { useRestPost } from "@/hooks/api/useRestClient";
import { RowDetailData } from "./page";
import { useEffect, useState } from "react";
import { IMAGEKIT_ICONS } from "@/images";
import Image from "next/image";
import { cn } from "@/utils";

type Rarity = "common" | "uncommon" | "rare" | "legendary" | "mythic";

export default function Row({
  row,
  account,
}: {
  row: RowDetailData;
  account: string;
}) {
  const postReq = useRestPost([`unstaking-${row.unstakeTxId}`], "/unstaking");
  const [materialsData, setMaterialsData] = useState<
    {
      rarity: Rarity;
      icon: string;
      amount: number;
    }[]
  >([]);

  useEffect(() => {
    postReq
      .mutateAsync({
        address: account,
        tokenId: row.unstakeTxId,
        stakingTimeInSecs: Number(row.duration),
      })
      .then((data) => {
        if (!data || typeof data !== "object" || !("materials" in data)) return;
        const { materials } = data as {
          materials: Record<Rarity, number>;
        };
        setMaterialsData(
          Object.entries(materials).map(([rarity, amount]) => ({
            rarity: rarity as Rarity,
            icon: {
              common: IMAGEKIT_ICONS.COMMON,
              uncommon: IMAGEKIT_ICONS.UNCOMMON,
              rare: IMAGEKIT_ICONS.RARE,
              legendary: IMAGEKIT_ICONS.LEGENDARY,
              mythic: IMAGEKIT_ICONS.MYTHICAL,
            }[rarity as Rarity],
            amount: amount,
          })),
        );
      });
  }, [row.unstakeTxId]);

  return (
    <tr
      key={row.unstakeTxId}
      className={cn(
        "relative h-fit text-center z-0 w-full grid grid-cols-[1fr_1fr_1fr_3fr_1fr] place-items-center gap-[10px] rounded-[4px] border-[1px] border-[#292929] bg-[#181818] py-[12px]",
      )}
    >
      <td className="relative bg-black rounded-[4px] aspect-square w-[70px] h-[70px] p-[8px]">
        <Image
          src={row.nfticon}
          alt="nft icon"
          height={70}
          width={70}
          className="w-full h-full rounded-full"
        />
      </td>
      <td>
        {new Date(row.date).getMonth() + 1}.{new Date(row.date).getDate()}.
        {new Date(row.date).getFullYear()}
      </td>
      <td>{`${Math.floor(Number(row.duration) / 3600)}:${Math.floor(
        (Number(row.duration) % 3600) / 60,
      )}`}</td>

      <td className="flex justify-center items-center gap-[16px] w-fit ">
        {materialsData.map((material, index) => (
          <div
            key={row.nfticon + material + index}
            className="relative w-[50px] h-[50px] rounded-[4px] border-[#292929] border-[1px]"
          >
            <Image
              src={material.icon}
              width={50}
              height={50}
              alt={material.icon}
              className="w-[50px] h-[50px]"
            />

            <div
              className={cn(
                "absolute top-0 right-0 translate-x-1/2 -translate-y-1/2",
                "border-[#474747] border-[1px] rounded-full",
                "bg-[#292929]",
                "text-lightGold font-lato text-center",
                "w-[1.5em] h-[1.5em] aspect-square",
                "flex justify-center items-center",
              )}
            >
              {material.amount}
            </div>
          </div>
        ))}
      </td>

      <td>
        <button className="bg-[#141414] rounded-[4px] px-[24px] py-[10px] uppercase w-full">
          {
            {
              Used: "Used",
              Unused: "Unused",
              Progress: "Progress",
            }[row.status]
          }
        </button>
      </td>
    </tr>
  );
}
