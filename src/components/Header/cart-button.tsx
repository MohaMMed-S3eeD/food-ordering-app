"use client";
import React from "react";
import { Routes } from "@/constants/enums";
import { ShoppingCartIcon } from "lucide-react";
import Link from "../Link";
import { useAppSelector } from "@/Redux/hooks";
import { selectCartItems } from "@/Redux/features/Cart/cartSlice";

const CartButton = () => {
  const Cart = useAppSelector(selectCartItems);
  return (
    <Link href={`/${Routes.CART}`} className="block relative group">
      <span className="absolute -top-4 start-6 w-4 h-4  bg-primary rounded-full text-white text-center text-xs">
        {Cart.length}
      </span>
      <ShoppingCartIcon
        className={` text-primary group-hover:text-black duration-200 transition-colors !w-6 !h-6 mx-2 `}
      />
    </Link>
  );
};

export default CartButton;
