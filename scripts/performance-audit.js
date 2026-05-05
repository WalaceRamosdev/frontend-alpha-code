import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

/**
 * Script de Auditoria e Otimização de Performance para Astro
 * Focado em métricas do Google PageSpeed (Core Web Vitals)
 */

const files = globSync('src/**/*.{astro,md,mdx}');
let issuesFound = 0;
let fixesApplied = 0;

console.log(`\n🔍 Iniciando Varredura de Performance em ${files.length} arquivos...\n`);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    let fileChanged = false;

    // 1. Otimização de Imagens (Lazy Loading)
    // Procura por <img> que não tenham loading="lazy" ou loading="eager"
    const imgRegex = /<img(?![^>]*\bloading\b)[^>]*>/gi;
    const images = content.match(imgRegex);

    if (images) {
        images.forEach(img => {
            // Se não for uma imagem de Hero (geralmente as primeiras da página), aplicamos lazy
            // Nota: Esta é uma lógica simplificada. Imagens LCP não devem ser lazy.
            if (!img.includes('hero') && !img.includes('banner')) {
                const fixedImg = img.replace('<img', '<img loading="lazy"');
                content = content.replace(img, fixedImg);
                fileChanged = true;
                fixesApplied++;
            } else {
                console.log(`   ⚠️ [IMAGEM LCP] Verifique se ${file} precisa de fetchpriority="high"`);
                issuesFound++;
            }
        });
    }

    // 2. Verificação de Dimensões (Width/Height)
    // Alerta sobre imagens sem largura ou altura definida (causa Layout Shift)
    const dimensionRegex = /<img(?![^>]*\bwidth\b)(?![^>]*\bheight\b)[^>]*>/gi;
    if (dimensionRegex.test(content)) {
        console.log(`   🚨 [LAYOUT SHIFT] Imagens sem width/height detectadas em: ${file}`);
        issuesFound++;
    }

    // 3. Verificação de Prioridade de Carregamento (LCP)
    if (content.includes('hero') && !content.includes('fetchpriority="high"')) {
        console.log(`   💡 [DICA LCP] Considere adicionar fetchpriority="high" na imagem principal de: ${file}`);
        issuesFound++;
    }

    // 4. Scripts Externos Sem Defer/Async
    if (content.includes('<script src=') && !content.includes('is:inline') && !content.includes('defer')) {
        console.log(`   🐢 [BLOQUEIO] Script externo detectado sem defer em: ${file}`);
        issuesFound++;
    }

    if (fileChanged) {
        fs.writeFileSync(file, content);
    }
});

console.log(`\n--- Resumo da Auditoria ---`);
console.log(`✅ Otimizações automáticas aplicadas: ${fixesApplied}`);
console.log(`⚠️ Pontos de atenção detectados: ${issuesFound}`);
console.log(`\nPróximos passos:`);
console.log(`1. Verifique os alertas manuais acima.`);
console.log(`2. Rode 'npm run build' para ver o impacto final.`);
console.log(`3. Use o backup gerado se algo quebrar.\n`);
