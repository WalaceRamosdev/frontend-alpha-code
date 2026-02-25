import type { APIRoute } from 'astro';
import { prisma } from '../../../../lib/prisma';
import { getSession } from "../../../../lib/auth";
import { ensureAdmin } from "../../../../lib/security";

export const POST: APIRoute = async ({ request }) => {
    try {
        const session = await getSession(request);
        ensureAdmin(session);

        const { id, status } = await request.json();

        const updated = await (prisma as any).maintenanceRequest.update({
            where: { id },
            data: { status }
        });

        return new Response(JSON.stringify(updated), { status: 200 });
    } catch (e: any) {
        if (e.message === "UNAUTHORIZED_ADMIN_ACCESS") {
            return new Response(JSON.stringify({ error: "Não autorizado" }), { status: 403 });
        }
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
