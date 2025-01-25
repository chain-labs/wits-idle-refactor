"use client";

import { AbstractWalletProvider } from "@abstract-foundation/agw-react";
import dynamic from "next/dynamic";
import { abstractTestnet } from "viem/chains";

const config = {
  chain: abstractTestnet,
  testnet: true, // Required
  // Optionally, provide your own RPC URL (learn more: https://viem.sh/docs/clients/transports/http.html)
  // transport: http("https://your.abstract.node.example.com/rpc") // Optional
};

const AbstractProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AbstractWalletProvider config={config}>{children}</AbstractWalletProvider>
  );
};

export default dynamic(() => Promise.resolve(AbstractProvider), { ssr: false });
