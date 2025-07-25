import React from "react";
import EditUserForm from "@/components/editUserForm";
import { Translations } from "@/types/translations";
import { getLocale } from "next-intl/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/server/auth";
// todo : https://youtu.be/hDrt1ifv94o
const Admin = async () => {
  const session = await getServerSession(AuthOptions);
  const locale = await getLocale();
  const translations: Translations = await import(
    `@/messages/${locale}.json`
  ).then((module) => module.default);
  return (
    <div>
      <EditUserForm translations={translations} session={session} />
    </div>
  );
};

export default Admin;
