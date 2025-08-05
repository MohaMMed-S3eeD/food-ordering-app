import { Category, Product } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import { EditCategory } from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const CategoryCard = ({
  category,
}: {
  category: Category & { products: Product[] };
}) => {
  const t = useTranslations("");
  return (
    <div className="group relative p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {category.products.length} {t("products")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {category.products.map((product) => product.name).join(", ")}
          </p>
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div>
            <EditCategory category={category} />
          </div>
          <div>
            <DeleteCategory category={category} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
