"use client";
import { Button } from "@/components/ui/button";
import { selectCartItems } from "@/Redux/features/Cart/cartSlice";
import { useAppSelector } from "@/Redux/hooks";
import Link from "next/link";
import React from "react";
import CartItem from "./CartItem";
import { formatCurrency } from "@/lib/formatters";

const CartItems = () => {
  const Cart = useAppSelector(selectCartItems);
  return (
    <div>
      {Cart.length > 0 ? (
        <>
          <ul className="space-y-4">
            {Cart.map((item) => (
              <li
                key={`${item.id}-${item.size}-${item.extra
                  .map((extra) => extra.id)
                  .join("-")}`}
                className="flex items-center justify-between border-b border-gray-200 pb-4"
              >
                <CartItem item={item} />
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm font-medium">Total</p>
            <p className="text-lg font-semibold text-primary">
              {formatCurrency(
                Cart.reduce(
                  (acc, item) => acc + item.basePrice * item.quantity,
                  0
                )
              )}
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">No items in cart</h1>
          <Link href="/">
            <Button>Add items to your cart to get started</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartItems;
