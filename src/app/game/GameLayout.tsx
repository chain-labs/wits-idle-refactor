"use client";

import InstructionsOfGame from "@/components/game/InstructionsOfGame";
import { useGameContext } from "./GameContext";
import { IMAGEKIT_BG } from "@/images";
import GameModeBanner from "@/components/game/GameModeBanner";
import ModalRevealAnimation from "@/components/animations/ModalRevealAnimation";
import Modal from "@/components/global/Modal";
import GameFooter, { GameFooterProps } from "@/components/game/GameFooter";
import { GameState, NFTData, StakedNFT } from "./game";
import ExitGame from "@/components/game/ExitGame";
import useTimer from "@/hooks/useTimer";
import useSponsoredGame from "./useSponsoredGame";
import useMintNft from "./useMintNft";
import dynamic from "next/dynamic";

type GameLayoutProps = {
  children: React.ReactNode;
  loading: boolean;
  openModal: React.ReactNode | null;
  setOpenModal: (modal: React.ReactNode | null) => void;
  openInstructionModal: boolean;
  setOpenInstructionModal: (open: boolean) => void;
  ownedNfts: NFTData[];
  stakedNfts: StakedNFT[];
};

const GameLayout = ({
  children,
  loading,
  openModal,
  setOpenModal,
  openInstructionModal,
  setOpenInstructionModal,
  ownedNfts,
  stakedNfts,
}: GameLayoutProps) => {
  const {
    state,
    selectedNFTs,
    setState,
    selectedTimeline,
    timeInSecs,
    setButtonLoading,
    buttonLoading,
    setTimeInSecs,
  } = useGameContext();
  const progressTimer = useTimer(timeInSecs);
  const { stakingNFTs, unstakeNfts } = useSponsoredGame();

  const footerProps: Record<GameState, GameFooterProps> = {
    selectNFT: {
      backButton: {
        visible: false,
      },
      primaryButton: {
        text: "CONTINUE",
        visible: true,
        disabled: selectedNFTs.size === 0,
        function: () => {
          setState("sendingNFTsToAdventure");
        },
        loading: buttonLoading,
      },
      exitButton: {
        visible: true,
        function: () => {
          setOpenModal(<ExitGame closeModal={() => setOpenModal(null)} />);
        },
      },
    },

    sendingNFTsToAdventure: {
      backButton: {
        visible: true,
        function: () => {
          setState("selectNFT");
        },
      },
      primaryButton: {
        text: "SEND",
        visible: true,
        disabled: selectedTimeline === null,
        function: () => {
          setButtonLoading(true);
          stakingNFTs();
        },
        loading: buttonLoading,
      },
      exitButton: {
        visible: true,
        function: () => {
          setOpenModal(<ExitGame closeModal={() => setOpenModal(null)} />);
        },
      },
    },

    adventureInProgress: {
      backButton: {
        visible: false,
      },
      primaryButton: {
        text: "REEDEM",
        visible: true,
        disabled: progressTimer.end === false,
        function: () => {
          console.log("redeeming ");
          setButtonLoading(true);
          unstakeNfts();
        },
        loading: buttonLoading,
      },
      exitButton: {
        visible: true,
        function: () => {
          setOpenModal(<ExitGame closeModal={() => setOpenModal(null)} />);
        },
      },
    },
  };

  useMintNft(openInstructionModal && ownedNfts.length === 0 && !loading);

  if (stakedNfts.length && state !== "adventureInProgress") {
    setTimeInSecs(Number(stakedNfts[0].endTime));
    setState("adventureInProgress");
  }

  if (openInstructionModal) {
    return (
      <InstructionsOfGame closeModal={() => setOpenInstructionModal(false)} />
    );
  }

  return (
    <div
      style={{
        backgroundImage:
          state === "adventureInProgress"
            ? `url(${IMAGEKIT_BG.PROGRESS})`
            : `url(${IMAGEKIT_BG.HOMEPAGE})`,
      }}
      className="relative h-screen w-full bg-cover bg-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black" />

      <GameModeBanner />

      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-white">Loading...</p>
        </div>
      ) : (
        children
      )}

      <GameFooter {...footerProps[state]} />

      {openModal && (
        <Modal>
          <ModalRevealAnimation>{openModal}</ModalRevealAnimation>
        </Modal>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(GameLayout), { ssr: false });
