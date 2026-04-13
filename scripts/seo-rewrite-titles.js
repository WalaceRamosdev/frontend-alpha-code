import fs from 'fs';
import path from 'path';

const targetDir = path.join(process.cwd(), 'src', 'content', 'blog');

// Dicionário de títulos acima de 60 chars (passado) convertidos para Copy de Alta Conversão (< 60 chars)
const mapping = {
    'velocidade-e-dinheiro-performance-site-2026.md': 'Site Rápido: Como a Performance Aumenta Vendas',
    'vale-a-pena-contratar-agencia-ou-freelancer.md': 'Agência vs Freelancer: Buscar Quem Para Criar Site?',
    'site-professional-ou-rede-social-para-empresas.md': 'Site Profissional vs Redes Sociais no B2B (2026)',
    'site-institucional-ou-pagina-de-vendas.md': 'Site Institucional ou Landing Page: Qual Escolher?',
    'sinais-de-que-seu-site-esta-espantando-clientes.md': '4 Sinais de Que Seu Site Está Perdendo Clientes',
    'quanto-tempo-leva-para-criar-um-site-profissional.md': 'Tempo Para Criar um Site Profissional (Prazos)',
    'quanto-custa-criar-um-site-profissional.md': 'Qual o Preço de um Site Profissional em 2026?',
    'por-que-redes-sociais-nao-substituem-site-para-advogados.md': 'Site Para Advogados: Por Que o Instagram Não Basta',
    'o-que-toda-empresa-precisa-ter-em-um-site-profissional.md': 'O Que É Essencial Num Site Profissional (2026)',
    'psicologos-perdem-pacientes-por-falta-de-site.md': 'Site Profissional para Psicólogos: Guia Completo',
    'landing-page-ou-site-completo-qual-escolher.md': 'Landing Page vs Site Completo: O Que Escolher?',
    'criacao-de-sites-profissionais-para-empresas.md': 'Site Profissional B2B: O Guia de Criação 2026',
    'criacao-de-sites-para-empresas-locais.md': 'Sites Para Empresas Locais: Guia de Criação',
    'criacao-de-sites-para-advogados-structure-ideal.md': 'Site Para Advogados: Estrutura Ideal em 2026',
    'como-ter-o-melhor-site-para-o-seu-nicho-profissional.md': 'O Melhor Site Profissional: Estratégias de Nicho',
    'como-o-seo-local-coloca-seu-consultorio-na-frente-da-concorrencia.md': 'SEO Local Para Consultórios: Ultrapasse Rivais',
    'landing-page-vs-site-institucional-qual-o-melhor-para-converter-leads.md': 'Landing Page vs Site Institucional Para Leads',
    'como-clinicas-esteticas-perdem-clientes-por-falta-de-site.md': 'Clínicas Estéticas: O Erro Oculto Sem Site',
    'como-aparecer-no-google-maps-saude.md': 'Google Maps e SEO Local na Saúde: Guia Prático',
    'link-profissional-vs-linktree.md': 'Link na Bio VIP: Linktree vs Site Profissional'
};

let filesUpdated = 0;

for (const [filename, newTitle] of Object.entries(mapping)) {
    const filePath = path.join(targetDir, filename);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Substituindo com RegEx o valor antigo do título pelo novo 
        const titleRegex = /^title:\s*["'].*["']/m;
        if (titleRegex.test(content)) {
            content = content.replace(titleRegex, `title: "${newTitle}"`);
            fs.writeFileSync(filePath, content, 'utf8');
            filesUpdated++;
            console.log(`✅ [OK] ${filename} \n   -> "${newTitle}"`);
        } else {
             const titleFallback = /^title:\s*.*/m;
             if (titleFallback.test(content)){
                content = content.replace(titleFallback, `title: "${newTitle}"`);
                fs.writeFileSync(filePath, content, 'utf8');
                filesUpdated++;
                console.log(`✅ [Fallback OK] ${filename} \n   -> "${newTitle}"`);
             }
        }
    } else {
        console.warn(`⚠️ Arquivo não encontrado: ${filename}`);
    }
}

console.log(`\n🎉 Processo finalizado! ${filesUpdated} títulos otimizados com Front-Loading (< 60 caracteres).`);
