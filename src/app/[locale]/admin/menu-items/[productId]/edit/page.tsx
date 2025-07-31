import React from "react";
import { getProductById } from "@/server/db/products";
import { getCategories } from "@/server/db/categories";
import Form from "../../_components/Form";
import { Translations } from "@/types/translations";
import { getLocale } from "next-intl/server";

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;
  const product = await getProductById(productId);
  
  if (!product) {
    // Handle case where product doesn't exist
    return <div>Product not found</div>;
  }
  
  const locale = await getLocale();
  const translations: Translations = await import(
    `@/messages/${locale}.json`
  ).then((module) => module.default);
  const categories = await getCategories();
  return (
    <div className="mx-auto max-w-2xl bg-white  shadow-md">
      <div className="p-6">
        <Form t={translations} categories={categories} product={product} />
      </div>
    </div>
  );
};

export default page;
