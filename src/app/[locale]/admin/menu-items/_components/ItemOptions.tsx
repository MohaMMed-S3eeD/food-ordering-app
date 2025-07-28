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
// todo: https://youtu.be/hDrt1ifv94o?t=29909
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
}: {
  t: Translations;
  state: Partial<Size>[] | Partial<Extra>[];
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
}) => {
  const { addOption, onChange, removeOption } = handleOptions(setState);
  console.log(state);
  return (
    <>
      {state.length > 0 && (
        <div className="space-y-4 mb-4">
          {state.map((size, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <Label className="text-sm font-medium">Name:</Label>
                  <SelectName item={size} onChange={onChange} index={index} />
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
        type="button"
        className="w-full"
        variant="outline"
        onClick={addOption}
      >
        {t.admin["menu-items"].addItemSize}
      </Button>
    </>
  );
};

export default ItemOptions;

const SelectName = ({
  onChange,
  index,
  item,
}: {
  onChange: (e: any, index: any, fieldName: any) => void;
  index: number;
  item: Partial<Size> | Partial<Extra>;
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
          <SelectLabel>Sizes</SelectLabel>
          {sizeNames.map((size, index) => (
            <SelectItem key={index} value={size}>
              {size}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

// const SelectExtra = () => {
//   return (
//     <Select>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Select an extra" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Extras</SelectLabel>
//           {extraNames.map((extra) => (
//             <SelectItem key={extra} value={extra}>
//               {extra}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// };
