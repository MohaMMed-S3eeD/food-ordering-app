"use client";
import useFormFields from "@/hooks/useFormFields";
import { Pages } from "@/constants/enums";
import React, { useActionState, useEffect } from "react";
import FormFields from "@/components/form-fields/form-fields";
import { Translations } from "@/types/translations";
import { signUp } from "@/server/_action/auth";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Loading from "@/app/[locale]/_components/Loading";


const initialState: {
  message: string;
  status: number;
  formData?: { [k: string]: FormDataEntryValue };
  user?: unknown;
} = {
  message: "",
  status: 0,
};
const Form = ({ translation }: { translation: Translations }) => {
  const router = useRouter();
  const locale = useLocale();
  const [state, action, isPending] = useActionState(signUp, initialState);

  useEffect(() => {
    if (state?.message && state.status === 400) {
      const listErrors = state.message.split(",");
      listErrors.forEach((error) => {
        toast.error(error.trim(), {
          style: {
            background: "#ef4444",
            color: "white",
            border: "1px solid #b91c1c",
          },
        });
      });
      state.message = "";
      state.status = 0;
    } else if (state?.message && state.status === 201) {
      router.push(`/${locale}/auth/signin`);
      toast.success(state.message, {
        style: {
          background: "#10b981",
          color: "white",
          border: "1px solid #059669",
        },
      });
    }
  }, [locale, router, state]);
  const { getFields } = useFormFields({
    slug: Pages.Register,
    translations: translation,
  });

  return (
    <form action={action} className={`space-y-6 `}>
      {getFields().map((field) => {
        const fieldValue = state.formData?.[field.name];
        return (
          <FormFields
            key={field.name}
            error={{}}
            {...field}
            defaultValue={fieldValue?.toString()}
          />
        );
      })}
      <button
        disabled={isPending}
        type="submit"
        className="w-full bg-primary cursor-pointer hover:scale-105 hover:bg-primary/90 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
      >
        {isPending ? <Loading /> : translation.auth.register.submit}
      </button>
    </form>
  );
};

export default Form;
