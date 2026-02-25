import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'alphacodecontato@gmail.com';
    const adminPassword = 'admin_alpha_2025';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    console.log('--- Verificando/Criando Administrador ---');

    const existingUser = await prisma.user.findUnique({
        where: { email: adminEmail }
    });

    if (existingUser) {
        console.log('Usuário já existe. Atualizando cargo para ADMIN e resetando senha...');
        await prisma.user.update({
            where: { email: adminEmail },
            data: {
                role: 'ADMIN',
                password: hashedPassword,
                name: 'Administrador Alpha'
            }
        });
    } else {
        console.log('Criando novo usuário administrador...');
        await prisma.user.create({
            data: {
                name: 'Administrador Alpha',
                email: adminEmail,
                password: hashedPassword,
                role: 'ADMIN',
                plan: 'VIP'
            }
        });
    }

    // Também vamos garantir que o Walace seja ADMIN, para facilitar
    const walaceEmail = 'contatowalace.dev@gmail.com';
    const walace = await prisma.user.findUnique({ where: { email: walaceEmail } });
    if (walace) {
        console.log(`Elevando ${walaceEmail} para ADMIN...`);
        await prisma.user.update({
            where: { email: walaceEmail },
            data: { role: 'ADMIN' }
        });
    }

    console.log('--- Configuração Concluída ---');
    console.log(`Login: ${adminEmail}`);
    console.log(`Senha: ${adminPassword}`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
