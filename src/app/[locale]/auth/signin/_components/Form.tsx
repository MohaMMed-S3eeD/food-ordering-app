"use client";
import useFormFields from "@/hooks/useFormFields";
import { Pages } from "@/constants/enums";
import React, { useRef, useState } from "react";
import FormFields from "@/components/form-fields/form-fields";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Loading from "@/app/[locale]/_components/Loading";
// import { useRouter } from "next/navigation";
import { Translations } from "@/types/translations";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const Form = ({ translation }: { translation: Translations }) => {
  const router = useRouter();
  const locale = useLocale();
  const { getFields } = useFormFields({
    slug: Pages.LOGIN,
    translations: translation,
  });
  console.log(getFields());
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const OnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (response?.error) {
        const errorData = JSON.parse(response?.error || "");
        if (errorData.ValidationErrors) {
          toast.error(errorData.ValidationErrors, {
            style: {
              background: "#ef4444",
              color: "white",
              border: "1px solid #b91c1c",
            },
          });
        } else {
          toast.error(errorData.responseError, {
            style: {
              background: "#ef4444",
              color: "white",
              border: "1px solid #b91c1c",
            },
          });
        }
      }
      if (response?.ok) {
        router.push(`/${locale}/`);
        toast.success(translation.messages.loginSuccessful, {
          style: {
            background: "#10b981",
            color: "white",
            border: "1px solid #059669",
          },
        });
        router.push(`/${locale}/profile`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form ref={formRef} className="space-y-6">
      {getFields().map((field) => (
        <FormFields key={field.name} error={{}} {...field} />
      ))}
      <button
        disabled={loading}
        onClick={OnSubmit}
        type="submit"
        className="w-full bg-primary cursor-pointer hover:scale-105 hover:bg-primary/90 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
      >
        {loading ? <Loading /> : translation.auth.login.submit}
      </button>
    </form>
  );
};

export default Form;
