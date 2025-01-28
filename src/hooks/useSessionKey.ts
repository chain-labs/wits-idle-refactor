import useNFTs from "@/abi/Nfts";
import usePayMaster from "@/abi/PayMaster";
import useStaking from "@/abi/Staking";

import {
  LimitType,
  SessionClient,
  SessionConfig,
} from "@abstract-foundation/agw-client/sessions";

import {
  useAbstractClient,
  useCreateSession,
} from "@abstract-foundation/agw-react";
import React, { useEffect, useMemo, useState } from "react";
import { parseEther, toFunctionSelector } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { abstractTestnet } from "viem/chains";
import { getGeneralPaymasterInput } from "viem/zksync";

const AGW_PAYMASTER = "0x5407B5040dec3D339A9247f3654E59EEccbb6391";

export interface SessionKeyState {
  session: SessionClient | null;
  sessionReady: boolean;
  createNewSession: () => Promise<void>;
}

const useSessionKeyState = (): SessionKeyState => {
  const nftContract = useNFTs();
  const staking = useStaking();
  const paymaster = usePayMaster();
  const { data: agwClient, status } = useAbstractClient();

  const [currentSession, setCurrentSession] = useState<SessionClient | null>(
    null,
  );

  useEffect(() => {
    if (status !== "success" || !agwClient) return;

    const sessionKeyStore = localStorage.getItem("agw_sessionKeyStore");
    if (!sessionKeyStore) return;

    const { session, privateKey } = JSON.parse(sessionKeyStore);
    const sessionSigner = privateKeyToAccount(privateKey);
    const sessionClient = agwClient.toSessionClient(sessionSigner, session);
    setCurrentSession(sessionClient);
  }, [agwClient, status]);

  const sessionReady = useMemo(() => {
    const sessionData = localStorage.getItem("agw_sessionKeyStore");
    if (sessionData) return true;
    if (currentSession?.account) return true;
    return false;
  }, [currentSession]);

  async function createNewSession() {
    if (!agwClient) return;

    const sessionPrivateKey = generatePrivateKey();
    const sessionSigner = privateKeyToAccount(sessionPrivateKey);
    console.log({ sessionSigner });

    const { session, transactionHash } = await agwClient.createSession({
      session: {
        signer: sessionSigner.address,
        expiresAt: BigInt(Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30),
        feeLimit: {
          limitType: LimitType.Lifetime,
          limit: parseEther("1"),
          period: BigInt(0),
        },
        callPolicies: [
          // Mint NFT
          {
            target: nftContract.address as `0x${string}`,
            selector: toFunctionSelector("mint(uint256)"),
            valueLimit: {
              limitType: LimitType.Unlimited,
              limit: BigInt(0),
              period: BigInt(0),
            },
            maxValuePerUse: BigInt(0),
            constraints: [],
          },
          // Set Approval
          {
            target: nftContract.address as `0x${string}`,
            selector: toFunctionSelector("setApprovalForAll(address,bool)"),
            valueLimit: {
              limitType: LimitType.Unlimited,
              limit: BigInt(0),
              period: BigInt(0),
            },
            maxValuePerUse: BigInt(0),
            constraints: [],
          },
          // Stake NFT
          {
            target: staking.address as `0x${string}`, // NFT contract
            selector: toFunctionSelector(
              "batchStakeNFTs(address,uint256[],uint256)",
            ),
            valueLimit: {
              limitType: LimitType.Unlimited,
              limit: BigInt(0),
              period: BigInt(0),
            },
            maxValuePerUse: BigInt(0),
            constraints: [],
          },
          // Unstake NFT
          {
            target: staking.address as `0x${string}`, // NFT contract
            selector: toFunctionSelector("batchUnstakeNFTs(uint256[])"),
            valueLimit: {
              limitType: LimitType.Unlimited,
              limit: BigInt(0),
              period: BigInt(0),
            },
            maxValuePerUse: BigInt(0),
            constraints: [],
          },
        ],
        transferPolicies: [],
      },
      paymaster: AGW_PAYMASTER as `0x${string}`,
      paymasterInput: getGeneralPaymasterInput({
        innerInput: "0x",
      }),
    });

    const bigIntReplacer = (key: string, value: any) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    };

    const sessionData = {
      session: session,
      privateKey: sessionPrivateKey,
    };

    const sessionClient = agwClient.toSessionClient(sessionSigner, session);
    setCurrentSession(sessionClient);

    localStorage.setItem(
      "agw_sessionKeyStore",
      JSON.stringify(sessionData, bigIntReplacer),
    );
  }

  return {
    session: currentSession,
    sessionReady,
    createNewSession,
  };
};

export default useSessionKeyState;
