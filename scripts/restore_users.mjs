import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('--- Starting Data Restoration ---');

    // 1. Alzimara Nunes Pereira
    console.log('Restoring Alzimara Nunes Pereira...');
    const alzimara = await prisma.user.upsert({
        where: { email: 'mara.nunes861@gmail.com' },
        update: {
            name: 'Alzimara Nunes Pereira',
            createdAt: new Date('2026-01-15T12:00:00Z'),
            plan: 'PRATA'
        },
        create: {
            email: 'mara.nunes861@gmail.com',
            name: 'Alzimara Nunes Pereira',
            createdAt: new Date('2026-01-15T12:00:00Z'),
            plan: 'PRATA'
        }
    });

    await prisma.financialRecord.create({
        data: {
            description: 'Plano Prata - Alzimara Nunes Pereira',
            category: 'ENTRADA',
            amount: 399,
            hostingCost: 40,
            date: new Date('2026-01-15T12:00:00Z')
        }
    });

    await prisma.project.create({
        data: {
            name: 'Projeto Alzimara',
            clientName: 'Alzimara Nunes Pereira',
            clientEmail: 'mara.nunes861@gmail.com',
            type: 'Landing Page',
            plan: 'PRATA',
            category: 'Site Profissional',
            imageUrl: '/assets/projects/placeholder.jpg',
            projectUrl: '',
            status: 'CONCLUIDO',
            deliveryDate: new Date('2026-01-18T12:00:00Z'),
            createdAt: new Date('2026-01-15T12:00:00Z')
        }
    });

    // 2. Ana Bottesi
    console.log('Restoring Ana Bottesi...');
    const ana = await prisma.user.upsert({
        where: { email: 'ana.bottesi@gmail.com' },
        update: {
            name: 'Ana Bottesi',
            createdAt: new Date('2026-02-17T12:00:00Z'),
            plan: 'PRATA'
        },
        create: {
            email: 'ana.bottesi@gmail.com',
            name: 'Ana Bottesi',
            createdAt: new Date('2026-02-17T12:00:00Z'),
            plan: 'PRATA'
        }
    });

    await prisma.financialRecord.create({
        data: {
            description: 'Plano Prata + SEO Turbinado - Ana Bottesi',
            category: 'ENTRADA',
            amount: 749, // 599 + 150
            hostingCost: 40,
            date: new Date('2026-02-17T12:00:00Z')
        }
    });

    await prisma.financialRecord.create({
        data: {
            description: 'Manutenção - Ana Bottesi',
            category: 'ENTRADA',
            amount: 100,
            date: new Date('2026-02-19T12:00:00Z')
        }
    });

    await prisma.maintenanceRequest.create({
        data: {
            clientName: 'Ana Bottesi',
            email: 'ana.bottesi@gmail.com',
            serviceType: 'MANUTENCAO',
            description: 'Manutenção Mensal / Atualização',
            amount: 100,
            status: 'CONCLUIDO',
            paymentStatus: 'PAGO',
            createdAt: new Date('2026-02-19T12:00:00Z'),
            updatedAt: new Date('2026-02-19T12:00:00Z')
        }
    });

    await prisma.project.create({
        data: {
            name: 'Projeto Ana Bottesi',
            clientName: 'Ana Bottesi',
            clientEmail: 'ana.bottesi@gmail.com',
            type: 'Landing Page',
            plan: 'PRATA',
            category: 'Site Profissional',
            imageUrl: '/assets/projects/placeholder.jpg',
            projectUrl: '',
            status: 'CONCLUIDO',
            deliveryDate: new Date('2026-02-22T12:00:00Z'),
            createdAt: new Date('2026-02-17T12:00:00Z')
        }
    });

    // 3. Tatiane Miranda Dos Cazais
    console.log('Restoring Tatiane Miranda Dos Cazais...');
    await prisma.user.upsert({
        where: { email: '94984046655' },
        update: {
            name: 'Tatiane Miranda Dos Cazais',
            createdAt: new Date('2026-02-21T12:00:00Z'),
            plan: 'FREE'
        },
        create: {
            email: '94984046655',
            name: 'Tatiane Miranda Dos Cazais',
            createdAt: new Date('2026-02-21T12:00:00Z'),
            plan: 'FREE'
        }
    });

    // 4. Natanael Pantoja
    console.log('Restoring Natanael Pantoja...');
    await prisma.user.upsert({
        where: { email: 'natanaelletras@gmail.com' },
        update: {
            name: 'Natanael Pantoja',
            createdAt: new Date('2026-02-24T12:00:00Z'),
            plan: 'FREE'
        },
        create: {
            email: 'natanaelletras@gmail.com',
            name: 'Natanael Pantoja',
            createdAt: new Date('2026-02-24T12:00:00Z'),
            plan: 'FREE'
        }
    });

    console.log('--- Restoration Complete ---');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
