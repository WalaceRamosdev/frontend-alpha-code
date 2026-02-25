import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const admins = await prisma.user.findMany({
        where: { role: 'ADMIN' },
        select: { email: true }
    });
    console.log('Admins:', admins.map(a => a.email));

    const users = await prisma.user.findMany({
        where: { role: 'USER' },
        select: { email: true }
    });
    console.log('Regular Users:', users.map(u => u.email));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
