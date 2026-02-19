
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Adding financial record: Plano Prata (399.00)...');

    try {
        const record = await prisma.financialRecord.create({
            data: {
                date: new Date(),
                category: 'Plano Prata',
                description: 'Plano Prata - Valor Antigo',
                amount: 399.00,
                hostingCost: 0
            }
        });
        console.log('Successfully added record:', record);
    } catch (error) {
        console.error('Error adding record:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
