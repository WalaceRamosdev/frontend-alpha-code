
import os
import re
from datetime import datetime, timedelta

def get_next_working_days(start_date, count):
    days = []
    current = start_date
    while len(days) < count:
        # 0: Monday, 1: Tuesday, 2: Wednesday, 3: Thursday, 4: Friday, 5: Saturday, 6: Sunday
        if current.weekday() in [0, 2, 4]:
            days.append(current)
        current += timedelta(days=1)
    return days

# List of the 36 articles in order of their "Week" classification
articles_ordered = [
    # Mês 1
    "quanto-custa-criar-um-site-profissional-em-2026.md",
    "como-escolher-uma-empresa-de-criacao-de-sites.md",
    "site-profissional-ou-rede-social-para-empresas.md",
    "quanto-custa-manter-um-site-mensalmente.md",
    "quanto-tempo-leva-para-criar-um-site-profissional.md",
    "10-erros-que-fazem-um-site-nao-gerar-clientes.md",
    "landing-page-ou-site-completo-qual-escolher.md",
    "vale-a-pena-contratar-agencia-ou-freelancer.md",
    "o-que-toda-empresa-precisa-ter-em-um-site-profissional.md",
    "como-funciona-o-processo-de-criacao-de-um-site.md",
    "quanto-custa-refazer-um-site-antigo.md",
    "sinais-de-que-seu-site-esta-espantando-clientes.md",
    # Mês 2
    "criacao-de-sites-para-medicos-guia-completo.md",
    "criacao-de-sites-para-advogados-structure-ideal.md",
    "sites-para-psicologos-como-atrair-pacientes-online.md",
    "criacao-de-sites-para-clinicas-funcionalidades-essenciais.md",
    "criacao-de-sites-para-empresas-locais.md",
    "como-um-site-aumenta-o-faturamento-de-negocios-fisicos.md",
    "exemplos-reais-de-sites-que-convertem-muito.md",
    "estrutura-de-um-site-que-gera-leads-todos-os-dias.md",
    "o-que-diferencia-um-site-amador-de-um-profissional.md",
    "quanto-custa-criar-site-para-pequenas-empresas.md",
    "site-institucional-ou-pagina-de-vendas.md",
    "como-transformar-visitantes-do-site-em-clientes.md",
    # Mês 3
    "melhor-plataforma-para-criar-site-profissional.md",
    "wordpress-ou-site-personalizado-comparacao-completa.md",
    "wix-vale-a-pena-para-empresas-serias.md",
    "checklist-antes-de-contratar-criacao-de-site.md",
    "como-avaliar-orcamento-de-desenvolvimento-web.md",
    "roi-de-um-site-profissional-para-empresas.md",
    "tendencias-de-design-que-aumentam-conversao.md",
    "guia-completo-de-seo-para-empresas-locais.md",
    "como-aparecer-no-google-com-site-novo.md",
    "estrategias-para-gerar-leads-pelo-site.md",
    "como-escalar-vendas-com-presenca-digital.md",
    "guia-definitivo-de-criacao-de-sites-profissionais.md"
]

blog_dir = 'c:/Users/HP/Documents/projetos pessoais/projeto alpha code/src/content/blog'
# Start from next Monday: Feb 16, 2026
start_date = datetime(2026, 2, 16)
publish_dates = get_next_working_days(start_date, len(articles_ordered))

for i, filename in enumerate(articles_ordered):
    filepath = os.path.join(blog_dir, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filename}")
        continue
        
    pub_date = publish_dates[i]
    # Format: 2026-02-16T19:30:00.000Z or just date if that's what frontmatter expects
    # The current frontmatter format is YYYY-MM-DD
    date_str = pub_date.strftime('%Y-%m-%d')
    # If the user specifically said 19:30, maybe they want the full ISO string
    # pubDate: 2026-02-16T19:30:00-03:00
    full_date_str = pub_date.strftime('%Y-%m-%dT19:30:00-03:00')
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update pubDate
    content = re.sub(r'pubDate: .*', f'pubDate: {full_date_str}', content)
    # Set draft to false
    content = re.sub(r'draft: true', 'draft: false', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filename} to {full_date_str}")
