
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Adding financial record...');
    const record = await prisma.financialRecord.create({
        data: {
            category: 'Venda Manual',
            description: 'Lançamento Manual (399 - 40)',
            amount: 359.00,
            hostingCost: 40.00,
        },
    });
    console.log('Financial Record added:', record);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
