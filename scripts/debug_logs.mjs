import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const logs = await prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20
    });
    for (const log of logs) {
        console.log(`${log.createdAt.toISOString()} | ${log.action.padEnd(30)} | ${JSON.stringify(log.details)}`);
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
