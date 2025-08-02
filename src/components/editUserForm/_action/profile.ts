"use server"
import { updateProfileSchema } from "@/validations/profile";
import { getLocale } from "next-intl/server";
import { Translations } from "@/types/translations";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/server/auth";
import { isAdminView } from "@/lib/admin-permissions";

export const updateProfile = async (isAdmin: boolean, prevState: unknown, formData: FormData) => {
    const locale = await getLocale();

    const translations: Translations = await import(`@/messages/${locale}.json`).then(
        (module) => module.default
    );
    
    // Check if user is AdminView (view-only admin)
    const session = await getServerSession(AuthOptions);
    if (isAdminView(session)) {
        return {
            error: {
                message: [translations.messages.adminViewRestriction],
            },
            status: "error",
            formData,
        };
    }
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
            imageUrl = await uploadImageToCloudinary(imageFile);
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
                city: data.city,
                country: data.country,
                image: imageUrl || user.image,
                role: isAdmin ? UserRole.ADMIN : UserRole.USER,
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

// دالة رفع الصورة مباشرة إلى Cloudinary
const uploadImageToCloudinary = async (imageFile: File): Promise<string> => {
    try {
        // التحقق من إعدادات Cloudinary
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            throw new Error("Cloudinary configuration missing");
        }

        // التحقق من نوع الملف
        if (!imageFile.type?.startsWith('image/')) {
            throw new Error("Only image files are allowed");
        }

        // التحقق من حجم الملف (5MB حد أقصى)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (imageFile.size > maxSize) {
            throw new Error("File size must be less than 5MB");
        }

        console.log("Converting file to base64...");

        // تحويل الملف إلى Buffer ثم Base64
        const fileBuffer = await imageFile.arrayBuffer();
        const base64File = Buffer.from(fileBuffer).toString("base64");

        console.log("Uploading to Cloudinary...");

        // رفع الصورة إلى Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(
            `data:${imageFile.type};base64,${base64File}`,
            {
                folder: "profile_images",
                transformation: [
                    { width: 200, height: 200, crop: "fill", gravity: "face" },
                ],
                quality: "auto",
                fetch_format: "auto"
            }
        );

        console.log("Upload successful:", {
            public_id: uploadResponse.public_id,
            secure_url: uploadResponse.secure_url
        });

        return uploadResponse.secure_url;

    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
    }
};