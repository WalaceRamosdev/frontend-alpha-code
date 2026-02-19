
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
    const projects = await prisma.project.findMany({
        where: { name: { contains: 'Ana' } }
    });
    console.log(JSON.stringify(projects, null, 2));
}
run();
