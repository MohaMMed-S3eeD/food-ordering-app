"use server";

import { Pages, Routes, UserRole } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const deleteUser = async (id: string) => {
    const locale = await getLocale();
    const translations = await getTranslations(locale);
    try {
        await db.user.delete({
            where: { id },
        });
        revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
        revalidatePath(
            `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${id}/${Pages.EDIT}`
        );
        return {
            status: 200,
            message: translations("messages.deleteUserSucess"),
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: translations("messages.unexpectedError"),
        };
    }
};

export const createAdmin = async (userId: string) => {
    const locale = await getLocale();
    const translations = await getTranslations(locale);
    try {
        await db.user.update({
            where: { id: userId },
            data: { role: UserRole.ADMIN },
        });
        return {
            status: 200,
            message: translations("messages.adminCreated"),
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: translations("messages.unexpectedError"),
        };
    }
}