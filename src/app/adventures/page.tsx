"use client";

import { cn } from "@/utils";
import Image from "next/image";
import { useGQLFetch } from "@/hooks/api/useGraphQLClient";
import { useAccount } from "wagmi";
import { IMAGEKIT_BG, IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/images";
import Header from "@/components/global/Header";

export default function Home() {
  const account = useAccount();

  const { data: adventures } = useGQLFetch<{
    users: {
      items: Array<{
        stakes: {
          items: {
            startTime: string;
            duration: { duration: string };
            unstakeTxId: string;
          }[];
        };
      }>;
    };
  }>(
    ["adventures"],
    `query Query($where: userFilter) {
      users(where: $where) {
        items {
          stakes {
            items {
              startTime
              duration {
                duration
              }
                unstakeTxId
            }
          }
        }
      }
    }`,
    { where: { address_contains: account.address?.toLocaleLowerCase() } },
    { enabled: !!account.address },
  );

  const detail = {
    nfticon: IMAGEKIT_IMAGES.NFT_ICON,
    dateTime: new Date().getTime(),
    ringScore: 0,
    materials: [
      {
        rarity: "Common",
        icon: IMAGEKIT_ICONS.COMMON,
        amount: 0,
      },
      {
        rarity: "Uncommon",
        icon: IMAGEKIT_ICONS.UNCOMMON,
        amount: 3,
      },
      {
        rarity: "Rare",
        icon: IMAGEKIT_ICONS.RARE,
        amount: 1,
      },
      {
        rarity: "Legendary",
        icon: IMAGEKIT_ICONS.LEGENDARY,
        amount: 0,
      },
      {
        rarity: "Mythic",
        icon: IMAGEKIT_ICONS.MYTHICAL,
        amount: 0,
      },
    ],
    status: "Used" as "Used" | "Unused" | "Progress",
  };

  const details =
    adventures?.users?.items?.[0]?.stakes?.items?.map((stake) => ({
      ...detail,
      date: stake.startTime,
      duration: stake.duration,
    })) ?? [];

  // if (!account.address) {
  //   return <Unauthenticated />;
  // }

  return (
    <div className="relative min-h-screen w-full bg-cover bg-center overflow-x-hidden bg-blend-multiply bg-opacity-10 z-0">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black z-[-1]"></div>
      <div
        style={{
          backgroundImage: `url(${IMAGEKIT_BG.PRIZE})`,
        }}
        className="absolute inset-0 w-full h-full bg-cover opacity-10"
      ></div>

      <Header active="adventures" />

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
          Adventure Log
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

      <div className="bg-[#14141480] backdrop-blur-lg rounded-[8px] border-[1px] border-[#292929] flex flex-col justify-center items-center p-[32px] mx-[32px] my-[50px]">
        <table className="w-full flex flex-col gap-[24px] max-w-[1200px] mx-auto">
          <thead className="flex flex-col gap-[10px]">
            <tr className=" uppercase text-[#6A6A6A] text-center text-[12px] rounded-[4px] grid grid-cols-[1fr_1fr_1fr_3fr_1fr] place-items-center gap-[10px] py-[10px]">
              <th>NFT</th>
              <th>DATE</th>
              <th>DURATION</th>
              <th>MATERIAL OBTAINED</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-[10px] w-full font-lato text-mediumGold uppercase">
            {adventures?.users?.items?.[0]?.stakes?.items
              ?.map((stake) => ({
                ...detail,
                date: Number(stake.startTime) * 1000,
                duration: stake.duration.duration,
                unstakeTxId: stake.unstakeTxId,
                status: stake.unstakeTxId === null ? "Unused" : "Used",
              }))
              .map((row) => (
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
                    {new Date(row.date).getMonth() + 1}.
                    {new Date(row.date).getDate()}.
                    {new Date(row.date).getFullYear()}
                  </td>
                  <td>{`${Math.floor(Number(row.duration) / 3600)}:${Math.floor(
                    (Number(row.duration) % 3600) / 60,
                  )}`}</td>

                  <td className="flex justify-center items-center gap-[16px] w-fit ">
                    {row.materials.map((material, index) => (
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
              ))}
          </tbody>
        </table>
        <button className="w-fit mx-auto bg-black rounded-[4px] px-[24px] py-[10px] uppercase border-[1px] border-lightGold mt-[24px]">
          VIEW MORE
        </button>
      </div>
    </div>
  );
}
