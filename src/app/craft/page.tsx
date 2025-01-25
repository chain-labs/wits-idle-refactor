"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useAccount } from "wagmi";

function Craft() {
  const account = useAccount();
  return (
    <div>
      {account.address}
      <Link href="/game">Game</Link>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Craft), { ssr: false });
