
import fs from 'fs';
import path from 'path';

const dirs = ['public', 'src/assets'];
const exts = ['.jpg', '.jpeg', '.png'];

function processDir(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processDir(filePath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (exts.includes(ext)) {
                const webpPath = filePath.replace(ext, '.webp');
                if (fs.existsSync(webpPath)) {
                    console.log(`Deleting: ${filePath}`);
                    fs.unlinkSync(filePath);
                } else {
                    console.warn(`Skipping deletion, no WebP found for: ${filePath}`);
                }
            }
        }
    }
}

dirs.forEach(d => processDir(path.resolve(process.cwd(), d)));
console.log('Done cleanup');
