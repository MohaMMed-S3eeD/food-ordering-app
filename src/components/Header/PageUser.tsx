"use client";
import { Routes, UserRole } from "@/constants/enums";
import { useClientSession } from "@/hooks/initialSession";
import { Session } from "next-auth";
import React from "react";
import Link from "../Link";
import ButtonCrach from "../ui/btn crach/buttonCrach";
import { useTranslations } from "next-intl";

const PageUser = ({ initialSession }: { initialSession: Session | null }) => {
  const session = useClientSession(initialSession);
  const isAdmin = session.data?.user.role === UserRole.ADMIN;
  const t = useTranslations("navbar");
  return (
    session.data?.user.role && (
      <ButtonCrach className="bubbles-login btn-login w-full sm:w-auto">
        <Link href={`/${isAdmin ? Routes.ADMIN : Routes.PROFILE}`}>
          <span className="text">{isAdmin ? t("admin") : t("profile")}</span>
        </Link>
      </ButtonCrach>
    )
  );
};

export default PageUser;
