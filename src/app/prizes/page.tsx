"use client";


import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Modal from "@/components/global/Modal";
import ModalRevealAnimation from "@/components/animations/ModalRevealAnimation";
import Header from "@/components/global/Header";
import { IMAGEKIT_BG } from "@/images";
import PrizeCollectConfirmation from "@/components/prize/PrizeCollectConfirmation";

const ContactInformationSchema = z.object({
  emailOrTwitter: z.string().email().optional(),
  country: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  optionalAddress: z.string().optional(),
  city: z.string(),
  province: z.string(),
  postalcode: z.string(),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    emailOrTwitter: string;
    country: string;
    firstName: string;
    lastName: string;
    address: string;
    optionalAddress: string;
    city: string;
    province: string;
    postalcode: string;
  }>({
    resolver: zodResolver(ContactInformationSchema),
  });

  const [openModal, setOpenModal] = useState<null | React.ReactNode>(null);

  function handleShippingFormSubmit() {
    setOpenModal(
      <PrizeCollectConfirmation closeModal={() => setOpenModal(null)} />,
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-cover bg-center overflow-x-hidden bg-blend-multiply bg-opacity-10 z-0">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-[#0000] to-black z-[-1]"></div>
      <div
        style={{
          backgroundImage: `url(${IMAGEKIT_BG.PRIZE})`,
        }}
        className="absolute inset-0 w-full h-full bg-cover opacity-10"
      ></div>
      <Header active="prizes" />
      <div className="flex justify-center items-center gap-[10px] mb-[16px] mt-[48px]">
        <svg
          width="261"
          height="12"
          viewBox="0 0 261 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="0.706021"
            width="7.0123"
            height="7.0123"
            transform="matrix(0.708191 0.706021 -0.708191 0.706021 255.826 0.207555)"
            fill="black"
            stroke="#8C8C73"
          />
          <path d="M251 6.00002L0 6" stroke="url(#paint0_linear_9_2)" />
          <defs>
            <linearGradient
              id="paint0_linear_9_2"
              x1="251"
              y1="6.00002"
              x2="55.6404"
              y2="6.00001"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8C8C73" />
              <stop offset="1" stopColor="#8C8C73" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <h1 className="uppercase text-lightGold text-[24px] mx-[50px]">
          Shipping
        </h1>

        <svg
          width="261"
          height="12"
          viewBox="0 0 261 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-180"
        >
          <rect
            y="0.706021"
            width="7.0123"
            height="7.0123"
            transform="matrix(0.708191 0.706021 -0.708191 0.706021 255.826 0.207555)"
            fill="black"
            stroke="#8C8C73"
          />
          <path d="M251 6.00002L0 6" stroke="url(#paint0_linear_9_2)" />
          <defs>
            <linearGradient
              id="paint0_linear_9_2"
              x1="251"
              y1="6.00002"
              x2="55.6404"
              y2="6.00001"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8C8C73" />
              <stop offset="1" stopColor="#8C8C73" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex justify-start items-start gap-[50px] my-[50px] z-10 max-w-[1200px] mx-auto">
        <form className="flex flex-col justify-start items-start gap-[24px] rounded-[8px] border-[1px] border-[#292929] bg-[#14141480] px-[54px] py-[64px] uppercase text-lightGold z-10 w-full">
          <h2 className="bg-[#141414] px-[16px] py-[8px] rounded-[4px] w-[calc(100%+16px)] -translate-x-[16px]">
            Contact Information
          </h2>
          <Input
            placeholder="Email or Twitter"
            {...register("emailOrTwitter")}
          />
          <h2 className="bg-[#141414] px-[16px] py-[8px] rounded-[4px] w-[calc(100%+16px)] -translate-x-[16px] mt-[64px]">
            SHIPPING ADDRESS
          </h2>
          <Input placeholder="Country/Region" {...register("country")} />
          <div className="flex justify-center items-center gap-[16px] w-full">
            <Input placeholder="First Name" {...register("firstName")} />
            <Input placeholder="Last Name" {...register("lastName")} />
          </div>
          <Input placeholder="Address" {...register("address")} />
          <Input
            placeholder="Apartment, suite, etc..(optional)"
            {...register("optionalAddress")}
          />
          <div className="flex justify-center items-center gap-[16px] w-full">
            <Input placeholder="City" {...register("city")} />
            <Input placeholder="Province" {...register("province")} />
          </div>
          <Input placeholder="Postal Code" {...register("postalcode")} />
        </form>

        <div className="flex flex-col justify-start items-start gap-[24px] rounded-[8px] border-[1px] border-[#292929] bg-[#14141480] px-[48px] py-[64px] uppercase text-lightGold z-10 w-full max-w-[500px]">
          <div className="flex justify-start items-start gap-[24px]">
            <div className="relative bg-black rounded-[4px] w-[152px] h-[135px]">
              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#292929] text-white w-[35px] h-[35px] flex justify-center items-center">
                1
              </div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className="uppercase">PRIZE NAME</p>
              <p className="capitalize">Date Time</p>
              <p className="capitalize">Prize ID</p>
              <p className="capitalize">Rarity</p>
            </div>
          </div>
          <hr className="h-[1px] w-full border-[#292929]" />
          <button
            type="button"
            onClick={handleShippingFormSubmit}
            className="bg-black py-[16px] w-full h-fit border border-lightGold text-lightGold rounded-[4px] uppercase"
          >
            SUBMIT
          </button>
        </div>
      </div>
      {openModal !== null && (
        <Modal>
          <ModalRevealAnimation>{openModal}</ModalRevealAnimation>
        </Modal>
      )}
    </div>
  );
}
