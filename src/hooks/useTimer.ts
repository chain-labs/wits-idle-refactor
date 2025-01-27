"use client";

import { useEffect, useState } from "react";

let newTimer = new Date().getTime() / 1000 + 1000 * 10;

export default function useTimer(timeInSecs?: number) {
  const [time, setTime] = useState(
    Math.floor(newTimer - new Date().getTime() / 1000),
  );

  useEffect(() => {
    if (timeInSecs) {
      newTimer = timeInSecs;
      setTime(Math.floor(newTimer - new Date().getTime() / 1000));
    }
  }, [timeInSecs]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return {
    days: Math.floor(time / 86400),
    hours: Math.floor((time % 86400) / 3600),
    minutes: Math.floor((time % 3600) / 60),
    seconds: time % 60,
    end: time <= 0,
  };
}
