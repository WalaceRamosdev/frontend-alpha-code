import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { APIRoute } from "astro";
import { prisma } from "../../lib/prisma";
import fs from 'fs';
import path from 'path';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        console.log("PDF Request Body:", JSON.stringify(body, null, 2));
        const { contact, diagnosis, results } = body;

        if (!contact || !diagnosis || !results) {
            console.error("Missing required data in PDF request");
            return new Response(JSON.stringify({ success: false, error: "Dados incompletos para geração do PDF." }), { status: 400 });
        }

        // 1. Save Lead to Database
        try {
            await (prisma as any).lead.create({
                data: {
                    name: contact.name,
                    whatsapp: contact.whatsapp,
                    email: contact.email,
                    projectLevel: results.level,
                    complexity: results.complexity,
                    investmentRange: results.investment,
                    diagnosisData: diagnosis
                }
            });
            console.log("Lead saved successfully");
        } catch (dbError) {
            console.error("Error saving lead:", dbError);
        }

        // 2. Generate PDF
        const pdfDoc = await PDFDocument.create();
        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Load 3D Logo
        let logoImage;
        try {
            const logoPath = path.join(process.cwd(), 'public', 'assets', 'logo-sitesalphacode-3d.png');
            if (fs.existsSync(logoPath)) {
                const logoBytes = fs.readFileSync(logoPath);
                logoImage = await pdfDoc.embedPng(logoBytes);
            }
        } catch (e) {
            console.error("Could not load logo image:", e);
        }

        // Theme Colors (Light Theme)
        const bgColor = rgb(1, 1, 1); // White
        const surfaceColor = rgb(0.97, 0.97, 0.98); // Very Light Grey
        const primaryRed = rgb(0.54, 0.11, 0.15); // Alpha Code Red
        const textColor = rgb(0.1, 0.1, 0.12); // Deep Charcoal
        const subTextColor = rgb(0.4, 0.4, 0.45); // Medium Grey
        const accentRed = rgb(0.65, 0.15, 0.2);
        const borderColor = rgb(0.9, 0.9, 0.92);

        // --- PAGE 1: COVER ---
        const page1 = pdfDoc.addPage([595.28, 841.89]);
        const { width, height } = page1.getSize();

        page1.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });

        // Sidebar Accent (Strategic Design)
        page1.drawRectangle({ x: 0, y: 0, width: 15, height, color: primaryRed });

        // Logo Placement (Centered)
        if (logoImage) {
            const dims = logoImage.scale(0.05); //Tamanho da logo no documento
            page1.drawImage(logoImage, {
                x: (width - dims.width) / 2,
                y: height - dims.height - 60,
                width: dims.width,
                height: dims.height,
            });
        }

        // Title Area
        page1.drawText('DIAGNÓSTICO', {
            x: 60, y: height - 350, size: 40, font: helveticaBold, color: textColor
        });
        page1.drawText('ESTRATÉGICO', {
            x: 60, y: height - 395, size: 40, font: helveticaBold, color: primaryRed
        });

        page1.drawRectangle({ x: 60, y: height - 420, width: 80, height: 4, color: primaryRed });

        page1.drawText('ENGENHARIA DE SOFTWARE E ESCALABILIDADE', {
            x: 60, y: height - 455, size: 12, font: helveticaBold, color: textColor
        });

        page1.drawText('Este relatório apresenta o mapeamento técnico para a transição do seu negócio', {
            x: 60, y: height - 510, size: 10, font: helvetica, color: subTextColor
        });
        page1.drawText('para uma infraestrutura de software exclusiva e de alto impacto.', {
            x: 60, y: height - 525, size: 10, font: helvetica, color: subTextColor
        });

        // Client info section
        page1.drawRectangle({
            x: 60, y: 180, width: width - 120, height: 120,
            color: surfaceColor,
            borderColor: borderColor,
            borderWidth: 1
        });

        page1.drawText('PREPARADO EXCLUSIVAMENTE PARA:', {
            x: 85, y: 265, size: 9, font: helveticaBold, color: subTextColor
        });
        page1.drawText(contact.name.toUpperCase(), {
            x: 85, y: 235, size: 24, font: helveticaBold, color: textColor
        });

        const today = new Date().toLocaleDateString('pt-BR');
        page1.drawText(`EMISSÃO: ${today}`, {
            x: 60, y: 80, size: 9, font: helvetica, color: subTextColor
        });
        page1.drawText('ALPHA CODE SOLUTIONS | © 2026 ALPHA CODE CORP', {
            x: 60, y: 65, size: 8, font: helveticaBold, color: subTextColor
        });

        // --- PAGE 2: SCENARIO ---
        const page2 = pdfDoc.addPage([595.28, 841.89]);
        page2.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });
        page2.drawRectangle({ x: 0, y: 0, width: 15, height: height, color: accentRed });

        page2.drawText('RESUMO DO CENÁRIO IDENTIFICADO', {
            x: 60, y: height - 85, size: 22, font: helveticaBold, color: textColor
        });

        page2.drawText('Cruzamento de dados entre a infraestrutura atual e necessidades de escala.', {
            x: 60, y: height - 110, size: 10, font: helvetica, color: subTextColor
        });

        let yPos = height - 180;
        const addRow = (label: string, value: string) => {
            page2.drawRectangle({ x: 60, y: yPos - 15, width: width - 120, height: 45, color: surfaceColor });
            page2.drawText(label, { x: 80, y: yPos + 5, size: 9, font: helveticaBold, color: primaryRed });
            page2.drawText(value.toString(), { x: 80, y: yPos - 8, size: 12, font: helvetica, color: textColor });
            yPos -= 60;
        };

        const segmentMap: any = {
            'RESTAURANTE': 'Restaurante / Lanchonete',
            'CLINICA': 'Clínica / Saúde',
            'ESCRITORIO': 'Escritório / Serviços',
            'OUTRO': diagnosis.negocio_custom || 'Setor Especializado'
        };

        const budgetMap: any = {
            '5k': 'Até R$ 5.000',
            '10k': 'R$ 5.000 a R$ 10.000',
            '20k': 'R$ 10.000 a R$ 20.000',
            'UP': 'Acima de R$ 20.000'
        };

        const funcMap: any = {
            'pedidos': 'Pedidos Online',
            'agendamento': 'Agendamento Inteligente',
            'usuarios': 'Múltiplos Usuários',
            'financeiro': 'Controle Financeiro',
            'relatorios': 'Relatórios Avançados',
            'pagamento': 'Gateways de Pagamento',
            'estoque': 'Controle de Estoque',
            'prontuario': 'Prontuário Digital',
            'admin': 'Painel Administrativo',
            'pwa': 'App / PWA'
        };

        const scaleMap: any = {
            '1': '1 Unidade Operacional',
            '5': '2 a 5 Unidades Operacionais',
            '10': 'Multi-filial / Franquia',
            'DIGITAL': 'Operação Digital / Escala Nacional'
        };

        const segment = segmentMap[diagnosis.negocio] || diagnosis.negocio || 'Setor Especializado';
        addRow('SEGMENTO DE ATUAÇÃO:', segment);
        addRow('INFRAESTRUTURA ATUAL:', diagnosis.estrutura || 'Manual/Planilhas');
        addRow('ESCALA OPERACIONAL:', scaleMap[diagnosis.escala] || `${diagnosis.escala || '1'} unidade(s) ativa(s)`);
        addRow('INVESTIMENTO DISPONÍVEL:', budgetMap[diagnosis.orcamento] || diagnosis.orcamento || 'A detalhar');

        yPos -= 30;
        page2.drawText('FUNCIONALIDADES ESSENCIAIS:', {
            x: 60, y: yPos, size: 14, font: helveticaBold, color: textColor
        });
        yPos -= 40;

        const funcs = Array.isArray(diagnosis.funcao) ? diagnosis.funcao : [diagnosis.funcao].filter(Boolean);
        funcs.forEach((f: string) => {
            // Draw a checkmark box
            page2.drawRectangle({
                x: 60, y: yPos - 5, width: 12, height: 12,
                color: rgb(0.14, 0.82, 0.4), // Green check
                opacity: 0.8
            });
            // Draw a checkmark using lines (avoiding WinAnsi encoding issues)
            const checkColor = rgb(1, 1, 1);
            page2.drawLine({
                start: { x: 62, y: yPos + 1 },
                end: { x: 65, y: yPos - 3 },
                thickness: 1.5,
                color: checkColor,
            });
            page2.drawLine({
                start: { x: 65, y: yPos - 3 },
                end: { x: 70, y: yPos + 5 },
                thickness: 1.5,
                color: checkColor,
            });

            const readableFunc = funcMap[f] || f;
            page2.drawText(readableFunc, { x: 85, y: yPos - 2, size: 11, font: helvetica, color: textColor });
            yPos -= 25;
        });

        yPos -= 40;
        page2.drawRectangle({ x: 60, y: yPos, width: width - 120, height: 1, color: borderColor });
        yPos -= 30;
        page2.drawText('ANÁLISE DE AUTOMAÇÃO:', {
            x: 60, y: yPos, size: 11, font: helveticaBold, color: primaryRed
        });
        yPos -= 20;
        page2.drawText('A centralização dos fluxos mapeados acima em uma stack proprietária permitirá', {
            x: 60, y: yPos, size: 10, font: helvetica, color: subTextColor
        });
        yPos -= 15;
        page2.drawText('um ganho de eficiência projetado de 35% na redução de custos operacionais.', {
            x: 60, y: yPos, size: 10, font: helvetica, color: subTextColor
        });

        // --- PAGE 3: RECOMMENDATION ---
        const page3 = pdfDoc.addPage([595.28, 841.89]);
        page3.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });
        page3.drawRectangle({ x: 0, y: 0, width: 15, height, color: primaryRed });

        page3.drawText('DIAGNÓSTICO E RECOMENDAÇÃO', {
            x: 60, y: height - 85, size: 22, font: helveticaBold, color: textColor
        });

        // Main Recommendation
        page3.drawRectangle({
            x: 60, y: height - 260, width: width - 120, height: 140,
            color: surfaceColor,
            borderColor: primaryRed,
            borderWidth: 0.5
        });

        page3.drawText('MODELO DE ARQUITETURA SUGERIDO:', {
            x: 90, y: height - 165, size: 9, font: helveticaBold, color: subTextColor
        });
        page3.drawText(results.level.toUpperCase(), {
            x: 90, y: height - 205, size: 32, font: helveticaBold, color: primaryRed
        });
        page3.drawText(`Robustez e Escalabilidade: ${results.complexity}`, {
            x: 90, y: height - 235, size: 12, font: helvetica, color: textColor
        });

        yPos = height - 340;
        page3.drawText('PROJEÇÃO DE INVESTIMENTO ESTRATÉGICO:', {
            x: 60, y: yPos, size: 10, font: helveticaBold, color: subTextColor
        });
        yPos -= 50;

        // Premium Investment Card
        page3.drawRectangle({
            x: 60, y: yPos - 25, width: width - 120, height: 85,
            color: surfaceColor,
            borderColor: borderColor,
            borderWidth: 1
        });

        // Strategic Accent Line
        page3.drawRectangle({ x: 60, y: yPos - 25, width: 5, height: 85, color: primaryRed });

        page3.drawText('VALOR TOTAL ESTIMADO DO APORTE:', {
            x: 85, y: yPos + 40, size: 8, font: helveticaBold, color: primaryRed
        });

        page3.drawText(results.investment, {
            x: 85, y: yPos + 2, size: 30, font: helveticaBold, color: textColor
        });

        page3.drawText('INVISTA EM ATIVOS PROPRIETÁRIOS. TRANSFORME CUSTO OPERACIONAL EM PATRIMÔNIO DIGITAL.', {
            x: 85, y: yPos - 15, size: 7, font: helveticaBold, color: subTextColor
        });

        yPos -= 110;
        page3.drawText('CRONOGRAMA DE ENTREGA (ENTREGA DO PRODUTO):', {
            x: 60, y: yPos, size: 11, font: helveticaBold, color: subTextColor
        });
        yPos -= 35;
        page3.drawText(results.timeline, {
            x: 60, y: yPos, size: 22, font: helveticaBold, color: textColor
        });

        yPos -= 70;
        page3.drawText('FATORES CRÍTICOS DE SUCESSO:', {
            x: 60, y: yPos, size: 11, font: helveticaBold, color: primaryRed
        });
        yPos -= 30;
        const successFactors = [
            'Propriedade Intelectual total do cliente',
            'Soberania de dados e zero dependência de SaaS terceiros',
            'Infraestrutura em Nuvem (AWS/Azure) de alta disponibilidade',
            'Integrações via APIs oficiais e seguras'
        ];
        successFactors.forEach(f => {
            page3.drawCircle({ x: 70, y: yPos + 4, size: 2.5, color: primaryRed });
            page3.drawText(f, { x: 85, y: yPos, size: 10, font: helvetica, color: textColor });
            yPos -= 22;
        });

        // --- PAGE 4: STRATEGIC NEXT ---
        const page4 = pdfDoc.addPage([595.28, 841.89]);
        page4.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });
        page4.drawRectangle({ x: 0, y: 0, width: 15, height, color: accentRed });

        page4.drawText('PLANO DE AÇÃO IMEDIATA', {
            x: 60, y: height - 85, size: 22, font: helveticaBold, color: textColor
        });

        const actionSteps = [
            { t: '01. Discovery Técnico', d: 'Mapeamento detalhado de APIs, ERPs e fluxos críticos.' },
            { t: '02. Alinhamento de Stack', d: 'Escolha de tecnologias que suportam a visão de futuro do negócio.' },
            { t: '03. Validação Comercial', d: 'Discussão de prazos, etapas de entrega e condições especiais.' },
            { t: '04. Ciclo de Desenvolvimento', d: 'Sprint zero e início da construção da solução proprietária.' }
        ];

        yPos = height - 170;
        actionSteps.forEach(s => {
            page4.drawRectangle({ x: 60, y: yPos + 18, width: 200, height: 2, color: primaryRed, opacity: 0.3 });
            page4.drawText(s.t, { x: 60, y: yPos, size: 15, font: helveticaBold, color: primaryRed });
            yPos -= 25;
            page4.drawText(s.d, { x: 60, y: yPos, size: 11, font: helvetica, color: textColor });
            yPos -= 55;
        });

        // Final CTA Footer
        page4.drawRectangle({
            x: 60, y: 100, width: width - 120, height: 160,
            color: surfaceColor,
            borderColor: borderColor,
            borderWidth: 1
        });

        page4.drawText('ESTE É O MOMENTO DE ESCALAR.', {
            x: 90, y: 220, size: 14, font: helveticaBold, color: textColor
        });
        page4.drawText('Utilize o botão "Solicitar Análise" para entrar em contato diretamente', {
            x: 90, y: 195, size: 10, font: helvetica, color: subTextColor
        });
        page4.drawText('com nossos engenheiros e validar este diagnóstico estratégico.', {
            x: 90, y: 180, size: 10, font: helvetica, color: subTextColor
        });


        // Finalize PDF
        const pdfBytes = await pdfDoc.save();
        const base64Pdf = Buffer.from(pdfBytes).toString('base64');
        const pdfUrl = `data:application/pdf;base64,${base64Pdf}`;

        return new Response(JSON.stringify({
            success: true,
            pdfUrl,
            projectLevel: results.level,
            investmentRange: results.investment,
            timeline: results.timeline
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error: any) {
        console.error("CRITICAL PDF ERROR:", error);
        return new Response(JSON.stringify({
            success: false,
            error: "Erro técnico: " + (error.message || "Falha na geração do PDF")
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
