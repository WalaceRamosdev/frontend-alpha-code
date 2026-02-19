
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
        const { id, date, description, amount, hostingCost, category } = data;

        if (!id || !amount) {
            return new Response(JSON.stringify({ message: "Dados incompletos" }), {
                status: 400,
            });
        }

        const updatedRecord = await (prisma as any).financialRecord.update({
            where: { id },
            data: {
                date: date ? new Date(date) : undefined,
                description,
                amount: parseFloat(amount),
                hostingCost: hostingCost ? parseFloat(hostingCost) : 0,
                category
            },
        });

        return new Response(JSON.stringify({ message: "Registro atualizado!", record: updatedRecord }), {
            status: 200,
        });

    } catch (e: any) {
        console.error("Update Record Error:", e);
        return new Response(JSON.stringify({ message: "Erro ao atualizar", error: e.message }), {
            status: 500,
        });
    }
};
