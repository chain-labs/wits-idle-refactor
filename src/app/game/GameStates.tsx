"use client";

import AdventureProgress from "@/components/game/AdventureProgress";
import { useGameContext } from "./GameContext";
import { NFTData, StakedNFT } from "./game";
import useTimer from "@/hooks/useTimer";
import SelectingNFTS from "@/components/game/SelectYourNFT";
import StakingNFTs from "@/components/game/LockingNFTs";
import dynamic from "next/dynamic";

type GameStatesProps = {
  ownedNfts: NFTData[];
  stakedNfts: StakedNFT[];
  refetchNfts: () => void;
};

export const GameStates = ({
  ownedNfts,
  stakedNfts,
  refetchNfts,
}: GameStatesProps) => {
  const {
    state,
    selectedNFTs,
    setSelectedNFTs,
    selectedTimeline,
    setSelectedTimeline,
    timeInSecs,
  } = useGameContext();
  const progressTimer = useTimer(timeInSecs);

  const stateComponents = {
    selectNFT: (
      <SelectingNFTS
        selectedNFTs={selectedNFTs}
        setSelectedNFTs={setSelectedNFTs}
        ownedNfts={ownedNfts}
        refetchNfts={refetchNfts}
      />
    ),
    sendingNFTsToAdventure: (
      <StakingNFTs
        selectedNFTs={selectedNFTs}
        setSelectedTimeline={setSelectedTimeline}
        selectedTimeline={selectedTimeline}
      />
    ),
    adventureInProgress: stakedNfts.length && (
      <AdventureProgress time={progressTimer} />
    ),
  };

  return <>{stateComponents[state]}</>;
};

export default dynamic(() => Promise.resolve(GameStates), { ssr: false });
