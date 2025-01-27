"use client";

import AnimateNumber from "../animations/AnimateNumber";

function TimerWithLabel({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-[48px]">
        <div className="flex justify-center items-center overflow-hidden">
          <AnimateNumber num={Number(String(value).padStart(2, "0")[0])} />
          <AnimateNumber num={Number(String(value).padStart(2, "0")[1])} />
        </div>
      </h1>
      <p className="text-[12px] uppercase">{label}</p>
    </div>
  );
}

export default function AdventureProgress({
  time,
}: {
  time: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    end: boolean;
  };
}) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-[10px] z-10">
      <h3 className="uppercase text-[16px] z-10 text-lightGold">
        Adventure in progress
      </h3>
      <div className="px-[48px] py-[18px] grid grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto] place-items-center gap-[16px] bg-gradient-to-b from-mediumGold  to-darkGold z-10 text-black rounded-[4px]">
        <TimerWithLabel label="Days" value={time.days} />
        <h1 className="font-bold text-[48px] leading-[56px] place-self-start mx-auto">
          :
        </h1>
        <TimerWithLabel label="Hours" value={time.hours} />
        <h1 className="font-bold text-[48px] leading-[56px] place-self-start mx-auto">
          :
        </h1>
        <TimerWithLabel label="Minutes" value={time.minutes} />
        <h1 className="font-bold text-[48px] leading-[56px] place-self-start mx-auto">
          :
        </h1>
        <TimerWithLabel label="Seconds" value={time.seconds} />
      </div>
    </div>
  );
}
