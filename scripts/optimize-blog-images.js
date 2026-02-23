import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './blog-imagens-input';
const outputDir = './public/assets/blog';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function convertImages() {
    const files = fs.readdirSync(inputDir);

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const stats = fs.statSync(inputPath);

        if (stats.isFile()) {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.avif', '.tiff'].includes(ext)) {
                const fileNameNoExt = path.parse(file).name;
                const outputPath = path.join(outputDir, `${fileNameNoExt}.webp`);

                console.log(`Convertendo: ${file} -> ${fileNameNoExt}.webp`);

                try {
                    await sharp(inputPath)
                        .webp({ quality: 85 })
                        .toFile(outputPath);

                    console.log(`Sucesso! Removendo original...`);
                    // Opcional: remover o original para manter a pasta limpa
                    // fs.unlinkSync(inputPath);
                } catch (err) {
                    console.error(`Erro ao converter ${file}:`, err);
                }
            }
        }
    }
}

convertImages();
