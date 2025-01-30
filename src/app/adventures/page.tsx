"use client";

import { useGQLFetch } from "@/hooks/api/useGraphQLClient";
import { useAccount } from "wagmi";
import { IMAGEKIT_BG, IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/images";
import Header from "@/components/global/Header";
import { GET_ADVENTURE_DATA } from "@/graphql/queries";
import { useEffect, useState } from "react";
import Row from "./Row";

interface AdventureData {
  startTime: string;
  duration: { duration: string };
  unstakeTxId: string;
}

interface Detail {
  nfticon: string;
  dateTime: number;
  ringScore: number;
  materials: { rarity: string; icon: string; amount: number }[];
  status: "Used" | "Unused" | "Progress";
}

export interface RowDetailData extends Detail {
  date: number;
  duration: string;
  unstakeTxId: string;
  status: "Used" | "Unused" | "Progress";
}

const detail: Detail = {
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

export default function Materials() {
  const account = useAccount();
  const LIMIT = 10;
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [data, setData] = useState<Record<string, AdventureData[]>>({});
  const [nextPageAvailable, setNextPageAvailable] = useState<boolean>(false);

  const {
    data: adventures,
    refetch,
    isRefetching,
  } = useGQLFetch<{
    users: {
      items: Array<{
        stakes: {
          pageInfo: {
            startCursor: string;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            endCursor: string;
          };
          totalCount: number;
          items: AdventureData[];
        };
      }>;
    };
  }>(
    [`adventures-${endCursor}`],
    GET_ADVENTURE_DATA,
    {
      where: { address_contains: account.address?.toLocaleLowerCase() },
      limit: LIMIT,
      orderDirection: "desc",
      orderBy: "endTime",
      after: endCursor,
      stakesWhere2: { unstakeTxId_not_contains: null },
    },
    { enabled: !!account.address },
  );

  function ViewMore(endCursor: string) {
    if (!adventures) return;

    refetch();
    setData({
      ...data,
      [endCursor ?? ""]: adventures.users.items[0].stakes.items,
    });
    setEndCursor(endCursor);
  }

  useEffect(() => {
    if (adventures) {
      if (!Object.values(data).flat().length) {
        ViewMore(adventures.users.items[0].stakes.pageInfo.endCursor);
        setTotalCount(adventures.users.items[0].stakes.totalCount);
      }
      setNextPageAvailable(
        adventures.users.items[0].stakes.pageInfo.hasNextPage,
      );
    }
  }, [adventures]);

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
            {Object.values(data)
              .flat()
              .map((stake: AdventureData) => ({
                ...detail,
                date: Number(stake.startTime) * 1000,
                duration: stake.duration.duration,
                unstakeTxId: stake.unstakeTxId,
                status: (stake.unstakeTxId === null ? "Unused" : "Used") as
                  | "Used"
                  | "Unused"
                  | "Progress",
              }))
              .map((row: RowDetailData) => (
                <Row
                  row={row}
                  key={row.unstakeTxId}
                  account={account.address ?? ""}
                />
              ))}
          </tbody>
        </table>
        <button
          className="w-fit mx-auto bg-black rounded-[4px] px-[24px] py-[10px] uppercase border-[1px] border-lightGold mt-[24px] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() =>
            ViewMore(adventures?.users.items[0].stakes.pageInfo.endCursor ?? "")
          }
          disabled={
            isRefetching ||
            !adventures ||
            totalCount <= Object.values(data).flat().length
          }
        >
          VIEW MORE
        </button>
      </div>
    </div>
  );
}
