import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const blogDir = path.join(rootDir, 'public', 'assets', 'blog');

const MAX_WIDTH = 1200;
const QUALITY = 80;
const VARIANTS = [
    { suffix: '-400', width: 400, quality: 72 },
    { suffix: '-800', width: 800, quality: 75 },
];

async function main() {
    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.webp'));

    let resized = 0, variants = 0, skipped = 0;

    for (const file of files) {
        if (/-(400|800)\.webp$/.test(file)) continue;

        const basePath = path.join(blogDir, file);
        const baseName = file.replace(/\.webp$/, '');
        const original = fs.readFileSync(basePath);
        const meta = await sharp(original).metadata();
        const width = meta.width || 0;

        let baseBuffer = null;

        if (width > MAX_WIDTH) {
            baseBuffer = await sharp(original)
                .resize({ width: MAX_WIDTH, withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toBuffer();
            fs.writeFileSync(basePath, baseBuffer);
            console.log(`⬇ ${file}: ${width}px → ${MAX_WIDTH}px (${(baseBuffer.length / 1024).toFixed(0)}KB)`);
            resized++;
        }

        for (const v of VARIANTS) {
            const outName = `${baseName}${v.suffix}.webp`;
            const outPath = path.join(blogDir, outName);
            if (fs.existsSync(outPath)) {
                skipped++;
                continue;
            }
            const buffer = baseBuffer
                ? await sharp(baseBuffer)
                : await sharp(original);
            const out = await buffer
                .resize({ width: v.width, withoutEnlargement: true })
                .webp({ quality: v.quality })
                .toBuffer();
            fs.writeFileSync(outPath, out);
            console.log(`  └ ${outName} (${(out.length / 1024).toFixed(0)}KB)`);
            variants++;
        }
    }

    console.log(`\nConcluído: ${resized} redimensionadas, ${variants} variantes criadas, ${skipped} já existentes.`);
}

main();
