
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        where: { role: 'ADMIN' },
        select: { id: true, email: true }
    });
    console.log('Admin IDs:', JSON.stringify(users, null, 2));
    await prisma.$disconnect();
}

main();
