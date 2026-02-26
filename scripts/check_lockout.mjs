import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const user = await prisma.user.findUnique({
        where: { email: 'alphacodecontato@gmail.com' }
    });
    console.log('User status:', {
        email: user.email,
        loginAttempts: user.loginAttempts,
        lockUntil: user.lockUntil,
        now: new Date()
    });
}
main().catch(console.error).finally(() => prisma.$disconnect());
