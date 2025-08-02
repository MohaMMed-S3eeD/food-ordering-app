"use client";
import React, { useState, useMemo } from "react";
import CardPizaa from "@/components/CardPizaa";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProductWithRelations } from "@/types/product";
import { useTranslations } from "next-intl";

interface Category {
  id: string;
  name: string;
  order: number;
  products: ProductWithRelations[];
}

interface Setting {
  category: string[];
  price: string;
}

interface MenuClientProps {
  initialCategories: Category[];
}

const MenuClient = ({ initialCategories }: MenuClientProps) => {
  const t = useTranslations("menu");
  
  const [setting, setSetting] = useState<Setting>({
    category: [],
    price: "low-to-high",
  });

  // تجميع جميع المنتجات من جميع الفئات
  const allProducts = useMemo(() => {
    return initialCategories.flatMap(category => 
      category.products.map(product => ({
        ...product,
        categoryName: category.name
      }))
    );
  }, [initialCategories]);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (setting.category.length > 0) {
      filtered = filtered.filter((product) =>
        setting.category.includes(product.categoryName)
      );
    }

    if (setting.price === "high-to-low") {
      filtered = [...filtered].sort((a, b) => b.basePrice - a.basePrice);
    } else if (setting.price === "low-to-high") {
      filtered = [...filtered].sort((a, b) => a.basePrice - b.basePrice);
    }

    return filtered;
  }, [allProducts, setting]);

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    setSetting((prev) => ({
      ...prev,
      category: checked
        ? [...prev.category, categoryName]
        : prev.category.filter((cat) => cat !== categoryName),
    }));
  };

  const handlePriceChange = (priceOption: string) => {
    setSetting((prev) => ({
      ...prev,
      price: priceOption,
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-6">
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-64 bg-card border rounded-lg p-6 h-fit lg:sticky top-6">
        <h2 className="text-xl font-bold text-primary mb-6">
          {t("filters", { default: "Filters" })}
        </h2>

        {/* Categories Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">
            {t("categories", { default: "Categories" })}
          </h3>
          <div className="space-y-2">
            {initialCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={setting.category.includes(category.name)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.name, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="text-sm cursor-pointer"
                >
                  {category.name} ({category.products.length})
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Sort Filter */}
        <div>
          <h3 className="font-semibold mb-3">
            {t("sortByPrice", { default: "Sort by Price" })}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="high-to-low"
                checked={setting.price === "high-to-low"}
                onCheckedChange={() => handlePriceChange("high-to-low")}
              />
              <Label
                htmlFor="high-to-low"
                className="text-sm cursor-pointer"
              >
                {t("highToLow", { default: "High to Low" })}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="low-to-high"
                checked={setting.price === "low-to-high"}
                onCheckedChange={() => handlePriceChange("low-to-high")}
              />
              <Label
                htmlFor="low-to-high"
                className="text-sm cursor-pointer"
              >
                {t("lowToHigh", { default: "Low to High" })}
              </Label>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-primary mb-2">
            {t("title", { default: "Our Menu" })}
          </h1>
          <p className="text-muted-foreground">
            {t("showingProducts", { 
              count: filteredProducts.length,
              default: `Showing ${filteredProducts.length} products`
            })}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <CardPizaa key={product.id} Product={product} />
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {t("noProducts", { default: "No products found matching your criteria." })}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MenuClient;