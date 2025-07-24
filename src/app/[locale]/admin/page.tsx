import React from "react";
import EditUserForm from "@/components/editUserForm";
import { Translations } from "@/types/translations";
import { getLocale } from "next-intl/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/server/auth";
// todo : Create Tabs for Admin Dashboard https://youtu.be/hDrt1ifv94o?t=21172
const Admin = async () => {
  const session = await getServerSession(AuthOptions);
  const locale = await getLocale();
  const translations: Translations = await import(
    `@/messages/${locale}.json`
  ).then((module) => module.default);
  return (
    <div>
      <h1>Admin</h1>
      <EditUserForm translations={translations} session={session} />
    </div>
  );
};

export default Admin;
