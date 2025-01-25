"use client";

import Link from "next/link";
import { useAccount } from "wagmi";

export default function Craft() {
	const account = useAccount();
	return (
		<div>
			{account.address}
			<Link href="/game">Game</Link>
		</div>
	);
}
