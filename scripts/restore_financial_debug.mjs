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

async function importFinancial() {
    const content = readFileRobust('records_output.txt');
    if (!content) {
        console.log('Arquivo records_output.txt não encontrado.');
        return;
    }

    console.log('--- Analisando Histórico Financeiro ---');
    const lines = content.split('\n');
    console.log(`Total de linhas: ${lines.length}`);
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        console.log(`Testando linha ${i}: [${line}]`);
        if (line.includes('ID:') && line.includes('|')) {
            console.log(`  -> Linha ${i} casou com o padrão!`);
            try {
                const parts = line.split('|').map(p => p.trim());
                console.log(`  -> Parts: ${JSON.stringify(parts)}`);
                const catStr = parts.find(p => p.includes('Cat:'))?.split('Cat:')[1]?.trim();
                const amtStr = parts.find(p => p.includes('Amt:'))?.split('Amt:')[1]?.trim();
                const hostStr = parts.find(p => p.includes('Host:'))?.split('Host:')[1]?.trim();

                console.log(`  -> Cat: [${catStr}], Amt: [${amtStr}]`);

                if (catStr && amtStr) {
                    const amount = parseFloat(amtStr.replace(',', '.'));
                    const hosting = parseFloat(hostStr ? hostStr.replace(',', '.') : '0');

                    console.log(`  -> Criando no banco: ${catStr} - ${amount}`);
                    const result = await prisma.financialRecord.create({
                        data: {
                            description: `Restaurado: ${catStr}`,
                            category: catStr,
                            amount: amount,
                            hostingCost: hosting,
                            date: new Date()
                        }
                    });
                    console.log(`  -> Sucesso! ID: ${result.id}`);
                    count++;
                } else {
                    console.log(`  -> Falha nos campos obrigatórios.`);
                }
            } catch (err) {
                console.error('  -> Erro na linha:', line, err.message);
            }
        }
    }
    console.log(`Registros importados: ${count}`);
}

async function main() {
    try {
        await importFinancial();
    } catch (e) {
        console.error('Erro geral:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
