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
import { Extra, Size, SizeType } from "@prisma/client";
import { useAppSelector } from "@/Redux/hooks";
import { selectCartItems } from "@/Redux/features/Cart/cartSlice";

export function AddToCart({ Product }: { Product: ProductWithRelations }) {
  const Cart = useAppSelector(selectCartItems);
  const defultSize =
    Cart.find((item) => item.id === Product.id)?.size ||
    Product.sizes.find((size) => size.name === SizeType.SMALL);

  const defultExtra = Cart.find((item) => item.id === Product.id)?.extra || [];
  const [selectedSize, setSelectedSize] = useState<Size>(defultSize as Size);
  const [selectedExtra, setSelectedExtra] = useState<Extra[]>(
    defultExtra as unknown as Extra[]
  );


  let totalPrice = Product.basePrice + selectedSize?.price || 0;
  selectedExtra.forEach((extra) => {
    totalPrice += extra.price;
  });
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

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add to cart {totalPrice}+</Button>
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
  selectedSize: Size;
  setSelectedSize: (size: Size) => void;
}) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size) => (
        <div key={size.id} className="flex items-center gap-3 border-b pb-2">
          <RadioGroupItem
            value={selectedSize.name}
            checked={selectedSize.id === size.id}
            id={size.id}
            onClick={() => setSelectedSize(size)}
          />
          <Label htmlFor={size.id}>
            {size.name} - {formatCurrency(Number(price) + size.price)}
          </Label>
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
    const isSelected = selectedExtra.some(item => item.id === extra.id);
    if (isSelected) {
      setSelectedExtra(selectedExtra.filter(item => item.id !== extra.id));
    } else {
      setSelectedExtra([...selectedExtra, extra]);
    }
  };

  return (
    <div>
      {Exters.map((exter) => (
        <div key={exter.id} className="flex items-center gap-3 border-b pb-2 ">
          <Checkbox
            id={exter.id}
            checked={selectedExtra.some(item => item.id === exter.id)}
            onCheckedChange={() => handleExtraToggle(exter)}
          />
          <Label htmlFor={exter.id}>
            {exter.name} + {formatCurrency(exter.price)}
          </Label>
        </div>
      ))}
    </div>
  );
}
