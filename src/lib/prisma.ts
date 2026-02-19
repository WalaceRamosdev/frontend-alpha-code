import { PrismaClient } from '@prisma/client';
// Force TS re-evaluation

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Force refresh of the client to pick up schema changes like 'plan' field
export const prisma = new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
