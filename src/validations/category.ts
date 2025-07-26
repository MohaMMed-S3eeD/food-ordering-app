import { z } from "zod";




const addCategorySchema = (message: string) => z.object({
    name: z.string().min(1, { message: message }),
});

export default addCategorySchema;