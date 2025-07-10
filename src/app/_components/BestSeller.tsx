import CardPizaa from "@/components/CardPizaa";
import MainHeading from "@/components/Main_Heading";
import { db } from "@/lib/prisma";
import React from "react";

// const bestSeller = [
//   {
//     id: 1,
//     name: "Margherita Supreme",
//     price: 120,
//     desc: "Fresh mozzarella, tomato sauce, and basil on our signature thin crust.",
//     image: "/assets/images/image.png",
//   },
//   {
//     id: 2,
//     name: "Pepperoni Classic",
//     price: 150,
//     desc: "Premium pepperoni with melted cheese and our special herb blend.",
//     image: "/assets/images/image.png",
//   },
//   {
//     id: 3,
//     name: "BBQ Chicken Deluxe",
//     price: 180,
//     desc: "Grilled chicken, BBQ sauce, red onions, and mozzarella cheese.",
//     image: "/assets/images/image.png",
//   },
// ];
const BestSeller = async () => {
  const result = await db.product.findMany({
    orderBy: {
      order: "asc",
    },
  });
  const bestSeller = result.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.basePrice,
    desc: item.description,
    image: item.imageUrl,
  }));
  return (
    <section className="section-gap">
      <div className="container text-center mb-2">
        <MainHeading title="Best Seller" subTitle="Best Seller" />
      </div>
      <div className="container  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {bestSeller.map((item) => (
          <CardPizaa key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
