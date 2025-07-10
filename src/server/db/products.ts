import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getProducts = cache(async () => {
    const products = await db.product.findMany({
        include: {
            sizes: true,
            extras: true,
        },
    });
    return products;
}, ['products-best-seller'], { revalidate: 60 });