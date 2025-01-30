"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useRestFetch } from "@/hooks/api/useRestClient";

type MaterialsData = {
  used: Materials;
  unused: Materials;
  progress: Materials;
};

type UserDataContextType = {
  address: Address;
  setAddress: Dispatch<SetStateAction<Address>>;
  materials: MaterialsData;
  setMaterials: Dispatch<SetStateAction<MaterialsData>>;
  rewards: Reward[];
  setRewards: Dispatch<SetStateAction<Reward[]>>;
};

type Reward = {
  rewardId: string;
  rewardImageUrl: string;
  rewardName: string;
  dateTimeInSecs: number;
  rewardRarity: "common" | "uncommon" | "rare" | "legendary" | "mythic";
};

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined,
);

export const useUserDataContext = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error(
      "useUserDataContext must be used within a UserDataProvider",
    );
  }
  return context;
};

const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  // account
  const account = useAccount();

  const [address, setAddress] = useState<Address>(
    "0x0000000000000000000000000000000000000000" as Address,
  );

  useEffect(() => {
    setAddress(account.address as Address);
  }, [account.address]);

  // materials
  const [materials, setMaterials] = useState<MaterialsData>({
    used: {
      common: 0,
      uncommon: 0,
      rare: 0,
      legendary: 0,
      mythic: 0,
    },
    unused: {
      common: 0,
      uncommon: 0,
      rare: 0,
      legendary: 0,
      mythic: 0,
    },
    progress: {
      common: 0,
      uncommon: 0,
      rare: 0,
      legendary: 0,
      mythic: 0,
    },
  });

  const { data: materialsData } = useRestFetch<{
    status: string;
    materials: MaterialsData;
  }>(["userMaterials"], `/userMaterials/${account.address}`, {
    enabled: !!account.address,
  });

  useEffect(() => {
    if (materialsData) {
      setMaterials(materialsData.materials);
    }
  }, [materialsData]);

  // rewards
  const [rewards, setRewards] = useState<Reward[]>([]);

  const { data: rewardsData } = useRestFetch<{
    status: string;
    data: {
      rewardsList: Reward[];
    };
  }>(["userRewards"], "/userRewards", { enabled: !!account.address });

  useEffect(() => {
    if (rewardsData) {
      setRewards(rewardsData.data.rewardsList);
    }
  }, [rewardsData]);

  return (
    <UserDataContext.Provider
      value={{
        address,
        setAddress,
        materials,
        setMaterials,
        rewards,
        setRewards,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default dynamic(() => Promise.resolve(UserDataProvider), { ssr: false });
