"use client";

import { createContext, useContext, FC, ReactNode } from "react";
import useSessionKeyState, { SessionKeyState } from "@/hooks/useSessionKey";

const SessionKeyContext = createContext<SessionKeyState | undefined>(undefined);

export const SessionKeyProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const sessionState = useSessionKeyState();

  return (
    <SessionKeyContext.Provider value={sessionState}>
      {children}
    </SessionKeyContext.Provider>
  );
};

export const useSessionKey = (): SessionKeyState => {
  const context = useContext(SessionKeyContext);
  if (context === undefined) {
    throw new Error("useSessionKey must be used within a SessionKeyProvider");
  }
  return context;
};
