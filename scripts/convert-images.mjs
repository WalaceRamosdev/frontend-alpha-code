
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirs = ['public', 'src/assets'];
const exts = ['.jpg', '.jpeg', '.png'];

async function processDir(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            await processDir(filePath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (exts.includes(ext)) {
                console.log(`Converting: ${filePath}`);
                const outputPath = filePath.replace(ext, '.webp');
                if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
                    // For photos, use 80-90 quality.
                    await sharp(filePath).webp({ quality: 80 }).toFile(outputPath);
                } else {
                    // For PNGs (graphics, icons), check transparency.
                    await sharp(filePath).webp({ lossless: true }).toFile(outputPath);
                }
                // fs.unlinkSync(filePath); // I will do this in a separate step or verify first.
            }
        }
    }
}

(async () => {
    for (const dir of dirs) {
        await processDir(path.resolve(process.cwd(), dir));
    }
    console.log('Done convert');
})();
