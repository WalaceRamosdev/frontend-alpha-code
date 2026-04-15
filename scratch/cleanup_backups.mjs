import fs from 'fs';
const paths = ['seo-backup-1776115297631', 'seo-backup-1776117105658'];
paths.forEach(p => {
    if (fs.existsSync(p)) {
        fs.rmSync(p, { recursive: true, force: true });
        console.log(`Deletado: ${p}`);
    } else {
        console.log(`Não encontrado: ${p}`);
    }
});
