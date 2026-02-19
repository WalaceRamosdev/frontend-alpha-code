
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const projects = await prisma.project.findMany();
    console.log('Current Projects in DB:', JSON.stringify(projects, null, 2));
    await prisma.$disconnect();
}

main();
