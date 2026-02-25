import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const admins = await prisma.user.findMany({
        where: { role: 'ADMIN' },
        select: { email: true, phone: true }
    });
    console.log('--- ADMINS ---');
    admins.forEach(a => console.log(`Admin: ${a.email || a.phone}`));

    const users = await prisma.user.findMany({
        where: { role: 'USER' },
        select: { email: true, phone: true }
    });
    console.log('--- USERS ---');
    users.forEach(u => console.log(`User: ${u.email || u.phone}`));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
