import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const counts = {
        users: await prisma.user.count(),
        projects: await prisma.project.count(),
        maintenanceRequests: await prisma.maintenanceRequest.count(),
        financialRecords: await prisma.financialRecord.count(),
        leads: await prisma.lead.count(),
        auditLogs: await prisma.auditLog.count(),
    };
    console.log('Database Counts:', counts);

    if (counts.users > 0) {
        const firstUsers = await prisma.user.findMany({ take: 5, select: { email: true, name: true, role: true } });
        console.log('Sample Users:', firstUsers);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
