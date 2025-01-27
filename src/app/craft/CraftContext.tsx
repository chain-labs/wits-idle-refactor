"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { CraftMaterial, CraftState, NFTCraftMaterial } from "./craft";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES, IMAGEKIT_LOGO } from "@/images";
import { IMAGEKIT } from "@/constants";

type CraftContextType = {
  state: CraftState;
  setState: Dispatch<SetStateAction<CraftState>>;
  openModal: React.ReactNode | null;
  setOpenModal: Dispatch<SetStateAction<React.ReactNode | null>>;
  buttonLoading: boolean;
  setButtonLoading: Dispatch<SetStateAction<boolean>>;
  totalMaterials: CraftMaterial[];
  setTotalMaterials: Dispatch<SetStateAction<CraftMaterial[]>>;
  nftMaterials: NFTCraftMaterial[];
  setNftMaterials: Dispatch<SetStateAction<NFTCraftMaterial[]>>;
  craftMaterials: CraftMaterial[];
  setCraftMaterials: Dispatch<SetStateAction<CraftMaterial[]>>;
};

const CraftContext = createContext<CraftContextType | undefined>(undefined);

export const useCraftContext = () => {
  const context = useContext(CraftContext);
  if (context === undefined) {
    throw new Error("useCraftContext must be used within a CraftProvider");
  }
  return context;
};

const CraftProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<CraftState>("materialsWon");
  const [openModal, setOpenModal] = useState<React.ReactNode | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [totalMaterials, setTotalMaterials] = useState<CraftMaterial[]>([
    {
      rarity: "common",
      quantity: 10,
      icon: IMAGEKIT_ICONS.COMMON,
    },
    {
      rarity: "uncommon",
      quantity: 7,
      icon: IMAGEKIT_ICONS.UNCOMMON,
    },
    {
      rarity: "rare",
      quantity: 6,
      icon: IMAGEKIT_ICONS.RARE,
    },
    {
      rarity: "legendary",
      quantity: 54,
      icon: IMAGEKIT_ICONS.LEGENDARY,
    },
    {
      rarity: "mythic",
      quantity: 3,
      icon: IMAGEKIT_ICONS.MYTHICAL,
    },
  ]);
  const [nftMaterials, setNftMaterials] = useState<NFTCraftMaterial[]>([
    {
      tokenId: "32243",
      nftIcon: IMAGEKIT_IMAGES.NFT_ICON,
      materials: [
        {
          rarity: "common",
          quantity: 1,
          icon: IMAGEKIT_ICONS.COMMON,
        },
        {
          rarity: "uncommon",
          quantity: 2,
          icon: IMAGEKIT_ICONS.UNCOMMON,
        },
        {
          rarity: "rare",
          quantity: 3,
          icon: IMAGEKIT_ICONS.RARE,
        },
        {
          rarity: "legendary",
          quantity: 4,
          icon: IMAGEKIT_ICONS.LEGENDARY,
        },
        {
          rarity: "mythic",
          quantity: 5,
          icon: IMAGEKIT_ICONS.MYTHICAL,
        },
      ],
    },
  ]);
  const [craftMaterials, setCraftMaterials] = useState<CraftMaterial[]>([
    {
      rarity: "common",
      quantity: 0,
      icon: IMAGEKIT_ICONS.COMMON,
    },
    {
      rarity: "uncommon",
      quantity: 0,
      icon: IMAGEKIT_ICONS.UNCOMMON,
    },
    {
      rarity: "rare",
      quantity: 0,
      icon: IMAGEKIT_ICONS.RARE,
    },
    {
      rarity: "legendary",
      quantity: 0,
      icon: IMAGEKIT_ICONS.LEGENDARY,
    },
    {
      rarity: "mythic",
      quantity: 0,
      icon: IMAGEKIT_ICONS.MYTHICAL,
    },
  ]);

  return (
    <CraftContext.Provider
      value={{
        state,
        setState,
        openModal,
        setOpenModal,
        buttonLoading,
        setButtonLoading,
        totalMaterials,
        setTotalMaterials,
        nftMaterials,
        setNftMaterials,
        craftMaterials,
        setCraftMaterials,
      }}
    >
      {children}
    </CraftContext.Provider>
  );
};

export default CraftProvider;
