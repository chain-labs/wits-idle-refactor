"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { GameState } from "./game";
import dynamic from "next/dynamic";

type GameContextType = {
  state: GameState;
  setState: Dispatch<SetStateAction<GameState>>;
  selectedNFTs: Set<string>;
  setSelectedNFTs: Dispatch<SetStateAction<Set<string>>>;
  selectedTimeline: string | null;
  setSelectedTimeline: Dispatch<SetStateAction<string | null>>;
  timeInSecs: number;
  setTimeInSecs: Dispatch<SetStateAction<number>>;
  openModal: React.ReactNode | null;
  setOpenModal: Dispatch<SetStateAction<React.ReactNode | null>>;
  buttonLoading: boolean;
  setButtonLoading: Dispatch<SetStateAction<boolean>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<GameState>("selectNFT");
  const [selectedNFTs, setSelectedNFTs] = useState<Set<string>>(new Set());
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
  const [timeInSecs, setTimeInSecs] = useState<number>(0);
  const [openModal, setOpenModal] = useState<React.ReactNode | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (openModal) {
      console.log({ openModal });
    }
  }, [openModal]);

  return (
    <GameContext.Provider
      value={{
        state,
        setState,
        selectedNFTs,
        setSelectedNFTs,
        selectedTimeline,
        setSelectedTimeline,
        timeInSecs,
        setTimeInSecs,
        openModal,
        setOpenModal,
        buttonLoading,
        setButtonLoading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default dynamic(() => Promise.resolve(GameProvider), { ssr: false });
