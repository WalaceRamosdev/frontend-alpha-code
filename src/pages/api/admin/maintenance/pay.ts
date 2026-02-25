import type { APIRoute } from 'astro';
import { prisma } from '../../../../lib/prisma';
import { getSession } from "../../../../lib/auth";
import { ensureAdmin } from "../../../../lib/security";

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);
        ensureAdmin(session);

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
        if (e.message === "UNAUTHORIZED_ADMIN_ACCESS") {
            return new Response(JSON.stringify({ error: "Não autorizado" }), { status: 403 });
        }
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
