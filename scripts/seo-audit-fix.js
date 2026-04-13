import fs from 'fs';
import path from 'path';

// Configurações
const contentDir = './src/content/blog';
const backupDir = './seo-backup-' + Date.now();

// Cria diretório de backup
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

console.log('🔄 Iniciando Auditoria e Otimização de SEO (Modo Nativo)...\n');

// 1. Processando Blog Posts (Markdown/MDX) sem dependências externas
function processMarkdownFiles(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processMarkdownFiles(filePath);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            const rawContent = fs.readFileSync(filePath, 'utf-8');
            
            // Backup
            const backupPath = path.join(backupDir, file);
            fs.writeFileSync(backupPath, rawContent);

            let modified = false;

            // Extração Nativa de Frontmatter Regex (zero dependências)
            const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
            if (!match) continue; // Pula se não tiver frontmatter válido

            let frontmatter = match[1];
            let body = match[2];

            // Verificação de Título
            const titleMatch = frontmatter.match(/title:\s*["']([^"']+)["']/);
            if (titleMatch && titleMatch[1].length > 60) {
                console.log(`⚠️ Título longo em ${file}: ${titleMatch[1].length} caracteres.`);
            }

            // Otimização de Description (< 160 chars)
            let descMatch = frontmatter.match(/description:\s*["']([^"']*)["']/);
            if (!descMatch || !descMatch[1].trim()) {
                console.log(`❌ Description ausente em ${file}. Gerando semanticamente...`);
                const plainText = body.replace(/#+.*\n/g, '').replace(/\[|\]|\*|/g, '').replace(/\n/g, ' ').trim();
                const generated = plainText.substring(0, 155).replace(/"/g, '') + '...';
                
                if (titleMatch) {
                    frontmatter = frontmatter.replace(/(title:\s*[^\n]+)/, `$1\ndescription: "${generated}"`);
                } else {
                    frontmatter += `\ndescription: "${generated}"`;
                }
                modified = true;
            } else if (descMatch[1].length > 160) {
                console.log(`⚠️ Description longa em ${file}: ${descMatch[1].length} caracteres. Truncando...`);
                const newDesc = descMatch[1].substring(0, 157) + '...';
                frontmatter = frontmatter.replace(descMatch[0], `description: "${newDesc}"`);
                modified = true;
            }

            // Checagem de Alt Tags no Body
            const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
            let imgMatch;
            while ((imgMatch = imageRegex.exec(body)) !== null) {
                if (!imgMatch[1] || imgMatch[1].trim() === '') {
                    console.log(`❌ Imagem sem Alt Tag detectada em ${file}: ${imgMatch[2]}`);
                }
            }

            // Salvamento
            if (modified) {
                const newData = `---\n${frontmatter}\n---\n${body}`;
                fs.writeFileSync(filePath, newData);
                console.log(`✅ SEO Atualizado (Frontmatter) em: ${file}`);
            }
        }
    }
}

// Executando
processMarkdownFiles(contentDir);

console.log('\n✅ Fase 1 e 2 de Otimização concluída localmente.');
console.log('Arquivos originais (Backup) salvos em:', backupDir);
console.log('\nPróximos passos:');
console.log('1. Execute: npm run build');
console.log('2. Verifique se há quebras.');
console.log('3. Se ok, faça commit e deploy.');
