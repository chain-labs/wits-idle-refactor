"use client";

import React, { useState } from "react";
import { cn } from "@/utils";
import Image from "next/image";
import { TiMinus, TiPlus } from "react-icons/ti";
import Link from "next/link";
import AnimateNumber from "@/components/animations/AnimateNumber";
import { IMAGEKIT_BG, IMAGEKIT_ICONS } from "@/images";
import Header from "@/components/global/Header";
import { useUserDataContext } from "../UserDataContext";
import Reward from "@/components/craft/Reward";
import ModalRevealAnimation from "@/components/animations/ModalRevealAnimation";
import Modal from "@/components/global/Modal";

type Rarity = "COMMON" | "UNCOMMON" | "RARE" | "MYTHICAL" | "LEGENDARY";

function DesignedCell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "border-lightGold border-[1px] rounded-[4px]",
        "bg-gradient-to-b from-[#FFFED0] to-[#8C8C73]",
        "text-black text-center",
        "w-full",
        "flex justify-center items-center",
        "px-[32px] py-[8px]",
      )}
    >
      {children}
    </div>
  );
}

function CraftItem({
  craft,
  count,
  setCount,
  maxCount,
}: {
  craft: { icon: string; rarity: string };
  count: number;
  setCount: (count: number) => void;
  maxCount: number;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-[8px] p-[8px] text-lightGold">
      <Image
        src={craft.icon}
        width={150}
        height={150}
        alt="Common"
        className="w-[150px] h-[150px]"
      />
      <div className="text-[#797979] bg-black rounded-[4px] w-full py-[8px] text-center">
        {craft.rarity}
      </div>
      <div className="flex justify-center items-center gap-[16px]">
        <button
          onClick={() => {
            if (count > 0) setCount(count - 1);
          }}
          className={cn(
            "border-lightGold border-[1px] rounded-[4px]",
            "bg-gradient-to-b from-[#FFFED0] to-[#8C8C73]",
            "text-black text-center",
            "w-fit",
            "flex justify-center items-center",
            "p-[8px]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
          disabled={count === 0}
        >
          <TiMinus />
        </button>
        <div className="bg-black rounded-[4px] border-lightGold border-[1px] text-center px-[32px] py-[8px]">
          <div className="flex justify-center items-center overflow-hidden">
            {String(count)
              .padStart(2, "0")
              .split("")
              .map((digit, index) => (
                <AnimateNumber key={index} num={Number(digit)} />
              ))}
          </div>
        </div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
          className={cn(
            "border-lightGold border-[1px] rounded-[4px]",
            "bg-gradient-to-b from-[#FFFED0] to-[#8C8C73]",
            "text-black text-center",
            "w-fit",
            "flex justify-center items-center",
            "p-[8px]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
          disabled={count >= maxCount}
        >
          <TiPlus />
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const { materials: userMaterials } = useUserDataContext();

  const [openModal, setOpenModal] = useState<null | React.ReactNode>(null);

  const [data, setData] = useState<Record<Rarity, number>>({
    COMMON: 0,
    UNCOMMON: 0,
    RARE: 0,
    MYTHICAL: 0,
    LEGENDARY: 0,
  });

  const probability = {
    COMMON: 0,
    UNCOMMON: 0,
    RARE:
      (data.UNCOMMON ? 5 : 0) +
      (data.RARE ? 10 : 0) +
      (data.LEGENDARY ? 10 : 0) +
      (data.MYTHICAL ? 10 : 0),
    LEGENDARY:
      (data.RARE ? 10 : 0) +
      (data.LEGENDARY ? 30 : 0) +
      (data.MYTHICAL ? 30 : 0),
    MYTHICAL: (data.LEGENDARY ? 30 : 0) + (data.MYTHICAL ? 50 : 0),
  };

  const rarityList = [
    {
      icon: IMAGEKIT_ICONS.COMMON,
      rarity: "COMMON",
      unused: userMaterials.unused.common,
      used: userMaterials.used.common,
      chances: probability.COMMON,
    },
    {
      icon: IMAGEKIT_ICONS.UNCOMMON,
      rarity: "UNCOMMON",
      unused: userMaterials.unused.uncommon,
      used: userMaterials.used.uncommon,
      chances: probability.UNCOMMON,
    },
    {
      icon: IMAGEKIT_ICONS.RARE,
      rarity: "RARE",
      unused: userMaterials.unused.rare,
      used: userMaterials.used.rare,
      chances: probability.RARE,
    },
    {
      icon: IMAGEKIT_ICONS.MYTHICAL,
      rarity: "MYTHICAL",
      unused: userMaterials.unused.mythic,
      used: userMaterials.used.mythic,
      chances: probability.MYTHICAL,
    },
    {
      icon: IMAGEKIT_ICONS.LEGENDARY,
      rarity: "LEGENDARY",
      unused: userMaterials.unused.legendary,
      used: userMaterials.used.legendary,
      chances: probability.LEGENDARY,
    },
  ];

  return (
    <>
      <div className="relative min-h-screen w-full bg-cover bg-center overflow-x-hidden bg-blend-multiply bg-opacity-10 z-0">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black z-[-1]"></div>
        <div
          style={{
            backgroundImage: `url(${IMAGEKIT_BG.PRIZE})`,
          }}
          className="absolute inset-0 w-full h-full bg-cover opacity-10"
        ></div>

        <Header active="materials" />

        <div className="flex justify-center items-center gap-[10px] mb-[16px] mt-[48px]">
          <svg
            width="261"
            height="12"
            viewBox="0 0 261 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="0.706021"
              width="7.0123"
              height="7.0123"
              transform="matrix(0.708191 0.706021 -0.708191 0.706021 255.826 0.207555)"
              fill="black"
              stroke="#8C8C73"
            />
            <path d="M251 6.00002L0 6" stroke="url(#paint0_linear_9_2)" />
            <defs>
              <linearGradient
                id="paint0_linear_9_2"
                x1="251"
                y1="6.00002"
                x2="55.6404"
                y2="6.00001"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8C8C73" />
                <stop offset="1" stopColor="#8C8C73" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <h1 className="uppercase text-lightGold text-[24px] mx-[50px]">
            Material log
          </h1>

          <svg
            width="261"
            height="12"
            viewBox="0 0 261 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180"
          >
            <rect
              y="0.706021"
              width="7.0123"
              height="7.0123"
              transform="matrix(0.708191 0.706021 -0.708191 0.706021 255.826 0.207555)"
              fill="black"
              stroke="#8C8C73"
            />
            <path d="M251 6.00002L0 6" stroke="url(#paint0_linear_9_2)" />
            <defs>
              <linearGradient
                id="paint0_linear_9_2"
                x1="251"
                y1="6.00002"
                x2="55.6404"
                y2="6.00001"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8C8C73" />
                <stop offset="1" stopColor="#8C8C73" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex justify-start items-start gap-[50px] mx-[32px] my-[50px] z-10">
          <div className="flex flex-col justify-start items-start gap-[24px] rounded-[8px] border-[1px] border-[#292929] bg-[#14141480] px-[48px] py-[64px] uppercase text-lightGold z-10 w-full">
            <div className="flex justify-center items-center gap-[150px] w-full flex-wrap">
              <div className="flex flex-col justify-center items-center gap-[25px]">
                <h1>MATERIALS TABLE</h1>
                <table>
                  <thead>
                    <tr className="uppercase text-[#6A6A6A] text-[12px] grid grid-cols-[3fr_1fr_1fr] gap-[8px]">
                      <th>Rarity</th>
                      <th>Unused</th>
                      <th>Used</th>
                    </tr>
                  </thead>
                  <tbody className="flex flex-col gap-[16px]">
                    {rarityList.map((rarity, index) => (
                      <tr
                        key={rarity.rarity}
                        className="grid grid-cols-[3fr_1fr_1fr] gap-[16px]"
                      >
                        <td className="underline text-black">
                          <DesignedCell>{rarity.rarity}</DesignedCell>
                        </td>
                        <td>
                          <DesignedCell>{rarity.unused}</DesignedCell>
                        </td>
                        <td>
                          <DesignedCell>{rarity.used}</DesignedCell>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col justify-center items-center gap-[25px]">
                <h1>PRIZE TABLE</h1>
                <table>
                  <thead>
                    <tr className="uppercase text-[#6A6A6A] text-[12px] grid grid-cols-[3fr_1fr] gap-[8px]">
                      <th>Rarity</th>
                      <th>Chances</th>
                    </tr>
                  </thead>
                  <tbody className="flex flex-col gap-[16px]">
                    {Object.entries(probability).map(
                      ([rarity, chances], index) => (
                        <tr
                          key={rarity}
                          className="grid grid-cols-[3fr_1fr] gap-[16px]"
                        >
                          <td className="underline text-black">
                            <DesignedCell>{rarity}</DesignedCell>
                          </td>
                          <td>
                            <DesignedCell>{chances}%</DesignedCell>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-center my-[16px] max-w-[700px] mx-auto">
              This is where you can mix and match your collected items for
              different chances at Loot! This could be Free Packs of cards in
              game, real packs, booster boxes, merch and more!
            </p>
            <div className="flex flex-wrap justify-center items-center w-full max-w-[1500px] mx-auto md:gap-[50px]">
              {rarityList.map((rarity, index) => (
                <CraftItem
                  craft={rarity}
                  count={data[rarity.rarity as Rarity]}
                  setCount={(count) =>
                    setData({ ...data, [rarity.rarity]: count })
                  }
                  key={index}
                  maxCount={rarity.unused}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "flex justify-center items-center gap-[50px] z-10",
            Object.values(data).reduce((a, b) => a + b, 0) === 0 &&
              "pointer-events-none opacity-50",
          )}
        >
          <button
            type="button"
            className="bg-black mb-[50px] py-[16px] px-[32px] w-[min(40vw,500px)] h-fit border border-lightGold text-lightGold rounded-[4px] uppercase z-10"
            disabled={Object.values(data).reduce((a, b) => a + b, 0) === 0}
            onClick={() => {
              setOpenModal(
                <Reward
                  materials={{
                    common: data.COMMON,
                    uncommon: data.UNCOMMON,
                    rare: data.RARE,
                    legendary: data.LEGENDARY,
                    mythic: data.MYTHICAL,
                  }}
                />,
              );
            }}
          >
            Craft
          </button>
        </div>
      </div>
      {openModal && (
        <Modal>
          <ModalRevealAnimation>
            <div className="bg-black backdrop-blur-lg w-full h-full flex justify-center items-center">
              {openModal}
            </div>
          </ModalRevealAnimation>
        </Modal>
      )}
    </>
  );
}
