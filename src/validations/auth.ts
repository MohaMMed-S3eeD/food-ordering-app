import { Translations } from "@/types/translations";
import * as z from "zod";

export const LoginSchema = (translations: Translations) => {
    return z.object({
        email: z.string().trim().email({
            message: translations.validation.validEmail,
        }),
        password: z
            .string()
            .min(6, { message: translations.validation.passwordMinLength })
            .max(40, { message: translations.validation.passwordMaxLength }),
    });
};

export const RegisterSchema = (translations: Translations) => {
    return z.object({
        name: z.string().trim().min(3, { message: translations.validation.nameMinLength }),
        email: z.string().trim().email({ message: translations.validation.validEmail }),
        password: z.string().trim().min(6, { message: translations.validation.passwordMinLength }),
        confirmPassword: z.string().trim().min(6, { message: translations.validation.confirmPasswordRequired }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: translations.validation.passwordMismatch,
        path: ["confirmPassword"],
    });
};

export type ValidationErrors =
    | {
        [key: string]: string[];
    }
    | undefined;
