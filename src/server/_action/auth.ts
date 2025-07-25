"use server";

import { LoginSchema, RegisterSchema } from "@/validations/auth";
import { Locale } from "next-intl";
import { Translations } from "@/types/translations";
import { db } from "@/lib/prisma";
import { getLocale } from "next-intl/server";
import bcrypt from "bcrypt";

export const signIn = async (
    credentials: Record<"email" | "password", string> | undefined,
    locale: Locale
) => {

    const translations: Translations = await import(`@/messages/${locale}.json`).then(
        (module) => module.default
    );

    const schema = LoginSchema(translations);
    const result = schema.safeParse(credentials);

    if (result.success === false) {
        return { error: result.error.issues[0].message, status: 400 };
    }
    try {
        const user = await db.user.findUnique({
            where: {
                email: result.data.email,
            },
        });
        if (!user) {
            return { error: locale === "ar" ? "الحساب غير موجود" : "User not found", status: 404 };
        }

        const isValidPassword = await bcrypt.compare(result.data.password || "", user.password);
        if (!isValidPassword) {
            return { error: translations.messages.incorrectPassword, status: 401 };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userData } = user;
        return { message: "Login successful", status: 200, userData };
    } catch (error) {
        console.log(error);
        return { error: "Internal server error", status: 500 };
    }
};


export const signUp = async (prevState: unknown, formData: FormData) => {
    const locale = await getLocale();
    const translations: Translations = await import(`@/messages/${locale}.json`).then(
        (module) => module.default
    );

    const schema = RegisterSchema(translations);
    const result = schema.safeParse(Object.fromEntries(formData.entries()));

    if (result.success === false) {
        return {
            message: result.error.issues.map(issue => issue.message).join(', '),
            formData: Object.fromEntries(formData.entries()),
            status: 400
        };
    }
    try {
        // user already exists
        const user = await db.user.findUnique({
            where: {
                email: result.data.email,
            },
        });
        if (user) {
            return {
                message: translations.messages.userAlreadyExists,
                status: 400
            }
        }
        // hash password
        const hashedPassword = await bcrypt.hash(result.data.password, 10);
        const newUser = await db.user.create({
            data: {
                email: result.data.email,
                password: hashedPassword,
                name: result.data.name,
                phone: "",
                city: "",
            },
        });
        if (!newUser) {
            return {
                message: translations.messages.unexpectedError,
                status: 500
            }
        }
        return { message: translations.messages.accountCreated, status: 201, user: newUser };
    } catch (error) {
        console.log(error)
        return {
            message: translations.messages.unexpectedError,
            status: 500
        }
    }
}