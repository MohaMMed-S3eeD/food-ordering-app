import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// Define the type for the form data file
type FormDataFile = Blob & {
    name?: string; // Optional: Some browsers may add this
};

export async function POST(request: Request) {
    console.log("Upload API called");

    try {
        const formData = await request.formData();
        const file = formData.get("file") as FormDataFile | null;
        const pathName = formData.get("pathName") as string;

        console.log("File received:", {
            hasFile: !!file,
            fileName: file?.name,
            fileSize: file?.size,
            fileType: file?.type,
            pathName
        });

        if (!file) {
            console.error("No file provided");
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!file.size || file.size === 0) {
            console.error("Empty file provided");
            return NextResponse.json({ error: "Empty file provided" }, { status: 400 });
        }

        // تحقق من نوع الملف
        if (!file.type?.startsWith('image/')) {
            console.error("Invalid file type:", file.type);
            return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
        }

        // تحقق من حجم الملف (5MB حد أقصى)
        const maxSize = 1 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            console.error("File too large:", file.size);
            return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 });
        }

        // تحقق من إعدادات Cloudinary
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.error("Cloudinary configuration missing");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        console.log("Converting file to base64...");

        // Convert the file to a format Cloudinary can handle (Buffer or Base64)
        const fileBuffer = await file.arrayBuffer();
        const base64File = Buffer.from(fileBuffer).toString("base64");

        console.log("Uploading to Cloudinary...");

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(
            `data:${file.type};base64,${base64File}`,
            {
                folder: pathName || "uploads",
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

        return NextResponse.json({
            url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id
        });

    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);

        // تفاصيل أكثر للخطأ
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }

        return NextResponse.json(
            {
                error: "Failed to upload image",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        // تحقق من إعدادات Cloudinary
        const isConfigured = !!(
            process.env.CLOUDINARY_CLOUD_NAME &&
            process.env.CLOUDINARY_API_KEY &&
            process.env.CLOUDINARY_API_SECRET
        );

        return NextResponse.json({
            message: "Upload API is running",
            cloudinaryConfigured: isConfigured,
            data: "Use POST request to upload files to Cloudinary"
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}