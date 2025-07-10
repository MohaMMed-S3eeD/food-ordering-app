import { Extra, Product, Size } from "@prisma/client";

export type ProductWithRelations = Product & {
    sizes: Size[];
    extras: Extra[];
  };