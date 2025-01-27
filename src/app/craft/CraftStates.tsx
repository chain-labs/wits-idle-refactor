"use client";

import dynamic from "next/dynamic";
import { useCraftContext } from "./CraftContext";
import MaterialsWon from "@/components/craft/MaterialsWon";
import Crafting from "@/components/craft/Crafting";
import Reward from "@/components/craft/Reward";

const CraftStates = () => {
  const { state, totalMaterials, nftMaterials } = useCraftContext();

  const stateComponents = {
    materialsWon: (
      <MaterialsWon materials={totalMaterials} nftMaterials={nftMaterials} />
    ),
    crafting: <Crafting materials={totalMaterials} />,
    reward: <Reward />,
  };

  return stateComponents[state];
};

export default dynamic(() => Promise.resolve(CraftStates), { ssr: false });
