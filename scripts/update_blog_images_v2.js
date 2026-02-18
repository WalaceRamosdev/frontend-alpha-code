import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
console.log(`Scanning directory: ${blogDir}`);

// Pools of high-quality Unsplash Image IDs by Category to ensure variety
const imagePools = {
    seo: [
        "1571721795195-a2ca2d338089", "1432888498266-38ffec3eaf0a", "1486312338219-ce68d2c6f44d",
        "1556761175-5973dc0f32e7", "1460925895917-afdab827c52f", "1504868584819-f8e8b4b6d7e3"
    ],
    medical: [
        "1576091160399-112ba8d25d1d", "1532938911079-1ae2962962ed", "1505751172876-fa1923c5c528",
        "1631217868264-e5b909927a97", "1666214280698-ada21ded4740", "1581056771107-24ca5f033842"
    ],
    legal: [
        "1589829085413-56de8ae18c73", "1505664194789-87a11aca3709", "1450101499163-c8848c66ca85",
        "1479146538663-12b8884329d0", "1555374018-13aeb62217c1", "1521587760476-6c12a4b040da"
    ],
    sales: [
        "1551288049-bebda4e38f71", "1559526324-4b87b5d49e5e", "1460925895917-afdab827c52f",
        "1556761175-5973dc0f32e7", "1553729459-efe14ef6055d", "1542744173-8e7e53415bb0"
    ],
    dev: [
        "1461749280684-dccba630e2f6", "1498050108023-c5249f4df085", "1537432376769-00f5c2f4c8d3",
        "1555066931-4365d14bab8c", "1517694712202-14dd9538aa97", "1607799276668-88b08ac0029e"
    ],
    design: [
        "1561070791-2526d30994b5", "1509395062140-25781088af87", "1600607686527-6fb886090705",
        "1586717791821-3f44a5638d07", "1611162617474-5b21e879e113", "1545239351-ef35f43d514b"
    ],
    business: [
        "1497366216548-37526070297c", "1664575602554-208c7a77ffaa", "1556761175-5973dc0f32e7",
        "1542744173-8e7e53415bb0", "1519389950473-47ba0277781c", "1600880292203-757bb62b4baf"
    ],
    default: [
        "1519389950473-47ba0277781c", "1486312338219-ce68d2c6f44d", "1522071820081-009f0129c71c"
    ]
};

const getCategory = (filename) => {
    const lower = filename.toLowerCase();

    if (lower.includes('medico') || lower.includes('clinica') || lower.includes('saude') || lower.includes('psicolog')) return 'medical';
    if (lower.includes('advoga') || lower.includes('juridic')) return 'legal';
    if (lower.includes('venda') || lower.includes('faturamento') || lower.includes('lead') || lower.includes('cliente') || lower.includes('roi') || lower.includes('converter')) return 'sales';
    if (lower.includes('seo') || lower.includes('google') || lower.includes('trafego') || lower.includes('map')) return 'seo';
    if (lower.includes('design') || lower.includes('ux') || lower.includes('layout') || lower.includes('bonito')) return 'design';
    if (lower.includes('criacao') || lower.includes('desenvolvimento') || lower.includes('wordpress') || lower.includes('wix') || lower.includes('plataforma') || lower.includes('site')) return 'dev';

    return 'business';
};

// Helper to get a random image from the pool based on file index to be deterministic if run again
const getImage = (category, index) => {
    const pool = imagePools[category] || imagePools['business'];
    // Use modulo to cycle through images if there are more files than images
    const imageId = pool[index % pool.length];
    return `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&q=80&w=2000`;
};

try {
    const files = fs.readdirSync(blogDir);

    let updateCount = 0;
    files.forEach((file, index) => {
        if (!file.endsWith('.md')) return;

        const filePath = path.join(blogDir, file);
        const category = getCategory(file);
        const newImage = getImage(category, index);

        let content = fs.readFileSync(filePath, 'utf8');
        const regex = /^heroImage:.*$/m;

        if (regex.test(content)) {
            // Check if we are replacing with the *same* image to avoid useless writes
            // But here we want to force update to ensure variety
            content = content.replace(regex, `heroImage: "${newImage}"`);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file} -> ${category} [Image ID: ...${newImage.split('-').pop().substring(0, 6)}]`);
            updateCount++;
        }
    });

    console.log(`\nBatch update complete! ${updateCount} files updated with varied images.`);

} catch (e) {
    console.error("Error updating files:", e);
}
