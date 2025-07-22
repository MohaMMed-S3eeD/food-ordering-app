"use client";
import useFormFields from "@/hooks/useFormFields";
import { InputTypes, Routes, UserRole } from "@/constants/enums";
import { Translations } from "@/types/translations";
import { Session } from "next-auth";
import Image from "next/image";
import React from "react";
import FormFields from "../form-fields/form-fields";
import Checkbox from "../form-fields/checkbox";

// todo : https://youtu.be/hDrt1ifv94o?t=15712          Create a form Submit state 
const EditUserForm = ({
  translations,
  session,
}: {
  translations: Translations;
  session: Session | null;
}) => {
  const { getFields } = useFormFields({
    slug: Routes.PROFILE,
    translations,
  });
  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <div className="mx-auto max-w-2xl bg-white  shadow-md ">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-6 py-10 text-center rounded-t-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10">
          <div className="mb-6">
            <div className="relative inline-block">
              <Image
                src={session?.user.image || ""}
                alt="user image"
                width={96}
                height={96}
                className="rounded-full border-4 border-white shadow-xl mx-auto ring-4 ring-white/20"
                priority
              />
            </div>
          </div>

          <p className="text-white/90 text-base font-medium">
            {session?.user.name}
          </p>
          <p className="text-white/70 text-sm mt-1">{session?.user.email}</p>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <form className="space-y-4">
          {getFields().map((field) => (
            <FormFields
              {...field}
              key={field.name}
              error={{}}
              readOnly={field.type === InputTypes.EMAIL}
            />
          ))}
          {session?.user.role === UserRole.ADMIN && (
            <Checkbox
              label={translations.navbar.admin}
              name="isAdmin"
              checked={session?.user.role === UserRole.ADMIN}
            />
          )}
          <button
            onClick={() => handleSubmit()}
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          >
            {translations.save}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
