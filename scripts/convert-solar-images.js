import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const sourceDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\5d5fb8e7-a79d-4fd2-ab1d-890d11724195';
const targetDir = 'src/assets/projects';

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const conversions = [
    {
        src: 'site_empresa_energia_solar_1778594077959.png',
        dest: 'site-empresa-energia-solar.webp'
    },
    {
        src: 'website_solar_mobile_1778594093215.png',
        dest: 'website-solar-mobile.webp'
    },
    {
        src: 'landing_page_energia_solar_1778594111629.png',
        dest: 'landing-page-energia-solar.webp'
    }
];

async function convert() {
    for (const item of conversions) {
        const srcPath = path.join(sourceDir, item.src);
        const destPath = path.join(targetDir, item.dest);
        
        console.log(`Converting ${srcPath} to ${destPath}...`);
        
        if (fs.existsSync(srcPath)) {
            await sharp(srcPath)
                .webp({ quality: 85 })
                .toFile(destPath);
            console.log(`Successfully converted to ${destPath}`);
        } else {
            console.error(`Source file not found: ${srcPath}`);
        }
    }
}

convert().catch(err => {
    console.error('Error converting images:', err);
});
