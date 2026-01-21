import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);

        if (!session || !session.user?.email) {
            return new Response(
                JSON.stringify({ message: "Não autorizado" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const body = await request.json();
        const { name, phone, company, image } = body;

        if (!name) {
            return new Response(
                JSON.stringify({ message: "O nome é obrigatório" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name,
                phone,
                company,
                image,
            } as any,
        });

        return new Response(
            JSON.stringify({
                message: "Perfil atualizado com sucesso!",
                user: updatedUser
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        return new Response(
            JSON.stringify({ message: "Erro ao atualizar perfil. Tente novamente." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
