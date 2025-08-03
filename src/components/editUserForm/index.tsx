"use client";
import useFormFields from "@/hooks/useFormFields";
import { Routes, UserRole } from "@/constants/enums";
import { Translations } from "@/types/translations";
import { Session } from "next-auth";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import FormFields from "../form-fields/form-fields";
import Checkbox from "../form-fields/checkbox";
import { updateProfile } from "./_action/profile";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const EditUserForm = ({
  translations,
  session,
  adminViewr,
}: {
  translations: Translations;
  session: Session | null;
  adminViewr?: Session | null; // Optional prop for admin view
}) => {
  // Check if user is AdminView (view-only admin)
  const isViewOnlyAdmin =
    adminViewr?.user.name === "AdminView"
      ? adminViewr.user?.name === "AdminView" &&
        adminViewr.user?.email === "AdminView@gmail.com"
      : session?.user?.name === "AdminView" &&
        session?.user?.role === UserRole.ADMIN;

  console.log(adminViewr);
  console.log(isViewOnlyAdmin);
  const formData = new FormData();
  Object.entries(session?.user ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });
  const initState = {
    massage: "",
    error: {},
    status: "",
    formData,
  };
  const [selectedImage, setSelectedImage] = useState(session?.user.image || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAdmin, setIsAdmin] = useState(session?.user.role === UserRole.ADMIN);
  // @ts-expect-error - Type mismatch between useActionState and updateProfile
  const [state, action, isPending] = useActionState(
    updateProfile.bind(null, isAdmin),
    initState
  );
  const { getFields } = useFormFields({
    slug: Routes.PROFILE,
    translations,
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.massage);
    }
    if (state.status === "error") {
      if (state.error && typeof state.error === "object") {
        Object.values(state.error).forEach((messages) => {
          if (Array.isArray(messages)) {
            messages.forEach((message) => {
              toast.error(message, {
                style: {
                  backgroundColor: "#fef2f2",
                  borderColor: "#fecaca",
                  color: "#dc2626",
                },
              });
            });
          }
        });
      }
    }
  }, [state, isPending]);

  return (
    <div className="mx-auto max-w-2xl bg-white  shadow-md ">
      {/* AdminView Banner */}
      {isViewOnlyAdmin && (
        <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-orange-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-orange-700">
                {translations.messages.adminViewRestriction}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}

      {/* Form */}
      <div className="p-6">
        <form className="space-y-4" action={action}>
          <div className="bg-gradient-to-br from-primary to-primary/80 px-6 py-10 text-center rounded-t-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <div className="relative inline-block">
                  <Image
                    src={selectedImage || ""}
                    alt="user image"
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-white shadow-xl mx-auto ring-4 ring-white/20"
                    priority
                  />

                  <UploadImage
                    setSelectedImage={setSelectedImage}
                    setSelectedFile={setSelectedFile}
                  />
                </div>
              </div>

              <p className="text-white/90 text-base font-medium">
                {session?.user.name}
              </p>
              <p className="text-white/70 text-sm mt-1">
                {session?.user.email}
              </p>
            </div>
          </div>

          {/* Hidden input for the file */}
          {selectedFile && (
            <input type="hidden" name="hasNewImage" value="true" />
          )}

          {getFields().map((field) => {
            const fieldValue =
              state.formData?.get(field.name) ?? formData.get(field.name);
            return (
              <FormFields
                {...field}
                key={field.name}
                error={{}}
                defaultValue={fieldValue as string}
                // readOnly={field.type === InputTypes.EMAIL}
              />
            );
          })}
          {session?.user.role === UserRole.ADMIN && (
            <Checkbox
              label={translations.navbar.admin}
              name="isAdmin"
              onClick={() => {
                setIsAdmin(!isAdmin);
              }}
              checked={isAdmin}
            />
          )}
          <button
            type="submit"
            disabled={isPending || isViewOnlyAdmin}
            className={`w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2 ${
              isViewOnlyAdmin
                ? "bg-gray-400 cursor-not-allowed text-white opacity-60"
                : "bg-primary hover:bg-primary/90 disabled:opacity-50 text-white"
            }`}
          >
            {isViewOnlyAdmin
              ? translations.messages.adminViewRestriction
              : translations.save}
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;

const UploadImage = ({
  setSelectedImage,
  setSelectedFile,
}: {
  setSelectedImage: (image: string) => void;
  setSelectedFile: (file: File | null) => void;
}) => {
  return (
    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out z-50">
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        name="image"
        id="image-upload"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setSelectedFile(file);
          }
        }}
      />
      <label
        htmlFor="image-upload"
        className="cursor-pointer absolute inset-0 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ease-in-out group border-2 border-dashed border-white/70 hover:bg-black/60 hover:border-white/90"
      >
        <div className="flex flex-col items-center gap-1">
          <div className="bg-white/30 rounded-full p-2 group-hover:bg-white/40 transition-colors duration-200">
            <svg
              className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-white text-[10px] font-medium">
            Upload Image
          </span>
        </div>
      </label>
    </div>
  );
};
