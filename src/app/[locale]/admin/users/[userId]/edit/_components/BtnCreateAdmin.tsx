"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import {
  createAdmin,
  deleteUser,
} from "@/app/[locale]/admin/users/_action/user";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const BtnCreateAdmin = ({
  userId,
  isAdminViewr,
}: {
  userId: string;
  isAdminViewr: boolean;
}) => {
  const t = useTranslations("mo.users");
  const handleCreateAdmin = async () => {
    const result = await createAdmin(userId);
    if (result) {
      toast.success(result.message);
    }
  };
  const handleDeleteUser = async () => {
    const result = await deleteUser(userId);
    if (result) {
      toast.success(result.message);
    }
  };

  return (
    <div className="relative flex justify-center items-center gap-2 pb-4 mx-auto max-w-2xl bg-white shadow-md  ">
      <Button
        className="flex-1 mx-6 "
        onClick={handleCreateAdmin}
        disabled={isAdminViewr}
      >
        {t("createAdmin")}
      </Button>
      <Button
        className="flex-1 mx-6 "
        onClick={handleDeleteUser}
        variant="destructive"
        disabled={isAdminViewr}
      >
        {t("deleteUser")}
      </Button>
    </div>
  );
};

export default BtnCreateAdmin;
