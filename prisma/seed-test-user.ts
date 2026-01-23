import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('teste123', 10);

    // Criar usuário de teste com plano BRONZE (mais barato)
    const testUser = await prisma.user.upsert({
        where: { email: 'teste@alphacode.com' },
        update: {
            plan: 'BRONZE',
            name: 'Usuário Teste',
        },
        create: {
            email: 'teste@alphacode.com',
            name: 'Usuário Teste',
            password: hashedPassword,
            plan: 'BRONZE',  // Plano mais barato - pode fazer upgrade para PRATA ou OURO
        },
    });

    console.log('✅ Usuário de teste criado com sucesso!');
    console.log('📧 Email: teste@alphacode.com');
    console.log('🔑 Senha: teste123');
    console.log('📋 Plano: BRONZE (pode fazer upgrade para PRATA ou OURO)');
    console.log('');
    console.log('Dados do usuário:', testUser);
}

main()
    .catch((e) => {
        console.error('❌ Erro ao criar usuário:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
