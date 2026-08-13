import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'public', 'assets', 'blog');

const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=2000`;

const missing = {
    'briefing-criacao-site-2026-sitesalphacode.webp': U('1461749280684-dccba630e2f6'),
    'case-aline-barbosa.webp': U('1589829085413-56de8ae18c73'),
    'case-clinica-revive.webp': U('1576091160399-112ba8d25d1d'),
    'case-clinica-revive-estetica.webp': U('1505751172876-fa1923c5c528'),
    'case-renan-piveta.webp': path.join(rootDir, 'blog-imagens-input', 'dentista.jpg'),
    'case-escola-futuro.webp': U('1503676260728-1c00da094a0b'),
    'case-imobiliaria-urbanik.webp': U('1560518883-ce09059eeffa'),
    'case-pet-amigo.webp': U('1450778869180-41d0601e046e'),
    'case-nayanne-justiniano.webp': U('1544025162-d76694265947'),
    'case-restaurante-sabor.webp': U('1414235077428-338989a2e8c0'),
    'google-maps-guia-definitivo.webp': U('1524661135-423995f22d0b'),
    'conteudo-multicanal-2026-sitesalphacode.webp': U('1611162617213-7d7a39e9b1d7'),
    'core-web-vitals-2026-sitesalphacode.webp': U('1551288049-bebda4e38f71'),
    'cro-conversion-rate-2026-sitesalphacode.webp': U('1553729459-efe14ef6055d'),
    'email-marketing-2026.webp': U('1524758631624-e2822e304c36'),
    'email-marketing-site-2026-sitesalphacode.webp': U('1542744173-8e7e53415bb0'),
    'google-meu-negocio-atualizacoes-2026.webp': U('1432888498266-38ffec3eaf0a'),
    'hospedagem-vs-cloud-2026-sitesalphacode.webp': U('1544197150-b99a580bb7a8'),
    'ia-no-site-google-sge-sitesalphacode.webp': U('1620712943543-bcc4688e7485'),
    'imagens-webp-avif-2026-sitesalphacode.webp': U('1561070791-2526d30994b5'),
    'marketing-juridico-multicanal-2026-sitesalphacode.webp': U('1450101499163-c8848c66ca85'),
    'migrar-dominio-seo-2026-sitesalphacode.webp': U('1460925895917-afdab827c52f'),
    'mobile-first-index-2026-sitesalphacode.webp': U('1512941937669-90a1b58e7e9c'),
    'landing-page-guia-completo.webp': U('1556761175-5973dc0f32e7'),
    'remarketing-display-vs-search-2026-sitesalphacode.webp': U('1543286386-713bdd548da4'),
    'schema-org-2026-sitesalphacode.webp': U('1486312338219-ce68d2c6f44d'),
    'site-dentista-instagram-nao-suficiente.webp': U('1581056771107-24ca5f033842'),
    'advocacia-digital-2026.webp': U('1521587760476-6c12a4b040da'),
    'site-imobiliaria-vender-mais.webp': U('1600585154340-be6161a56a0c'),
    'site-para-restaurante-2026-sitesalphacode.webp': U('1466978913421-dad2ebd01d17'),
    'velocidade-site-conversoes.webp': U('1555066931-4365d14bab8c'),
};

async function main() {
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const entries = Object.entries(missing);
    let ok = 0, fail = 0;

    for (const [name, source] of entries) {
        const out = path.join(outputDir, name);
        if (fs.existsSync(out)) {
            console.log(`✔ já existe: ${name}`);
            ok++;
            continue;
        }
        try {
            let buffer;
            if (source.startsWith('http')) {
                const res = await fetch(source);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                buffer = Buffer.from(await res.arrayBuffer());
            } else {
                buffer = fs.readFileSync(source);
            }
            await sharp(buffer).webp({ quality: 85 }).toFile(out);
            console.log(`✅ ${name}`);
            ok++;
        } catch (err) {
            console.error(`❌ ${name}: ${err.message}`);
            fail++;
        }
    }

    console.log(`\nConcluído: ${ok} ok, ${fail} falhas.`);
    process.exit(fail ? 1 : 0);
}

main();
