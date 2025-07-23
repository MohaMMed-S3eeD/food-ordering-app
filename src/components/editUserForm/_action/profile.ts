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

        console.log(Object.fromEntries(formData.entries()))
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
            status: "error",
            formData,
        };
    }
    const data = validatedFields.data;
    const imageFile = data.image as File;
    const imageUrl = Boolean(imageFile.size)
        ? await getImageUrl(imageFile)
        : undefined;

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
                image: imageUrl ?? user.image,
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

const getImageUrl = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("pathName", "profile_images");

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const image = (await response.json()) as { url: string };
        return image.url;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
    }
};