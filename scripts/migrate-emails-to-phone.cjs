const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Update Tatiane specifically as mentioned
    const tatiane = await prisma.user.findFirst({
        where: { name: { contains: 'Tatiane' } }
    });

    if (tatiane && tatiane.phone) {
        try {
            await prisma.user.update({
                where: { id: tatiane.id },
                data: { email: tatiane.phone }
            });
            console.log(`Updated Tatiane: ${tatiane.email} -> ${tatiane.phone}`);
        } catch (e) {
            console.error(`Could not update Tatiane: ${e.message}`);
        }
    }

    // 2. Do it for all registrations as requested
    const allUsers = await prisma.user.findMany({
        where: { phone: { not: null } }
    });

    for (const user of allUsers) {
        if (user.phone && user.email !== user.phone) {
            try {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { email: user.phone }
                });
                console.log(`Updated User ${user.name}: ${user.email} -> ${user.phone}`);
            } catch (e) {
                console.error(`Could not update ${user.name}: ${e.message}`);
            }
        }
    }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
