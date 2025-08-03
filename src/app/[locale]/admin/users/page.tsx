import React from "react";
import { getUsers } from "@/server/db/user";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import BtnDelete from "./_components/BtnDelete";
import Image from "next/image";
import { UserRole } from "@/constants/enums";

const page = async () => {
  const locale = await getLocale();
  const t = await getTranslations("mo.users");
  const users = await getUsers();

  // Convert translations to a regular object to pass to Client Component
  const translations = {
    edit: t("edit"),
    delete: t("delete"),
    deleteConfirmationTitle: t("deleteConfirmationTitle"),
    deleteConfirmation: t("deleteConfirmation"),
    userDeleted: t("userDeleted"),
    cancel: t("cancel"),
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-primary mb-2">
          {t("users")}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        {users && users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    {t("image")}
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    {t("name")}
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    {t("role")}
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    {t("email")}
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    {t("phone")}
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    {t("address")}
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-muted/25 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={
                            user.image ||
                            "https://static.thenounproject.com/png/user-avatar-icon-363640-512.png"
                          }
                          alt={user.name || "User"}
                          width={40}
                          height={40}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">
                        <Link
                          href={`/${locale}/admin/users/${user.id}/edit`}
                          className="hover:text-primary transition-colors"
                        >
                          {user.name || "No name"}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-foreground">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === UserRole.ADMIN
                              ? "bg-red-100 text-red-800 border border-red-200"
                              : "bg-green-100 text-green-800 border border-green-200"
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-foreground">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted-foreground">
                        {user.phone || "No phone"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted-foreground max-w-xs line-clamp-2">
                        {[
                          user.streetAddress,
                          user.postalCode,
                          user.city,
                          user.country,
                        ]
                          .filter(Boolean)
                          .join(", ") || "No address"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          href={`/${locale}/admin/users/${user.id}/edit`}
                          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors duration-200 border border-blue-200"
                        >
                          {translations.edit}
                        </Link>
                        <BtnDelete
                          userId={user.id}
                          translations={translations}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto max-w-md">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t("noUsersFound")}
              </h3>
              <p className="text-muted-foreground">
                {t("startByCreatingYourFirstUser")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
