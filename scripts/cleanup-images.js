import fs from 'fs';
import path from 'path';

/**
 * Script de Limpeza Alpha Code
 * Deleta arquivos PNG/JPG apenas se a versão WebP correspondente existir.
 */

const assetsDir = './public/assets';

function getFiles(dir, files_ = []) {
    if (!fs.existsSync(dir)) return files_;
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const name = path.join(dir, files[i]);
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            const ext = path.extname(name).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                files_.push(name);
            }
        }
    }
    return files_;
}

function cleanup() {
    console.log('🧹 Iniciando limpeza de imagens antigas...');
    
    if (!fs.existsSync(assetsDir)) {
        console.error('❌ Erro: Diretório public/assets não encontrado!');
        return;
    }

    const files = getFiles(assetsDir);
    let count = 0;

    for (const file of files) {
        const webpVersion = file.replace(path.extname(file), '.webp');
        
        // Só deleta se a versão WebP existir para não perdermos arquivos sem querer
        if (fs.existsSync(webpVersion)) {
            try {
                fs.unlinkSync(file);
                count++;
                console.log(`🗑️  [${count}] Removido: ${path.basename(file)}`);
            } catch (err) {
                console.error(`❌ Erro ao deletar ${file}:`, err);
            }
        }
    }
    
    console.log(`\n✅ Limpeza concluída! ${count} arquivos originais removidos.`);
    console.log('🚀 Seu projeto agora está 100% otimizado com WebP.');
}

cleanup();
