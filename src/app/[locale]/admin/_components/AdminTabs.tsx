"use client";
import Link from "next/link";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Pages, Routes } from "@/constants/enums";
import { usePathname } from "next/navigation";

// todo https://youtu.be/hDrt1ifv94o?t=21644 Create Cat
const AdminTabs = () => {
  const t = useTranslations("admin");
  const pathname = usePathname();
  console.log(t("tabs.profile"));
  const locale = useLocale();
  const tabs = [
    {
      id: crypto.randomUUID(),
      title: t("tabs.profile"),
      href: `/${locale}/admin`,
      icon: "👤", // User/Profile icon
    },
    {
      id: crypto.randomUUID(),
      title: t("tabs.categories"),
      href: `/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`,
      icon: "📂", // Folder/Category icon
    },
    {
      id: crypto.randomUUID(),
      title: t("tabs.menuItems"),
      href: `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
      icon: "🍕", // Pizza/Menu icon
    },
    {
      id: crypto.randomUUID(),
      title: t("tabs.users"),
      href: `/${locale}/${Routes.ADMIN}/${Pages.USERS}`,
      icon: "👥", // Users icon
    },
    {
      id: crypto.randomUUID(),
      title: t("tabs.orders"),
      href: `/${locale}/${Routes.ADMIN}/${Pages.ORDERS}`,
      icon: "📋", // Clipboard/Orders icon
    },
  ];

  const isActiveTab = (href: string) => {
    const hrefArray = href.split("/");
    return hrefArray.length > 1
      ? pathname.startsWith(`/${locale}/${href}`)
      : pathname === `/${locale}/${href}`;
  };

  return (
    <>
      {/* Mobile Navigation - Bottom Fixed */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-2 shadow-xl md:hidden w-[95%] max-w-md">
        <nav className="flex justify-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`relative group p-3 text-lg font-medium rounded-lg transition-all duration-200 flex-shrink-0 flex items-center justify-center ${
                isActiveTab(tab.href)
                  ? "text-primary bg-white/70 shadow-md"
                  : "text-gray-700 hover:text-primary hover:bg-white/50 hover:shadow-md"
              }`}
            >
              <span className="relative z-10">{tab.icon}</span>
              <div
                className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg transition-opacity duration-200 ${
                  isActiveTab(tab.href)
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop Navigation - Left Side Fixed with Hover Expansion */}
      <div
        className={`fixed top-1/2 ${
          locale === "en" ? "left-4 " : " right-4"
        }  transform -translate-y-1/2 z-50 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl hidden md:block group/sidebar hover:bg-white/15 transition-all duration-300 ${
          isActiveTab(tabs[0].href) ? "bg-white/15" : ""
        }`}
      >
        <nav className="flex flex-col">
          {tabs.map((tab, index) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`relative group/item flex items-center rounded-lg transition-all duration-300 overflow-hidden ${
                index === 0 ? "rounded-t-xl" : ""
              } ${index === tabs.length - 1 ? "rounded-b-xl" : ""} ${
                isActiveTab(tab.href)
                  ? "text-primary bg-white/70 shadow-md"
                  : "text-gray-700 hover:text-primary hover:bg-white/50 hover:shadow-md"
              }`}
            >
              {/* Icon Container - Always Visible */}
              <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 relative z-10">
                <span className="text-lg">{tab.icon}</span>
              </div>

              {/* Text Container - Expands on Hover */}
              <div className="w-0 group-hover/sidebar:w-32 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 text-sm font-medium whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 delay-75 px-2">
                  {tab.title}
                </span>
              </div>

              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 transition-opacity duration-200 ${
                  isActiveTab(tab.href)
                    ? "opacity-100"
                    : "opacity-0 group-hover/item:opacity-100"
                }`}
              />
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminTabs;
