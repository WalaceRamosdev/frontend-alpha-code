import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    console.log('--- DB CHECK ---');
    console.log('Users:', await prisma.user.count());
    console.log('Projects:', await prisma.project.count());
    console.log('Maintenance:', await prisma.maintenanceRequest.count());
    console.log('Financial:', await prisma.financialRecord.count());
    console.log('Leads:', await prisma.lead.count());
    console.log('--- END DB CHECK ---');
}
main().catch(console.error).finally(() => prisma.$disconnect());
