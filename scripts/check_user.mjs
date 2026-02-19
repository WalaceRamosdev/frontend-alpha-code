
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findUnique({
        where: { id: 'cm6x4msy00000ux2kkyhptd3c' }
    });
    console.log('User exists:', !!user);
    if (!user) {
        const allAdmins = await prisma.user.findMany({ where: { role: 'ADMIN' } });
        console.log('Available Admin IDs:', allAdmins.map(u => u.id));
    }
    await prisma.$disconnect();
}

main();
