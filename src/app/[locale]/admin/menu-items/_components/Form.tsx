"use client";
import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { Translations } from "@/types/translations";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SelectCategory } from "./SelectCategory";
import { Category, Extra, Size } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ItemOptions from "./ItemOptions";
const Form = ({
  t,
  categories,
}: {
  t: Translations;
  categories: Category[];
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [idCategory, setIdCategory] = useState(categories[0].id);
  const [sizes, setSizes] = useState<Size[]>([]);
  const { getFields } = useFormFields({
    slug: `${Pages.MENU_ITEMS}/new`,
    translations: t,
  });
  useEffect(() => {
    console.log(idCategory);
  }, [idCategory]);

  return (
    <form className="space-y-4">
      <div className="bg-gradient-to-br from-primary to-primary/80 px-6 py-10 text-center rounded-t-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10">
          <div className="mb-6">
            <div className="relative inline-block">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="user image"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-white shadow-xl mx-auto ring-4 ring-white/20"
                  priority
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl mx-auto ring-4 ring-white/20 bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}

              <UploadImage
                setSelectedImage={setSelectedImage}
                setSelectedFile={setSelectedFile}
              />
            </div>

            <div></div>
          </div>
        </div>
      </div>

      {selectedFile && <input type="hidden" name="hasNewImage" value="true" />}
      {getFields().map((field) => (
        <FormFields key={field.name} {...field} error={{}} />
      ))}

      <SelectCategory
        translations={t}
        categories={categories}
        idCategory={idCategory}
        setIdCategory={setIdCategory}
      />
      <AddSize t={t} sizes={sizes} setSizes={setSizes} />
      <FormAction t={t} />
    </form>
  );
};

export default Form;

const UploadImage = ({
  setSelectedImage,
  setSelectedFile,
}: {
  setSelectedImage: (image: string | null) => void;
  setSelectedFile: (file: File | null) => void;
}) => {
  return (
    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out z-50">
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        name="image"
        id="image-upload"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setSelectedFile(file);
          }
        }}
      />
      <label
        htmlFor="image-upload"
        className="cursor-pointer absolute inset-0 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ease-in-out group border-2 border-dashed border-white/70 hover:bg-black/60 hover:border-white/90"
      >
        <div className="flex flex-col items-center gap-1">
          <div className="bg-white/30 rounded-full p-2 group-hover:bg-white/40 transition-colors duration-200">
            <svg
              className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-white text-[10px] font-medium">
            Upload Image
          </span>
        </div>
      </label>
    </div>
  );
};

const FormAction = ({ t }: { t: Translations }) => {
  return (
    <div className="flex flex-col gap-2">
      <Button type="submit">{t.create}</Button>
      <Button type="button" variant="outline">
        {t.cancel}
      </Button>
    </div>
  );
};

const AddSize = ({
  t,
  sizes,
  setSizes,
}: {
  t: Translations;
  sizes: Size[];
  setSizes: (sizes: Size[]) => void;
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-gray-100 rounded-lg px-4 mb-4"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>{t.sizes}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <ItemOptions t={t} state={sizes} setState={setSizes} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const AddExtra = ({
  t,
  extras,
  setExtras,
}: {
  t: Translations;
  extras: Extra[];
  setExtras: (extras: Extra[]) => void;
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-gray-100 rounded-lg px-4 mb-4"
    >
      <AccordionItem value="item-2">
        <AccordionTrigger>{t.admin["menu-items"].addExtraItem}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <ItemOptions t={t} type="extra" state={extras} setState={setExtras} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};