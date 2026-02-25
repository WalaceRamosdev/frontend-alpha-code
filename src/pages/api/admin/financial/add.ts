import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/prisma";
import { getSession } from "../../../../lib/auth";
import { ensureAdmin, logSecurityActivity } from "../../../../lib/security";

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);
        ensureAdmin(session);

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

        await logSecurityActivity({
            userId: session!.user!.id,
            action: "ADMIN_ADDED_FINANCIAL_RECORD",
            entity: "FinancialRecord",
            entityId: record.id,
            details: data,
            request
        });

        return new Response(JSON.stringify({ message: "Lançamento registrado!", record }), {
            status: 200,
        });

    } catch (e: any) {
        console.error("New Financial Record Error:", e);

        if (e.message === "UNAUTHORIZED_ADMIN_ACCESS") {
            return new Response(JSON.stringify({ message: "Não autorizado" }), { status: 403 });
        }

        return new Response(JSON.stringify({ message: "Erro ao registrar lançamento", error: e.message }), {
            status: 500,
        });
    }
};
