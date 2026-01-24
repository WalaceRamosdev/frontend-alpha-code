import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);

        // Proteção: Apenas ADMIN pode criar usuários por esta rota
        if (!session || session.user?.role !== "ADMIN") {
            return new Response(
                JSON.stringify({ message: "Não autorizado" }),
                { status: 403, headers: { "Content-Type": "application/json" } }
            );
        }

        const body = await request.json();
        const { name, email, password, plan, siteUrl } = body;

        if (!name || !email || !password || !plan) {
            return new Response(
                JSON.stringify({ message: "Campos obrigatórios faltando" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Verificar se usuário existe
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return new Response(
                JSON.stringify({ message: "Usuário já existe" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                plan: plan.toUpperCase(),
                siteUrl: siteUrl || null,
                role: "USER"
            } as any
        });

        return new Response(
            JSON.stringify({ message: "Cliente criado com sucesso!", user: newUser }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        console.error("Admin Create User Error:", error);
        return new Response(
            JSON.stringify({ message: "Erro interno", details: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
