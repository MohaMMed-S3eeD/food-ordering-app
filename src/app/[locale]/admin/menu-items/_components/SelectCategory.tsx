import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import { Translations } from "@/types/translations";
import { Label } from "@/components/ui/label";

export function SelectCategory({
  categories,
  idCategory,
  setIdCategory,
  translations,
}: {
  categories: Category[];
  idCategory: string;
  setIdCategory: (id: string) => void;
  translations: Translations;
}) {
  console.log(translations);
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="category" className="text-sm font-medium mb-2">
        Category
      </Label>
      <Select
        name="categoryId"
        value={idCategory}
        onValueChange={setIdCategory}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
