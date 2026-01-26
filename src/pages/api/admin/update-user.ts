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
        const { id, name, email, plan, siteUrl } = body;

        await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                plan,
                siteUrl: siteUrl || null,
            },
        });

        return new Response(
            JSON.stringify({ message: "Usuário atualizado com sucesso" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Update Error:", error);
        return new Response(
            JSON.stringify({ message: "Erro ao atualizar usuário" }),
            { status: 500 }
        );
    }
};
