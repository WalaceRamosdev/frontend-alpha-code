import fs from 'fs';
import path from 'path';

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + '-' + Date.now();
const backupDir = `./project-state-backup-${timestamp}`;
const itemsToBackup = ['src', 'public', 'scripts', 'astro.config.mjs', 'package.json', 'tailwind.config.mjs'];

console.log(`\n📦 Criando Ponto de Restauração em: ${backupDir}`);

try {
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    itemsToBackup.forEach(item => {
        if (fs.existsSync(item)) {
            console.log(`   > Backup: ${item}`);
            fs.cpSync(item, path.join(backupDir, item), { recursive: true });
        }
    });

    console.log(`\n✅ Estado do projeto salvo com sucesso!`);
    console.log(`Dica: Para restaurar, basta copiar o conteúdo de ${backupDir} de volta para a raiz.\n`);
} catch (err) {
    console.error(`\n❌ Erro ao criar backup:`, err.message);
}
