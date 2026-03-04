import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import fetch from 'node-fetch';
import { execSync } from 'child_process';

const bannersDir = path.resolve('public/assets/marketing/banners');
const logoPath = path.resolve('public/assets/logo-sitesalphacode-3d.png');

if (!fs.existsSync(bannersDir)) {
    fs.mkdirSync(bannersDir, { recursive: true });
}

// Imagens premium de fundo da Unsplash (Dark Tech / Abstract / Business)
const backgrounds = [
    { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1080&h=1080&fit=crop&q=80', file: 'bg-1.jpg', format: 'post' }, // Cyber
    { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&h=1080&fit=crop&q=80', file: 'bg-2.jpg', format: 'post' }, // Circuit
    { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1080&h=1080&fit=crop&q=80', file: 'bg-3.jpg', format: 'post' }, // Matrix/Code
    { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1080&h=1920&fit=crop&q=80', file: 'bg-4.jpg', format: 'story' }, // Tech planet/abstract
    { url: 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=1080&h=1920&fit=crop&q=80', file: 'bg-5.jpg', format: 'story' }  // Clean tech lines
];

// Configurações e Textos para cada banner
const templates = [
    {
        bgIndex: 0,
        filename: '01_post_site_profissional.png',
        title: 'SITE PROFISSIONAL',
        subtitle: 'SEM CUSTO INICIAL',
        tagline: 'Expanda seus negócios online hoje.',
        format: 'post'
    },
    {
        bgIndex: 1,
        filename: '02_post_performance.png',
        title: 'MÁXIMA PERFORMANCE',
        subtitle: 'Sites Otimizados para o Google.',
        tagline: 'Velocidade e conversão absolutas.',
        format: 'post'
    },
    {
        bgIndex: 2,
        filename: '03_post_parceria.png',
        title: 'SEJA UM PARCEIRO',
        subtitle: 'Ofereça Tecnologia de Elite.',
        tagline: 'Ganhe comissões recorrentes.',
        format: 'post'
    },
    {
        bgIndex: 3,
        filename: '04_story_oportunidade.png',
        title: 'VAGAS ABERTAS',
        subtitle: 'PROGRAMA ALPHA',
        tagline: 'Indique clientes e fature comissões VIP.',
        format: 'story'
    },
    {
        bgIndex: 4,
        filename: '05_story_resultado.png',
        title: 'VENDAS ACELERADAS',
        subtitle: 'TECNOLOGIA QUE CONVERTE.',
        tagline: 'Acesse o link e saiba como.',
        format: 'story'
    }
];

async function downloadImage(url, dest) {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
}

async function createOverlaySVG(template, width, height) {
    const isStory = template.format === 'story';

    // Gradiente escuro e premium para dar leitura ao texto
    return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:rgba(10,10,12,0.6);stop-opacity:1" />
                <stop offset="50%" style="stop-color:rgba(10,10,12,0.85);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgba(10,10,12,0.95);stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#grad)" />
        
        <text x="${width / 2}" y="${isStory ? height / 2 - 150 : height / 2 - 50}" 
              font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="${isStory ? '72' : '64'}" 
              fill="#FFFFFF" text-anchor="middle" letter-spacing="2">
            ${template.title}
        </text>
        
        <text x="${width / 2}" y="${isStory ? height / 2 - 60 : height / 2 + 30}" 
              font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="${isStory ? '48' : '42'}" 
              fill="#E11D48" text-anchor="middle" letter-spacing="1">
            ${template.subtitle}
        </text>
        
        <text x="${width / 2}" y="${isStory ? height / 2 + 20 : height / 2 + 90}" 
              font-family="Arial, Helvetica, sans-serif" font-size="28" 
              fill="#A1A1AA" text-anchor="middle">
            ${template.tagline}
        </text>

        <rect x="${width / 2 - 50}" y="${height - (isStory ? 200 : 120)}" width="100" height="4" fill="#E11D48" />
    </svg>
    `;
}

async function generateBanners() {
    console.log('Downloading premium backgrounds...');
    for (const bg of backgrounds) {
        const bgPath = path.join(bannersDir, bg.file);
        if (!fs.existsSync(bgPath)) {
            await downloadImage(bg.url, bgPath);
            console.log(`Downloaded ${bg.file}`);
        }
    }

    console.log('Compositing banners...');
    const outputFiles = [];

    // Ler logo
    const logoBuffer = await sharp(logoPath)
        .resize({ width: 250 }) // Logo ajustada para o banner
        .toBuffer();

    for (const template of templates) {
        const bg = backgrounds[template.bgIndex];
        const bgPath = path.join(bannersDir, bg.file);
        const outPath = path.join(bannersDir, template.filename);

        const width = 1080;
        const height = template.format === 'story' ? 1920 : 1080;

        const svgOverlay = await createOverlaySVG(template, width, height);

        await sharp(bgPath)
            .resize(width, height, { fit: 'cover' })
            .composite([
                { input: Buffer.from(svgOverlay), top: 0, left: 0 },
                { input: logoBuffer, top: 120, left: width / 2 - 125 } // Centralizar logo no topo
            ])
            .toFile(outPath);

        console.log(`Generated: ${template.filename}`);
        outputFiles.push(outPath);
    }

    console.log('Zipping banners for download...');
    // Usando powershell para criar o ZIP
    const zipPath = path.resolve('public/assets/marketing/banners/Kit-Banners-Alpha.zip');

    // Remove if exists
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

    const sourceFiles = outputFiles.map(f => `'${f}'`).join(',');
    const pshCommand = "Compress-Archive -Path " + sourceFiles + " -DestinationPath '" + zipPath + "' -Force";

    execSync(`powershell.exe -Command "${pshCommand.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
    console.log(`Banners zip created at: ${zipPath}`);
}

generateBanners().catch(console.error);
