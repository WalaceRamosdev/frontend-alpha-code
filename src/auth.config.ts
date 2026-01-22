import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

export default {
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
            if (token?.sub && session.user) {
                session.user.id = token.sub;
                session.user.plan = token.plan || "FREE";
                session.user.siteUrl = token.siteUrl || null;
                session.user.image = token.picture || null;
                session.user.name = token.name || null;
            }
            return session;
        },
        jwt: async ({ token, user }: any) => {
            if (user) {
                token.sub = user.id;
            }

            // Sempre buscamos do banco para garantir dados frescos (image, name, etc)
            if (token?.sub) {
                try {
                    const dbUser = await prisma.user.findUnique({ where: { id: token.sub } });
                    if (dbUser) {
                        token.name = dbUser.name;
                        token.email = dbUser.email;
                        token.picture = dbUser.image;
                        token.plan = (dbUser as any)?.plan || "FREE";
                        token.siteUrl = (dbUser as any)?.siteUrl || null;
                    }
                } catch (e) {
                    console.error("Error refreshing token from DB:", e);
                }
            }
            return token;
        },
        signIn: async ({ user, account, profile }: any) => {
            console.log("👋 SignIn Attempt:", user?.email, "Provider:", account?.provider);
            return true;
        }
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    basePath: "/api/auth",
};
