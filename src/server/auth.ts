// import { ValidationErrors } from '@/validations/auth';
import { Environments, Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { signIn } from "./_action/auth";

export const AuthOptions: NextAuthOptions = {
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
                        return { ...res.userData, message: res.message, locale: currentLocale };
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