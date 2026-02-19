import type { APIRoute } from 'astro';
import { prisma } from '../../../../lib/prisma';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { id } = await request.json();

        // 1. Get the request details
        const maintRequest = await (prisma as any).maintenanceRequest.findUnique({
            where: { id }
        });

        if (!maintRequest) {
            return new Response(JSON.stringify({ error: "Pedido não encontrado" }), { status: 404 });
        }

        if (maintRequest.paymentStatus === 'PAGO') {
            return new Response(JSON.stringify({ error: "Pedido já está pago" }), { status: 400 });
        }

        // 2. Create financial record
        const financialRecord = await (prisma as any).financialRecord.create({
            data: {
                description: `Recebimento: ${maintRequest.serviceType} - ${maintRequest.clientName}`,
                category: 'Serviço',
                amount: maintRequest.amount,
                date: new Date()
            }
        });

        // 3. Update maintenance request
        const updated = await (prisma as any).maintenanceRequest.update({
            where: { id },
            data: {
                paymentStatus: 'PAGO',
                financialId: financialRecord.id
            }
        });

        return new Response(JSON.stringify(updated), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
