import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);

        if (!session || !session.user) {
            return new Response(
                JSON.stringify({ message: "Não autorizado" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const body = await request.json();
        const { name, phone, company, image, siteUrl, plan } = body;

        // Identificação do usuário preferencialmente por ID, senao por Email
        const userIdentifier = session.user.id ? { id: session.user.id } : { email: session.user.email };

        if (!userIdentifier.id && !userIdentifier.email) {
            return new Response(
                JSON.stringify({ message: "Usuário não identificado na sessão" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if (Object.keys(body).length === 0) {
            return new Response(
                JSON.stringify({ message: "Nenhum dado fornecido para atualização" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Validação básica de planos permitidos no sistema Alpha
        const validPlans = ["FREE", "PRO", "VIP"];
        if (plan && !validPlans.includes(plan.toUpperCase())) {
            return new Response(
                JSON.stringify({ message: "Plano inválido." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const updatedUser = await prisma.user.update({
            where: userIdentifier as any,
            data: {
                ...(name && { name }),
                ...(phone !== undefined && { phone }),
                ...(company !== undefined && { company }),
                ...(image !== undefined && { image }),
                ...(siteUrl !== undefined && { siteUrl }),
                ...(plan !== undefined && { plan: plan.toUpperCase() }),
            } as any,
        });

        return new Response(
            JSON.stringify({
                message: "Dados atualizados com sucesso!",
                user: updatedUser
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        console.error("Erro ao atualizar usuário:", error);
        return new Response(
            JSON.stringify({
                message: "Erro ao atualizar dados.",
                details: error.message
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
