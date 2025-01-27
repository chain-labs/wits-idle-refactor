"use client";

import { FaChevronLeft } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Button from "../ui/Button";

export interface CraftFooterProps {
  backButton: {
    function?: () => void;
    visible: boolean;
    disabled?: boolean;
  };
  primaryButton: {
    function?: () => void;
    visible: boolean;
    disabled?: boolean;
    text: string;
    loading?: boolean;
  };
  exitButton: {
    function?: () => void;
    visible: boolean;
    disabled?: boolean;
  };
}

export default function CraftFooter(
  props: CraftFooterProps = {
    backButton: {
      visible: true,
    },
    primaryButton: {
      visible: true,
      text: "",
    },
    exitButton: {
      visible: true,
    },
  },
) {
  return (
    <div className="fixed bottom-0 w-full h-fit flex justify-between items-center border-t-[1px] border-lightGold px-[32px] py-[16px] bg-black z-10">
      {props.backButton.visible ? (
        <button
          disabled={props.backButton.disabled}
          onClick={props.backButton.function}
          className="bg-gradient-to-b from-[#FFFED0] to-[#EFC779] text-black aspect-square flex justify-center items-center w-[48px] h-[48px] rounded-[4px] group"
        >
          <FaChevronLeft className="group-hover:scale-[1.5] transition-all duration-300" />
        </button>
      ) : (
        <div></div>
      )}

      {props.primaryButton.visible ? (
        <Button
          disabled={props.primaryButton.disabled}
          onClick={props.primaryButton.function}
          isLoading={props.primaryButton.loading}
        >
          {props.primaryButton.text}
        </Button>
      ) : (
        <div></div>
      )}

      {props.exitButton.visible ? (
        <button
          disabled={props.exitButton.disabled}
          onClick={props.exitButton.function}
          className="bg-gradient-to-b from-[#FFFED0] to-[#EFC779] text-black aspect-square flex justify-center items-center w-[48px] h-[48px] rounded-[4px] text-[24px] group"
        >
          <IoClose className="group-hover:rotate-180 transition-all duration-300" />
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
