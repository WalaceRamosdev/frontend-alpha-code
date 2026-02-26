import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const admins = [
        {
            email: 'alphacodecontato@gmail.com',
            password: 'admin_alpha_2025',
            name: 'Administrador Alpha'
        },
        {
            email: 'contatowalace.dev@gmail.com',
            password: 'admin_alpha_2025',
            name: 'Walace Ramos'
        }
    ];

    console.log('--- Verificando/Criando Administradores ---');

    for (const admin of admins) {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        const existingUser = await prisma.user.findUnique({
            where: { email: admin.email }
        });

        if (existingUser) {
            console.log(`Usuário ${admin.email} já existe. Atualizando cargo para ADMIN e resetando senha...`);
            await prisma.user.update({
                where: { email: admin.email },
                data: {
                    role: 'ADMIN',
                    password: hashedPassword,
                    name: admin.name,
                    loginAttempts: 0,
                    lockUntil: null
                }
            });
        } else {
            console.log(`Criando novo usuário administrador: ${admin.email}...`);
            await prisma.user.create({
                data: {
                    name: admin.name,
                    email: admin.email,
                    password: hashedPassword,
                    role: 'ADMIN',
                    plan: 'VIP'
                }
            });
        }
    }

    console.log('--- Configuração Concluída ---');
    admins.forEach(a => {
        console.log(`Login: ${a.email}`);
        console.log(`Senha: ${a.password}`);
    });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
