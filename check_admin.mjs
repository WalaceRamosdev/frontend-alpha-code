import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const user = await prisma.user.findUnique({
        where: { email: 'alphacodecontato@gmail.com' }
    });
    if (user) {
        console.log('User found:', {
            id: user.id,
            email: user.email,
            role: user.role,
            passwordExists: !!user.password
        });
    } else {
        console.log('User not found');
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
