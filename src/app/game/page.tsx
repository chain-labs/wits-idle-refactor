"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useNFTManager } from "./useNFTManager";
import GameProvider from "./GameContext";
import GameLayout from "./GameLayout";
import { GameStates } from "./GameStates";
import dynamic from "next/dynamic";

function GamePage() {
  const [openInstructionModal, setOpenInstructionModal] = useState(true);
  const account = useAccount();
  const { ownedNfts, stakedNfts, loading, refetch } = useNFTManager(
    account.address as `0x${string}`,
  );

  return (
    <GameProvider>
      <GameLayout
        loading={loading}
        openInstructionModal={openInstructionModal}
        setOpenInstructionModal={setOpenInstructionModal}
        ownedNfts={ownedNfts}
        stakedNfts={stakedNfts}
        refetchNfts={refetch}
      >
        <GameStates
          ownedNfts={ownedNfts}
          stakedNfts={stakedNfts}
          refetchNfts={refetch}
        />
      </GameLayout>
    </GameProvider>
  );
}

export default dynamic(() => Promise.resolve(GamePage), { ssr: false });
