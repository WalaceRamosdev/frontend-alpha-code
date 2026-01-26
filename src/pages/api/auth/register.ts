import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { name, email, password, phone } = body;

        // Validação básica
        if (!name || !email || !password) {
            return new Response(
                JSON.stringify({ message: "Nome, email e senha são obrigatórios" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if (password.length < 6) {
            return new Response(
                JSON.stringify({ message: "A senha deve ter no mínimo 6 caracteres" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[\W_]/.test(password);

        if (!hasUpperCase || !hasNumber || !hasSymbol) {
            return new Response(
                JSON.stringify({ message: "A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Verificar se o usuário já existe (Email ou Telefone)
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    phone ? { phone } : {}
                ]
            },
        });

        if (existingUser) {
            let message = "Este email já está cadastrado";
            if (phone && existingUser.phone === phone) {
                message = "Este telefone já está cadastrado";
            }
            if (existingUser.email === email) {
                message = "Este email já está cadastrado";
            }

            return new Response(
                JSON.stringify({ message }),
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
                phone: phone || null,
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
