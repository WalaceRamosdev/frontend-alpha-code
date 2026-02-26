import { PrismaClient } from '@prisma/client';

async function main() {
    // Try to connect to the SQLite DB directly by passing a custom URL if Prisma allows it in the constructor
    // Or just check if the env var can be overridden
    process.env.DATABASE_URL = 'file:./prisma/dev.db';
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: 'file:./dev.db' // Try both root and prisma relative
            }
        }
    });

    try {
        console.log('--- Checking SQLite dev.db ---');
        const count = await prisma.user.count();
        console.log('User count in SQLite:', count);
        const users = await prisma.user.findMany({ select: { name: true, email: true } });
        console.log('Users:', users);
    } catch (e) {
        console.error('Error connecting to SQLite:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
