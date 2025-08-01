"use client";
import React, { useState } from "react";
import ButtonCrach from "../ui/btn crach/buttonCrach";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/formatters";
import { Checkbox } from "../ui/checkbox";
import { ProductWithRelations } from "@/types/product";
import { Extra, Size } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  addToCart,
  removeFromCart,
  removeItemFromCart,
  selectCartItems,
} from "@/Redux/features/Cart/cartSlice";
import { getSpecificItemQuantity } from "@/lib/cart";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function AddToCart({ Product }: { Product: ProductWithRelations }) {
  const Cart = useAppSelector(selectCartItems);
  const t = useTranslations("messages");
  const dispatch = useAppDispatch();
  const defultSize =
    Cart.find((item) => item.id === Product.id)?.size ||
    Product.sizes[0]; // استخدم أول حجم بدلاً من البحث عن SMALL

  const defultExtra = Cart.find((item) => item.id === Product.id)?.extra || [];
  const [selectedSize, setSelectedSize] = useState<Size | null>(defultSize as Size || null);
  const [selectedExtra, setSelectedExtra] = useState<Extra[]>(
    defultExtra as unknown as Extra[]
  );

  let totalPrice = Product.basePrice + (selectedSize?.price || 0);
  selectedExtra.forEach((extra) => {
    totalPrice += extra.price;
  });

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: Product.id,
        name: Product.name,
        basePrice: totalPrice,
        image: Product.imageUrl,
        quantity: 1,
        size: selectedSize?.name || "",
        extra: selectedExtra,
      })
    );
    toast.success(t("productAdded"));
  };
  const handleRemoveFromCart = () => {
    dispatch(
      removeFromCart({
        id: Product.id,
        size: selectedSize?.name || "",
        extra: selectedExtra,
      })
    );
    toast.success(t("deleteProductSucess"));
  };

  const itemQuantity = getSpecificItemQuantity(
    Product.id,
    selectedSize?.name || "",
    selectedExtra,
    Cart
  );

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <ButtonCrach className="login-btn bubbles-login w-full sm:w-auto">
            Add to Cart
          </ButtonCrach>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="relative w-full h-30 mb-2">
              <Image
                src={Product.imageUrl}
                alt={Product.name}
                fill
                className="object-contain"
              />
            </div>
            <DialogTitle>{Product.name}</DialogTitle>
            <DialogDescription>{Product.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-10">
            <div className="space-y-4 border-b pb-4 text-center">
              <Label className="text-md font-semibold">Size</Label>
              <RadioGroupDemo
                sizes={Product.sizes}
                price={Product.basePrice}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            </div>
            <div className="space-y-4 text-center">
              <Label className="text-md font-semibold">Extra</Label>
              <ExtraGroup
                Exters={Product.extras}
                selectedExtra={selectedExtra}
                setSelectedExtra={setSelectedExtra}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-4 items-center justify-between w-full ">
            {itemQuantity > 0 ? (
              <div className="flex items-center justify-center gap-4 w-full bg-gray-50 p-4 rounded-lg border">
                <Button
                  onClick={handleAddToCart}
                  type="submit"
                  size="sm"
                  className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold"
                >
                  +
                </Button>
                <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
                  {itemQuantity}
                </span>
                <Button
                  onClick={handleRemoveFromCart}
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-full border-primary text-primary hover:bg-primary hover:text-white font-bold"
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    dispatch(
                      removeItemFromCart({
                        id: Product.id,
                        size: selectedSize?.name || "",
                        extra: selectedExtra,
                      })
                    )
                  }
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-full border-primary text-primary hover:bg-primary hover:text-white font-bold"
                >
                  <Trash2Icon size={16} className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleAddToCart}
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Add to cart • {totalPrice}
              </Button>
            )}
          </DialogFooter>
          <DialogFooter className="flex flex-col gap-4 items-center justify-between w-full ">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 py-2 rounded-lg transition-colors"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
function RadioGroupDemo({
  sizes,
  price,
  selectedSize,
  setSelectedSize,
}: {
  sizes: Size[];
  price: number;
  selectedSize: Size | null;
  setSelectedSize: (size: Size) => void;
}) {
  return (
    <RadioGroup defaultValue="comfortable" className="space-y-2">
      {sizes.map((size) => (
        <div 
          key={size.id} 
          className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-gray-50/50 transition-all duration-200 cursor-pointer group"
          onClick={() => setSelectedSize(size)}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value={size.name}
              checked={selectedSize?.id === size.id}
              id={size.id}
              className="border-2 group-hover:border-primary"
            />
            <Label 
              htmlFor={size.id}
              className="font-medium text-sm cursor-pointer group-hover:text-primary transition-colors"
            >
              {size.name}
            </Label>
          </div>
          <span className="text-sm font-semibold text-primary">
            {formatCurrency(Number(price) + size.price)}
          </span>
        </div>
      ))}
    </RadioGroup>
  );
}

function ExtraGroup({
  Exters,
  selectedExtra,
  setSelectedExtra,
}: {
  Exters: Extra[];
  selectedExtra: Extra[];
  setSelectedExtra: (extra: Extra[]) => void;
}) {
  const handleExtraToggle = (extra: Extra) => {
    const isSelected = selectedExtra.some((item) => item.id === extra.id);
    if (isSelected) {
      setSelectedExtra(selectedExtra.filter((item) => item.id !== extra.id));
    } else {
      setSelectedExtra([...selectedExtra, extra]);
    }
  };

  return (
    <div className="space-y-2">
      {Exters.map((exter) => (
        <div 
          key={exter.id} 
          className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-gray-50/50 transition-all duration-200 cursor-pointer group"
          onClick={() => handleExtraToggle(exter)}
        >
          <div className="flex items-center gap-3">
            <Checkbox
              id={exter.id}
              checked={selectedExtra.some((item) => item.id === exter.id)}
              onCheckedChange={() => handleExtraToggle(exter)}
              className="border-2 group-hover:border-primary"
            />
            <Label 
              htmlFor={exter.id}
              className="font-medium text-sm cursor-pointer group-hover:text-primary transition-colors"
            >
              {exter.name}
            </Label>
          </div>
          <span className="text-sm font-semibold text-green-600">
            +{formatCurrency(exter.price)}
          </span>
        </div>
      ))}
    </div>
  );
}
