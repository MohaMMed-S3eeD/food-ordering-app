import useFormFields from "@/hooks/useFormFields";
import { Pages } from "@/constants/enums";
import React from "react";
import FormFields from "@/components/form-fields/form-fields";

const Form = () => {
  const { getFields } = useFormFields({
    slug: Pages.Register,
    translations: {},
  });
  console.log(getFields());
  return (
    <form className={`space-y-6 `}>
      {getFields().map((field) => (
        <FormFields key={field.name} error={{}} {...field} />
      ))}
      <button
        type="submit"
        
        className="w-full bg-primary cursor-pointer hover:scale-105 hover:bg-primary/90 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Form;
