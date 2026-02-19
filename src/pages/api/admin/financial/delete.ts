
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
        const { id } = data;

        if (!id) {
            return new Response(JSON.stringify({ message: "ID não fornecido" }), {
                status: 400,
            });
        }

        await (prisma as any).financialRecord.delete({
            where: { id },
        });

        return new Response(JSON.stringify({ message: "Registro excluído!" }), {
            status: 200,
        });

    } catch (e: any) {
        console.error("Delete Record Error:", e);
        return new Response(JSON.stringify({ message: "Erro ao excluir", error: e.message }), {
            status: 500,
        });
    }
};
