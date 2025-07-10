import React from "react";

import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";
import { AddToCart } from "./AddToCart";

const CardPizaa = ({
  image,
  name,
  price,
  desc,
}: {
  image: string;
  name: string;
  price: number;
  desc: string;
}) => {
  return (
    <div className="flex flex-col gap-2 relative w-full max-w-sm mx-auto bg-white p-4 rounded-lg shadow-md">
      <div className="relative w-full h-30 mb-2">
        <Image
          src={image}
          alt={name}
          loading="lazy"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex gap-2 items-center justify-between">
        <h1 className="text-lg font-semibold line-clamp-1">{name}</h1>
        <p className="text-lg text-muted-foreground">{formatCurrency(price)}</p>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">{desc}</p>
      <AddToCart img={image} alt={name} price={(price)} desc={desc} name={name}  />
    </div>
  );
};

export default CardPizaa;
