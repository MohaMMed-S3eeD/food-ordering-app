import MainHeading from "@/components/Main_Heading";
import { Routes } from "@/constants/enums";
import { getProductsByCategory } from "@/server/db/products";
import MenuClient from "./_components/MenuClient";

async function menu() {
  const categories = await getProductsByCategory();

  return (
    <main className="section-gap" id={Routes.MENU}>
      <div className="container">
        <MainHeading/>
      </div>

      <MenuClient initialCategories={categories} />
    </main>
  );
}

export default menu;
