import { AuthOptions } from "@/server/auth"
import NextAuth from "next-auth"

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }