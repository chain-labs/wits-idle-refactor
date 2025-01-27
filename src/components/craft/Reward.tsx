"use client";
import { IoStar } from "react-icons/io5";
import GlowingH1 from "../ui/GlowingH1";

export default function Reward() {
  return (
    <div className="flex flex-col justify-center items-center gap-[50px] py-[50px]">
      <div className="flex flex-col justify-center items-center gap-[16px]">
        <GlowingH1>Congratulations</GlowingH1>
        <h3 className="uppercase text-lightGold">collect Your prize</h3>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div className="relative rounded-[4px] border-[1px] border-mediumGold bg-black w-[350px] h-[350px]">
          <IoStar className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-[48px]" />
        </div>
        <button className="bg-black border-[1px] border-[#797979] text-[#797979] uppercase w-fit px-[32px] py-[8px] mx-auto rounded-[4px]">
          IPHONE 12 PRO
        </button>
      </div>
    </div>
  );
}
