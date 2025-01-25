"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimateNumber({ num }: { num: number }) {
  const [numberState, setNumberState] = useState<{
    number: number;
    direction: "up" | "down";
  }>({
    number: 0,
    direction: "up",
  });
  useEffect(() => {
    if (numberState.number === num) return;
    setNumberState({
      number: num,
      direction: num > numberState.number ? "up" : "down",
    });
  }, [num]);

  return (
    <AnimatePresence>
      {num === numberState.number ? (
        <motion.span
          className="w-[1ch]"
          initial={{
            opacity: 0,
            y: numberState.direction === "up" ? "1em" : "-1em",
          }}
          animate={{ opacity: 1, y: "0em" }}
          exit={{
            opacity: 0,
            y: numberState.direction === "up" ? "1em" : "-1em",
          }}
        >
          {numberState.number}
        </motion.span>
      ) : (
        <span className="w-[1ch]"></span>
      )}
    </AnimatePresence>
  );
}
