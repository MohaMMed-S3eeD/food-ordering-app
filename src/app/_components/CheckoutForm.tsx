"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import { selectCartItems } from "@/Redux/features/Cart/cartSlice";
import { useAppSelector } from "@/Redux/hooks";
import React from "react";
import { toast } from "sonner";

const CheckoutForm = () => {
  const Cart = useAppSelector(selectCartItems);
  const subtotal = Cart.reduce(
    (acc, item) => acc + item.basePrice * item.quantity,
    0
  );
  const deliveryFee = 10;
  const totalAmount = subtotal + deliveryFee;
  const handleCheckout = async () => {
    try {
      // Show loading message
      toast.loading("Processing your order...");

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Dismiss loading and show success message
      toast.dismiss();
      toast.success("successfully! Delivery within 30 minutes", {
        style: {
          background: "#10b981",
          color: "white",
        },
      });
    } catch {
      toast.dismiss();
      toast.error(
        "An error occurred while processing your order. Please try again"
      );
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
      <form action="" className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Name</Label>
          <Input
            type="text"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Street Address
          </Label>
          <Input
            type="text"
            name="street"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Postal Code
            </Label>
            <Input
              type="number"
              name="postalCode"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label className="text-sm font-medium text-gray-700">City</Label>
            <Input
              type="text"
              name="city"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Country</Label>
          <Input
            type="text"
            name="country"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button
          onClick={() => {
            handleCheckout();
          }}
          type="button"
          className="w-full bg-primary text-white py-3 px-4 rounded-md font-semibold text-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Checkout {formatCurrency(totalAmount)}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
