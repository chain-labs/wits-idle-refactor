"use client";

import { motion } from "framer-motion";
import React, { forwardRef, useRef, useState } from "react";
import { cn } from "@/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const { className, errorMessage, ...inputProps } = props;

    const [isFocused, setIsFocused] = useState(false);

    function handleFocus() {
      setIsFocused(true);
    }

    const parentRef = useRef<HTMLDivElement>(null);

    function handleBlur() {
      if ((parentRef.current?.children[1] as HTMLInputElement)?.value === "") {
        setIsFocused(false);
      }
    }

    return (
      <div
        onBlur={handleBlur}
        ref={parentRef}
        className="relative pt-[12px] w-full"
      >
        <motion.label
          animate={{
            transform: isFocused ? "translateY(-125%)" : "translateY(-50%)",
            fontSize: isFocused ? "10px" : "14px",
            opacity: isFocused ? 0.5 : 1,
            color: isFocused ? "#797979" : "#FFFED0",
          }}
          onClick={() => {
            const inputElement = parentRef.current
              ?.children[1] as HTMLInputElement;
            if (inputElement) {
              inputElement.focus();
            }
          }}
          htmlFor="input"
          className="uppercase text-lightGold text-[14px] absolute top-1/2 -translate-y-1/2 user-select-none cursor-text w-full"
        >
          {props.placeholder}{" "}
          <span className="text-red-500 absolute right-0 top-0">
            {errorMessage}
          </span>
        </motion.label>
        <input
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "input w-full bg-transparent border-b-[1px] border-[#292929] pt-[12px] outline-none text-lightGold",
            className,
          )}
          {...inputProps}
          placeholder=""
          onChange={(e) => {
            if (e.target.value !== "") handleFocus();
            else handleBlur();
          }}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
