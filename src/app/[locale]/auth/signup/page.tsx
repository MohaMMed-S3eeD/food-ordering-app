import React from "react";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import { Pages, Routes } from "@/constants/enums";
import Form from "./_components/Form";
import { Translations } from "@/types/translations";

const page = async () => {
  const locale = await getLocale();
  
  // جلب كائن الترجمة الكامل
  const translations: Translations = await import(`@/messages/${locale}.json`).then(
    (module) => module.default
  );
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {translations.auth.register.title}
          </h1>
        </div>
        <Form translation={translations} />
        <div className="text-center">
          <p className="text-gray-600">
            {translations.auth.register.authPrompt.message}
            <Link
              href={`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {translations.auth.register.authPrompt.loginLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
