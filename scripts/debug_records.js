import { PrismaClient } from '@prisma/client'
import fs from 'fs'
const prisma = new PrismaClient()

async function main() {
    const records = await prisma.financialRecord.findMany({
        orderBy: { date: 'asc' }
    })
    let output = '--- Raw Records ---\n'
    records.forEach(r => {
        output += `ID: ${r.id} | Date: ${r.date.toISOString()} | Desc: ${r.description} | Amt: ${r.amount} | Host: ${r.hostingCost}\n`
    })
    fs.writeFileSync('records_utf8.txt', output, 'utf8')
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect())
