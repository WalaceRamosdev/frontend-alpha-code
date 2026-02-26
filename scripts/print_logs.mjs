import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const logs = await prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
    });
    for (const log of logs) {
        console.log(`[${log.createdAt.toISOString()}] ${log.action}: ${JSON.stringify(log.details)}`);
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
