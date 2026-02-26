import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const logs = await prisma.auditLog.findMany({
        orderBy: { createdAt: 'asc' }, // Start from beginning of this DB's history
    });
    console.log(JSON.stringify(logs, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
