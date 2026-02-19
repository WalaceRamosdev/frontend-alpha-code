
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Correcting Alzimara project type to "Saúde"...');

    try {
        const result = await prisma.project.updateMany({
            where: {
                name: { contains: 'Alzimara' }
            },
            data: {
                type: 'Saúde'
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
