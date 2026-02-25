import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";
import bcrypt from "bcryptjs";
import { ensureAdmin, logSecurityActivity, sanitizeForLog } from "../../../lib/security";

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);
        ensureAdmin(session);

        const body = await request.json();
        const { userId, newPassword } = body;

        if (!newPassword || newPassword.length < 6) {
            return new Response(
                JSON.stringify({ message: "Senha muito curta" }),
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
            },
        });

        await logSecurityActivity({
            userId: session!.user!.id,
            action: "ADMIN_RESET_USER_PASSWORD",
            entity: "User",
            entityId: userId,
            details: sanitizeForLog(body),
            request
        });

        return new Response(
            JSON.stringify({ message: "Senha resetada com sucesso" }),
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Reset Password Error:", error);

        if (error.message === "UNAUTHORIZED_ADMIN_ACCESS") {
            return new Response(JSON.stringify({ message: "Não autorizado" }), { status: 403 });
        }

        return new Response(
            JSON.stringify({ message: "Erro ao resetar senha" }),
            { status: 500 }
        );
    }
};
