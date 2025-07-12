import { CartItem } from "@/Redux/features/Cart/cartSlice";
import { Extra } from "@prisma/client";

export const getItemQuantity = (id: string, cart: CartItem[]) => {
  return cart.find((item) => item.id === id)?.quantity || 0;
};

export const getSpecificItemQuantity = (
  id: string,
  size: string,
  extra: Extra[],
  cart: CartItem[]
) => {
  const item = cart.find((item) => {
    const hasSameExtras = item.extra.length === extra.length &&
      item.extra.every(itemExtra =>
        extra.some(newExtra => newExtra.id === itemExtra.id)
      );

    return item.id === id &&
      item.size === size &&
      hasSameExtras;
  });

  return item?.quantity || 0;
};

