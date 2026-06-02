---
title: "Mudar de Domínio Sem Perder SEO: O Protocolo Técnico Que Salva Anos de Autoridade no Google"
description: "Trocar de domínio pode custar até 70% do seu tráfego orgânico se feito errado. Aprenda o protocolo completo de migração, os 10 erros que destroem SEO e o checklist profissional da Alpha Code."
pubDate: 2026-07-01T10:30:00-03:00
heroImage: "/assets/blog/migrar-dominio-seo-2026-sitesalphacode.webp"
categories: ["SEO e Ranquemento", "Checklist e Guias"]
tags: ["domínio", "migração", "seo", "301 redirect", "técnico"]
draft: false
ctaType: "fundo"
---

# O Erro de R$ 50.000 Que a Maioria das Empresas Comete em Silêncio

Mudar de domínio parece simples: registra o novo, aponta o DNS, fim. Mas a realidade é que **empresas perdem em média 40-70% do tráfego orgânico** nos primeiros 60-90 dias após uma migração mal feita, e **nunca recuperam 100%** mesmo após correção. O custo de oportunidade é brutal — estamos falando de **anos de autoridade construída** evaporando em uma semana.

Por outro lado, migrações bem feitas são quase invisíveis: o tráfego oscila 5-10% e volta ao normal em 30 dias, mantendo posições, autoridade e ranqueamento.

Neste artigo, vou abrir o protocolo profissional completo.

## 1. Quando Vale a Pena Migrar de Domínio

Nem toda migração é justificada. Casos legítimos:
- **Rebranding da empresa** (mudança de nome, fusão, aquisição)
- **Domínio antigo inadequado** (muito longo, com hífens, sem identidade)
- **Migração para domínio com mais autoridade** (compra de domínio expirado)
- **Mudança de TLD** (de `.com.br` para `.com`, ou vice-versa)
- **Reorganização de marca** (consolidação de subdomínios em domínio principal)

Casos onde **NÃO** vale migrar:
- "Achei mais bonito" (sem ganho de SEO, branding ou negócio)
- "Meu concorrente tem o domínio mais bonito" (irrelevante para SEO)
- "Quero começar do zero" (você não precisa de domínio novo para isso)

**Regra de ouro:** migre apenas se o **benefício de longo prazo** superar **claramente** o risco de perder 6-12 meses de SEO.

## 2. O Que Acontece Tecnicamente Quando Você Muda de Domínio

Para o Google, **cada domínio é uma entidade separada**. Quando você migra:
- **Todo o link equity** (autoridade acumulada por backlinks) precisa ser **explicitamente transferido** via 301 redirects
- **O índice do Google** do domínio antigo precisa ser **desindexado** e o do novo **indexado**
- **O Google Search Console** precisa reconhecer a mudança (não é automática)
- **A memória de cache** e **backlinks externos** precisam ser atualizados

Sem cuidado, o Google trata o novo domínio como **"site novo"**, com zero autoridade herdada. E leva meses para reconstruir o que o domínio antigo tinha.

## 3. Os 10 Erros Que Destroem SEO na Migração

### Erro 1 — Não Fazer 301 Redirect de Todas as URLs
**O sintoma:** configurar redirect só da home (`antigo.com → novo.com`), perdendo todas as URLs internas.

**O que acontece:** cada backlink aponta para uma URL do domínio antigo. Sem redirect, esses backlinks viram **404 (página não encontrada)**. A autoridade que eles carregavam evapora.

**Solução:** 301 redirect 1:1 de **cada URL** do domínio antigo para a URL correspondente no novo. Sem exceções.

### Erro 2 — Redirecionar Para Home em Vez da URL Equivalente
**O sintoma:** `antigo.com/servico-x → novo.com` (em vez de `antigo.com/servico-x → novo.com/servico-x`)

**Por que é ruim:** o Google pode interpretar como **soft 404** (página não encontrada disfarçada) e ignorar o redirect. Além disso, perde a **relevância semântica** da URL original.

**Solução:** preserve a estrutura de URL sempre que possível. Se o site mudou de estrutura, mapeie manualmente cada URL para a mais semanticamente próxima.

### Erro 3 — Não Atualizar o Google Search Console
**O sintoma:** criar nova propriedade no Search Console, mas **não usar a ferramenta de "Mudança de Domínio"** (Change of Address Tool).

**Por que é ruim:** sem a notificação oficial, o Google não sabe que houve migração. Ele trata como dois sites diferentes, e o link juice dos redirects demora muito mais para ser contabilizado.

**Solução:** usar a **Change of Address Tool** (em Configurações → Mudança de endereço) e validar com 301 redirects.

### Erro 4 — Redirecionar Cadeias (Redirect Chains)
**O sintoma:** URL A → URL B → URL C (2+ redirects em sequência).

**Por que é ruim:** cada redirect "gasta" parte do PageRank. Cadeias longas podem perder até 30% da autoridade transferida. Além disso, **aumentam TTFB e latência**.

**Solução:** aponte sempre o redirect diretamente para a URL final. Nunca redirecione "para um redirect".

### Erro 5 — Misturar 301 e 302 (Temporary Redirect)
**O sintoma:** usar 302 (temporário) achando que "é mais rápido" ou "mais fácil de desfazer".

**Por que é ruim:** 302 transfere **zero** de autoridade. Google não consolida sinais. O novo domínio não herda nada do antigo.

**Solução:** use **sempre 301 (Moved Permanently)**. Se quiser "testar" antes, faça em ambiente de staging.

