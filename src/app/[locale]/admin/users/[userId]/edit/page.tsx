import EditUserForm from "@/components/editUserForm";
import { getUserById } from "@/server/db/user";
import { Translations } from "@/types/translations";
import { getLocale } from "next-intl/server";
import React from "react";
import BtnCreateAdmin from "./_components/BtnCreateAdmin";
const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const user = await getUserById(userId);

  if (!user) {
    // Handle case where user is not found
    return <div>User not found</div>;
  }

  const session = {
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
      <EditUserForm translations={translations} session={session} />
      <BtnCreateAdmin userId={userId} />
    </div>
  );
};

export default page;
