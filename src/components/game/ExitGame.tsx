import { cn } from "@/utils";
import Link from "next/link";

export default function ExitGame({
  closeModal,
  openModal,
}: {
  closeModal: () => void;
  openModal?: () => void;
}) {
  return (
    <div className="relative w-full h-full bg-black/75 backdrop-blur-[25px] flex flex-col justify-center items-center z-0">
      <div
        onMouseDown={closeModal}
        className="absolute inset-0 w-full h-full z-[-1]"
      ></div>
      <div
        className={cn(
          "rounded-[8px] outline outline-1 outline-offset-4 outline-mediumGold",
          "bg-gradient-to-tr from-mediumGold to-lightGold",
          "flex flex-col justify-center items-center",
          "p-[48px]",
        )}
      >
        <h1 className="text-[32px] text-black uppercase font-medium">
          ARE YOU SURE
        </h1>
        <p className="text-[12px] text-black uppercase font-regular">
          Do you really want to exit this game?
        </p>

        <div className="flex justify-center items-center gap-[8px] mt-[16px]">
          <Link
            href="/"
            className="bg-black text-lightGold uppercase px-[48px] py-[8px]"
          >
            YES
          </Link>
          <button
            onClick={closeModal}
            className="bg-black text-lightGold uppercase px-[48px] py-[8px]"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
}
