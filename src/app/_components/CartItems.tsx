"use client";
import { selectCartItems } from "@/Redux/features/Cart/cartSlice";
import { useAppSelector } from "@/Redux/hooks";
import React from "react";

const CartItems = () => {
  const Cart = useAppSelector(selectCartItems);
  console.log("Cart", Cart);
  return <div>CartItems</div>;
};

export default CartItems;
