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

    console.log("Form Data Entries:", Object.fromEntries(formData.entries()));
    
    if (!validatedFields.success) {
        console.error("Validation Error:", validatedFields.error);
        return {
            error: validatedFields.error.flatten().fieldErrors,
            status: "error",
            formData,
        };
    }
    
    const data = validatedFields.data;
    const imageFile = data.image as File;
    
    console.log("Image File Info:", {
        name: imageFile?.name,
        size: imageFile?.size,
        type: imageFile?.type,
        hasFile: Boolean(imageFile?.size)
    });
    
    let imageUrl: string | undefined;
    
    // تحقق من وجود ملف صورة جديد
    if (imageFile && imageFile.size > 0) {
        try {
            console.log("Attempting to upload image...");
            imageUrl = await getImageUrl(imageFile);
            console.log("Image uploaded successfully:", imageUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
            return {
                error: {
                    message: [translations.messages.unexpectedError || "Error uploading image"],
                },
                status: "error",
                formData,
            };
        }
    }

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
                // استخدم الصورة الجديدة إذا تم رفعها، وإلا احتفظ بالصورة القديمة
                image: imageUrl || user.image,
            },
        });
        
        if (!updatedUser) {
            return {
                error: {
                    message: ["Error updating user profile"],
                },
                status: "error",
                formData,
            };
        }
        
        revalidatePath("/profile");
        console.log("Profile updated successfully");

    } catch (error) {
        console.error("Database Error:", error);
        return {
            error: {
                message: [translations.messages.unexpectedError],
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
    console.log("Preparing to upload file:", imageFile.name, imageFile.size);
    
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("pathName", "profile_images");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL;
    
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
    }
    
    const uploadUrl = `${baseUrl}/api/upload`;
    console.log("Upload URL:", uploadUrl);

    try {
        const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
        });
        
        console.log("Upload response status:", response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Upload failed:", errorText);
            throw new Error(`Upload failed: ${response.status} - ${errorText}`);
        }
        
        const result = await response.json();
        console.log("Upload result:", result);
        
        if (!result.url) {
            throw new Error("No URL returned from upload");
        }
        
        return result.url;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
    }
};