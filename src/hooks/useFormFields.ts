import { Pages } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";
import { Translations } from "@/types/translations";

interface Props extends IFormFieldsVariables {
    translations: Translations;
}

const useFormFields = ({ slug, translations }: Props) => {
    console.log(translations);
    const loginFields = (): IFormField[] => [
        {
            label: translations.auth.login.email.label,
            name: "email",
            type: "email",
            placeholder: translations.auth.login.email.placeholder,
            autoFocus: true,
            disabled: false,
            readOnly: false,
        }
        ,
        {
            label: translations.auth.login.password.label,
            name: "password",
            type: "password",
            placeholder: translations.auth.login.password.placeholder,
        }
    ]

    const registerFields = (): IFormField[] => [
        {
            label: translations.auth.register.name.label,
            name: "name",
            type: "text",
            placeholder: translations.auth.register.name.placeholder,
            autoFocus: true,
            disabled: false,
            readOnly: false,
        },
        {
            label: translations.auth.register.email.label,
            name: "email",
            type: "email",
            placeholder: translations.auth.register.email.placeholder,
            autoFocus: true,
            disabled: false,
            readOnly: false,
        },
        {
            label: translations.auth.register.password.label,
            name: "password",
            type: "password",
            placeholder: translations.auth.register.password.placeholder,
        },
        {
            label: translations.auth.register.confirmPassword.label,
            name: "confirmPassword",
            type: "password",
            placeholder: translations.auth.register.confirmPassword.placeholder,
        },
        // {
        //     label: "Phone",
        //     name: "phone",
        //     type: "text",
        //     placeholder: "+201000000000",
        //     autoFocus: true,
        //     disabled: false,
        //     readOnly: false,
        // },
        // {
        //     label: "Address",
        //     name: "address",
        //     type: "text",
        //     placeholder: "123 Main St, Anytown, USA",
        // },
        // {
        //     label: "City",
        //     name: "city",
        //     type: "text",
        //     placeholder: "Anytown",
        // },

    ]

    const getFields = () => {
        switch (slug) {
            case Pages.LOGIN:
                return loginFields();
            case Pages.Register:
                return registerFields();
            default:
                return [];
        }
    }

    return {
        getFields
    }
}

export default useFormFields;