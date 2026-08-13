/**
 * Insere links internos contextuais em artigos do blog que não possuem nenhum.
 * Para cada destino, tenta uma lista de âncoras em ordem — a primeira que
 * existir no corpo (fora de headings/code/links existentes) é linkada.
 * Uso: node scripts/add-internal-links.cjs --dry-run | --apply
 */
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "src", "content", "blog");
const dryRun = process.argv.includes("--dry-run");
const apply = process.argv.includes("--apply");

const RULES = {
  // ---- Casos de sucesso ----
  "case-advogada-aline-barbosa.md": [
    { href: "/solucoes/advogados", anchors: ["site para advogada", "site para advogado", "presença digital", "site profissional"] },
    { href: "/blog/site-para-advogados-digitalizacao-advocacia-2026", anchors: ["SEO jurídico", "marketing jurídico", "advocacia"] },
  ],
  "case-dentista-renan-piveta.md": [
    { href: "/solucoes/dentistas", anchors: ["site para dentista", "site profissional", "presença digital"] },
    { href: "/blog/marketing-para-dentistas-alem-do-instagram", anchors: ["SEO local", "marketing odontológico", "marketing digital"] },
  ],
  "case-clinica-estetica-revive.md": [
    { href: "/solucoes/estetica", anchors: ["clínica de estética", "clínica estética", "site profissional", "presença digital"] },
    { href: "/blog/case-clinica-revive-estetica-agendamentos", anchors: ["agendamento online", "agendamentos", "SEO local"] },
  ],
  "case-clinica-revive-estetica-agendamentos.md": [
    { href: "/solucoes/estetica", anchors: ["clínica de estética", "clínica estética", "site profissional"] },
    { href: "/blog/case-clinica-estetica-revive", anchors: ["agendamento online", "case de sucesso", "SEO local"] },
  ],
  "case-escola-futuro.md": [
    { href: "/solucoes/escolas", anchors: ["site para escola", "site profissional", "presença digital"] },
    { href: "/blog/o-que-toda-empresa-precisa-ter-em-um-site-profissional", anchors: ["Google", "google", "presença digital"] },
  ],
  "case-imobiliaria-urbanik.md": [
    { href: "/solucoes/imobiliarias", anchors: ["site para imobiliária", "site profissional", "site imobiliário", "site"] },
    { href: "/blog/site-para-imobiliarias-vender-mais-imoveis", anchors: ["imobiliária", "imóveis", "SEO local"] },
  ],
  "case-pet-shop-amigo.md": [
    { href: "/solucoes/pet", anchors: ["site para pet shop", "pet shop", "site profissional"] },
    { href: "/blog/o-que-toda-empresa-precisa-ter-em-um-site-profissional", anchors: ["SEO local", "presença digital", "agendamento"] },
  ],
  "case-restaurante-sabor.md": [
    { href: "/solucoes/restaurantes", anchors: ["site para restaurante", "site profissional", "presença digital"] },
    { href: "/blog/site-para-restaurante-delivery-2026", anchors: ["cardápio digital", "delivery", "SEO local"] },
  ],
  "case-psicologa-nayanne-justiniano.md": [
    { href: "/solucoes/psicologos", anchors: ["site profissional", "site para psicóloga", "presença digital"] },
    { href: "/blog/psicologos-perdem-pacientes-por-falta-de-site", anchors: ["SEO", "seo"] },
  ],

  // ---- Nichos ----
  "site-para-advogados-digitalizacao-advocacia-2026.md": [
    { href: "/solucoes/advogados", anchors: ["advogados", "advogado", "presença digital"] },
    { href: "/blog/marketing-juridico-multicanal-2026", anchors: ["marketing jurídico", "marketing digital"] },
  ],
  "marketing-juridico-multicanal-2026.md": [
    { href: "/solucoes/advogados", anchors: ["escritório de advocacia", "site para advogados", "site"] },
    { href: "/blog/site-para-advogados-digitalizacao-advocacia-2026", anchors: ["marketing jurídico", "advocacia digital"] },
  ],
  "marketing-para-dentistas-alem-do-instagram.md": [
    { href: "/solucoes/dentistas", anchors: ["dentistas", "dentista", "presença digital"] },
    { href: "/blog/case-dentista-renan-piveta", anchors: ["marketing odontológico", "odontológica", "SEO local"] },
  ],
  "site-dentista-instagram-nao-suficiente.md": [
    { href: "/solucoes/dentistas", anchors: ["site para dentista", "site profissional", "presença digital"] },
    { href: "/blog/case-dentista-renan-piveta", anchors: ["SEO local", "marketing odontológico"] },
  ],
  "criacao-de-sites-para-advogados-structure-ideal.md": [
    { href: "/solucoes/advogados", anchors: ["advogados", "advogado", "presença digital"] },
    { href: "/blog/case-advogada-aline-barbosa", anchors: ["marketing jurídico", "SEO", "advocacia"] },
  ],
  "criacao-de-sites-para-medicos-guia-completo.md": [
    { href: "/solucoes/medicos", anchors: ["site para médicos", "site para médico", "presença digital"] },
    { href: "/blog/como-o-seo-local-coloca-seu-consultorio-na-frente-da-concorrencia", anchors: ["SEO local", "consultório"] },
  ],
  "como-aparecer-no-google-maps-saude.md": [
    { href: "/solucoes/medicos", anchors: ["site profissional", "presença digital", "seu site"] },
    { href: "/blog/google-meu-negocio-2026-como-dominar-maps", anchors: ["Google Meu Negócio", "perfil de empresas"] },
  ],
  "sites-para-psicologos-como-atrair-pacientes-online.md": [
    { href: "/solucoes/psicologos", anchors: ["site profissional", "site para psicólogo", "presença digital"] },
    { href: "/blog/psicologos-perdem-pacientes-por-falta-de-site", anchors: ["psicólogos", "SEO"] },
  ],
  "psicologos-perdem-pacientes-por-falta-de-site.md": [
    { href: "/solucoes/psicologos", anchors: ["site profissional", "site para psicólogo", "presença digital"] },
    { href: "/blog/case-psicologa-nayanne-justiniano", anchors: ["pacientes", "psicóloga", "SEO"] },
  ],
  "como-empresas-de-energia-solar-dominam-o-google-local-sitesalphacode.md": [
    { href: "/solucoes/energia-solar", anchors: ["site profissional", "presença digital", "empresas de energia solar"] },
    { href: "/blog/custo-invisivel-site-amador-energia-solar", anchors: ["SEO local", "marketing digital"] },
  ],
  "custo-invisivel-site-amador-energia-solar.md": [
    { href: "/solucoes/energia-solar", anchors: ["empresas de energia solar", "empresa de energia solar", "site profissional"] },
    { href: "/blog/como-empresas-de-energia-solar-dominam-o-google-local-sitesalphacode", anchors: ["SEO local", "Google Maps"] },
  ],
  "site-para-imobiliarias-vender-mais-imoveis.md": [
    { href: "/solucoes/imobiliarias", anchors: ["site para imobiliária", "site profissional", "imobiliária"] },
    { href: "/blog/case-imobiliaria-urbanik", anchors: ["corretor", "imóveis", "SEO"] },
  ],
  "site-para-restaurante-delivery-2026.md": [
    { href: "/solucoes/restaurantes", anchors: ["restaurantes", "restaurante", "presença digital"] },
    { href: "/blog/case-restaurante-sabor", anchors: ["cardápio digital", "delivery"] },
  ],
  "como-criar-site-de-achadinhos-shopee-amazon-que-vende-sitesalphacode.md": [
    { href: "/solucoes/afiliados", anchors: ["site de afiliado", "site para afiliados", "afiliados"] },
    { href: "/blog/estrutura-propria-para-afiliados-shopee-mercado-livre", anchors: ["estrutura própria", "estrutura de afiliados"] },
  ],
  "estrutura-propria-para-afiliados-shopee-mercado-livre.md": [
    { href: "/solucoes/afiliados", anchors: ["site para afiliados", "site de afiliado", "afiliados"] },
    { href: "/blog/como-criar-site-de-achadinhos-shopee-amazon-que-vende-sitesalphacode", anchors: ["império digital", "estrutura"] },
  ],

  // ---- Performance / técnico ----
  "core-web-vitals-2026-o-que-mudou.md": [
    { href: "/solucoes", anchors: ["site profissional", "sites profissionais", "páginas"] },
    { href: "/blog/velocidade-site-cada-segundo-custa-conversoes", anchors: ["velocidade do site", "Core Web Vitals", "performance"] },
  ],
  "velocidade-e-dinheiro-performance-site-2026.md": [
    { href: "/solucoes", anchors: ["seu site", "site", "página"] },
    { href: "/blog/velocidade-site-cada-segundo-custa-conversoes", anchors: ["velocidade do site", "performance web", "LCP"] },
  ],
  "velocidade-site-cada-segundo-custa-conversoes.md": [
    { href: "/solucoes", anchors: ["carregamento do site", "site", "página"] },
    { href: "/blog/core-web-vitals-2026-o-que-mudou", anchors: ["Core Web Vitals", "performance", "LCP"] },
  ],
  "hospedagem-vs-cloud-2026.md": [
    { href: "/solucoes", anchors: ["site profissional", "sites profissionais", "páginas"] },
    { href: "/blog/velocidade-site-cada-segundo-custa-conversoes", anchors: ["performance", "velocidade"] },
  ],
  "imagens-webp-avif-2026.md": [
    { href: "/blog/velocidade-site-cada-segundo-custa-conversoes", anchors: ["velocidade do site", "LCP", "performance"] },
    { href: "/solucoes", anchors: ["página", "site", "sites"] },
  ],
  "mobile-first-index-2026-erros-comuns.md": [
    { href: "/solucoes", anchors: ["site responsivo", "sites", "site"] },
    { href: "/blog/schema-org-2026-vantagem-bilionaria", anchors: ["SEO", "dados estruturados"] },
  ],

  // ---- Marketing / conteúdo ----
  "conteudo-multicanal-blog-reels-2026.md": [
    { href: "/solucoes", anchors: ["canonical para o site", "site", "página"] },
    { href: "/blog/schema-org-2026-vantagem-bilionaria", anchors: ["SEO", "dados estruturados"] },
  ],
  "email-marketing-2026-ferramenta-mais-poderosa.md": [
    { href: "/solucoes", anchors: ["agência de sites", "site profissional", "sites profissionais"] },
    { href: "/blog/o-que-e-landing-page-por-que-gera-mais-leads", anchors: ["landing page"] },
  ],
  "email-marketing-site-2026.md": [
    { href: "/blog/landing-page-ou-site-completo-qual-escolher", anchors: ["landing page", "site institucional", "site"] },
    { href: "/solucoes", anchors: ["sites profissionais", "site profissional", "site"] },
  ],
  "remarketing-display-vs-search-2026.md": [
    { href: "/blog/o-que-e-landing-page-por-que-gera-mais-leads", anchors: ["landing page", "site"] },
    { href: "/solucoes", anchors: ["sites profissionais", "site profissional", "site"] },
  ],
  "cro-conversion-rate-optimization-2026.md": [
    { href: "/blog/o-que-e-landing-page-por-que-gera-mais-leads", anchors: ["landing page"] },
    { href: "/solucoes", anchors: ["sites profissionais", "site profissional"] },
  ],
  "performance-vs-copywriting-o-equilibrio-da-conversao.md": [
    { href: "/solucoes", anchors: ["site profissional", "sites profissionais", "site"] },
    { href: "/blog/landing-page-ou-site-completo-qual-escolher", anchors: ["copywriting", "landing page", "site institucional"] },
  ],
  "landing-page-ou-site-completo-qual-escolher.md": [
    { href: "/solucoes", anchors: ["site institucional", "site profissional", "sites profissionais"] },
    { href: "/blog/o-que-e-landing-page-por-que-gera-mais-leads", anchors: ["landing page"] },
  ],
  "o-que-e-landing-page-por-que-gera-mais-leads.md": [
    { href: "/solucoes", anchors: ["site profissional", "sites profissionais", "páginas"] },
    { href: "/blog/cro-conversion-rate-optimization-2026", anchors: ["conversão", "CRO"] },
  ],
  "o-que-toda-empresa-precisa-ter-em-um-site-profissional.md": [
    { href: "/solucoes", anchors: ["site profissional", "sites profissionais", "página"] },
    { href: "/blog/schema-org-2026-vantagem-bilionaria", anchors: ["dados estruturados", "google", "SEO", "seo"] },
  ],
  "10-erros-que-fazem-um-site-nao-gerar-clientes.md": [
    { href: "/solucoes", anchors: ["site profissional", "sites profissionais", "site"] },
    { href: "/blog/schema-org-2026-vantagem-bilionaria", anchors: ["google", "Google", "SEO", "dados estruturados"] },
  ],
  "sinais-de-que-seu-site-esta-espantando-clientes.md": [
    { href: "/solucoes", anchors: ["site profissional", "sites profissionais", "site"] },
    { href: "/blog/velocidade-site-cada-segundo-custa-conversoes", anchors: ["velocidade", "carregamento", "LCP"] },
  ],
  "site-professional-ou-rede-social-para-empresas.md": [
    { href: "/solucoes", anchors: ["site profissional", "sites profissionais"] },
    { href: "/blog/como-o-seo-local-coloca-seu-consultorio-na-frente-da-concorrencia", anchors: ["SEO", "seo"] },
  ],

  // ---- SEO local / Google ----
  "como-aparecer-no-google-maps-guia-definitivo.md": [
    { href: "/blog/google-meu-negocio-2026-como-dominar-maps", anchors: ["Google Meu Negócio", "perfil de empresas"] },
    { href: "/solucoes", anchors: ["criação de sites", "site profissional"] },
  ],
  "google-meu-negocio-2026-como-dominar-maps.md": [
    { href: "/blog/como-aparecer-no-google-maps-guia-definitivo", anchors: ["SEO local", "Google Maps"] },
    { href: "/solucoes", anchors: ["site oficial", "sites profissionais", "site profissional"] },
  ],
  "google-meu-negocio-atualizacoes-2026.md": [
    { href: "/blog/google-meu-negocio-2026-como-dominar-maps", anchors: ["Google Meu Negócio", "perfil de empresas"] },
    { href: "/blog/como-aparecer-no-google-maps-guia-definitivo", anchors: ["SEO local", "Google Maps"] },
  ],
  "migrar-dominio-seo-2026.md": [
    { href: "/solucoes", anchors: ["site novo", "site", "página"] },
    { href: "/blog/schema-org-2026-vantagem-bilionaria", anchors: ["SEO", "dados estruturados"] },
  ],
  "ia-no-site-google-sge-como-nao-ser-canibalizado.md": [
    { href: "/solucoes", anchors: ["site profissional", "sites profissionais"] },
    { href: "/blog/schema-org-2026-vantagem-bilionaria", anchors: ["SEO", "dados estruturados"] },
  ],
  "schema-org-2026-vantagem-bilionaria.md": [
    { href: "/blog/como-aparecer-no-google-maps-guia-definitivo", anchors: ["SEO local", "Google Maps", "google"] },
    { href: "/solucoes", anchors: ["criação de sites", "site profissional", "site"] },
  ],
  "como-o-seo-local-coloca-seu-consultorio-na-frente-da-concorrencia.md": [
    { href: "/solucoes/medicos", anchors: ["site profissional", "consultório"] },
    { href: "/blog/google-meu-negocio-2026-como-dominar-maps", anchors: ["Google Meu Negócio", "Google Maps"] },
  ],

  // ---- Custos / processo ----
  "quanto-custa-criar-um-site-profissional.md": [
    { href: "/solucoes", anchors: ["site profissional", "sites profissionais"] },
    { href: "/blog/quanto-custa-manter-um-site-mensalmente", anchors: ["manutenção", "manter", "hospedagem"] },
  ],
  "quanto-custa-manter-um-site-mensalmente.md": [
    { href: "/solucoes", anchors: ["criação de sites", "site profissional"] },
    { href: "/blog/quanto-custa-criar-um-site-profissional", anchors: ["criação", "investimento"] },
  ],
  "quanto-custa-refazer-um-site-antigo.md": [
    { href: "/solucoes", anchors: ["criação de sites", "site profissional"] },
    { href: "/blog/quanto-custa-criar-um-site-profissional", anchors: ["criação", "investimento"] },
  ],
  "quanto-tempo-leva-para-criar-um-site-profissional.md": [
    { href: "/solucoes", anchors: ["site profissional", "sites profissionais", "páginas"] },
    { href: "/blog/como-funciona-o-processo-de-criacao-de-um-site", anchors: ["processo de criação", "metodologia", "etapas"] },
  ],
  "como-escolher-uma-empresa-de-criacao-de-sites.md": [
    { href: "/solucoes", anchors: ["agência de sites", "empresa de criação de sites"] },
    { href: "/blog/como-funciona-o-processo-de-criacao-de-um-site", anchors: ["criação de sites", "processo"] },
  ],
  "como-funciona-o-processo-de-criacao-de-um-site.md": [
    { href: "/solucoes", anchors: ["criação de sites", "desenvolvimento de sites", "site"] },
    { href: "/blog/quanto-tempo-leva-para-criar-um-site-profissional", anchors: ["prazo", "tempo de criação", "etapas"] },
  ],
  "vale-a-pena-contratar-agencia-ou-freelancer.md": [
    { href: "/solucoes", anchors: ["site profissional", "sites profissionais", "site"] },
    { href: "/blog/como-escolher-uma-empresa-de-criacao-de-sites", anchors: ["agência", "empresa de criação de sites", "criação"] },
  ],
};

