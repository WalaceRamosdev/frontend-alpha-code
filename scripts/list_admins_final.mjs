import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.user.count({ where: { role: 'ADMIN' } });
    const admins = await prisma.user.findMany({ where: { role: 'ADMIN' }, select: { email: true } });
    console.log(`Total Admins: ${count}`);
    admins.forEach(a => console.log(`- ${a.email}`));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
