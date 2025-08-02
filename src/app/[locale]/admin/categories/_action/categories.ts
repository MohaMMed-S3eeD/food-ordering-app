"use server";

import { Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import addCategorySchema from "@/validations/category";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/server/auth";
import { isAdminView } from "@/lib/admin-permissions";


const addCategory = async (prevState: unknown, formData: FormData) => {
    const locale = await getLocale();
    const t = await getTranslations("admin.categories.form.name.validation");
    const tmessage = await getTranslations("messages");
    
    // Check if user is AdminView (view-only admin)
    const session = await getServerSession(AuthOptions);
    if (isAdminView(session)) {
        return {
            status: 403,
            error: { general: tmessage("adminViewRestriction") },
        };
    }

    const result = addCategorySchema(t("required")).safeParse(
        Object.fromEntries(formData.entries()));

    if (result.success === false) {
        return {
            error: result.error.flatten().fieldErrors,
            status: 400,
        };
    }

    const data = result.data;

    try {
        await db.category.create({
            data,
        });

        // تحديث الكاش والصفحات بعد إضافة الفئة بنجاح
        revalidateTag("categories");
        revalidateTag("products-by-category");
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
        revalidatePath(`/${locale}/${Routes.MENU}`);

        return {
            status: 201,
            message: tmessage("categoryAdded"),
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            error: { general: tmessage("unexpectedError") },
        };
    }
}

const updateCategory = async (prevState: unknown, formData: FormData) => {
    const locale = await getLocale();
    const t = await getTranslations("admin.categories.form.name.validation");
    const tmessage = await getTranslations("messages");
    
    // Check if user is AdminView (view-only admin)
    const session = await getServerSession(AuthOptions);
    if (isAdminView(session)) {
        return {
            status: 403,
            error: { general: tmessage("adminViewRestriction") },
        };
    }

    const result = addCategorySchema(t("required")).safeParse(
        Object.fromEntries(formData.entries()));

    if (result.success === false) {
        return {
            error: {
                name: result.error.flatten().fieldErrors.name?.[0],
            },
            status: 400,
        };
    }
    const data = result.data;
    try {
        await db.category.update({
            where: { id: formData.get("id") as string },
            data,
        });
        revalidateTag("categories");
        revalidateTag("products-by-category");
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
        revalidatePath(`/${locale}/${Routes.MENU}`);
        return {
            status: 200,
            message: tmessage("updatecategorySucess"),
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            error: { general: tmessage("unexpectedError") },
        };
    }
}

const deleteCategory = async (prevState: unknown, formData: FormData) => {
    const locale = await getLocale();
    const tmessage = await getTranslations("messages");
    
    // Check if user is AdminView (view-only admin)
    const session = await getServerSession(AuthOptions);
    if (isAdminView(session)) {
        return {
            status: 403,
            error: { general: tmessage("adminViewRestriction") },
        };
    }

    const id = formData.get("id") as string;

    try {
        await db.category.delete({
            where: { id },
        });
        revalidateTag("categories");
        revalidateTag("products-by-category");
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
        revalidatePath(`/${locale}/${Routes.MENU}`);
        return {
            message: tmessage("deletecategorySucess"),
            error: {},
            status: 200,
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            error: { general: tmessage("unexpectedError") },
        };
    }
}

export { addCategory, updateCategory, deleteCategory };

