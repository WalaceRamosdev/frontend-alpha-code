import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateCorporatePDF() {
    const pdfDoc = await PDFDocument.create();

    // Embed standard fonts
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const logoPath = 'c:/Users/HP/Documents/projetos pessoais/projeto alpha code/public/assets/logo-sitesalphacode-3d.png';
    const logoBytes = fs.readFileSync(logoPath);
    const logoImg = await pdfDoc.embedPng(logoBytes);

    // Configurações de design - Estetica "Clean Tech"
    const titleColor = rgb(1, 1, 1);
    const textColor = rgb(0.85, 0.85, 0.85);
    const accentColor = rgb(0.3, 0.3, 0.3);

    // Carregando Backgrounds Premium da IA
    const bgCoverPath = 'C:/Users/HP/.gemini/antigravity/brain/bb72fe8c-4673-4624-b126-27f961cd8c00/bg_cover_clean_1772642672148.png';
    const bgContentPath = 'C:/Users/HP/.gemini/antigravity/brain/bb72fe8c-4673-4624-b126-27f961cd8c00/bg_content_clean_1_1772642686234.png';

    const bgCoverBytes = fs.readFileSync(bgCoverPath);
    const bgContentBytes = fs.readFileSync(bgContentPath);

    const bgCover = await pdfDoc.embedPng(bgCoverBytes);
    const bgContent = await pdfDoc.embedPng(bgContentBytes);

    const aspectRatio = logoImg.width / logoImg.height;

    const drawCenteredText = (page, text, y, size, font, color) => {
        const textWidth = font.widthOfTextAtSize(text, size);
        page.drawText(text, {
            x: Math.max(0, 1280 / 2 - textWidth / 2),
            y,
            size,
            font,
            color,
        });
    };

    const drawHeader = (page) => {
        const logoHeight = 45;
        const logoWidth = logoHeight * aspectRatio;

        page.drawImage(logoImg, {
            x: 80,
            y: 720 - logoHeight - 30,
            width: logoWidth,
            height: logoHeight
        });

        page.drawLine({
            start: { x: 80, y: 720 - logoHeight - 55 },
            end: { x: 1200, y: 720 - logoHeight - 55 },
            thickness: 1,
            color: rgb(0.4, 0.4, 0.4),
        });
    };

    // Slide 1: Cover
    {
        const page = pdfDoc.addPage([1280, 720]);
        page.drawImage(bgCover, { x: 0, y: 0, width: 1280, height: 720 });

        // Aplica um overlay sutil escuro para dar contraste
        page.drawRectangle({ x: 0, y: 0, width: 1280, height: 720, color: rgb(0.04, 0.04, 0.05), opacity: 0.8 });

        const logoCoverHeight = 110;
        const logoCoverWidth = logoCoverHeight * aspectRatio;

        page.drawImage(logoImg, {
            x: 1280 / 2 - logoCoverWidth / 2,
            y: 450,
            width: logoCoverWidth,
            height: logoCoverHeight
        });

        drawCenteredText(page, 'ALPHA CODE PARTNERS', 340, 42, fontBold, titleColor);
        drawCenteredText(page, 'Programa Executivo de Expansão Digital', 290, 20, fontRegular, textColor);

        page.drawLine({
            start: { x: 1280 / 2 - 150, y: 250 },
            end: { x: 1280 / 2 + 150, y: 250 },
            thickness: 1,
            color: accentColor,
        });

        drawCenteredText(page, 'MATERIAL ESTRATÉGICO', 110, 12, fontRegular, rgb(0.6, 0.6, 0.6));
    }

    // Slide 2: Visão Geral
    {
        const page = pdfDoc.addPage([1280, 720]);
        page.drawImage(bgContent, { x: 0, y: 0, width: 1280, height: 720 });
        page.drawRectangle({ x: 0, y: 0, width: 1280, height: 720, color: rgb(0.04, 0.04, 0.05), opacity: 0.85 });

        drawHeader(page);

        page.drawText('Visão Estratégica', { x: 80, y: 530, size: 36, font: fontBold, color: titleColor });

        const bodyContent = [
            "A Alpha Code é especialista em infraestrutura digital e engenharia de vendas.",
            "Nosso foco é desenvolver plataformas de alta velocidade e conversão.",
            "",
            "Ao integrar este programa, você conecta seus contatos à tecnologia de",
            "ponta, agregando valor absoluto ao seu network enquanto constrói",
            "uma nova linha de negócio e receita imediata."
        ];

        let currentY = 430;
        bodyContent.forEach(line => {
            page.drawText(line, { x: 80, y: currentY, size: 24, font: fontRegular, color: textColor });
            currentY -= 45;
        });
    }

    // Slide 3: O Fluxo
    {
        const page = pdfDoc.addPage([1280, 720]);
        page.drawImage(bgContent, { x: 0, y: 0, width: 1280, height: 720 });
        page.drawRectangle({ x: 0, y: 0, width: 1280, height: 720, color: rgb(0.04, 0.04, 0.05), opacity: 0.85 });

        drawHeader(page);

        page.drawText('Modelo Operacional', { x: 80, y: 530, size: 36, font: fontBold, color: titleColor });

        const steps = [
            { num: "01", title: "Conexão", desc: "Você identifica o cliente" },
            { num: "02", title: "Validação", desc: "Nós conduzimos o negócio" },
            { num: "03", title: "Execução", desc: "Atuamos na tecnologia" },
            { num: "04", title: "Retorno", desc: "Sua comissão liberada" }
        ];

        let currentX = 80;
        steps.forEach(step => {
            page.drawRectangle({ x: currentX, y: 220, width: 250, height: 210, color: rgb(0.1, 0.1, 0.1), opacity: 0.6, borderColor: accentColor, borderWidth: 1 });

            page.drawText(step.num, { x: currentX + 30, y: 370, size: 28, font: fontRegular, color: rgb(0.6, 0.6, 0.6) });
            page.drawText(step.title, { x: currentX + 30, y: 320, size: 22, font: fontBold, color: titleColor });
            page.drawText(step.desc, { x: currentX + 30, y: 280, size: 16, font: fontRegular, color: textColor });

            currentX += 285;
        });
    }

    // Slide 4: Benefícios e Tiers
    {
        const page = pdfDoc.addPage([1280, 720]);
        page.drawImage(bgContent, { x: 0, y: 0, width: 1280, height: 720 });
        page.drawRectangle({ x: 0, y: 0, width: 1280, height: 720, color: rgb(0.04, 0.04, 0.05), opacity: 0.85 });

        drawHeader(page);

        page.drawText('Ecossistema de Benefícios', { x: 80, y: 530, size: 36, font: fontBold, color: titleColor });

        const columns = [
            { t: "BRONZE", req: "02 Projetos", d1: "Suporte e manutenção", d2: "gratuitos em seu ecossistema", d3: "digital." },
            { t: "SILVER", req: "04 Projetos", d1: "Comissão de 10%", d2: "sobre cada fechamento", d3: "convertido." },
            { t: "GOLD", req: "08+ Projetos", d1: "Comissão VIP de 20%", d2: "Selo Embaixador e suporte", d3: "estratégico absoluto." }
        ];

        let currentX = 80;
        columns.forEach(col => {
            page.drawRectangle({ x: currentX, y: 200, width: 350, height: 230, color: rgb(0.1, 0.1, 0.1), opacity: 0.6, borderColor: accentColor, borderWidth: 1 });

            page.drawText(col.t, { x: currentX + 40, y: 370, size: 24, font: fontBold, color: titleColor });
            page.drawText(col.req, { x: currentX + 40, y: 330, size: 14, font: fontRegular, color: rgb(0.6, 0.6, 0.6) });

            page.drawLine({ start: { x: currentX + 40, y: 315 }, end: { x: currentX + 310, y: 315 }, thickness: 1, color: accentColor });

            page.drawText(col.d1, { x: currentX + 40, y: 280, size: 16, font: fontRegular, color: textColor });
            page.drawText(col.d2, { x: currentX + 40, y: 255, size: 16, font: fontRegular, color: textColor });
            page.drawText(col.d3, { x: currentX + 40, y: 230, size: 16, font: fontRegular, color: textColor });

            currentX += 370;
        });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = path.resolve('public/assets/marketing/presentation/Apresentacao-Alpha-Code-Premium.pdf');
    fs.writeFileSync(outputPath, pdfBytes);
}

generateCorporatePDF().catch(console.error);
