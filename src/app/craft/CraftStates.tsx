"use client";

import dynamic from "next/dynamic";
import { useCraftContext } from "./CraftContext";
import MaterialsWon from "@/components/craft/MaterialsWon";
import Crafting from "@/components/craft/Crafting";
import Reward from "@/components/craft/Reward";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAccount } from "wagmi";
import { CraftMaterial, NFTCraftMaterial } from "./craft";
import { IMAGEKIT_ICONS, IMAGEKIT_IMAGES } from "@/images";

const CraftStates = () => {
  const {
    state,
    totalMaterials,
    setTotalMaterials,
    nftMaterials,
    setNftMaterials,
  } = useCraftContext();
  const account = useAccount();

  useLayoutEffect(() => {
    let tokenIds: string[] = [];
    let duration = String(0);

    location.search
      .slice(1)
      .split("&")
      .forEach((param) => {
        const [key, value] = param.split("=");
        if (key === "duration") {
          duration = value;
        } else if (key === "tokenIds") {
          tokenIds = value.split("%2C").map((id) => id);
        }
      });

    const nftsMaterialsInternal: NFTCraftMaterial[] = [];

    const totalMaterialsCount = {
      common: 0,
      uncommon: 0,
      rare: 0,
      legendary: 0,
      mythic: 0,
    };
    const totalCraftsMaterials: CraftMaterial[] = [];

    if (tokenIds.length > 0) {
      for (let i = 0; i < tokenIds.length; i++) {
        fetch("/api/unstaking", {
          method: "POST",
          body: JSON.stringify({
            address: account.address,
            tokenId: tokenIds[i],
            stakingTimeInSecs: duration,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const materials: CraftMaterial[] = [];

            for (const [rarity, value] of Object.entries(data.materials) as [
              "common" | "uncommon" | "rare" | "legendary" | "mythic",
              number,
            ][]) {
              totalMaterialsCount[rarity] += value;
              let icon =
                IMAGEKIT_ICONS[
                  rarity == "mythic"
                    ? "MYTHICAL"
                    : (rarity.toUpperCase() as
                        | "COMMON"
                        | "UNCOMMON"
                        | "RARE"
                        | "LEGENDARY"
                        | "MYTHICAL")
                ];
              materials.push({
                rarity: rarity,
                quantity: value,
                icon: icon,
              });
            }

            if (i === tokenIds.length - 1) {
              for (const [rarity, value] of Object.entries(
                totalMaterialsCount,
              ) as [
                "common" | "uncommon" | "rare" | "legendary" | "mythic",
                number,
              ][]) {
                console.log("rarity", rarity, value);
                totalCraftsMaterials.push({
                  rarity: rarity,
                  quantity: value,
                  icon: IMAGEKIT_ICONS[
                    rarity == "mythic"
                      ? "MYTHICAL"
                      : (rarity.toUpperCase() as
                          | "COMMON"
                          | "UNCOMMON"
                          | "RARE"
                          | "LEGENDARY"
                          | "MYTHICAL")
                  ],
                });
              }
            }

            nftsMaterialsInternal.push({
              tokenId: tokenIds[i].toString(),
              materials: materials,
              nftIcon: IMAGEKIT_IMAGES.NFT_ICON,
            });
          });
      }
    }

    setTotalMaterials(totalCraftsMaterials);
    setNftMaterials(nftsMaterialsInternal);
  }, []);

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
