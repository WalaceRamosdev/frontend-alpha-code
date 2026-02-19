import type { APIRoute } from 'astro';
import { prisma } from '../../../../lib/prisma';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { id, status } = await request.json();

        const updated = await (prisma as any).maintenanceRequest.update({
            where: { id },
            data: { status }
        });

        return new Response(JSON.stringify(updated), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
