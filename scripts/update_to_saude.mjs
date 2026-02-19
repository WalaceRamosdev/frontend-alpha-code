
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Updating project category to "saude"...');

    try {
        // Updating any project that might be 'institucional', 'Institucional', or 'Psicologia'
        const result = await prisma.project.updateMany({
            where: {
                OR: [
                    { category: 'institucional' },
                    { category: 'Institucional' },
                    { category: 'Psicologia' }
                ]
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
