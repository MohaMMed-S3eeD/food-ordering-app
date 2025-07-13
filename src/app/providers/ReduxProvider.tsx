"use client";
import { store } from "@/Redux/store";
import { loadCartFromStorage } from "@/Redux/features/Cart/cartSlice";
import { Provider } from "react-redux";
import { useEffect } from "react";

function CartLoader() {
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        store.dispatch(loadCartFromStorage(parsedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);
  
  return null;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <CartLoader />
      {children}
    </Provider>
  );
}
