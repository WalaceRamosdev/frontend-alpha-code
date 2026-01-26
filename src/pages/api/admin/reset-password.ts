import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({ request }) => {
    const session = await getSession(request);

    if (!session || session.user?.role !== "ADMIN") {
        return new Response(JSON.stringify({ message: "Não autorizado" }), {
            status: 401,
        });
    }

    try {
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

        return new Response(
            JSON.stringify({ message: "Senha resetada com sucesso" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Reset Password Error:", error);
        return new Response(
            JSON.stringify({ message: "Erro ao resetar senha" }),
            { status: 500 }
        );
    }
};
