import fs from 'fs';
import path from 'path';

const dirs = [
    'src/assets/banners',
    'src/assets/imagens-de-paginas'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
});

const filesToCopy = [
    { from: 'public/assets/banners/psicologia-hero.png', to: 'src/assets/banners/psicologia-hero.png' },
    { from: 'public/assets/imagens-de-paginas/nayanneJustiniano.svg', to: 'src/assets/imagens-de-paginas/nayanneJustiniano.svg' }
];

filesToCopy.forEach(file => {
    if (fs.existsSync(file.from)) {
        fs.copyFileSync(file.from, file.to);
        console.log(`Copied: ${file.from} -> ${file.to}`);
    } else {
        console.log(`File not found: ${file.from}`);
    }
});
