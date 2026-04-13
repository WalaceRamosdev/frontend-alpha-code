import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export interface ContractData {
    client: {
        name: string;
        email: string;
        whatsapp: string;
    };
    order: {
        planName: string;
        totalValue: string;
        paymentMethod: string;
        status: string;
        deliverables: string[];
        date: string;
    };
}

export async function generateStandardContract(data: ContractData): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Load 3D Logo (Assuming it's in public/assets)
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

    // Palette
    const bgColor = rgb(1, 1, 1);
    const primaryRed = rgb(0.54, 0.11, 0.15); // Alpha Code Red
    const textColor = rgb(0.1, 0.1, 0.12);
    const subTextColor = rgb(0.4, 0.4, 0.45);
    const surfaceColor = rgb(0.97, 0.97, 0.98); // Light grey for boxes
    const borderColor = rgb(0.9, 0.9, 0.92);

    // ---------------- PAGE 1: COVER ----------------
    const page1 = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page1.getSize();

    page1.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });
    page1.drawRectangle({ x: 0, y: 0, width: 25, height, color: primaryRed }); // Sidebar red line

    // Logo
    if (logoImage) {
        const dims = logoImage.scale(0.08);
        page1.drawImage(logoImage, {
            x: (width - dims.width) / 2,
            y: height - 250,
            width: dims.width,
            height: dims.height,
        });
    }

    // Titles
    page1.drawText('CONTRATO DE COMPRA', { x: 70, y: height - 350, size: 28, font: helveticaBold, color: textColor });
    page1.drawText('E PRESTAÇÃO DE SERVIÇOS', { x: 70, y: height - 385, size: 28, font: helveticaBold, color: primaryRed });
    
    // Line separator
    page1.drawRectangle({ x: 70, y: height - 410, width: 100, height: 2, color: primaryRed });
    
    page1.drawText('DETALHAMENTO TÉCNICO E TERMOS DE ADESÃO', { x: 70, y: height - 440, size: 12, font: helveticaBold, color: textColor });

    // Client Card
    const card1Y = height - 650;
    page1.drawRectangle({
        x: 70, y: card1Y, width: width - 140, height: 140,
        color: surfaceColor,
        borderColor: borderColor,
        borderWidth: 1
    });

    page1.drawText('CONTRATANTE / CLIENTE:', { x: 90, y: card1Y + 110, size: 10, font: helveticaBold, color: subTextColor });
    page1.drawText(data.client.name.toUpperCase(), { x: 90, y: card1Y + 75, size: 22, font: helveticaBold, color: textColor });
    page1.drawText(`WhatsApp: ${data.client.whatsapp}`, { x: 90, y: card1Y + 45, size: 11, font: helvetica, color: subTextColor });
    page1.drawText(`Email: ${data.client.email}`, { x: 90, y: card1Y + 25, size: 11, font: helvetica, color: subTextColor });

    // Footer Page 1
    page1.drawText(`EMISSÃO: ${data.order.date}`, { x: 70, y: 80, size: 9, font: helvetica, color: subTextColor });
    page1.drawText('ALPHA CODE SOLUTIONS | © 2025 ALPHA CODE CORP', { x: 70, y: 65, size: 9, font: helveticaBold, color: subTextColor });

    // ---------------- PAGE 2: ACQUISITION DETAILS ----------------
    const page2 = pdfDoc.addPage([595.28, 841.89]);
    page2.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });
    page2.drawRectangle({ x: 0, y: 0, width: 25, height, color: primaryRed });

    page2.drawText('DETALHES DA AQUISIÇÃO', { x: 70, y: height - 100, size: 22, font: helveticaBold, color: textColor });

    let yPos = height - 150;
    const addDetailBox = (title: string, value: string) => {
        page2.drawRectangle({ x: 70, y: yPos - 35, width: width - 140, height: 50, color: surfaceColor });
        page2.drawText(title, { x: 90, y: yPos - 5, size: 9, font: helveticaBold, color: primaryRed });
        page2.drawText(value, { x: 90, y: yPos - 22, size: 14, font: helvetica, color: textColor });
        yPos -= 70;
    };

    addDetailBox('PLANO ADQUIRIDO:', data.order.planName);
    addDetailBox('VALOR TOTAL:', data.order.totalValue);
    addDetailBox('MÉTODO DE PAGAMENTO:', data.order.paymentMethod);
    addDetailBox('STATUS:', data.order.status);

    yPos -= 30;
    page2.drawText('GARANTIAS E ENTREGÁVEIS INCLUSOS:', { x: 70, y: yPos, size: 15, font: helveticaBold, color: textColor });
    yPos -= 35;

    data.order.deliverables.forEach(item => {
        page2.drawCircle({ x: 78, y: yPos + 3, size: 3, color: primaryRed });
        page2.drawText(item, { x: 95, y: yPos, size: 11, font: helvetica, color: textColor });
        yPos -= 25;
    });

    // ---------------- PAGE 3: TERMS AND STEPS ----------------
    const page3 = pdfDoc.addPage([595.28, 841.89]);
    page3.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });
    page3.drawRectangle({ x: 0, y: 0, width: 25, height, color: primaryRed });

    page3.drawText('PRÓXIMOS PASSOS E TERMOS', { x: 70, y: height - 100, size: 22, font: helveticaBold, color: textColor });
    let yPos3 = height - 160;

    const steps = [
        { title: '01. BRIEFING TÉCNICO', desc: 'Nossa equipe analisará os detalhes enviados e entrará em contato.' },
        { title: '02. DESENVOLVIMENTO', desc: 'O projeto entra em produção seguindo o padrão Alpha Elite.' },
        { title: '03. REVISÃO E AJUSTES', desc: 'Você valida cada detalhe antes da publicação oficial.' },
        { title: '04. LANÇAMENTO', desc: 'Seu canal de vendas digital entra no ar com performance total.' }
    ];

    steps.forEach(step => {
        page3.drawText(step.title, { x: 70, y: yPos3, size: 14, font: helveticaBold, color: primaryRed });
        yPos3 -= 20;
        page3.drawText(step.desc, { x: 70, y: yPos3, size: 11, font: helvetica, color: textColor });
        yPos3 -= 45;
    });

    // Terms Card
    yPos3 -= 20;
    page3.drawRectangle({
        x: 70, y: yPos3 - 140, width: width - 140, height: 140,
        color: surfaceColor,
        borderColor: borderColor,
        borderWidth: 1
    });

    page3.drawText('TERMOS DE COMPROMISSO ALPHA:', { x: 90, y: yPos3 - 25, size: 11, font: helveticaBold, color: textColor });
    const terms = [
        'Propriedade Intelectual integral do cliente após quitação.',
        'Compromisso com pontuação 90+ no Google PageSpeed.',
        'Hospedagem protegida pela infraestrutura Alpha Code.',
        'Suporte técnico via WhatsApp e Email de segunda a sexta.'
    ];

    let termY = yPos3 - 55;
    terms.forEach(t => {
        page3.drawCircle({ x: 95, y: termY + 3, size: 2, color: primaryRed });
        page3.drawText(t, { x: 105, y: termY, size: 10, font: helvetica, color: subTextColor });
        termY -= 22;
    });

    page3.drawText('Este documento serve como comprovante oficial de contratação.', { x: 70, y: 80, size: 9, font: helvetica, color: subTextColor });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
}
