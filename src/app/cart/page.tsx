"use client";
import CartItems from "../_components/CartItems";
import CheckoutForm from "../_components/CheckoutForm";
import { useAppSelector } from "@/Redux/hooks";
import { selectCartItems } from "@/Redux/features/Cart/cartSlice";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function CartPage() {
  const cart = useAppSelector(selectCartItems);
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className="text-primary text-center font-bold text-4xl italic mb-10">
            Cart
          </h1>
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <CartItems />
              <CheckoutForm />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-bold">No items in cart</h1>
              <Link href="/">
                <Button>Add items to your cart to get started</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default CartPage;
