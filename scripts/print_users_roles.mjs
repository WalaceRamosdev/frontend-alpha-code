import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
async function main() {
    const users = await p.user.findMany({ select: { email: true, role: true } });
    console.log('Result:', users);
}
main().finally(() => p.$disconnect());
