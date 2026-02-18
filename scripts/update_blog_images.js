import fs from 'node:fs';
import path from 'node:path';

// Use process.cwd() instead of __dirname to be safe relative to where node is run
const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

console.log(`Scanning directory: ${blogDir}`);

// Premium Unsplash Images by Category
const images = {
    seo: "https://images.unsplash.com/photo-1571721795195-a2ca2d338089?auto=format&fit=crop&q=80&w=2000",
    medical: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000",
    legal: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000",
    sales: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
    dev: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2000",
    design: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000",
    business: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
    default: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000"
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

try {
    const files = fs.readdirSync(blogDir);

    files.forEach((file) => {
        if (!file.endsWith('.md')) return;

        const filePath = path.join(blogDir, file);
        const category = getCategory(file);

        // Use mapped image or default to business
        let newImage = images[category] || images['business'];

        let content = fs.readFileSync(filePath, 'utf8');

        // Regex that matches "heroImage: " followed by anything until end of line
        const regex = /^heroImage:.*$/m;

        if (regex.test(content)) {
            // Replace with new image URL
            const updatedContent = content.replace(regex, `heroImage: "${newImage}"`);
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`Updated ${file} [Category: ${category}]`);
        } else {
            console.log(`Skipped ${file} (No heroImage field found)`);
        }
    });

    console.log("\nBatch update complete!");

} catch (e) {
    console.error("Error updating files:", e);
}
