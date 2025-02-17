"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { IMAGEKIT_BG, IMAGEKIT_IMAGES } from "@/images";
import Header from "@/components/global/Header";
import { useAccount } from "wagmi";

export default function Home() {
  const account = useAccount();
  const [localUserData, setLocalUserData] = React.useState<{
    username: string;
    email: string;
  }>({
    username: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      const userData = localStorage.getItem("userData");
      if (userData) {
        setLocalUserData(JSON.parse(userData));
      }
    })();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-cover bg-center overflow-x-hidden bg-blend-multiply bg-opacity-10 z-0">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black z-[-1]"></div>
      <div
        style={{
          backgroundImage: `url(${IMAGEKIT_BG.PRIZE})`,
        }}
        className="absolute inset-0 w-full h-full bg-cover opacity-10"
      ></div>

      <Header active="account" />

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
          Account
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

      <div className="flex justify-start items-start gap-[50px] my-[50px] z-10 max-w-[min(50vw,800px)] mx-auto">
        <div className="flex flex-col justify-start items-start gap-[48px] rounded-[8px] border-[1px] border-[#292929] bg-[#14141480] px-[48px] py-[64px] uppercase text-lightGold z-10 w-full">
          <h2 className="bg-[#141414] px-[16px] py-[8px] rounded-[4px] w-[calc(100%+16px)] -translate-x-[16px]">
            Contact Information
          </h2>
          <div className="flex flex-col gap-[8px] w-full">
            <small className="uppercase text-[#797979] text-[10px]">NFT</small>
            <div className="p-[8px] rounded-[4px] bg-black w-fit">
              <Image
                src={IMAGEKIT_IMAGES.NFT_ICON}
                width={50}
                height={50}
                alt="NFT"
                className="w-[50px] h-[50px] rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <small className="uppercase text-[#797979] text-[10px]">
              ADDRESS
            </small>
            <p className="uppercase text-lightGold">{account.address}</p>
            <hr className="border-[#797979] w-full" />
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <small className="uppercase text-[#797979] text-[10px]">
              USERNAME
            </small>
            <p className="uppercase text-lightGold">{localUserData.username}</p>
            <hr className="border-[#797979] w-full" />
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <small className="uppercase text-[#797979] text-[10px]">
              EMAIL
            </small>
            <p className="uppercase text-lightGold">{localUserData.email}</p>
            <hr className="border-[#797979] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
