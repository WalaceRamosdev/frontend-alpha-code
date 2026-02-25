import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { logSecurityActivity } from "./lib/security";

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
            authorize: async (credentials, request) => {
                const identifier = credentials?.email as string;
                console.log("🔐 Authorize called for:", identifier);

                if (!identifier || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: identifier },
                            { phone: identifier }
                        ]
                    }
                }) as any;

                if (!user || !user.password) {
                    await logSecurityActivity({
                        action: "FAILED_LOGIN_UNKNOWN_USER",
                        details: { identifier }
                    });
                    return null;
                }

                // Check if account is locked
                if (user.lockUntil && user.lockUntil > new Date()) {
                    const timeLeft = Math.ceil((user.lockUntil.getTime() - Date.now()) / 60000);
                    await logSecurityActivity({
                        userId: user.id,
                        action: "LOGIN_ATTEMPT_LOCKED_ACCOUNT",
                        details: { identifier }
                    });
                    throw new Error(`BLOQUED:${timeLeft}`);
                }

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isValid) {
                    const newAttempts = (user.loginAttempts || 0) + 1;
                    const maxAttempts = 5;

                    await logSecurityActivity({
                        userId: user.id,
                        action: "FAILED_LOGIN_INVALID_PASSWORD",
                        details: { identifier, attempt: newAttempts }
                    });

                    if (newAttempts >= maxAttempts) {
                        const lockUntil = new Date(Date.now() + 15 * 60 * 1000);
                        await (prisma.user as any).update({
                            where: { id: user.id },
                            data: { loginAttempts: newAttempts, lockUntil }
                        });
                        throw new Error(`BLOQUED:15`);
                    } else {
                        await (prisma.user as any).update({
                            where: { id: user.id },
                            data: { loginAttempts: newAttempts }
                        });
                    }
                    return null;
                }

                // Reset attempts on success
                if (user.loginAttempts > 0 || user.lockUntil) {
                    await (prisma.user as any).update({
                        where: { id: user.id },
                        data: { loginAttempts: 0, lockUntil: null }
                    });
                }

                await logSecurityActivity({
                    userId: user.id,
                    action: "SUCCESSFUL_LOGIN",
                    details: { identifier, role: user.role }
                });

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

                // Always fetch fresh user data from DB so the session always
                // reflects the latest profile (including updated image, plan, etc.)
                try {
                    const dbUser = await (prisma.user as any).findFirst({
                        where: { id: token.sub },
                        select: {
                            name: true,
                            email: true,
                            phone: true,
                            company: true,
                            profession: true,
                            instagram: true,
                            linkedin: true,
                            image: true,
                            plan: true,
                            siteUrl: true,
                            role: true,
                        },
                    });

                    if (dbUser) {
                        session.user.name = dbUser.name ?? null;
                        session.user.email = dbUser.email ?? null;
                        session.user.phone = dbUser.phone ?? null;
                        session.user.company = dbUser.company ?? null;
                        session.user.profession = dbUser.profession ?? null;
                        session.user.instagram = dbUser.instagram ?? null;
                        session.user.linkedin = dbUser.linkedin ?? null;
                        session.user.image = dbUser.image ?? null;
                        session.user.plan = dbUser.plan || "FREE";
                        session.user.siteUrl = dbUser.siteUrl ?? null;
                        session.user.role = dbUser.role || "USER";
                    } else {
                        console.warn("[Session] User not found in DB for id:", token.sub);
                    }
                } catch (e: any) {
                    console.error("[Session] DB sync error:", e?.message ?? e);
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
            if (account?.provider === "google") {
                await logSecurityActivity({
                    userId: user?.id,
                    action: "GOOGLE_SIGNIN_ATTEMPT",
                    details: { email: user?.email }
                });
            }
            return true;
        }
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    basePath: "/api/auth",
};