### Erro 6 — Esquecer de Atualizar Links Internos
**O sintoma:** após migrar, o novo site ainda tem links internos apontando para URLs do domínio antigo.

**Por que é ruim:** Googlebot segue esses links e encontra 301 redirects em todo lugar. Pode confundir a indexação.

**Solução:** após migração, fazer **busca global e substituição** de todas as referências internas ao domínio antigo.

### Erro 7 — Não Atualizar NAP (Name, Address, Phone) Externo
**O sintoma:** o Google Meu Negócio, perfis em redes sociais, diretórios, todos continuam com domínio antigo.

**Por que é ruim:** o **NAP inconsistente** confunde o Google sobre qual é o "site oficial" da entidade. Pode diluir autoridade.

**Solução:** atualizar **todos os perfis externos** com o novo domínio, mantendo consistência.

### Erro 8 — Manter Ambos os Sites no Ar Simultaneamente
**O sintoma:** domínio antigo e novo ativos, sem canonical para um deles.

**Por que é ruim:** Google vê **conteúdo duplicado** entre os dois domínios, divide autoridade, e não sabe qual indexar.

**Solução:** após período de transição (30-60 dias), **desativar o domínio antigo** (apontar para o novo via redirect no DNS, não manter conteúdo).

### Erro 9 — Não Monitorar Indexação Pós-Migração
**O sintoma:** migrar, comemorar, e nunca mais verificar se o Google está indexando o novo corretamente.

**Por que é ruim:** erros de redirect, canonical, sitemap, conteúdo órfão — tudo passa despercebido até o tráfego despencar.

**Solução:** monitorar Search Console **diariamente nas 2 primeiras semanas**, depois semanalmente por 90 dias.

### Erro 10 — Migrar em Momento de Pico de Vendas
**O sintoma:** migrar o site 2 semanas antes da Black Friday ou em período de captação importante.

**Por que é ruim:** se a migração der errado, o impacto é multiplicado pelo momento comercial.

**Solução:** migrar em **período de menor movimento** (janeiro, fevereiro, julho), quando há tempo de corrigir sem perder vendas.

## 4. O Protocolo Alpha Code (Passo a Passo)

### Fase 1 — Planejamento (2-4 semanas antes)
1. **Auditoria completa** do site atual (Screaming Frog, Ahrefs, Search Console)
2. **Mapeamento 1:1** de todas as URLs (planilha compartilhada)
3. **Lista de backlinks** (Ahrefs, SEMrush) para validar redirects críticos
4. **Definição de cronograma** e janela de manutenção
5. **Comunicação interna** (equipe, stakeholders)

### Fase 2 — Preparação (1 semana antes)
1. **Configurar novo domínio** em ambiente de staging
2. **Testar todos os 301 redirects** em staging
3. **Atualizar Google Search Console** com Change of Address Tool
4. **Atualizar Google Analytics 4** (manter mesmo ID de propriedade, mudar URL)
5. **Preparar backup completo** do site antigo
6. **Reduzir TTL do DNS** para 300 segundos (24-48h antes)

### Fase 3 — Migração (janela de 4-8h)
1. **Migrar conteúdo e banco de dados** para o novo servidor
2. **Configurar 301 redirects** definitivos no servidor
3. **Apontar DNS** para o novo servidor
4. **Verificar SSL** e headers de segurança no novo domínio
5. **Smoke test** das 50 URLs mais importantes
6. **Submeter novo sitemap** no Search Console
7. **Testar todas as conversões** (formulários, WhatsApp, e-commerce)

### Fase 4 — Monitoramento (90 dias)
| Período | Ação |
| :--- | :--- |
| **Dia 1-7** | Verificar Search Console 2x/dia, monitorar indexação, conferir 404s |
| **Semana 2-4** | Daily check no Search Console, ajustar redirects quebrados |
| **Mês 2-4** | Weekly check, monitorar posições e tráfego orgânico |
| **Mês 6+** | Comparar autoridade pré/pós migração (Ahrefs, Moz) |

## 5. O Caso Especial: Trocar de Plataforma Além de Domínio

Se você troca **domínio E plataforma** (ex: WordPress → Astro, Wix → Next.js), a complexidade triplica. Recomendações:

1. **Migre plataforma primeiro** (em mesmo domínio), estabilize 30 dias
2. **Depois migre domínio** (com plataforma já madura no novo)
3. **Nunca faça os dois ao mesmo tempo** — se algo der errado, você não sabe o que causou

## 6. O Que Fazer Se o SEO Já Caiu Por Migração Mal Feita

Não é fim do mundo. Plano de recuperação:
1. **Implemente 301 redirects** corretos AGORA (se ainda não fez)
2. **Use Change of Address Tool** no Search Console
3. **Atualize NAP em todos os perfis externos**
4. **Submeta sitemap do novo domínio**
5. **Aguarde 60-90 dias** (Google precisa reprocessar)
6. **Se após 90 dias não recuperou**, considere fazer **reverse migration** (voltar para o domínio antigo) — em casos extremos

---

### A Alpha Code Gerencia Migrações Sem Dor

Migração de domínio é **enenharia de risco**. A Alpha Code tem protocolo testado em dezenas de projetos, com SLA de downtime mínimo e taxa de recuperação de SEO acima de 95%.

[**Está pensando em mudar de domínio? Solicite uma análise de impacto gratuita antes de tomar a decisão.**](https://wa.me/5521999064502)
