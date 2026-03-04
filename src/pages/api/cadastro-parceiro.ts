import type { APIRoute } from "astro";
import { prisma } from "../../lib/prisma";

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { nome, whatsapp, email, instagram, area, mensagem } = body;

        if (!nome || !whatsapp || !email || !instagram || !area) {
            return new Response(
                JSON.stringify({ success: false, message: "Campos obrigatórios ausentes" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Armazenar como Lead com metadados de parceiro
        const lead = await prisma.lead.create({
            data: {
                name: nome,
                whatsapp,
                email,
                projectLevel: "PARCEIRO_ALPHA",
                diagnosisData: {
                    instagram,
                    area,
                    mensagem,
                    tipo: "candidatura_parceria",
                    submittedAt: new Date().toISOString()
                }
            },
        });

        return new Response(
            JSON.stringify({ success: true, leadId: lead.id }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        console.error("Erro ao processar candidatura de parceiro:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Erro ao processar sua candidatura. Por favor, tente novamente via WhatsApp.",
                error: error.message
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
