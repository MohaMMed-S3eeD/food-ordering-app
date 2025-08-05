import EditUserForm from "@/components/editUserForm";
import { getUserById } from "@/server/db/user";
import { Translations } from "@/types/translations";
import { getLocale } from "next-intl/server";
import React from "react";
import BtnCreateAdmin from "./_components/BtnCreateAdmin";
import { getServerSession } from "next-auth";
const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const user = await getUserById(userId);

  if (!user) {
    // Handle case where user is not found
    return <div>User not found</div>;
  }
  const session = await getServerSession();
  
  const sessionUser = {
    user: {
      ...user,
      image: user.image ?? undefined,
      phone: user.phone ?? undefined,
      streetAddress: user.streetAddress ?? undefined,
      postalCode: user.postalCode ?? undefined,
      city: user.city ?? undefined,
      country: user.country ?? undefined,
    },
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  const locale = await getLocale();
  const translations: Translations = await import(
    `@/messages/${locale}.json`
  ).then((module) => module.default);
  return (
    <div>
      <EditUserForm
        translations={translations}
        session={sessionUser}
        adminViewr={session}
      />
      <BtnCreateAdmin
        userId={userId}
        isAdminViewr={session?.user.email === "AdminView@gmail.com" && session?.user.name === "AdminView" ? true : false}
      />
    </div>
  );
};

export default page;
