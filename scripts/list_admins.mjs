
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        where: { role: 'ADMIN' }
    });
    console.log('Admin Users:', users);
    await prisma.$disconnect();
}

main();
