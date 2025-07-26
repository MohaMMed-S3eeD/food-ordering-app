import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getCategories = cache(
    () => {
        const categories = db.category.findMany({
            orderBy: {
                order: "asc",
            },
            include: {
                products: true,
            },
        });
        return categories;
    },
    ["categories"],
    { revalidate: 3600, tags: ["categories"] }
);
