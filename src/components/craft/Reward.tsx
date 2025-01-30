"use client";

import Button from "@/components/ui/Button";
import GlowingH1 from "@/components/ui/GlowingH1";
import { useRestPost } from "@/hooks/api/useRestClient";
import { useLayoutEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { useAccount } from "wagmi";

interface RewardResponse {
  data: {
    rewardImageUrl: string;
    rewardName: string;
  };
}

export default function RewardPage({
  materials,
}: {
  materials: {
    common: number;
    uncommon: number;
    rare: number;
    legendary: number;
    mythic: number;
  };
}) {
  const rewardDetails = useRestPost(["reward"], "/reward");
  const account = useAccount();

  const [data, setData] = useState({
    rewardImageUrl: "",
    rewardName: "",
  });

  useLayoutEffect(() => {
    rewardDetails
      .mutateAsync({
        account: account?.address,
        materials,
      })
      .then((response) => {
        setData((response as RewardResponse).data);
      });
  }, [materials]);

  return (
    <div className="flex flex-col justify-center items-center gap-[50px] py-[50px]">
      <div className="flex flex-col justify-center items-center gap-[16px]">
        <GlowingH1>Congratulations</GlowingH1>
        <h3 className="uppercase text-lightGold">collect Your prize</h3>
      </div>

      <div className="flex flex-col gap-[16px]">
        <div
          style={{
            backgroundImage: `url(${data.rewardImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative rounded-[4px] border-[1px] border-mediumGold bg-black w-[350px] h-[350px]"
        >
          <IoStar className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-[48px]" />
        </div>
        <button className="bg-black border-[1px] border-[#797979] text-[#797979] uppercase w-fit px-[32px] py-[8px] mx-auto rounded-[4px]">
          {data.rewardName}
        </button>
        <a href="/prizes" className="mx-auto">
          <Button className="text-nowrap">Grab the Prize</Button>
        </a>
      </div>
    </div>
  );
}
