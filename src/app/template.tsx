"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const account = useAccount();

  useEffect(() => {
    if (!account.address) {
      router.push("/signin");
    }
  }, [account]);
  return children;
}

export default dynamic(() => Promise.resolve(Template), { ssr: false });