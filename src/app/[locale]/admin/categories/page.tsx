import { getCategories } from "@/server/db/categories";
import { getTranslations } from "next-intl/server";
import React from "react";
import Form from "./_components/Form";
import CategoryCard from "./_components/CategoryCard";

const Page = async () => {
  const t = await getTranslations("");
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-primary mb-2">
          {t("admin.tabs.categories")}
        </h1>
      </div>

      <div className="mb-8">
        <Form />
      </div>

      <div>
        {categories && categories.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto max-w-md">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t("noCategoriesFound")}
              </h3>
              <p className="text-muted-foreground">
                Start by creating your first category above
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
