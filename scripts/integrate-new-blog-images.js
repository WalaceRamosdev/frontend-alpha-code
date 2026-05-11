import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Caminhos dos arquivos gerados pelo Antigravity
const srcImage1 = 'C:/Users/HP/.gemini/antigravity/brain/b8638b1e-8ae6-4f8e-a104-0df6a2729e52/achadinhos_shopee_amazon_affiliate_premium_1778511003374.png';
const srcImage2 = 'C:/Users/HP/.gemini/antigravity/brain/b8638b1e-8ae6-4f8e-a104-0df6a2729e52/solar_energy_google_maps_seo_1778510748071.png';

const inputDir = './blog-imagens-input';
const outputDir = './public/assets/blog';

// Destinos das imagens originais PNG na pasta de input
const destImage1 = path.join(inputDir, 'como-criar-site-de-achadinhos-shopee-amazon-que-vende-sitesalphacode.png');
const destImage2 = path.join(inputDir, 'como-empresas-de-energia-solar-dominam-o-google-local-sitesalphacode.png');

async function main() {
    console.log('🚀 Iniciando processo de integração e otimização das capas...');

    // Garantir existência das pastas
    if (!fs.existsSync(inputDir)) {
        fs.mkdirSync(inputDir, { recursive: true });
    }
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 1. Copiar as imagens geradas para a pasta de input e artifacts
    const artifactsDir = 'C:/Users/HP/.gemini/antigravity/brain/b8638b1e-8ae6-4f8e-a104-0df6a2729e52/artifacts';
    if (!fs.existsSync(artifactsDir)) {
        fs.mkdirSync(artifactsDir, { recursive: true });
    }

    const artDest1 = path.join(artifactsDir, 'achadinhos_shopee_amazon_affiliate_premium_1778511003374.png');
    const artDest2 = path.join(artifactsDir, 'solar_energy_google_maps_seo_1778510748071.png');

    try {
        if (fs.existsSync(srcImage1)) {
            fs.copyFileSync(srcImage1, destImage1);
            fs.copyFileSync(srcImage1, artDest1);
            console.log(`✅ Imagem 1 copiada com sucesso para ${destImage1} e artifacts`);
        } else {
            console.error(`⚠️ Imagem 1 não encontrada em: ${srcImage1}`);
        }

        if (fs.existsSync(srcImage2)) {
            fs.copyFileSync(srcImage2, destImage2);
            fs.copyFileSync(srcImage2, artDest2);
            console.log(`✅ Imagem 2 copiada com sucesso para ${destImage2} e artifacts`);
        } else {
            console.error(`⚠️ Imagem 2 não encontrada em: ${srcImage2}`);
        }
    } catch (err) {
        console.error('❌ Erro ao copiar as imagens geradas:', err);
    }

    // 2. Otimizar e converter para WebP na pasta final do blog
    const filesToConvert = [
        { input: destImage1, output: path.join(outputDir, 'como-criar-site-de-achadinhos-shopee-amazon-que-vende-sitesalphacode.webp') },
        { input: destImage2, output: path.join(outputDir, 'como-empresas-de-energia-solar-dominam-o-google-local-sitesalphacode.webp') }
    ];

    for (const item of filesToConvert) {
        if (fs.existsSync(item.input)) {
            console.log(`⚡ Convertendo: ${item.input} -> ${item.output}`);
            try {
                await sharp(item.input)
                    .webp({ quality: 85 })
                    .toFile(item.output);
                console.log(`🎉 Sucesso! Capa otimizada criada em ${item.output}`);
            } catch (err) {
                console.error(`❌ Erro ao converter ${item.input}:`, err);
            }
        }
    }

    console.log('\n✨ Integração concluída com sucesso! Os artigos do blog já estão atualizados e com as capas otimizadas.');
}

main();
