import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

export default {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                console.log("🔐 Authorize called with:", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log("❌ Missing credentials");
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user || !user.password) {
                    console.log("❌ User not found or no password");
                    return null;
                }

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isValid) {
                    console.log("❌ Invalid password");
                    return null;
                }

                console.log("✅ Login successful for:", user.email);

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt" as const,
    },
    callbacks: {
        session: async ({ session, token }: any) => {
            if (token?.email) {
                const dbUser = (await prisma.user.findUnique({
                    where: { email: token.email as string },
                })) as any;
                if (dbUser) {
                    session.user = {
                        ...session.user,
                        id: dbUser.id,
                        name: dbUser.name,
                        image: dbUser.image,
                        phone: dbUser.phone,
                        company: dbUser.company,
                    };
                }
            }
            return session;
        },
        jwt: async ({ token, user }: any) => {
            if (user) {
                token.sub = user.id;
                token.email = user.email;
            }
            return token;
        }
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    basePath: "/api/auth",
};
