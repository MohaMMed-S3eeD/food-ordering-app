import { Environments } from "@/constants/enums";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
                authorize: (credentials) => {
                    const user = credentials
                    return {
                        id: crypto.randomUUID(),
                        ...user
                    }
                }

            }
        ),
    ]
}