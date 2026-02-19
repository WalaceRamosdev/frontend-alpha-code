
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Find the record we just added
    const record = await prisma.financialRecord.findFirst({
        where: {
            description: {
                contains: 'Lançamento Manual (399 - 40)'
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    if (record) {
        console.log('Record found:', record.id);
        const updated = await prisma.financialRecord.update({
            where: { id: record.id },
            data: {
                description: 'Plano Prata (Valor Antigo)',
                category: 'Plano Prata',
                date: new Date('2026-01-15T12:00:00Z'),
                // optionally update createdAt if that's what's shown
                createdAt: new Date('2026-01-15T12:00:00Z')
            }
        });
        console.log('Record updated:', updated);
    } else {
        console.log('No record found to update. creating new one...');
        await prisma.financialRecord.create({
            data: {
                category: 'Plano Prata',
                description: 'Plano Prata (Valor Antigo)',
                amount: 359.00, // 399 - 40
                hostingCost: 40.00,
                date: new Date('2026-01-15T12:00:00Z'),
                createdAt: new Date('2026-01-15T12:00:00Z')
            }
        });
        console.log('New record created.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
