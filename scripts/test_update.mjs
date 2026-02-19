
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
    try {
        const project = await prisma.project.findFirst({ where: { name: { contains: 'Ana' } } });
        if (!project) {
            console.log("Project not found");
            process.exit(1);
        }
        const updated = await prisma.project.update({
            where: { id: project.id },
            data: {
                name: project.name + " (Updated)",
                plan: "PRATA"
            }
        });
        console.log("Update success:", updated);
    } catch (e) {
        console.error("Update failed:", e);
    }
}
run();
