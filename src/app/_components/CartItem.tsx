import {
  removeItemFromCart,
  type CartItem,
} from "@/Redux/features/Cart/cartSlice";
import { useAppDispatch } from "@/Redux/hooks";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartItem = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center gap-3">
        <Image
          src={item.image}
          alt={item.name}
          width={100}
          height={100}
          className="w-12 h-12 object-cover rounded-md"
        />
        <div className="flex flex-col gap-1">
          <h1 className="font-medium text-gray-900">{item.name}</h1>
          <div>
            <p className="text-sm text-gray-600">{item.size}</p>
            <p className="text-xs  text-primary">
              {formatCurrency(item.basePrice)}
            </p>
          </div>
          <p className="text-xs text-gray-500">
            {item.extra.map((extra) => extra.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-right">
        <p className="text-sm font-medium">x{item.quantity}</p>
        <p className="text-lg font-semibold text-primary">
          {formatCurrency(item.basePrice * item.quantity)}
        </p>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          dispatch(
            removeItemFromCart({
              id: item.id,
              size: item.size,
              extra: item.extra,
            })
          )
        }
      >
        <Trash2Icon className="w-3 h-3 text-primary" />
      </Button>
    </div>
  );
};

export default CartItem;
