"use client";

import { IMAGEKIT_BG } from "@/images";
import { cn } from "@/utils";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import GradientSideBorder from "../border/GradientSideBorder";
import GlowingH1 from "../ui/GlowingH1";
import Button from "../ui/Button";

export default function ShareAdventure({
  closeModal,
  openModal,
}: {
  closeModal: () => void;
  openModal?: () => void;
}) {
  return (
    <div className="relative w-full h-full bg-black backdrop-blur-[25px] flex flex-col justify-center items-center z-0 p-[14px]">
      <div
        style={{
          backgroundImage: `url(${IMAGEKIT_BG.SHARE})`,
        }}
        className="absolute inset-0 w-full h-full z-[-1] bg-cover"
      ></div>
      <div
        className={cn(
          "relative w-full h-full",
          "flex flex-col justify-center items-center gap-[100px]",
          "text-lightGold",
        )}
      >
        <GradientSideBorder />
        <GradientSideBorder className="rotate-180" />

        <div className="flex flex-col justify-center items-center gap-[10px] z-10">
          <GlowingH1>Share this adventure</GlowingH1>
          <p className="font-lato max-w-[500px] text-center">
            Congratulations, you have sent # of characters on an adventure!
            Share your adventure on Twitter.
          </p>
        </div>

        <div className="bg-lightGold/10 border-[1px] border-lightGold px-[32px] py-[48px] z-10">
          <p className="font-lato max-w-[500px] text-center">
            “I just sent my @wits_tcg catenians on an adventure to earn rewards!
            Check it out at{" "}
            <a
              href="https://wits.academy/"
              target="_blank"
              className="underline"
            >
              https://wits.academy/
            </a>
            ”
          </p>
        </div>

        <Button>SHARE</Button>

        <button
          className={cn(
            "absolute right-0 top-0",
            "bg-gradient-to-b from-[#FFFED0] to-[#EFC779]",
            "text-black text-[24px]",
            "flex justify-center items-center",
            "aspect-square w-[36px] h-[36px] rounded-[4px] ",
            "m-[12px]",
          )}
          onClick={closeModal}
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
}
