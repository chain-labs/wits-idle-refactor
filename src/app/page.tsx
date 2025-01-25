"use client";

import Button from "@/components/ui/Button";
import { IMAGEKIT_BG } from "@/images";
import Header from "@/components/global/Header";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function Home() {
	const account = useAccount();
	return (
		<div
			style={{
				backgroundImage: `url(${IMAGEKIT_BG.HOMEPAGE})`,
			}}
			className="relative h-screen w-full bg-cover bg-center overflow-hidden"
		>
			<div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black z-0"></div>

			<Header active="home" />

			<div className="absolute bottom-0 left-0 h-[40vh] w-full rounded-[100%]  bg-[radial-gradient(#FDD88840,#FDD88800,#FDD88800)]"></div>
			{!account ? (
				<Link
					href="/login"
					className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 -translate-y-full z-0"
				>
					<Button>SIGNIN</Button>
				</Link>
			) : (
				<Link
					href="/game"
					className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 -translate-y-full z-0"
				>
					<Button>START GAME</Button>
				</Link>
			)}
		</div>
	);
}
