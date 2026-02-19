import type { APIRoute } from 'astro';
import { prisma } from '../../../../lib/prisma';

export const DELETE: APIRoute = async ({ request }) => {
    try {
        const { id } = await request.json();

        if (!id) {
            return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
        }

        // Check if exists first to avoid prisma error
        const existing = await (prisma as any).maintenanceRequest.findUnique({
            where: { id }
        });

        if (!existing) {
            return new Response(JSON.stringify({ error: 'Pedido não encontrado' }), { status: 404 });
        }

        await (prisma as any).maintenanceRequest.delete({
            where: { id }
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
