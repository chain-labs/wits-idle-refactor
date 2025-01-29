"use client";

import { envVars } from "@/envVars";
import { AbstractWalletProvider } from "@abstract-foundation/agw-react";
import { QueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { http } from "viem";
import { abstractTestnet, abstract } from "viem/chains";

// const config = {
//   chain: abstractTestnet,
//   testnet: true, // Required
//   // Optionally, provide your own RPC URL (learn more: https://viem.sh/docs/clients/transports/http.html)
//   // transport: http("https://your.abstract.node.example.com/rpc") // Optional
// };

const queryClient = new QueryClient();

const AbstractProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AbstractWalletProvider
      queryClient={queryClient}
      chain={envVars.TEST_NETWORK ? abstractTestnet : abstract}
      transport={http(
        envVars.TEST_NETWORK
          ? "https://api.testnet.abs.xyz"
          : "https://api.mainnet.abs.xyz",
      )}
    >
      {children}
    </AbstractWalletProvider>
  );
};

export default dynamic(() => Promise.resolve(AbstractProvider), { ssr: false });
