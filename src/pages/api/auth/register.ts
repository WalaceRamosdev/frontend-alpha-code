import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        // Validação básica
        if (!name || !email || !password) {
            return new Response(
                JSON.stringify({ message: "Todos os campos são obrigatórios" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if (password.length < 6) {
            return new Response(
                JSON.stringify({ message: "A senha deve ter no mínimo 6 caracteres" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Verificar se o usuário já existe
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new Response(
                JSON.stringify({ message: "Este email já está cadastrado" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar usuário
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return new Response(
            JSON.stringify({
                message: "Usuário criado com sucesso!",
                user: { id: user.id, name: user.name, email: user.email }
            }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        console.error("Erro ao criar usuário:", error);
        return new Response(
            JSON.stringify({
                message: "Erro no banco de dados",
                details: error.message || "Erro desconhecido"
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
