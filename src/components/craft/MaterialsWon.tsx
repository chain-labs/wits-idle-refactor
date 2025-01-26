"use client";

import Image from "next/image";

import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { IMAGEKIT_IMAGES } from "@/images";
import GlowingH1 from "../ui/GlowingH1";
import { CraftMaterial, NFTCraftMaterial } from "@/app/craft/craft";

interface MaterialProps {
  materials: CraftMaterial[];
  nftMaterials: NFTCraftMaterial[];
}

function Details({
  nftMaterials,
}: {
  nftMaterials: MaterialProps["nftMaterials"];
}) {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpenDetails(!openDetails)}
        className={cn(
          "bg-black",
          "border-[1px] border-lightGold rounded-[4px]",
          "text-lightGold uppercase",
          "py-[16px]",
          "flex justify-center items-center gap-[8px]",
          "w-full",
          "z-10",
        )}
      >
        View Details
        <FaChevronDown className={openDetails ? "transform rotate-180" : ""} />
      </button>
      <AnimatePresence>
        {openDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className={cn(
              "border-[1px] border-[#797979] rounded-[4px]",
              "px-[32px] py-[48px]",
              "bg-[#14141480] backdrop-blur-[25px]",
              "flex flex-col justify-center items-center gap-[50px]",
              "w-full",
              "z-10 overflow-hidden",
            )}
          >
            <div className="flex justify-between items-center text-[#6A6A6A] uppercase w-full">
              <h2>NFT</h2>
              <h2>Materials Obtained</h2>
            </div>
            <div className="flex flex-col  gap-[16px] w-full">
              {nftMaterials.map((detail) => (
                <div
                  key={detail.tokenId}
                  className="flex justify-between items-center bg-[#171717] rounded-[4px] p-[10px]"
                >
                  <div className="bg-black rounded-[4px]">
                    <Image
                      src={detail.nftIcon}
                      width={50}
                      height={50}
                      alt="NFT Icon"
                      className="w-[50px] h-[50px] rounded-full p-[4px]"
                    />
                  </div>
                  <div className="flex justify-between items-center gap-[16px]">
                    {detail.materials.map((material, index) => (
                      <div
                        key={detail.nftIcon + material + index}
                        className="relative rounded-[4px] border-[#292929] border-[1px]"
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
                          {material.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function MaterialsWon({
  materials,
  nftMaterials,
}: MaterialProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-[50px] py-[100px]">
      <GlowingH1>Materials won</GlowingH1>

      <div className="flex justify-center items-center gap-[20px]">
        {materials.map((material, index) => (
          <div
            key={index}
            className="border-[1px] border-[#292929] rounded-[4px] bg-[#14141480] px-[12px] py-[24px] flex flex-col justify-center items-center gap-[8px] z-10"
          >
            <Image
              src={material.icon}
              width={165}
              height={165}
              alt={material.rarity}
              className="w-[10vw] h-[10vw]"
            />

            <div
              className={cn(
                "w-full bg-black",
                "p-[8px]",
                "text-center uppercase text-[#797979]",
                "border-[1px] border-[#797979] rounded-[4px]",
              )}
            >
              {material.rarity}
            </div>

            <button
              className={cn(
                "bg-gradient-to-b from-[#FFFED0] to-[#8C8C73]",
                "text-black uppercase",
                "rounded-b-[4px] border-[1px] border-[#FFFED0]",
                "w-full",
                "py-[8px]",
              )}
            >
              {material.quantity}X
            </button>
          </div>
        ))}
      </div>

      <Details nftMaterials={nftMaterials} />
    </div>
  );
}
