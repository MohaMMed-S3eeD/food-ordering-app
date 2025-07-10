import CardPizaa from "@/components/CardPizaa";
import MainHeading from "@/components/Main_Heading";
import { getProducts } from "@/server/db/products";
import React from "react";

export const revalidate = 0;
const BestSeller = async () => {
  const bestSeller = await getProducts();

  return (
    <section className="section-gap">
      <div className="container text-center mb-2">
        <MainHeading title="Best Seller" subTitle="Best Seller" />
      </div>
      <div className="container  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {bestSeller.map((item) => (
          <CardPizaa key={item.id} Product={item} />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