function linkable(line, anchorIdx, anchor) {
  // Ignora headings
  if (/^\s*#+ /.test(line)) return false;
  const after = line.slice(anchorIdx + anchor.length);
  // Já está dentro de um link de imagem ![..]
  const before = line.slice(0, anchorIdx);
  if (before.match(/!\[[^\]]*$/)) return false;
  // Já está dentro de link markdown [..](..)
  const open = before.lastIndexOf("[");
  const close = before.lastIndexOf("]");
  if (open > close) return false;
  void after;
  return true;
}

let total = 0;
const missing = [];
for (const [file, rules] of Object.entries(RULES)) {
  const full = path.join(DIR, file);
  if (!fs.existsSync(full)) {
    console.log("!! não existe:", file);
    missing.push(file);
    continue;
  }
  let content = fs.readFileSync(full, "utf8");
  const parts = content.split("---");
  const frontmatter = parts[1];
  let body = parts.slice(2).join("---");
  let linked = 0;
  for (const rule of rules) {
    if (linked >= 2) break;
    let done = false;
    let usedAnchor = "";
    for (const anchor of rule.anchors) {
      const lines = body.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^```/.test(line.trim())) {
          while (i < lines.length && !/^```/.test(lines[i].trim())) i++;
          continue;
        }
        const idx = line.toLowerCase().indexOf(anchor.toLowerCase());
        if (idx === -1 || !linkable(line, idx, anchor)) continue;
        const openIdx = line.lastIndexOf("[", idx);
        const closeIdx = line.lastIndexOf("]", idx);
        const parenAfter = line.indexOf(")", idx);
        if (openIdx > -1 && closeIdx > openIdx && parenAfter > closeIdx) continue;
        const realAnchor = line.slice(idx, idx + anchor.length);
        lines[i] =
          line.slice(0, idx) +
          `[${realAnchor}](https://www.sitesalphacode.com.br${rule.href}/)` +
          line.slice(idx + anchor.length);
        body = lines.join("\n");
        done = true;
        usedAnchor = realAnchor;
        break;
      }
      if (done) break;
    }
    if (!done) {
      missing.push(`${file} -> ${rule.anchors[0]}`);
    } else {
      linked++;
      total++;
      if (dryRun) console.log("   link:", file, "->", usedAnchor, "→", rule.href);
    }
  }
  if (apply) {
    fs.writeFileSync(full, "---" + frontmatter + "---" + body);
  }
}
console.log("\nTotal de links inseridos:", total, dryRun ? "(dry-run)" : "(aplicado)");
if (missing.length) {
  console.log("Sem match (" + missing.length + "):");
  missing.forEach((m) => console.log("  ", m));
}