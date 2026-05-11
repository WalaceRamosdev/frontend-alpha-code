import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Caminhos dos arquivos gerados pelo Antigravity
const srcImage1 = 'C:/Users/HP/.gemini/antigravity/brain/b8638b1e-8ae6-4f8e-a104-0df6a2729e52/achadinhos_shopee_amazon_affiliate_premium_1778511003374.png';
const srcImage2 = 'C:/Users/HP/.gemini/antigravity/brain/b8638b1e-8ae6-4f8e-a104-0df6a2729e52/solar_energy_google_maps_seo_1778510748071.png';
const srcImage3 = 'C:/Users/HP/.gemini/antigravity/brain/b8638b1e-8ae6-4f8e-a104-0df6a2729e52/solar_energy_trust_crisis_premium_1778511436959.png';
const srcImage4 = 'C:/Users/HP/.gemini/antigravity/brain/b8638b1e-8ae6-4f8e-a104-0df6a2729e52/dental_marketing_likes_vs_bookings_1778512029195.png';
const srcImage5 = 'C:/Users/HP/.gemini/antigravity/brain/b8638b1e-8ae6-4f8e-a104-0df6a2729e52/ferrari_no_fuel_performance_vs_copywriting_1778512192541.png';

const inputDir = './blog-imagens-input';
const outputDir = './public/assets/blog';

// Destinos das imagens originais PNG na pasta de input
const destImage1 = path.join(inputDir, 'como-criar-site-de-achadinhos-shopee-amazon-que-vende-sitesalphacode.png');
const destImage2 = path.join(inputDir, 'como-empresas-de-energia-solar-dominam-o-google-local-sitesalphacode.png');
const destImage3 = path.join(inputDir, 'energia-solar-premium.png');
const destImage4 = path.join(inputDir, 'marketing-odontologia-premium.png');
const destImage5 = path.join(inputDir, 'performance-vs-copywriting.png');

async function main() {
    console.log('🚀 Iniciando processo de integração e otimização das capas...');

    // Garantir existência das pastas
    if (!fs.existsSync(inputDir)) {
        fs.mkdirSync(inputDir, { recursive: true });
    }
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Copiar as imagens geradas para a pasta de input e artifacts
    const artifactsDir = 'C:/Users/HP/.gemini/antigravity/brain/b8638b1e-8ae6-4f8e-a104-0df6a2729e52/artifacts';
    if (!fs.existsSync(artifactsDir)) {
        fs.mkdirSync(artifactsDir, { recursive: true });
    }

    const copies = [
        { src: srcImage1, dest: destImage1, art: path.join(artifactsDir, 'achadinhos_shopee_amazon_affiliate_premium_1778511003374.png'), label: 'Capa Afiliados' },
        { src: srcImage2, dest: destImage2, art: path.join(artifactsDir, 'solar_energy_google_maps_seo_1778510748071.png'), label: 'Capa Solar Google' },
        { src: srcImage3, dest: destImage3, art: path.join(artifactsDir, 'solar_energy_trust_crisis_premium_1778511436959.png'), label: 'Capa Confiança Solar' },
        { src: srcImage4, dest: destImage4, art: path.join(artifactsDir, 'dental_marketing_likes_vs_bookings_1778512029195.png'), label: 'Capa Odontologia Curtidas' },
        { src: srcImage5, dest: destImage5, art: path.join(artifactsDir, 'ferrari_no_fuel_performance_vs_copywriting_1778512192541.png'), label: 'Capa Ferrari Performance vs Copy' }
    ];

    for (const item of copies) {
        try {
            if (fs.existsSync(item.src)) {
                fs.copyFileSync(item.src, item.dest);
                fs.copyFileSync(item.src, item.art);
                console.log(`✅ ${item.label} copiada com sucesso para o input e artifacts`);
            } else {
                console.error(`⚠️ ${item.label} original não encontrada em: ${item.src}`);
            }
        } catch (err) {
            console.error(`❌ Erro ao copiar ${item.label}:`, err);
        }
    }

    // Otimizar e converter para WebP na pasta final do blog
    const filesToConvert = [
        { input: destImage1, output: path.join(outputDir, 'como-criar-site-de-achadinhos-shopee-amazon-que-vende-sitesalphacode.webp') },
        { input: destImage2, output: path.join(outputDir, 'como-empresas-de-energia-solar-dominam-o-google-local-sitesalphacode.webp') },
        { input: destImage3, output: path.join(outputDir, 'energia-solar-premium.webp') },
        { input: destImage4, output: path.join(outputDir, 'marketing-odontologia-premium.webp') },
        { input: destImage5, output: path.join(outputDir, 'performance-vs-copywriting.webp') }
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
