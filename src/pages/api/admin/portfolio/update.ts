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
        console.log("Update Project Request Data:", data);
        const { id, name, clientName, type, plan, category, projectUrl, status, startDate, deliveryDate } = data;

        if (!id || !name || !type || !category || !projectUrl) {
            return new Response(JSON.stringify({ message: "Preencha todos os campos obrigatórios" }), {
                status: 400,
            });
        }

        const project = await (prisma as any).project.update({
            where: { id },
            data: {
                name,
                clientName: clientName || null,
                type,
                plan,
                category: category.toLowerCase(), // Ensure consistent lowercase
                projectUrl,
                status: status || "Em Andamento",
                startDate: startDate ? new Date(startDate) : new Date(),
                deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
            },
        });

        return new Response(JSON.stringify({ message: "Projeto atualizado com sucesso!", project }), {
            status: 200,
        });

    } catch (e: any) {
        console.error("Update Portfolio Project Error Details:", e);
        return new Response(JSON.stringify({
            message: "Erro ao atualizar projeto",
            error: e.message,
            code: e.code
        }), {
            status: 500,
        });
    }
};
