import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/prisma";
import { getSession } from "../../../../lib/auth";

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);
        if (!session || session.user?.role !== "ADMIN") {
            return new Response(JSON.stringify({ message: "Não autorizado" }), {
                status: 401,
            });
        }

        const data = await request.json();
        const { name, clientName, type, plan, category, projectUrl, status, startDate, deliveryDate } = data;

        if (!name || !type || !category || !projectUrl) {
            return new Response(JSON.stringify({ message: "Preencha todos os campos obrigatórios" }), {
                status: 400,
            });
        }

        const project = await (prisma as any).project.create({
            data: {
                name,
                clientName: clientName || null,
                type,
                plan: plan || "PRATA",
                category: category.toLowerCase(),
                imageUrl: "/assets/placeholder-project.jpg", // Default placeholder
                projectUrl,
                status: status || "Em Andamento",
                startDate: startDate ? new Date(startDate) : new Date(),
                deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
            },
        });

        return new Response(JSON.stringify({ message: "Projeto adicionado ao portfólio!", project }), {
            status: 200,
        });

    } catch (e: any) {
        console.error("New Portfolio Project Error:", e);
        return new Response(JSON.stringify({ message: "Erro ao adicionar projeto", error: e.message }), {
            status: 500,
        });
    }
};
