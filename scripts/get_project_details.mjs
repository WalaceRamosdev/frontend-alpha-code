
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const project = await prisma.project.findFirst({
        where: { name: { contains: 'Alzimara' } }
    });
    console.log('Project Details:', JSON.stringify(project, null, 2));
    await prisma.$disconnect();
}

main();
