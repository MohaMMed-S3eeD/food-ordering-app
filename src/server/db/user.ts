
import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getUsers = cache(
    () => {
        const users = db.user.findMany();
        return users;
    },
    ["users-all"],
    { revalidate: 3600, tags: ["users-all"] }
)


export const getUserById = cache(
    (userId: string) => {
        const user = db.user.findUnique({
            where: {
                id: userId
            }
        })
        return user;
    },
    ["users-by-id"],
    { revalidate: 3600, tags: ["users-by-id"] }

) 
