import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";

export const POST: APIRoute = async ({ request }) => {
    const session = await getSession(request);

    if (!session || session.user?.role !== "ADMIN") {
        return new Response(JSON.stringify({ message: "Não autorizado" }), {
            status: 401,
        });
    }

    try {
        const body = await request.json();
        const { userId } = body;

        // Prevent deleting yourself
        if (userId === session.user.id) {
            return new Response(
                JSON.stringify({ message: "Você não pode se excluir" }),
                { status: 400 }
            );
        }

        await prisma.user.delete({
            where: { id: userId },
        });

        return new Response(
            JSON.stringify({ message: "Usuário excluído com sucesso" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete Error:", error);
        return new Response(
            JSON.stringify({ message: "Erro ao excluir usuário" }),
            { status: 500 }
        );
    }
};
