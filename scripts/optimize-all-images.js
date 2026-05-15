import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Script de Otimização Global Alpha Code
 * Este script varre a pasta public/assets e converte todas as imagens PNG/JPG para WebP
 * mantendo a compatibilidade e alta performance.
 */

const assetsDir = './public/assets';

// Função recursiva para encontrar todos os arquivos de imagem em subpastas
function getFiles(dir, files_ = []) {
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const name = path.join(dir, files[i]);
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            const ext = path.extname(name).toLowerCase();
            // Apenas formatos que queremos converter para WebP
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                files_.push(name);
            }
        }
    }
    return files_;
}

async function optimizeAll() {
    console.log('🚀 Iniciando otimização global de imagens...');
    
    if (!fs.existsSync(assetsDir)) {
        console.error('❌ Erro: Diretório public/assets não encontrado!');
        return;
    }

    const files = getFiles(assetsDir);
    console.log(`📸 Encontradas ${files.length} imagens para processar.\n`);

    let count = 0;
    for (const file of files) {
        const outputPath = file.replace(path.extname(file), '.webp');
        
        // Pula se o arquivo de destino já existir (para não reprocessar o que já está ok)
        if (fs.existsSync(outputPath)) {
            // console.log(`⏭️  Pulando (já existe): ${path.basename(outputPath)}`);
            continue;
        }

        try {
            await sharp(file)
                .webp({ quality: 85 }) // Qualidade recomendada pelo Google
                .toFile(outputPath);
            
            count++;
            console.log(`✅ [${count}] Otimizado: ${path.basename(file)} -> .webp`);
            
            // RECOMENDAÇÃO: Deixe o unlink comentado no primeiro teste
            // fs.unlinkSync(file); 
        } catch (err) {
            console.error(`❌ Erro ao processar ${file}:`, err);
        }
    }
    
    console.log(`\n🎉 Fim do processo! ${count} novas imagens WebP geradas.`);
    console.log('⚠️  Dica: Verifique os arquivos antes de deletar os originais.');
}

optimizeAll();
