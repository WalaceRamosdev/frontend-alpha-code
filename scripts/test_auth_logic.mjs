import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function testAuthorize(identifier, password) {
    console.log(`Testing authorize for: ${identifier}`);
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: identifier },
                { phone: identifier }
            ]
        }
    });

    if (!user) {
        console.log("❌ User not found in DB");
        return;
    }

    console.log("✅ User found in DB");
    console.log("Role:", user.role);

    if (!user.password) {
        console.log("❌ User has no password set");
        return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        console.log("❌ Password incorrect");
    } else {
        console.log("✅ Password correct!");
    }
}

async function main() {
    await testAuthorize('alphacodecontato@gmail.com', 'admin_alpha_2025');
}

main().catch(console.error).finally(() => prisma.$disconnect());
