import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const files = fs.readdirSync(rootDir);

const backups = files.filter(f => f.startsWith('seo-backup-'));

if (backups.length === 0) {
    console.log('Nenhuma pasta de backup encontrada.');
} else {
    backups.forEach(folder => {
        const fullPath = path.join(rootDir, folder);
        console.log(`Deletando: ${folder}...`);
        fs.rmSync(fullPath, { recursive: true, force: true });
    });
    console.log('✅ Todas as pastas de backup foram removidas!');
}
