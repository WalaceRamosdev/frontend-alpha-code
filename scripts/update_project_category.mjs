
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Updating project category from "institucional" to "saude"...');

    try {
        const result = await prisma.project.updateMany({
            where: {
                category: 'institucional'
            },
            data: {
                category: 'saude'
            }
        });

        console.log(`Successfully updated ${result.count} project(s).`);
    } catch (error) {
        console.error('Error updating project:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
