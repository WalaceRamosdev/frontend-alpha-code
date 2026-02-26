import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

function readFileRobust(path) {
    if (!fs.existsSync(path)) return null;
    const buffer = fs.readFileSync(path);
    if (buffer[0] === 0xff && buffer[1] === 0xfe) return buffer.toString('utf16le');
    return buffer.toString('utf8').replace(/^\uFEFF/, '');
}

async function main() {
    const content = readFileRobust('records_output.txt');
    if (!content) return;

    const lines = content.split('\n');
    let count = 0;

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // Try different regex to be sure
        const catMatch = line.match(/Cat:\s*([^|]+)/);
        const amtMatch = line.match(/Amt:\s*([^|]+)/);
        const hostMatch = line.match(/Host:\s*([^|]+)/);

        if (catMatch && amtMatch) {
            const category = catMatch[1].trim();
            const amount = parseFloat(amtMatch[1].trim().replace(',', '.'));
            const hosting = hostMatch ? parseFloat(hostMatch[1].trim().replace(',', '.')) : 0;

            console.log(`Restaurando: ${category} - ${amount}`);
            try {
                await prisma.financialRecord.create({
                    data: {
                        description: `Backup: ${category}`,
                        category: category,
                        amount: amount,
                        hostingCost: hosting,
                        date: new Date()
                    }
                });
                count++;
            } catch (e) {
                console.error(`Erro ao criar ${category}:`, e.message);
            }
        }
    }
    console.log(`Importados: ${count}`);
}

main().finally(() => prisma.$disconnect());
