"use client";

import { IMAGEKIT_BG } from "@/images";
import { cn } from "@/utils";
import GradientSideBorder from "../border/GradientSideBorder";
import GlowingH1 from "../ui/GlowingH1";
import Button from "../ui/Button";

export default function PrizeCollectConfirmation({
  closeModal,
  openModal,
}: {
  closeModal: () => void;
  openModal?: () => void;
}) {
  return (
    <div className="relative w-full h-full bg-black/75 backdrop-blur-[25px] flex flex-col justify-center items-center z-0 p-[14px]">
      <div
        style={{
          backgroundImage: `url(${IMAGEKIT_BG.THANKYOU})`,
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
          <GlowingH1>THANK YOU</GlowingH1>
          <p className="font-lato max-w-[500px] text-center">
            We are getting started on your lootbox right away you will receive a
            confirmation email shortly. In the meantime, begin a new adventure!
          </p>
        </div>

        <Button onClick={closeModal}>RETURN</Button>
      </div>
    </div>
  );
}
