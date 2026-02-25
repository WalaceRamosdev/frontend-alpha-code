import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);

        if (!session || !session.user) {
            return new Response(
                JSON.stringify({ message: "Não autorizado" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const body = await request.json();
        const {
            name, phone, company, profession,
            instagram, linkedin, image, siteUrl,
            plan, oldPassword, newPassword
        } = body;

        const userIdentifier = session.user.id
            ? { id: session.user.id }
            : { email: session.user.email };

        if (!userIdentifier.id && !userIdentifier.email) {
            return new Response(
                JSON.stringify({ message: "Usuário não identificado na sessão" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // ── Password change ────────────────────────────────────────────────
        let hashedPassword: string | undefined;
        if (newPassword && newPassword.trim().length >= 6) {
            if (oldPassword) {
                const currentUser = await prisma.user.findFirst({ where: userIdentifier as any });
                if (!currentUser?.password) {
                    return new Response(
                        JSON.stringify({ message: "Sem senha cadastrada no sistema." }),
                        { status: 400, headers: { "Content-Type": "application/json" } }
                    );
                }
                const valid = await bcrypt.compare(oldPassword, currentUser.password);
                if (!valid) {
                    return new Response(
                        JSON.stringify({ message: "Senha atual incorreta." }),
                        { status: 400, headers: { "Content-Type": "application/json" } }
                    );
                }
            }
            hashedPassword = await bcrypt.hash(newPassword, 10);
        }

        // ── Plan validation ────────────────────────────────────────────────
        const validPlans = ["FREE", "BRONZE", "PRATA", "OURO"];
        if (plan && !validPlans.includes(plan.toUpperCase())) {
            return new Response(
                JSON.stringify({ message: "Plano inválido." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // ── Build update payload ───────────────────────────────────────────
        // NOTE: phone has @unique — only update when a real value is given,
        // never save empty string as null (would conflict with other null rows).
        const cleanPhone = phone?.replace(/\D/g, "") || "";

        const data: Record<string, unknown> = {};
        if (name) data.name = name;
        if (cleanPhone.length >= 10) data.phone = phone; // store formatted
        if (company !== undefined) data.company = company || null;
        if (profession !== undefined) data.profession = profession || null;
        if (instagram !== undefined) data.instagram = instagram || null;
        if (linkedin !== undefined) data.linkedin = linkedin || null;
        if (image !== undefined) data.image = image || null;
        if (siteUrl !== undefined) data.siteUrl = siteUrl || null;
        if (plan !== undefined) data.plan = plan.toUpperCase();
        if (hashedPassword) data.password = hashedPassword;

        const updatedUser = await prisma.user.update({
            where: userIdentifier as any,
            data: data as any,
        });

        return new Response(
            JSON.stringify({ message: "Perfil atualizado com sucesso!", user: updatedUser }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error: any) {
        console.error("❌ Erro ao atualizar usuário:");
        console.error("  code:", error.code);
        console.error("  message:", error.message);
        console.error("  meta:", JSON.stringify(error.meta));

        // Unique constraint friendly message
        if (error.code === "P2002") {
            const field = error.meta?.target?.[0] ?? "campo";
            return new Response(
                JSON.stringify({ message: `O ${field} informado já está em uso por outro usuário.` }),
                { status: 409, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ message: error.message || "Erro ao atualizar dados." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
