
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Adding financial record for SEO Turbinado...');
    // Calculate amount: SEO Turbinado (399? NO wait, list says 300).
    // User said: "valor de plano + seo turbinado".
    // Which plan? "plano" usually implies previous context or a specific plan.
    // The PREVIOUS request was "plano prata (com valor antigo)". 
    // Maybe "plano + seo turbinado" refers to another transaction?
    // "e o valor de plano + seo turbinado foi pago no dia 18/01/2026"
    // If the user means standard prices:
    // Plano Prata (449) + SEO Turbinado (300) = 749.
    // BUT user mentioned "valor antigo" for the previous one.
    // Let's assume standard pricing for this new record unless specified.
    // OR maybe they mean the record I JUST added?
    // "adicionado agora é referente ao plano prata... e o valor de plano + seo turbinado foi pago no dia..."
    // It sounds like a SECOND record.
    // "e o valor de plano + seo turbinado..." -> "And the value of plan + seo turbinado..."

    // Let's look at the prices defined in dashboard.astro:
    // Plano Prata: 449
    // SEO Turbinado: 300
    // Total: 749.
    // Hosting: ? User didn't specify hosting deduction for this one, but usually it's there.
    // User said "adicione o saldo de 399 - 40 aos ganhos" (previous request).
    // Then "o valor que foi adicionado agora é referente ao plano prata... e a data...".
    // NOW "e o valor de plano + seo turbinado foi pago no dia 18/01/2026".
    // This sounds like a NEW record.

    // Let's create a record for "Plano Prata + SEO Turbinado".
    // Amount: 449 + 300 = 749.
    // Hosting: Let's assume 0 or 40? I'll stick to 0 for now as it wasn't mentioned, OR 40 if standard.
    // Actually, the user asked to "facilitate future edits", which suggests they want to be able to edit this in the UI.
    // I will create the record first via script to satisfy the immediate data need.
    // I will use 749.00 amount.

    const record = await prisma.financialRecord.create({
        data: {
            category: 'Plano Prata + SEO Turbinado',
            description: 'Lançamento Manual: Plano Prata + SEO',
            amount: 749.00,
            hostingCost: 0.00, // Assuming no hosting deduction specified for this specific transaction text
            date: new Date('2026-01-18T12:00:00Z'),
            createdAt: new Date('2026-01-18T12:00:00Z')
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
