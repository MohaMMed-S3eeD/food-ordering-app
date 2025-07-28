import { Pages, Routes } from "@/constants/enums";
import { getProductsWithCategory } from "@/server/db/products";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";

const page = async () => {
  const locale = await getLocale();
  // const t = await getTranslations("admin");
  const products = await getProductsWithCategory();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-primary mb-2">
            Menu Items
          </h1>
        </div>

        <div className="mb-8">
          <Link
            href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${Pages.NEW}`}
          >
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
              Create New Menu Item
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        {products && products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Image
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Product Name
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Description
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Price
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-muted/25 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {product.Category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted-foreground max-w-xs line-clamp-2">
                        {product.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary">
                        {formatCurrency(product.basePrice)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No menu items found
              </h3>
              <p className="text-muted-foreground">
                Start by creating your first menu item using the button above
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
