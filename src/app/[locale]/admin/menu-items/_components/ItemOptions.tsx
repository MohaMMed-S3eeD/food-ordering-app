/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Translations } from "@/types/translations";
import { Extra, ExtraType, Size, SizeType } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const sizeNames = [SizeType.SMALL, SizeType.MEDIUM, SizeType.LARGE];
const extraNames = [
  ExtraType.CHEESE,
  ExtraType.PEPPERONI,
  ExtraType.MUSHROOM,
  ExtraType.ONION,
  ExtraType.OLIVE,
  ExtraType.SPINACH,
  ExtraType.TOMATO,
];
function handleOptions(
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>
) {
  const addOption = () => {
    setState((prev: any) => {
      return [...prev, { name: "", price: 0 }];
    });
  };
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldName: string
  ) => {
    const newValue = e.target.value;
    setState((prev: any) => {
      const newSizes = [...prev];
      newSizes[index][fieldName] = newValue;
      return newSizes;
    });
  };
  const removeOption = (indexToRemove: number) => {
    setState((prev: any) => {
      return prev.filter((_: any, index: number) => index !== indexToRemove);
    });
  };
  return { addOption, onChange, removeOption };
}
const ItemOptions = ({
  t,
  state,
  setState,
  type,
}: {
  t: Translations;
  state: Partial<Size>[] | Partial<Extra>[];
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
  type: "size" | "extra";
}) => {
  const { addOption, onChange, removeOption } = handleOptions(setState);

  return (
    <>
      {state.length > 0 && (
        <div className="space-y-4 mb-4">
          {state.map((size, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <Label className="text-sm font-medium">Name:</Label>
                  <SelectName
                    state={state}
                    item={size}
                    onChange={onChange}
                    index={index}
                    type={type}
                  />
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <Label className="text-sm font-medium">Price:</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    min={0}
                    className="focus-visible:ring-0 max-w-32"
                    onChange={(e) => onChange(e, index, "price")}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeOption(index)}
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Button
        disabled={
          state.length >=
          (type === "size" ? sizeNames.length : extraNames.length)
        }
        type="button"
        className="w-full"
        variant="outline"
        onClick={addOption}
      >
        {type === "size"
          ? t.admin["menu-items"].addItemSize
          : t.admin["menu-items"].addExtraItem}
      </Button>
    </>
  );
};

export default ItemOptions;

const SelectName = ({
  onChange,
  index,
  item,
  state,
  type,
}: {
  onChange: (e: any, index: any, fieldName: any) => void;
  index: number;
  item: Partial<Size> | Partial<Extra>;
  state: Partial<Size>[] | Partial<Extra>[];
  type: "size" | "extra";
}) => {
  return (
    <Select
      defaultValue={item.name || "select..."}
      onValueChange={(value) => onChange({ target: { value } }, index, "name")}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue>{item.name || "select..."}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{type === "size" ? "Sizes" : "Extras"}</SelectLabel>
          {type === "size"
            ? sizeNames
                .filter((size) => !state.some((s) => s.name === size))
                .map((size, index) => (
                  <SelectItem key={index} value={size}>
                    {size}
                  </SelectItem>
                ))
            : extraNames
                .filter((extra) => !state.some((s) => s.name === extra))
                .map((extra, index) => (
                  <SelectItem key={index} value={extra}>
                    {extra}
                  </SelectItem>
                ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
