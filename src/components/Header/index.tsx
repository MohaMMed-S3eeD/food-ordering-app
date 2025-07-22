import React from "react";
import Link from "../Link";
import { Routes } from "@/constants/enums";
import Navbar from "./Navbar";
import CartButton from "./cart-button";
// import { useLocale, useTranslations } from "next-intl";
import BtnChangeLang from "@/app/[locale]/_components/BtnChangeLang";
import AuthBtn from "./AuthBtn";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/server/auth";
import { getLocale, getTranslations } from "next-intl/server";
import PageUser from "./PageUser";

const Header = async () => {
  const t = await getTranslations("logo");
  const session = await getServerSession(AuthOptions);
  const locale = await getLocale();
  return (
    <header className="py-4 ">
      <div className="container flex justify-between items-center ">
        <div className="flex flex-row-reverse  sm:flex-row items-center gap-4">
          <Link
            href={Routes.ROOT}
            className="text-primary font-semibold text-xl z-500 "
          >
            🍕 {t("logo")}
          </Link>
          <Navbar initialSession={session} />
          <div className="hidden sm:block">
            <PageUser initialSession={session} />
          </div>
        </div>
        <div
          className={`flex flex-row items-center ${
            locale === "en" ? "gap-2" : "sm:gap-2"
          }`}
        >
          <div className="hidden sm:block">
            <AuthBtn initialSession={session} />
          </div>
          <div className="hidden sm:block">
            <BtnChangeLang />
          </div>

          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
