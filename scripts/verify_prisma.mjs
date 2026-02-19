
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log('Static check of project model:');
console.log('prisma.project exists:', !!prisma.project);
if (prisma.project) {
    console.log('Attempting to find one project...');
    prisma.project.findFirst().then(p => {
        console.log('Result:', p);
        process.exit(0);
    }).catch(e => {
        console.error('Error:', e);
        process.exit(1);
    });
} else {
    console.log('Available models:', Object.keys(prisma).filter(k => !k.startsWith('$')));
    process.exit(1);
}
