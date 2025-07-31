"use server"
import { Pages, Routes } from "@/constants/enums"
import { db } from "@/lib/prisma"
import { Translations } from "@/types/translations"
import { addProductSchema, updateProductSchema } from "@/validations/product"
import { ExtraType, SizeType } from "@prisma/client"
import { getLocale } from "next-intl/server"
import { revalidatePath } from "next/cache"

export const addProduct = async (args: {
    categoryId: string,
    extras: {
        name: string,
        price: number
    }[],
    sizes: {
        name: string,
        price: number
    }[]
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
                    extras: {
                        create: args.extras.map((extra) => ({
                            name: extra.name as ExtraType,
                            price: extra.price
                        }))
                    },
                    sizes: {
                        create: args.sizes.map((size) => ({
                            name: size.name as SizeType,
                            price: size.price
                        }))
                    }

                }
            })
            revalidatePath(`/${locale}`)
            revalidatePath(`/${locale}/${Routes.MENU}`)
            revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`)
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
export const updateProduct = async (args: {
    productId: string,
    categoryId: string,
    extras: {
        name: string,
        price: number
    }[],
    sizes: {
        name: string,
        price: number
    }[]
}, prevState: unknown, formData: FormData) => {
    const locale = await getLocale();
    const translations: Translations = await import(`@/messages/${locale}.json`).then(
        (module) => module.default
    );
    const result = updateProductSchema(translations).safeParse(
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
    const hasNewImage = formData.get('hasNewImage') === 'true';
    
    let imageUrl;
    if (hasNewImage && Boolean(imageFile.size)) {
        imageUrl = await getImageUrl(imageFile);
    }
    
    const { image, ...productData } = data;
    console.log(image)
    try {
        // حذف العلاقات الموجودة أولاً
        await db.product.update({
            where: { id: args.productId },
            data: {
                extras: {
                    deleteMany: {}
                },
                sizes: {
                    deleteMany: {}
                }
            }
        });

        // تحديث المنتج مع البيانات الجديدة
        await db.product.update({
            where: { id: args.productId },
            data: {
                ...productData,
                ...(imageUrl && { imageUrl }),
                basePrice,
                categoryId: args.categoryId,
                extras: {
                    create: args.extras.map((extra) => ({
                        name: extra.name as ExtraType,
                        price: extra.price
                    }))
                },
                sizes: {
                    create: args.sizes.map((size) => ({
                        name: size.name as SizeType,
                        price: size.price
                    }))
                }
            }
        });

        revalidatePath(`/${locale}`)
        revalidatePath(`/${locale}/${Routes.MENU}`)
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`)
        return {
            success: true,
            status: 200,
            error: {},
            formData
        }
    } catch (error) {
        console.log("Error updating product:", error)
        return {
            success: false,
            status: 500,
            error: translations.messages.unexpectedError,
            formData
        }
    }

}

export const deleteProduct = async (productId: string) => {
    const locale = await getLocale();
    try {
        await db.product.delete({
            where: { id: productId }
        })
        revalidatePath(`/${locale}`)
        revalidatePath(`/${locale}/${Routes.MENU}`)
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`)
        return {
            success: true,
            status: 200,
            error: {}
        }
    } catch (error) {
        console.log("Error deleting product:", error)
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