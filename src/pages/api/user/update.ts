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
        const { name, phone, company, image, siteUrl, plan } = body;

        // Validamos apenas se o corpo estiver vazio ou se o nome foi enviado explicitamente vazio
        if (Object.keys(body).length === 0) {
            return new Response(
                JSON.stringify({ message: "Nenhum dado fornecido para atualização" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                ...(name && { name }),
                ...(phone !== undefined && { phone }),
                ...(company !== undefined && { company }),
                ...(image !== undefined && { image }),
                ...(siteUrl !== undefined && { siteUrl }),
                ...(plan !== undefined && { plan }),
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
