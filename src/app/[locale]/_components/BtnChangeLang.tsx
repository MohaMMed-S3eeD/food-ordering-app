"use client";
import { Languages } from "lucide-react";
import React from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import "@/components/ui/btn crach/style.css";

const BtnChangeLang = () => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <Link
      
      href={pathname}
      locale={locale === "en" ? "ar" : "en"}
      className="block w-full"
    >
      <span className="flex bubbles items-center gap-2 text whitespace-nowrap justify-center w-full">
        <span className="flex items-center gap-2 text text-center">
          <Languages className="w-4 h-4" />
          {locale === "en" ? "AR" : "EN"}
        </span>
      </span>
    </Link>
  );
};

export default BtnChangeLang;
