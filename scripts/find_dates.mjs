import fs from 'fs';

function readFileRobust(path) {
    if (!fs.existsSync(path)) return null;
    const buffer = fs.readFileSync(path);
    if (buffer[0] === 0xff && buffer[1] === 0xfe) return buffer.toString('utf16le');
    if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) return buffer.toString('utf8').slice(1);
    return buffer.toString('utf8').replace(/^\uFEFF/, '');
}

async function main() {
    console.log('--- Scanning for timestamps ---');

    // 1. Scan users_list.json
    const usersContent = readFileRobust('users_list.json');
    if (usersContent) {
        try {
            const users = JSON.parse(usersContent.trim());
            console.log('\n- Dates from users_list.json:');
            users.forEach(u => {
                console.log(`User: ${u.email} | CreatedAt: ${u.createdAt}`);
            });
        } catch (e) {
            console.log('Failed to parse users_list.json');
        }
    }

    // 2. Scan audit_logs.json
    const logsContent = readFileRobust('audit_logs.json');
    if (logsContent) {
        try {
            const logs = JSON.parse(logsContent.trim());
            console.log('\n- Events from audit_logs.json:');
            logs.forEach(l => {
                // Look for creation events or anything with details
                if (l.action.includes('CREATE') || l.action.includes('LOGIN') || l.details) {
                    console.log(`Date: ${l.createdAt} | Action: ${l.action} | Target: ${l.entityId || ''} | Details: ${JSON.stringify(l.details)}`);
                }
            });
        } catch (e) {
            console.log('Failed to parse audit_logs.json');
        }
    }

    // 3. Scan scripts for hardcoded dates
    console.log('\n- Hardcoded dates in scripts:');
    const scripts = fs.readdirSync('scripts').filter(f => f.endsWith('.mjs') || f.endsWith('.ts'));
    scripts.forEach(s => {
        const content = fs.readFileSync(`scripts/${s}`, 'utf8');
        const dateMatch = content.match(/new Date\(['"]([^'"]+)['"]\)/g);
        if (dateMatch) {
            console.log(`File: ${s} | Dates: ${dateMatch.join(', ')}`);
        }
    });
}

main();
