import React from "react";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import { Pages, Routes } from "@/constants/enums";
import Form from "./_components/Form";

const page = async () => {
  const locale = await getLocale();
  console.log(locale);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-700 mb-8">
            Welcome Back
          </h1>
        </div>
        <Form />
        <div className="text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href={`/${locale}/${Routes.AUTH}/${Pages.Register}`}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
