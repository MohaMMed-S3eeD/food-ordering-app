"use client";
import React, { useState } from "react";
import Link from "../Link";
import { Routes } from "@/constants/enums";
import ButtonCrach from "../ui/btn crach/buttonCrach";
import { AlignLeft, X } from "lucide-react";
import BtnChangeLang from "@/app/[locale]/_components/BtnChangeLang";
import { useTranslations } from "next-intl";
import { Session } from "next-auth";
import AuthBtn from "./AuthBtn";

//todo : add Link Profile Or Admin 04:00:00

const Navbar = ({ initialSession }: { initialSession: Session | null }) => {
  const t = useTranslations("navbar");
  const links = [
    {
      id: crypto.randomUUID(),
      title: t("menu"),
      href: Routes.MENU,
    },
    {
      id: crypto.randomUUID(),
      title: t("about"),
      href: Routes.ABOUT,
    },
    {
      id: crypto.randomUUID(),
      title: t("contact"),
      href: Routes.CONTACT,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="sm:hidden z-500">
        {isOpen ? (
          <X
            className="text-primary h-5 w-5 sm:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <AlignLeft
            className="text-primary h-5 w-5 sm:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>

      <nav
        className={`${
          isOpen
            ? "animate-in slide-in-from-top-full duration-300"
            : "animate-out slide-out-to-top-full duration-300 hidden sm:flex sm:animate-in sm:non-in-from-top-full"
        } flex-1 fixed top-10 left-0 right-0 z-50 sm:static flex justify-center sm:justify-end items-center  backdrop-blur-sm border-b sm:border-none shadow-lg sm:shadow-none w-full mt-3 sm:mt-0 px-4 sm:px-0 py-4 sm:py-0`}
      >
        <ul className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md sm:w-auto">
          {links.map((link) => (
            <li className="w-full sm:w-auto" key={link.id}>
              <Link href={`/${link.href}`} className="text-primary block">
                <ButtonCrach
                  onClick={() => setIsOpen(false)}
                  className="bubbles w-full sm:w-auto text-center whitespace-nowrap"
                >
                  {link.title}
                </ButtonCrach>
              </Link>
            </li>
          ))}
          <li className="w-full block sm:w-auto sm:mb-0 sm:hidden">
            <AuthBtn initialSession={initialSession} />
          </li>
          <li className="block sm:hidden text-center">
            <BtnChangeLang />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
