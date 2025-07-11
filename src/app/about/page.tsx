import CardPizaa from "@/components/CardPizaa";
import MainHeading from "@/components/Main_Heading";
import { Routes } from "@/constants/enums";
import { getProductsByCategory } from "@/server/db/products";

async function About() {
  const categories = await getProductsByCategory();
  console.log(categories);
  return (
    <main className="section-gap " id={Routes.ABOUT}>
      {categories.map((category) => (
        <div key={category.id}>
          <section className="container my-10">
            <MainHeading title={category.name} subTitle={category.name} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.products.map((product) => (
                <CardPizaa key={product.id} Product={product} />
              ))}
            </div>
          </section>
        </div>
      ))}
    </main>
  );
}

export default About;
