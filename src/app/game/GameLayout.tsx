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
import dynamic from "next/dynamic";
import { useEffect } from "react";
import useSessionKey from "@/hooks/useSessionKey";
import { useAbstractClient } from "@abstract-foundation/agw-react";
import useSessionKeyState from "@/hooks/useSessionKey";

type GameLayoutProps = {
  children: React.ReactNode;
  loading: boolean;
  openInstructionModal: boolean;
  setOpenInstructionModal: (open: boolean) => void;
  ownedNfts: NFTData[];
  stakedNfts: StakedNFT[];
  refetchNfts: () => void;
};

const GameLayout = ({
  children,
  loading,
  openInstructionModal,
  setOpenInstructionModal,
  ownedNfts,
  stakedNfts,
  refetchNfts,
}: GameLayoutProps) => {
  const {
    state,
    selectedNFTs,
    setState,
    selectedTimeline,
    timeInSecs,
    setButtonLoading,
    openModal,
    setOpenModal,
    buttonLoading,
    setTimeInSecs,
  } = useGameContext();
  const progressTimer = useTimer(timeInSecs);
  const { session, sessionReady, createNewSession } = useSessionKeyState();
  const { stakingNFTs, unstakeNfts, isApproved, approveNFT } = useSponsoredGame(
    { sessionClient: session },
  );

  const { data: agwClient, isFetched } = useAbstractClient();

  useEffect(() => {
    if (isFetched) {
      if (!agwClient?.account) {
        location.href = "/signin";
      }
    }
  }, [agwClient, isFetched]);

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
        function: async () => {
          setButtonLoading(true);
          try {
            if (!isApproved) {
              console.log("approving...");

              await approveNFT();
            }
            console.log("staking...");

            await stakingNFTs();
          } catch (e) {
            console.error("Error staking NFTs", e);
          }
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

  useEffect(() => {
    if (stakedNfts.length && state !== "adventureInProgress") {
      setTimeInSecs(Number(stakedNfts[0].endTime));
      setState("adventureInProgress");
    }
  }, [stakedNfts, state]);

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
