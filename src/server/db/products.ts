import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getProductsByCategory = cache(
    () => {
      const products = db.category.findMany({
        include: {
          products: {
            include: {
              sizes: true,
              extras: true,
            },
          },
        },
      });
      return products;
    },
    ["products-by-category"],
    { revalidate: 3600 }
  );
export const getProducts = cache(async (limit: number) => {
    const products = await db.product.findMany({
        where: {
            orders: {
                some: {}
            }
        },
        orderBy: {
            orders: {
                _count: "desc"
            }
        }
        ,
        include: {
            sizes: true,
            extras: true,
        },
        take: limit
    });
    return products;
}, ['products-best-seller'], { revalidate: 60 });