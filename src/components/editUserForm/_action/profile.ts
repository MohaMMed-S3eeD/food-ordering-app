"use server"
import { updateProfileSchema } from "@/validations/profile";
import { getLocale } from "next-intl/server";
import { Translations } from "@/types/translations";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateProfile = async (prevState: unknown, formData: FormData) => {
    const locale = await getLocale();


    const translations: Translations = await import(`@/messages/${locale}.json`).then(
        (module) => module.default
    );

    const schema = updateProfileSchema(translations);
    const validatedFields = schema.safeParse({
        ...Object.fromEntries(formData.entries())
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
            status: "error",
            formData,
        };
    }
    const data = validatedFields.data;
    try {

        const user = await db.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!user) {

            return {
                error: {
                    message: [translations.messages.userNotFound],
                },
                status: "error",
                formData,
            };
        }
        const updatedUser = await db.user.update({
            where: {
                email: user.email,
            },
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                streetAddress: data.streetAddress,
                postalCode: data.postalCode,
            },
        });
        if (!updatedUser) {
            return {
                error: {
                    message: "error in 60L in action",
                    status: "401",
                    formData,
                },
            };
        }
        revalidatePath("/profile");

    } catch (error) {
        console.log(error)
        return {
            error: {
                message: translations.messages.unexpectedError,
            },
            status: "error",
            formData,
        };
    }


    return {
        massage: translations.messages.updateProfileSucess,
        status: "success",
        formData,
    };

};