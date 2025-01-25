"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Template({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const account = useAccount();

	useEffect(() => {
		if (!account.address) {
			router.push("/signin");
		}
	}, [account]);
	return children;
}
