import type { Metadata } from "next";
import { Rubik, Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ReduxProvider from "./providers/ReduxProvider";
import { Toaster } from "sonner";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NextAuthSessionProvider from "./providers/NextAuthSessionProvider";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});
const cairo = Cairo({
  subsets: ["latin"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Food Order App",
  description: "Generated by create next app",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${
          locale === "ar" ? cairo.className : rubik.className
        } antialiased`}
      >
        <NextAuthSessionProvider>
          <NextIntlClientProvider>
            <ReduxProvider>
              <Header />
              {children}
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    color: "var(--primary)",
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "12px",
                  },
                }}
              />
            </ReduxProvider>
          </NextIntlClientProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
