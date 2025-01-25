import Link from "next/link";
import GlowingH1 from "../ui/GlowingH1";

export default function GameModeBanner() {
  return (
    <div className="relative z-10">
      <svg
        width="100%"
        height="auto"
        viewBox="0 0 1440 106"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-h-[300px]"
      >
        <g filter="url(#filter0_b_9_2)">
          <path
            d="M390 39.3684H0V0H1440V39H1050L981 95H459L390 39.3684Z"
            fill="#FFFED0"
            fillOpacity="0.1"
          />
        </g>
        <path d="M0 39H390L459 95H981L1050 39H1440" stroke="#EFC779" />
        <path
          d="M0 49H402.316L471.115 105H968.757L1037.69 49H1440"
          stroke="#EFC779"
        />
        <defs>
          <filter
            id="filter0_b_9_2"
            x="-15"
            y="-15"
            width="1470"
            height="125"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_9_2"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_9_2"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      <Link
        href="/"
        className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex justify-center items-center"
      >
        <GlowingH1 className="text-[18px] xl:text-[36px]">Game Mode</GlowingH1>
      </Link>

      <div className="absolute bottom-0 left-1/2 -translate-y-1/2 w-[40px] scale-50 md:scale-[0.9] xl:scale-100 h-[fitpx]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-black rotate-45 border-[1px] border-darkGold p-[3px] shadow-[0_0_10px_#EFC779AA]">
            <div className=" p-[8px] border-[1px] border-mediumGold"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
