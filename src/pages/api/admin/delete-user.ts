import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";
import { ensureAdmin, logSecurityActivity } from "../../../lib/security";

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);
        ensureAdmin(session);

        const body = await request.json();
        const { userId } = body;

        // Prevent deleting yourself
        if (userId === session!.user!.id) {
            return new Response(
                JSON.stringify({ message: "Você não pode se excluir" }),
                { status: 400 }
            );
        }

        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });

        await logSecurityActivity({
            userId: session!.user!.id,
            action: "ADMIN_DELETED_USER",
            entity: "User",
            entityId: userId,
            details: { deletedEmail: deletedUser.email },
            request
        });

        return new Response(
            JSON.stringify({ message: "Usuário excluído com sucesso" }),
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Delete Error:", error);

        if (error.message === "UNAUTHORIZED_ADMIN_ACCESS") {
            return new Response(JSON.stringify({ message: "Não autorizado" }), { status: 403 });
        }

        return new Response(
            JSON.stringify({ message: "Erro ao excluir usuário" }),
            { status: 500 }
        );
    }
};
