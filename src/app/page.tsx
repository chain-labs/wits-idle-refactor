"use client";

import Button from "@/components/ui/Button";
import { IMAGEKIT_BG } from "@/images";
import Header from "@/components/global/Header";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
import Modal from "@/components/global/Modal";
import ModalRevealAnimation from "@/components/animations/ModalRevealAnimation";
import { useEffect, useState } from "react";

interface UserData {
  username: string;
  email: string;
}

function GetUserData({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<null | React.ReactNode>>;
}) {
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(userData));
    setOpenModal(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black/90 w-full h-full  flex flex-col justify-center items-center z-10"
    >
      <div className="w-fit flex flex-col justify-center items-center gap-6">
        <h1 className="text-white text-2xl">Provide us your details</h1>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          placeholder="Username"
          className="p-1 rounded-sm w-full text-black"
          required
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="p-1 rounded-sm w-full text-black"
          required
        />
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

function Home() {
  const account = useAccount();
  const [openModal, setOpenModal] = useState<null | React.ReactNode>(null);

  useEffect(() => {
    (() => {
      if (typeof window !== "undefined") {
        const localData = localStorage.getItem("userData");
        if (account.address && !localData) {
          // setOpenModal(<GetUserData setOpenModal={setOpenModal} />);
        }
      }
    })();
  }, [account.address]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${IMAGEKIT_BG.HOMEPAGE})`,
        }}
        className="relative h-screen w-full bg-cover bg-center overflow-hidden z-0"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black z-0"></div>

        <Header active="home" />

        <div className="absolute bottom-0 left-0 h-[40vh] w-full rounded-[100%]  bg-[radial-gradient(#FDD88840,#FDD88800,#FDD88800)]"></div>
        {!account.address ? (
          <a
            href="/signin"
            className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 -translate-y-full z-0"
          >
            <Button>SIGNIN</Button>
          </a>
        ) : (
          <a
            href="/game"
            target="_self"
            className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 -translate-y-full z-0"
          >
            <Button>START GAME</Button>
          </a>
        )}
      </div>
      {openModal && (
        <Modal>
          <ModalRevealAnimation>{openModal}</ModalRevealAnimation>
        </Modal>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
