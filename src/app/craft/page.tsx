"use client";

import dynamic from "next/dynamic";
import CraftProvider from "./CraftContext";
import CraftLayout from "./CraftLayout";
import CraftStates from "./CraftStates";
import { useState } from "react";

function Craft() {
  const [openModal, setOpenModal] = useState<null | React.ReactNode>(null);
  return (
    <CraftProvider>
      <CraftLayout
        openModal={openModal}
        setOpenModal={setOpenModal}
        loading={false}
      >
        <CraftStates />
      </CraftLayout>
    </CraftProvider>
  );
}

export default dynamic(() => Promise.resolve(Craft), { ssr: false });
