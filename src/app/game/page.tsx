"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useNFTManager } from "./useNFTManager";
import GameProvider from "./GameContext";
import GameLayout from "./GameLayout";
import { GameStates } from "./GameStates";
import dynamic from "next/dynamic";

function GamePage() {
  const [openModal, setOpenModal] = useState<null | React.ReactNode>(null);
  const [openInstructionModal, setOpenInstructionModal] = useState(true);
  const account = useAccount();
  const { ownedNfts, stakedNfts, loading } = useNFTManager(
    account.address as `0x${string}`,
  );

  return (
    <GameProvider>
      <GameLayout
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        openInstructionModal={openInstructionModal}
        setOpenInstructionModal={setOpenInstructionModal}
        ownedNfts={ownedNfts}
        stakedNfts={stakedNfts}
      >
        <GameStates ownedNfts={ownedNfts} stakedNfts={stakedNfts} />
      </GameLayout>
    </GameProvider>
  );
}

export default dynamic(() => Promise.resolve(GamePage), { ssr: false });
