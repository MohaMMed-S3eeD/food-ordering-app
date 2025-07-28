import { getCategories } from "@/server/db/categories";
import Form from "../_components/Form";
import { Translations } from "@/types/translations";
import { getLocale } from "next-intl/server";

const New = async () => {
  const locale = await getLocale();
  const translations: Translations = await import(
    `@/messages/${locale}.json`
  ).then((module) => module.default);
  const categories = await getCategories();
  return (
    <div className="mx-auto max-w-2xl bg-white  shadow-md">
      <div className="p-6">
        <Form t={translations} categories={categories} />
      </div>
    </div>
  );
};
export default New;
