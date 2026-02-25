import type { APIRoute } from 'astro';
import { prisma } from '../../../../lib/prisma';
import { getSession } from "../../../../lib/auth";
import { ensureAdmin } from "../../../../lib/security";

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);
        ensureAdmin(session);

        const data = await request.json();
        const { clientName, serviceType, amount, description, startDate, endDate } = data;

        const record = await (prisma as any).maintenanceRequest.create({
            data: {
                clientName,
                serviceType,
                amount: parseFloat(amount),
                description,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                status: 'PENDENTE',
                paymentStatus: 'PENDENTE'
            }
        });

        return new Response(JSON.stringify(record), { status: 201 });
    } catch (e: any) {
        if (e.message === "UNAUTHORIZED_ADMIN_ACCESS") {
            return new Response(JSON.stringify({ error: "Não autorizado" }), { status: 403 });
        }
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
