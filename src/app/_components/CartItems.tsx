"use client";
import { selectCartItems } from "@/Redux/features/Cart/cartSlice";
import { useAppSelector } from "@/Redux/hooks";
import React from "react";
import CartItem from "./CartItem";
import { formatCurrency } from "@/lib/formatters";

const CartItems = () => {
  const Cart = useAppSelector(selectCartItems);
  const subtotal = Cart.reduce(
    (acc, item) => acc + item.basePrice * item.quantity,
    0
  );
  const deliveryFee = 10;
  const totalAmount = subtotal + deliveryFee;
  return (
    <div>
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
      <div className="bg-gray-50 p-4 rounded-lg border mt-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Subtotal</p>
            <p className="text-lg font-semibold text-primary">
              {formatCurrency(subtotal)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Delivery Fee</p>
            <p className="text-lg font-semibold text-primary">
              {formatCurrency(deliveryFee)}
            </p>
          </div>
          <hr className="border-gray-200" />
          <div className="flex items-center justify-between">
            <p className="text-base font-bold text-gray-900">Total Amount</p>
            <p className="text-xl font-bold text-primary">
              {formatCurrency(totalAmount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
