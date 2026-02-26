import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function readFileRobust(path) {
    if (!fs.existsSync(path)) return null;
    const buffer = fs.readFileSync(path);
    // Check for UTF-16 BOM (LE)
    if (buffer[0] === 0xff && buffer[1] === 0xfe) {
        return buffer.toString('utf16le');
    }
    return buffer.toString('utf8').replace(/^\uFEFF/, '');
}

async function importUsers() {
    const content = readFileRobust('users_data.json');
    if (!content) {
        console.log('users_data.json não encontrado.');
        return;
    }

    let usersData;
    try {
        usersData = JSON.parse(content.trim());
    } catch (e) {
        console.error('Erro ao parsear users_data.json:', e.message);
        return;
    }

    console.log(`--- Importando ${usersData.length} Usuários ---`);
    const defaultPassword = await bcrypt.hash('alpha_code_2025', 10);

    for (const u of usersData) {
        const identifier = u.email;
        if (!identifier) continue;

        const isEmail = identifier.includes('@');

        const existing = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: isEmail ? identifier : undefined },
                    { phone: !isEmail ? identifier : undefined }
                ].filter(Boolean)
            }
        });

        if (!existing) {
            console.log(`Criando: ${u.name} (${identifier})`);
            await prisma.user.create({
                data: {
                    name: u.name,
                    email: isEmail ? identifier : null,
                    phone: !isEmail ? identifier : null,
                    role: u.role || 'USER',
                    password: defaultPassword,
                    plan: 'FREE'
                }
            });
        } else {
            console.log(`Usuário ${identifier} já existe.`);
        }
    }
}

async function importFinancial() {
    const content = readFileRobust('records_output.txt');
    if (!content) return;

    console.log('--- Analisando Histórico Financeiro ---');
    const lines = content.split('\n');
    let importedCount = 0;

    for (const line of lines) {
        if (line.includes('ID:') && line.includes('|')) {
            try {
                // Formato: ID: xxx | Cat: yyy | Amt: zzz | Host: www
                const parts = line.split('|').map(p => p.trim());
                const categoryPart = parts.find(p => p.includes('Cat:'));
                const amountPart = parts.find(p => p.includes('Amt:'));
                const hostingPart = parts.find(p => p.includes('Host:'));

                if (categoryPart && amountPart) {
                    const category = categoryPart.split('Cat:')[1].trim();
                    const amountRaw = amountPart.split('Amt:')[1].trim();
                    const amount = parseFloat(amountRaw.replace(',', '.'));

                    const hostingRaw = hostingPart ? hostingPart.split('Host:')[1].trim() : '0';
                    const hosting = parseFloat(hostingRaw.replace(',', '.'));

                    console.log(`Restaurando Registro: ${category} - R$ ${amount}`);
                    await prisma.financialRecord.create({
                        data: {
                            description: `Restaurado de Backup: ${category}`,
                            category: category,
                            amount: amount,
                            hostingCost: hosting,
                            date: new Date()
                        }
                    });
                    importedCount++;
                }
            } catch (err) {
                console.error('Erro ao processar linha:', line);
            }
        }
    }
    console.log(`Total de registros financeiros restaurados: ${importedCount}`);
}

async function main() {
    try {
        await importUsers();
        await importFinancial();
        console.log('\n--- PROCESSO CONCLUÍDO ---');
        console.log('Senha padrão para novos usuários: alpha_code_2025');
    } catch (e) {
        console.error('Erro crítico no import:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
