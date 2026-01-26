import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Iniciando Reset de Banco de Dados ---');

    // 1. Apagar tudo
    console.log('Limpando tabelas...');
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();
    console.log('Todas as tabelas foram limpas.');

    // 2. Criar Admin
    const adminEmail = 'alphacodecontato@gmail.com'; // Email padrão sugerido
    const adminPassword = 'admin_alpha_2025'; // Senha temporária segura
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    console.log(`Criando usuário administrador: ${adminEmail}`);
    const admin = await prisma.user.create({
        data: {
            name: 'Administrador Alpha',
            email: adminEmail,
            password: hashedPassword,
            role: 'ADMIN',
            plan: 'VIP',
        },
    });

    console.log('--- Reset Concluído com Sucesso ---');
    console.log(`ID do Admin: ${admin.id}`);
    console.log(`E-mail: ${adminEmail}`);
    console.log(`Senha: ${adminPassword}`);
    console.log('IMPORTANT: Mude sua senha após o primeiro login.');
}

main()
    .catch((e) => {
        console.error('Erro ao resetar banco:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
