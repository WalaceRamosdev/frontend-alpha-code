import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
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

                const identifier = credentials.email as string;

                // Allow login with Email OR Phone
                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: identifier },
                            { phone: identifier }
                        ]
                    }
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

                // BUSCA DINÂMICA: Pegamos a imagem e o plano direto do banco 
                // para NÃO inflar o Cookie com dados pesados (Base64)
                try {
                    const dbUser = await prisma.user.findUnique({
                        where: { id: token.sub },
                        select: { plan: true, siteUrl: true, image: true, name: true, email: true, role: true, phone: true, company: true }
                    } as any);

                    if (dbUser) {
                        session.user.plan = (dbUser as any).plan || "BRONZE";
                        session.user.siteUrl = (dbUser as any).siteUrl || null;
                        session.user.role = (dbUser as any).role || "USER";
                        session.user.image = dbUser.image || null;
                        session.user.name = dbUser.name || null;
                        session.user.email = dbUser.email || null;
                        session.user.phone = (dbUser as any).phone || null;
                        session.user.company = (dbUser as any).company || null;
                    }
                } catch (e) {
                    console.error("Session sync error:", e);
                }
            }
            return session;
        },
        jwt: async ({ token, user }: any) => {
            if (user) {
                token.sub = user.id;
            }
            // O JWT agora contém apenas o ID (sub). 
            // Isso mantém o Cookie minúsculo e evita o Erro 431.
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
