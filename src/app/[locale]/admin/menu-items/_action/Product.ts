"use server"
import { db } from "@/lib/prisma"
import { Translations } from "@/types/translations"
import { addProductSchema } from "@/validations/product"
import { getLocale } from "next-intl/server"

export const addProduct = async (args: {
    categoryId: string,
}, prevState: unknown, formData: FormData) => {
    const locale = await getLocale();
    const translations: Translations = await import(`@/messages/${locale}.json`).then(
        (module) => module.default
    );

    const result = addProductSchema(translations).safeParse(
        Object.fromEntries(formData.entries())
    )
    if (!result.success) {
        return {
            success: false,
            status: 400,
            error: result.error.flatten().fieldErrors,
            formData
        }
    }
    const data = result.data;
    const basePrice = Number(data.basePrice);
    const imageFile = data.image as File;
    const imageUrl = Boolean(imageFile.size)
        ? await getImageUrl(imageFile)
        : undefined;
    const { image, ...productData } = data;
    console.log(image)
    try {

        if (imageUrl) {
            await db.product.create({
                data: {
                    ...productData,
                    imageUrl,
                    basePrice,
                    categoryId: args.categoryId,
                
                }
            })
            return {
                success: true,
                status: 200,
                error: {},
                formData
            }
        }
    } catch (error) {
        console.log("Error adding product:", error)
        return {
            success: false,
            status: 500,
            error: translations.messages.unexpectedError,
            formData
        }
    }

}
const getImageUrl = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("pathName", "product_images");

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        console.log(response);
        const image = (await response.json()) as { url: string };
        return image.url;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
    }
};