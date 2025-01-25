"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.minHeight = "100vh";
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal") as HTMLDivElement;
    modalRoot.style.width = "100vw";
    modalRoot.style.minHeight = "100vh";
    document.body.style.overflow = "hidden";
    if (!modalRoot) {
      return;
    }
    modalRoot.appendChild(elRef.current as HTMLDivElement);
    return () => {
      modalRoot.style.width = "auto";
      modalRoot.style.height = "auto";
      modalRoot.style.minHeight = "0";
      document.body.style.overflow = "auto";
      modalRoot.removeChild(elRef.current as HTMLDivElement);
    };
  }, []);

  return createPortal(
    children as React.ReactNode,
    elRef.current as HTMLDivElement,
    "modal",
  );
}
