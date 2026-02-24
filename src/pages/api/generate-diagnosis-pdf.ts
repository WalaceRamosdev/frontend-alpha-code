import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { APIRoute } from "astro";
import { prisma } from "../../lib/prisma";
import fs from 'fs';
import path from 'path';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { contact, diagnosis, results } = body;

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
            const logoPath = path.join(process.cwd(), 'public', 'assets', 'logo3d_extracted.png');
            if (fs.existsSync(logoPath)) {
                const logoBytes = fs.readFileSync(logoPath);
                logoImage = await pdfDoc.embedPng(logoBytes);
            }
        } catch (e) {
            console.error("Could not load logo image:", e);
        }

        // Theme Colors
        const bgColor = rgb(0.07, 0.07, 0.09); // Modern Charcoal
        const primaryRed = rgb(0.54, 0.11, 0.15); // Alpha Code Red
        const textColor = rgb(1, 1, 1);
        const subTextColor = rgb(0.7, 0.7, 0.7);
        const accentRed = rgb(0.65, 0.15, 0.2);

        // --- PAGE 1: COVER ---
        const page1 = pdfDoc.addPage([595.28, 841.89]);
        const { width, height } = page1.getSize();

        page1.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });

        // Decorative Border
        page1.drawRectangle({
            x: 20, y: 20, width: width - 40, height: height - 40,
            borderColor: rgb(0.2, 0.2, 0.25),
            borderWidth: 1
        });

        // Top Accent Line
        page1.drawRectangle({ x: 0, y: height - 10, width, height: 10, color: primaryRed });

        // Logo Placement
        if (logoImage) {
            const dims = logoImage.scale(0.15);
            page1.drawImage(logoImage, {
                x: width / 2 - dims.width / 2,
                y: height - 280,
                width: dims.width,
                height: dims.height,
            });
        }

        // Title Area
        page1.drawText('DIAGNÓSTICO ESTRATÉGICO', {
            x: 50, y: height - 380, size: 32, font: helveticaBold, color: textColor
        });

        page1.drawRectangle({ x: 50, y: height - 400, width: 60, height: 4, color: primaryRed });

        page1.drawText('SISTEMAS PERSONALIZADOS ALPHA CODE', {
            x: 50, y: height - 430, size: 14, font: helveticaBold, color: accentRed
        });

        page1.drawText('RELATÓRIO TÉCNICO DE VIABILIDADE E ESCALABILIDADE', {
            x: 50, y: height - 460, size: 10, font: helvetica, color: subTextColor
        });

        // Client info section
        page1.drawRectangle({
            x: 50, y: 180, width: width - 100, height: 100,
            color: rgb(0.12, 0.12, 0.15),
            opacity: 0.5
        });

        page1.drawText('PREPARADO EXCLUSIVAMENTE PARA:', {
            x: 70, y: 250, size: 8, font: helveticaBold, color: rgb(0.5, 0.5, 0.5)
        });
        page1.drawText(contact.name.toUpperCase(), {
            x: 70, y: 220, size: 22, font: helveticaBold, color: textColor
        });

        const today = new Date().toLocaleDateString('pt-BR');
        page1.drawText(`EMISSÃO: ${today}`, {
            x: 50, y: 80, size: 9, font: helvetica, color: rgb(0.4, 0.4, 0.4)
        });
        page1.drawText('© 2026 ALPHA CODE | SOLUÇÕES CORPORATIVAS DE ALTO IMPACTO', {
            x: 50, y: 60, size: 8, font: helveticaBold, color: rgb(0.3, 0.3, 0.3)
        });

        // --- PAGE 2: SCENARIO ---
        const page2 = pdfDoc.addPage([595.28, 841.89]);
        page2.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });

        // Header
        page2.drawRectangle({ x: 50, y: height - 60, width: 30, height: 3, color: primaryRed });
        page2.drawText('RESUMO DO CENÁRIO IDENTIFICADO', {
            x: 50, y: height - 85, size: 20, font: helveticaBold, color: textColor
        });

        let yPos = height - 150;
        const addRow = (label: string, value: string) => {
            page2.drawRectangle({ x: 50, y: yPos - 10, width: width - 100, height: 35, color: rgb(0.1, 0.1, 0.12) });
            page2.drawText(label, { x: 70, y: yPos, size: 9, font: helveticaBold, color: primaryRed });
            page2.drawText(value, { x: 220, y: yPos, size: 11, font: helvetica, color: textColor });
            yPos -= 45;
        };

        addRow('Segmento de Atuação:', diagnosis.negocio || 'Industrial/Serviços');
        addRow('Infraestrutura Atual:', diagnosis.estrutura || 'Manual/Planilhas');
        addRow('Escala Operacional:', `${diagnosis.escala || '1'} unidade(s)`);
        addRow('Budget Estimado:', diagnosis.orcamento || 'A analisar');

        yPos -= 30;
        page2.drawText('REQUISITOS TÉCNICOS MAPEADOS:', {
            x: 50, y: yPos, size: 12, font: helveticaBold, color: subTextColor
        });
        yPos -= 40;

        const funcs = Array.isArray(diagnosis.funcao) ? diagnosis.funcao : [diagnosis.funcao].filter(Boolean);
        funcs.forEach((f: string) => {
            page2.drawCircle({ x: 60, y: yPos + 4, size: 3, color: primaryRed });
            page2.drawText(f, { x: 75, y: yPos, size: 11, font: helvetica, color: textColor });
            yPos -= 25;
        });

        // --- PAGE 3: RECOMMENDATION ---
        const page3 = pdfDoc.addPage([595.28, 841.89]);
        page3.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });

        page3.drawText('DIAGNÓSTICO E RECOMENDAÇÃO', {
            x: 50, y: height - 85, size: 20, font: helveticaBold, color: textColor
        });

        // Recommendation Box
        page3.drawRectangle({
            x: 50, y: height - 240, width: width - 100, height: 120,
            color: rgb(0.1, 0.1, 0.15),
            borderColor: rgb(0.2, 0.2, 0.3),
            borderWidth: 1
        });

        page3.drawText('ARQUITETURA RECOMENDADA:', {
            x: 75, y: height - 160, size: 9, font: helveticaBold, color: subTextColor
        });
        page3.drawText(results.level.toUpperCase(), {
            x: 75, y: height - 195, size: 26, font: helveticaBold, color: textColor
        });
        page3.drawText(`Complexidade Estimada: ${results.complexity}`, {
            x: 75, y: height - 220, size: 11, font: helvetica, color: primaryRed
        });

        yPos = height - 320;
        page3.drawText('PROJEÇÃO DE INVESTIMENTO:', {
            x: 50, y: yPos, size: 12, font: helveticaBold, color: textColor
        });
        yPos -= 50;

        page3.drawRectangle({ x: 50, y: yPos - 15, width: 350, height: 50, color: primaryRed });
        page3.drawText(results.investment, {
            x: 75, y: yPos, size: 22, font: helveticaBold, color: textColor
        });

        yPos -= 100;
        page3.drawText('CRONOGRAMA DE IMPLANTAÇÃO:', {
            x: 50, y: yPos, size: 11, font: helveticaBold, color: subTextColor
        });
        yPos -= 30;
        page3.drawText(results.timeline, {
            x: 50, y: yPos, size: 18, font: helveticaBold, color: textColor
        });

        // --- PAGE 4: STRATEGIC NEXT ---
        const page4 = pdfDoc.addPage([595.28, 841.89]);
        page4.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });

        page4.drawText('PRÓXIMOS PASSOS ESTRATÉGICOS', {
            x: 50, y: height - 85, size: 20, font: helveticaBold, color: textColor
        });

        const steps = [
            { t: '01. Reunião de Discovery Técnico', d: 'Mapeamento detalhado de integrações (APIs, ERPs, CRMs).' },
            { t: '02. Definição da Stack Tecnológica', d: 'Escolha de frameworks e banco de dados para suportar a carga projetada.' },
            { t: '03. Proposta Comercial Detalhada', d: 'Apresentação de escopo, prazos de entrega e modelos de licenciamento.' }
        ];

        yPos = height - 160;
        steps.forEach(s => {
            page4.drawText(s.t, { x: 50, y: yPos, size: 14, font: helveticaBold, color: primaryRed });
            yPos -= 25;
            page4.drawText(s.d, { x: 50, y: yPos, size: 11, font: helvetica, color: textColor });
            yPos -= 50;
        });

        // CTA Section
        page4.drawRectangle({
            x: 50, y: 100, width: width - 100, height: 160,
            color: rgb(0.12, 0.12, 0.15)
        });

        page4.drawText('EVOLUA SUA OPERAÇÃO PARA O PRÓXIMO NÍVEL', {
            x: 75, y: 220, size: 12, font: helveticaBold, color: textColor
        });
        page4.drawText('Fale com um especialista agora e valide este diagnóstico.', {
            x: 75, y: 195, size: 10, font: helvetica, color: subTextColor
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
        }), { status: 200 });

    } catch (error) {
        console.error("PDF Generation Error:", error);
        return new Response(JSON.stringify({ success: false, error: "Erro ao processar PDF institucional." }), { status: 500 });
    }
};
