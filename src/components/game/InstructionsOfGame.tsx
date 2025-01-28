"use client";

import Image from "next/image";
import { cn } from "@/utils";
import { useWriteContractSponsored } from "@abstract-foundation/agw-react";
import useNFTs from "@/abi/Nfts";
import { useAccount, useReadContract } from "wagmi";
import useStaking from "@/abi/Staking";
import usePayMaster from "@/abi/PayMaster";
import { getGeneralPaymasterInput } from "viem/zksync";
import { useEffect, useState } from "react";
import { IMAGEKIT_BG } from "@/images";
import Button from "../ui/Button";
import { handleClientScriptLoad } from "next/script";

export default function InstructionsOfGame({
  closeModal,
  createSession,
  sessionReady,
}: {
  closeModal: () => void;
  createSession: () => void;
  sessionReady: boolean;
}) {
  const account = useAccount();

  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.SHARE})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="relative h-screen w-full bg-center bg-no-repeat z-50"
    >
      <Image
        src={IMAGEKIT_BG.INSTRUCTION_BOARD_TRANSPARENT}
        alt="instructions"
        height={1440}
        width={1024}
        className="w-[130vw] h-[100vh] object-cover md:w-full md:h-full md:object-contain"
      />
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-20%]",
          "flex flex-col justify-center items-center gap-[10px]",
          "w-[90%] md:w-[55%] xl:max-w-[50%] 2xl:max-w-[40%] max-w-[2800px]",
          "text-[14px] text-lightGold text-center uppercase",
        )}
      >
        <p>1. Select Start Game</p>
        <p>
          2. Select NFTs you wish to send on an adventure. NOTE: Once you start
          an adventure you cannot stop it until the timer runs out. They will be
          locked for the entire duration. You can only do 1 Adventure at a time
          so send as many or as little as you want!
        </p>
        <p>
          3. Select the duration in which you would like to send your characters
          on an adventure for.
        </p>
        <p>4. Confirm the details.</p>
        <p>5. Sit back and wait.</p>
        <p>6. Collect your loot!</p>
        {account ? (
          sessionReady ? (
            <Button
              className="mt-[10px] z-10 scale-[0.75]"
              onClick={closeModal}
            >
              START GAME
            </Button>
          ) : (
            <Button
              className="mt-[10px] z-10 scale-[0.75] text-lg"
              isLoading={buttonLoading}
              onClick={() => {
                setButtonLoading(true);
                createSession();
              }}
            >
              Create Session
            </Button>
          )
        ) : (
          <Button className="mt-[10px] z-10 scale-[0.75]">SIGN IN</Button>
        )}
      </div>
    </div>
  );
}
