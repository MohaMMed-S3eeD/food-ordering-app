import { Pages, Routes } from "@/constants/enums";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

const page = async () => {
  const locale = await getLocale();
  const t = await getTranslations("admin");
  return (
    <main>
      <section>
        <div>
          <Link
            href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${Pages.NEW}`}
          >
            {t("menu-items.createNewMenuItem")}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default page;
