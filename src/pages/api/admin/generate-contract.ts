import type { APIRoute } from 'astro';
import { getSession } from '../../../lib/auth';
import { generateStandardContract } from '../../../lib/contractGenerator';

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);
        if (!session || session.user?.role !== "ADMIN") {
            return new Response(JSON.stringify({ message: "Não autorizado" }), { status: 401 });
        }

        const data = await request.json();

        // Validate basic data
        if (!data.clientName || !data.planName || !data.totalValue) {
            return new Response(JSON.stringify({ message: "Dados incompletos" }), { status: 400 });
        }

        const pdfBuffer = await generateStandardContract({
            client: {
                name: data.clientName,
                email: data.clientEmail || "Não informado",
                whatsapp: data.clientWhatsapp || "Não informado"
            },
            order: {
                planName: data.planName,
                totalValue: data.totalValue,
                paymentMethod: data.paymentMethod || "A DEFINIR",
                status: data.status || "APROVADO",
                deliverables: data.deliverables || [],
                date: new Date().toLocaleDateString('pt-BR')
            }
        });

        return new Response(new Uint8Array(pdfBuffer), {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="Contrato_${data.clientName.replace(/\s+/g, '_')}.pdf"`,
                'Content-Length': pdfBuffer.length.toString()
            }
        });

    } catch (error: any) {
        console.error("Contract Generation API Error:", error);
        return new Response(JSON.stringify({ 
            message: "Erro ao gerar contrato", 
            error: error.message 
        }), { status: 500 });
    }
}

export const prerender = false;
