
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const projects = await prisma.project.findMany();
    for (const p of projects) {
        console.log(`ID: ${p.id} | Name: ${p.name} | Category: "${p.category}"`);
    }
    await prisma.$disconnect();
}

main();
