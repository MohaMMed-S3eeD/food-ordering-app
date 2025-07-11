import CardPizaa from "@/components/CardPizaa";
import MainHeading from "@/components/Main_Heading";
import { getAllProducts } from "@/server/db/products";
import React from "react";

export const revalidate = 0;
const BestSeller = async () => {
  const bestSeller = await getAllProducts();

  return (
    <section className="section-gap">
      <div className="container text-center mb-2">
        <MainHeading title="Best Seller" subTitle="Best Seller" />
      </div>
      {bestSeller.length > 0 ? (
        <div className="container  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {bestSeller.map((item) => (
            <CardPizaa key={item.id} Product={item} />
          ))}
        </div>
      ) : (
        <div className="container text-center mt-10">
          <p className="uppercase  font-semibold leading-4 text-zinc-400">No products found</p>
        </div>
      )}
    </section>
  );
};

export default BestSeller;
