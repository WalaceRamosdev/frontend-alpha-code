
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const records = await prisma.financialRecord.findMany({ take: 1 });
    console.log('Sample Record:', JSON.stringify(records, null, 2));
    await prisma.$disconnect();
}

main();
