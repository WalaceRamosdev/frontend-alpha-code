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
        const { service, amount, description, hostingCost } = data;

        if (!service || !amount) {
            return new Response(JSON.stringify({ message: "Preencha todos os campos obrigatórios" }), {
                status: 400,
            });
        }

        const revenue = parseFloat(amount);
        const hosting = hostingCost ? parseFloat(hostingCost) : 0.0;

        const record = await (prisma as any).financialRecord.create({
            data: {
                category: service,
                description: description || `Venda de ${service}`,
                amount: revenue,
                hostingCost: hosting
            },
        });

        return new Response(JSON.stringify({ message: "Lançamento registrado!", record }), {
            status: 200,
        });

    } catch (e: any) {
        console.error("New Financial Record Error:", e);
        return new Response(JSON.stringify({ message: "Erro ao registrar lançamento", error: e.message }), {
            status: 500,
        });
    }
};
