import type { APIRoute } from 'astro';
import { prisma } from '../../../lib/prisma';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { clientName, email, phone, serviceType, amount, description } = data;

        // Validar campos básicos
        if (!clientName || !serviceType) {
            return new Response(JSON.stringify({ error: "Nome e Tipo de Serviço são obrigatórios" }), { status: 400 });
        }

        const record = await (prisma as any).maintenanceRequest.create({
            data: {
                clientName,
                email,
                phone,
                serviceType,
                amount: parseFloat(amount) || 0,
                description,
                status: 'PENDENTE',
                paymentStatus: 'PENDENTE'
            }
        });

        return new Response(JSON.stringify(record), { status: 201 });
    } catch (e: any) {
        console.error("Error creating maintenance request:", e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
