"use client";

import Image from "next/image";
import { TiMinus, TiPlus } from "react-icons/ti";
import { useEffect, useState } from "react";
import AnimateNumber from "../animations/AnimateNumber";
import GlowingH1 from "../ui/GlowingH1";
import { CraftMaterial } from "@/app/craft/craft";
import { useCraftContext } from "@/app/craft/CraftContext";

interface CraftItemProps {
  materials: CraftMaterial[];
}

function CraftItem(craft: CraftMaterial) {
  const [count, setCount] = useState(craft.quantity);
  const maxQuantity = craft.quantity;
  const { setCraftMaterials } = useCraftContext();

  useEffect(() => {
    setCraftMaterials((prev) => {
      const index = prev.findIndex((item) => item.rarity === craft.rarity);
      if (index === -1) return prev;
      prev[index].quantity = count;
      return prev;
    });
  }, [craft.quantity]);

  return (
    <div className="relative p-[8px] pl-[70px] rounded-[4px] bg-black text-lightGold w-full">
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
        <Image
          src={craft.icon}
          width={100}
          height={100}
          alt="Common"
          className="w-[100px] h-[100px]"
        />
      </div>
      <div className="border-t-[1px] border-r-[1px] border-b-[1px] border-[#FFFED01A] rounded-[4px] p-[8px] w-full ">
        <div className="grid grid-cols-[24px_1fr_24px] justify-center items-center gap-[16px] w-full">
          <button
            onClick={() => {
              if (count > 0) setCount(count - 1);
            }}
            className="border-[1px] border-lightGold bg-[#FFFED026] w-[24px] h-[24px] flex justify-center items-center rounded-[4px] disabled:bg-[#FFFED026] disabled:opacity-50"
            disabled={count <= 0}
          >
            <TiMinus />
          </button>

          <div className="flex justify-center items-center gap-[8px] w-full">
            <div className="flex justify-center items-center overflow-hidden">
              <AnimateNumber num={Number(String(count).padStart(2, "0")[0])} />
              <AnimateNumber num={Number(String(count).padStart(2, "0")[1])} />
            </div>
            {craft.rarity}
          </div>

          <button
            onClick={() => {
              setCount(count + 1);
            }}
            className="border-[1px] border-lightGold bg-[#FFFED026] w-[24px] h-[24px] flex justify-center items-center rounded-[4px] disabled:bg-[#FFFED026] disabled:opacity-50"
            disabled={count >= maxQuantity}
          >
            <TiPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Crafting({ materials }: CraftItemProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-[50px] py-[100px]">
      <GlowingH1>CRAFTING</GlowingH1>

      <div className="grid grid-flow-row justify-center items-center gap-[40px] z-10">
        {materials.map((material) => (
          <CraftItem {...material} key={material.rarity} />
        ))}
      </div>
    </div>
  );
}
