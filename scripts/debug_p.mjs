
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const p = await prisma.project.findFirst({
        where: { name: { contains: 'Alzimara' } }
    });
    if (p) {
        console.log(`TYPE_START${p.type}TYPE_END`);
        console.log(`CAT_START${p.category}CAT_END`);
    }
    await prisma.$disconnect();
}

main();
