import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'teste@alphacode.com.br';
    const password = 'alpha123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            plan: 'FREE'
        },
        create: {
            email,
            name: 'Cliente Teste',
            password: hashedPassword,
            plan: 'FREE'
        },
    });

    console.log('✅ Usuário de teste criado/atualizado com sucesso!');
    console.log('📧 Email:', email);
    console.log('🔑 Senha: alpha123');
}

main()
    .catch((e) => {
        console.error('❌ Erro ao criar usuário:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
