"use client";
import React, { useState } from "react";
import Link from "../Link";
import { Pages, Routes } from "@/constants/enums";
import ButtonCrach from "../ui/btn crach/buttonCrach";
import { AlignLeft, X } from "lucide-react";

const Navbar = () => {
  const links = [
    {
      id: crypto.randomUUID(),
      title: "Menu",
      href: Routes.MENU,
    },
    {
      id: crypto.randomUUID(),
      title: "About",
      href: Routes.ABOUT,
    },
    {
      id: crypto.randomUUID(),
      title: "Contact",
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
                <ButtonCrach className="bubbles w-full sm:w-auto text-center">
                  {link.title}
                </ButtonCrach>
              </Link>
            </li>
          ))}
          <li className="w-full sm:w-auto mb-2 sm:mb-0">
            <Link href={`/${Pages.LOGIN}`} className="block">
              <ButtonCrach className="login-btn bubbles-login w-full sm:w-auto text-center">
                Login
              </ButtonCrach>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
