import { Pages } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";

interface Props extends IFormFieldsVariables {
    translations: any;
}

const useFormFields = ({ slug, translations }: Props) => {
    const loginFields = (): IFormField[] => [
        {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "example@gmail.com",
            autoFocus: true,
            disabled: false,
            readOnly: false,
        }
        ,
        {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "********",
        }
    ]

    const registerFields = (): IFormField[] => [
        {
            label: "Name",
            name: "name",
            type: "text",
            placeholder: "John Doe",
            autoFocus: true,
            disabled: false,
            readOnly: false,
        },
        {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "example@gmail.com",
            autoFocus: true,
            disabled: false,
            readOnly: false,
        },
        {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "********",
        },
        {
            label: "Confirm Password",
            name: "confirmPassword",
            type: "password",
            placeholder: "********",
        },
        {
            label: "Phone",
            name: "phone",
            type: "text",
            placeholder: "+201000000000",
            autoFocus: true,
            disabled: false,
            readOnly: false,
        },
        {
            label: "Address",
            name: "address",
            type: "text",
            placeholder: "123 Main St, Anytown, USA",
        },
        {
            label: "City",
            name: "city",
            type: "text",
            placeholder: "Anytown",
        },

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