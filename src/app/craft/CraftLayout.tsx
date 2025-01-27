"use client";

import { CraftState } from "./craft";
import { useCraftContext } from "./CraftContext";
import { IMAGEKIT_BG } from "@/images";
import GradientSideBorder from "@/components/border/GradientSideBorder";
import { cn } from "@/utils";
import Modal from "@/components/global/Modal";
import ModalRevealAnimation from "@/components/animations/ModalRevealAnimation";
import dynamic from "next/dynamic";
import CraftFooter, { CraftFooterProps } from "@/components/craft/CraftFooter";
import ExitCraft from "@/components/craft/ExitCraft";

type CraftLayoutProps = {
  children: React.ReactNode;
  loading: boolean;
  openModal: React.ReactNode | null;
  setOpenModal: (modal: React.ReactNode | null) => void;
};

const CraftLayout = ({
  children,
  loading,
  openModal,
  setOpenModal,
}: CraftLayoutProps) => {
  const { state, setState, buttonLoading } = useCraftContext();

  const footerProps: Record<CraftState, CraftFooterProps> = {
    materialsWon: {
      backButton: {
        visible: false,
      },
      primaryButton: {
        text: "PROCEED",
        visible: true,
        function: () => {
          setState("crafting");
        },
        loading: buttonLoading,
      },
      exitButton: {
        visible: true,
        function: () => {
          setOpenModal(<ExitCraft closeModal={() => setOpenModal(null)} />);
        },
      },
    },

    crafting: {
      backButton: {
        visible: false,
      },
      primaryButton: {
        text: "CRAFT",
        visible: true,
        function: () => {
          setState("reward");
        },
        loading: buttonLoading,
      },
      exitButton: {
        visible: true,
        function: () => {
          setOpenModal(<ExitCraft closeModal={() => setOpenModal(null)} />);
        },
      },
    },

    reward: {
      backButton: {
        visible: false,
      },
      primaryButton: {
        text: "COLLECT",
        visible: true,
        function: () => {
          location.href = "/prizes";
        },
        loading: buttonLoading,
      },
      exitButton: {
        visible: true,
        function: () => {
          setOpenModal(<ExitCraft closeModal={() => setOpenModal(null)} />);
        },
      },
    },
  };
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGEKIT_BG.CRAFT})`,
      }}
      className="h-screen w-screen bg-cover bg-center overflow-x-hidden"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black"></div>

      <div className="relative w-full h-fit flex flex-col justify-center items-center z-0 p-[14px]">
        <div
          className={cn(
            "relative w-full h-full",
            "flex flex-col justify-center items-center gap-[100px]",
            "text-lightGold",
          )}
        >
          <GradientSideBorder />
          <GradientSideBorder className="rotate-180" />
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-white">Loading...</p>
            </div>
          ) : (
            children
          )}
        </div>
      </div>

      <CraftFooter {...footerProps[state]} />

      {openModal !== null && (
        <Modal>
          <ModalRevealAnimation>{openModal}</ModalRevealAnimation>
        </Modal>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(CraftLayout), { ssr: false });
