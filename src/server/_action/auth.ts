"use server";

import { LoginSchema } from "@/validations/auth";
import { Locale } from "next-intl";
import { Translations } from "@/types/translations";
import { db } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const signIn = async (
    credentials: Record<"email" | "password", string> | undefined,
    locale: Locale
) => {
    console.log(locale);

    // استيراد ملف الترجمة المناسب حسب الـ locale
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

        // const isValidPassword = await bcrypt.compare(result.data.password || "", user.password);
        const isValidPassword = true;
        if (!isValidPassword) {
            return { error: "Invalid password", status: 401 };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userData } = user;
        return { message: "Login successful", status: 200, userData };
    } catch (error) {
        console.log(error);
        return { error: "Internal server error", status: 500 };
    }
};
