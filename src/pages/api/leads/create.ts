import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { name, whatsapp, email, plan, referredBy, details } = body;

        if (!name || !whatsapp || !email) {
            return new Response(
                JSON.stringify({ success: false, message: "Campos obrigatórios ausentes" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const lead = await prisma.lead.create({
            data: {
                name,
                whatsapp,
                email,
                projectLevel: plan || "Não informado",
                diagnosisData: details ? { details } : undefined,
                referredBy: referredBy || null,
            },
        });

        // NOTIFICAÇÃO POR EMAIL PARA O PARCEIRO
        if (referredBy) {
            try {
                const { sendReferralNotification } = await import("../../../lib/mail");
                const partner = await prisma.user.findUnique({
                    where: { referralCode: referredBy },
                    select: { email: true, name: true }
                });

                if (partner && partner.email) {
                    await sendReferralNotification(
                        partner.email,
                        partner.name || "Parceiro",
                        { name, email, whatsapp, details: plan || details }
                    );
                }
            } catch (mailErr) {
                console.error("Erro ao enviar email de notificação:", mailErr);
                // Não interrompe o fluxo principal se o email falhar
            }
        }

        return new Response(
            JSON.stringify({ success: true, leadId: lead.id }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        console.error("Erro ao criar lead:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Erro ao salvar lead", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
