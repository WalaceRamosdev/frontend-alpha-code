import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function readFileRobust(path) {
    if (!fs.existsSync(path)) return null;
    const buffer = fs.readFileSync(path);
    if (buffer[0] === 0xff && buffer[1] === 0xfe) {
        return buffer.toString('utf16le');
    }
    return buffer.toString('utf8').replace(/^\uFEFF/, '');
}

async function importUsers() {
    const content = readFileRobust('users_data.json');
    if (!content) return;
    const usersData = JSON.parse(content.trim());
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
            console.log(`User created: ${u.name}`);
        }
    }
}

async function importFinancial() {
    const content = readFileRobust('records_output.txt');
    if (!content) return;

    console.log('--- Analisando Histórico Financeiro ---');
    const lines = content.split('\n');
    let count = 0;

    for (const line of lines) {
        if (line.includes('ID:') && line.includes('|')) {
            try {
                const parts = line.split('|').map(p => p.trim());
                const catStr = parts.find(p => p.includes('Cat:'))?.split('Cat:')[1]?.trim();
                const amtStr = parts.find(p => p.includes('Amt:'))?.split('Amt:')[1]?.trim();
                const hostStr = parts.find(p => p.includes('Host:'))?.split('Host:')[1]?.trim();

                if (catStr && amtStr) {
                    const amount = parseFloat(amtStr.replace(',', '.'));
                    const hosting = parseFloat(hostStr ? hostStr.replace(',', '.') : '0');

                    console.log(`Criando record: ${catStr} - ${amount}`);
                    await prisma.financialRecord.create({
                        data: {
                            description: `Restaurado: ${catStr}`,
                            category: catStr,
                            amount: amount,
                            hostingCost: hosting,
                            date: new Date()
                        }
                    });
                    count++;
                }
            } catch (err) {
                console.error('Erro na linha:', line, err.message);
            }
        }
    }
    console.log(`Registros importados: ${count}`);
}

async function main() {
    try {
        await importUsers();
        await importFinancial();
        console.log('Fim do processo');
    } catch (e) {
        console.error('Erro geral:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
