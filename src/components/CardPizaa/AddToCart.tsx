import React from "react";
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

export function AddToCart({
  img,
  alt,
  price,
  desc,
  name,
}: {
  img: string;
  alt: string;
  price: number;
  desc: string;
  name: string;
}) {
  const sizes = [
    {
      id: 1,
      name: "Small",
      price: 0,
    },
    {
      id: 2,
      name: "Medium",
      price: 20,
    },
    {
      id: 3,
      name: "Large",
      price: 30,
    },
  ];
  const extras = [
    {
      id: 4,
      name: "Extra Cheese",
      price: 14,
    },
    {
      id: 5,
      name: "Extra Pepperoni",
      price: 11,
    },
    {
      id: 6,
      name: "Extra Mushroom",
      price: 9,
    },
    {
      id: 7,
      name: "Extra Onion",
      price: 23,
    },
  ];
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
              <Image src={img} alt={alt} fill className="object-contain" />
            </div>
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>{desc}</DialogDescription>
          </DialogHeader>
          <div className="space-y-10">
            <div className="space-y-4 border-b pb-4 text-center">
              <Label className="text-md font-semibold">Size</Label>
              <RadioGroupDemo sizes={sizes} price={price} />
            </div>
            <div className="space-y-4 text-center">
              <Label className="text-md font-semibold">Extra</Label>
              <ExtraGroup Exters={extras} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add to cart {price}+</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

function RadioGroupDemo({ sizes, price }: { sizes: any; price: number }) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size) => (
        <div key={size.id} className="flex items-center gap-3 border-b pb-2">
          <RadioGroupItem value={size.id} id={size.id} />
          <Label htmlFor={size.id}>
            {size.name} - {formatCurrency(Number(price) + size.price)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
function ExtraGroup({ Exters }: { Exters: any }) {
  return (
    <RadioGroup defaultValue="comfortable">
      {Exters.map((exter) => (
        <div key={exter.id} className="flex items-center gap-3 border-b pb-2 ">
          <Checkbox value={exter.id} id={exter.id} />
          <Label htmlFor={exter.id}>
            {exter.name} + {formatCurrency(exter.price)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
