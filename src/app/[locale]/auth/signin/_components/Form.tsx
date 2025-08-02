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
  const [loading, setLoading] = useState(false);
  const [quickLoginLoading, setQuickLoginLoading] = useState<string | null>(
    null
  );
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

  // Mock test accounts
  const testAccounts = {
    user: {
      email: "Test@gmail.com",
      password: "Test@gmail.com",
      name: "Test User",
      role: "USER",
    },
    adminView: {
      email: "AdminView@gmail.com",
      password: "AdminView@gmail.com",
      name: "AdminView",
      role: "ADMIN",
    },
  };

  // Quick login function using real NextAuth with mock credentials
  const quickLogin = async (userType: "user" | "adminView") => {
    try {
      setQuickLoginLoading(userType);

      const account = testAccounts[userType];

      const response = await signIn("credentials", {
        redirect: false,
        email: account.email,
        password: account.password,
      });

      if (response?.error) {
        // If authentication fails, show helpful message
        toast.error(
          `لم يتم العثور على حساب الاختبار. تحتاج لإنشاء المستخدم:\nEmail: ${account.email}\nPassword: ${account.password}\nName: ${account.name}\nRole: ${account.role}`,
          {
            style: {
              background: "#ef4444",
              color: "white",
              border: "1px solid #b91c1c",
            },
            duration: 8000,
          }
        );
      }

      if (response?.ok) {
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
      toast.error("حدث خطأ غير متوقع", {
        style: {
          background: "#ef4444",
          color: "white",
          border: "1px solid #b91c1c",
        },
      });
    } finally {
      setQuickLoginLoading(null);
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

      {/* Quick Login Buttons */}
      <div className="space-y-3 pt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              {locale === "ar"
                ? "أو دخول سريع للاختبار"
                : "Or quick login for testing"}
            </span>
          </div>
        </div>

        {/* Quick Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* User Login Button */}
          <button
            type="button"
            disabled={quickLoginLoading !== null}
            onClick={() => quickLogin("user")}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            {quickLoginLoading === "user" ? (
              <Loading />
            ) : (
              <>
                <svg
                  className="w-4 h-4"
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
                {locale === "ar" ? "مستخدم عادي" : "User"}
              </>
            )}
          </button>

          {/* AdminView Login Button */}
          <button
            type="button"
            disabled={quickLoginLoading !== null}
            onClick={() => quickLogin("adminView")}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            {quickLoginLoading === "adminView" ? (
              <Loading />
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {locale === "ar" ? "أدمين مشاهد" : " AdminView"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
