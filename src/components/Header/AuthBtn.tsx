"use client";
import React from "react";
import Link from "../Link";
import ButtonCrach from "../ui/btn crach/buttonCrach";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useClientSession } from "@/hooks/initialSession";
import { Session } from "next-auth";

const AuthBtn = ({ initialSession }: { initialSession: Session | null }) => {
  const t2 = useTranslations("navbar");
  const session = useClientSession(initialSession);
  return session.data?.user ? (
    <Link
      onClick={() => {
        signOut();
        toast.success(t2("signOut"), {
          style: {
            background: "orange",
            color: "white",
            border: "1px solid #b91c1c",
          },
        });
      }}
      href={`/`}
      className=" sm:flex group cursor-pointer"
    >
      <div className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 border border-primary/20 hover:border-primary/40">
        <p className="flex items-center gap-1 w-full  text-sm  font-semibold text-primary group-hover:text-primary/80 transition-colors">
          <span className="inline w-full text-center">
            {session.data?.user.name && session.data.user.name.length > 17
              ? `${session.data.user.name.substring(0, 12)}...`
              : session.data?.user.name}
          </span>
        </p>
        <span className="hidden text-xs text-gray-500 group-hover:text-primary transition-colors font-medium">
          {t2("signOut")}
        </span>
      </div>
    </Link>
  ) : (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Link href={`/auth/signin`} className=" sm:block">
        <ButtonCrach className="login-btn bubbles-login w-full sm:w-auto text-center whitespace-nowrap">
          {t2("login")}
        </ButtonCrach>
      </Link>
      <Link href={`/auth/signup`} className=" sm:block">
        <ButtonCrach className="login-btn bubbles-login w-full sm:w-auto text-center whitespace-nowrap">
          {t2("register")}
        </ButtonCrach>
      </Link>
    </div>
  );
};

export default AuthBtn;
