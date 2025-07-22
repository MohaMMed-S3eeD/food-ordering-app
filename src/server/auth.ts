// import { ValidationErrors } from '@/validations/auth';
import { Environments, Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { DefaultSession, NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { signIn } from "./_action/auth";
import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";



declare module "next-auth" {
    interface Session extends DefaultSession {
        user: User;
    }
    interface User {
        id: string;
        name: string;
        email: string;
        role: UserRole;
        image?: string;
        country?: string;
        city?: string;
        postalCode?: string;
        streetAddress?: string;
        phone?: string;
    }
}
declare module "next-auth/jwt" {
    interface JWT extends Partial<User> {
        id: string;
        name: string;
        email: string;
        role: UserRole;
    }
}
export const AuthOptions: NextAuthOptions = {
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session: ({ session, token }: { session: any; token: JWT }) => {
            if (token) {
                session.user = session.user || {};
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.image = token.image as string;
                session.user.country = token.country as string;
                session.user.city = token.city as string;
                session.user.postalCode = token.postalCode as string;
                session.user.streetAddress = token.streetAddress as string;
                session.user.phone = token.phone as string;
            }
            // return session;
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    role: token.role,
                    image: token.image,
                },
            }
        },
        jwt: async ({ token }): Promise<JWT> => {
            const userDB = await db.user.findUnique({
                where: {
                    email: token.email
                }
            })
            if (!userDB) {
                return token
            }
            return {
                id: userDB.id,
                name: userDB.name,
                email: userDB.email,
                role: userDB.role,
                image: userDB.image as string,
                city: userDB.city as string,
                country: userDB.country as string,
                phone: userDB.phone as string,
                streetAddress: userDB.streetAddress as string,
                postalCode: userDB.postalCode as string,
                createdAt: userDB.createdAt,
                updatedAt: userDB.updatedAt,
            }
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        updateAge: 24 * 60 * 60, // 24 hours
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === Environments.DEV,

    providers: [
        Credentials(
            {
                name: "Credentials",
                credentials: {
                    email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                    password: { label: "Password", type: "password", placeholder: "********" },

                },


                authorize: async (credentials, req) => {
                    const currentLocale = req?.headers?.referer?.split("/")[3] || "en";
                    const validLocales = ["ar", "en"];
                    const safeLocale = validLocales.includes(currentLocale) ? currentLocale : "en";

                    const res = await signIn(credentials, safeLocale);
                    if (res.status === 200 && res.userData) {
                        // Return only User interface properties and convert null to undefined
                        return {
                            id: res.userData.id,
                            name: res.userData.name,
                            email: res.userData.email,
                            role: res.userData.role,
                            image: res.userData.image || undefined,
                            country: res.userData.country || undefined,
                            city: res.userData.city || undefined,
                            postalCode: res.userData.postalCode || undefined,
                            streetAddress: res.userData.streetAddress || undefined,
                            phone: res.userData.phone || undefined,
                            message: res.message,
                            locale: currentLocale,
                        };
                    } else {
                        throw new Error(
                            JSON.stringify({
                                ValidationErrors: res.error,
                                responseError: res.message
                            }));
                    }
                }

            }
        ),
    ],
    adapter: PrismaAdapter(db),
    pages: { signIn: `${Routes.AUTH}/${Pages.LOGIN}` }
}
