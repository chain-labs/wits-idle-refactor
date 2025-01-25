import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "ik.imagekit.io",
				protocol: "https",
			},
			{
				hostname: "s3.amazonaws.com",
				protocol: "https",
			},
		],
		dangerouslyAllowSVG: true,
	},
};

export default nextConfig;
