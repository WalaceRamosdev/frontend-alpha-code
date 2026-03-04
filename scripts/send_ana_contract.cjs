const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

// Carregar variáveis de ambiente do backend
dotenv.config({ path: path.join(__dirname, '..', 'backend', '.env') });

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

async function generateContractPdf(metadata, paymentData) {
    try {
        const pdfDoc = await PDFDocument.create();
        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Load 3D Logo from PROJECT root
        let logoImage;
        try {
            const logoPath = path.join(__dirname, '..', 'public', 'assets', 'logo-sitesalphacode-3d.png');
            if (fs.existsSync(logoPath)) {
                const logoBytes = fs.readFileSync(logoPath);
                logoImage = await pdfDoc.embedPng(logoBytes);
            }
        } catch (e) {
            console.error("Could not load logo image for PDF:", e);
        }

        // Theme Colors
        const bgColor = rgb(1, 1, 1);
        const surfaceColor = rgb(0.97, 0.97, 0.98);
        const primaryRed = rgb(0.54, 0.11, 0.15);
        const textColor = rgb(0.1, 0.1, 0.12);
        const subTextColor = rgb(0.4, 0.4, 0.45);
        const accentRed = rgb(0.65, 0.15, 0.2);
        const borderColor = rgb(0.85, 0.85, 0.88);

        // --- PAGE 1: COVER ---
        const page1 = pdfDoc.addPage([595.28, 841.89]);
        const { width, height } = page1.getSize();

        page1.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });
        page1.drawRectangle({ x: 0, y: 0, width: 20, height, color: primaryRed });

        if (logoImage) {
            const dims = logoImage.scale(0.04);
            page1.drawImage(logoImage, {
                x: (width - dims.width) / 2 + 10,
                y: height - dims.height - 50,
                width: dims.width,
                height: dims.height,
            });
        }

        page1.drawText('CONTRATO DE COMPRA', {
            x: 60, y: height - 320, size: 34, font: helveticaBold, color: textColor
        });
        page1.drawText('E PRESTAÇÃO DE SERVIÇOS', {
            x: 60, y: height - 365, size: 28, font: helveticaBold, color: primaryRed
        });

        page1.drawRectangle({ x: 60, y: height - 385, width: 100, height: 3, color: primaryRed });

        page1.drawText('DETALHAMENTO TÉCNICO E TERMOS DE ADESÃO', {
            x: 60, y: height - 425, size: 12, font: helveticaBold, color: textColor
        });

        // Client info section
        page1.drawRectangle({
            x: 60, y: 150, width: width - 120, height: 160,
            color: surfaceColor,
            borderColor: borderColor,
            borderWidth: 1
        });

        page1.drawText('CONTRATANTE / CLIENTE:', {
            x: 85, y: 285, size: 11, font: helveticaBold, color: subTextColor
        });
        page1.drawText((metadata.customer_name || 'CLIENTE').toUpperCase(), {
            x: 85, y: 255, size: 24, font: helveticaBold, color: textColor
        });
        page1.drawText(`WhatsApp: ${metadata.customer_phone || 'Não informado'}`, {
            x: 85, y: 230, size: 13, font: helvetica, color: subTextColor
        });
        page1.drawText(`Email: ${metadata.customer_email || 'Não informado'}`, {
            x: 85, y: 212, size: 13, font: helvetica, color: subTextColor
        });

        const today = new Date().toLocaleDateString('pt-BR');
        page1.drawText(`EMISSÃO: ${today}`, {
            x: 60, y: 80, size: 11, font: helvetica, color: subTextColor
        });
        page1.drawText('ALPHA CODE SOLUTIONS | © 2026 ALPHA CODE CORP', {
            x: 60, y: 65, size: 10, font: helveticaBold, color: subTextColor
        });

        // --- PAGE 2: ACQUISITION ---
        const page2 = pdfDoc.addPage([595.28, 841.89]);
        page2.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });
        page2.drawRectangle({ x: 0, y: 0, width: 20, height: height, color: accentRed });

        page2.drawText('DETALHES DA AQUISIÇÃO', {
            x: 60, y: height - 85, size: 24, font: helveticaBold, color: textColor
        });

        let yPos = height - 160;
        const addRow = (label, value) => {
            page2.drawRectangle({ x: 60, y: yPos - 15, width: width - 120, height: 50, color: surfaceColor });
            page2.drawText(label, { x: 80, y: yPos + 10, size: 11, font: helveticaBold, color: primaryRed });
            page2.drawText(value.toString(), { x: 80, y: yPos - 5, size: 15, font: helvetica, color: textColor });
            yPos -= 70;
        };

        addRow('PLANO ADQUIRIDO:', metadata.plan_name || 'Personalizado');
        addRow('VALOR TOTAL:', `R$ ${paymentData.transaction_amount || '0,00'}`);
        addRow('MÉTODO DE PAGAMENTO:', (paymentData.payment_method_id || 'Digital').toUpperCase());
        addRow('STATUS:', 'APROVADO / CONFIRMADO');

        yPos -= 20;
        page2.drawText('GARANTIAS E ENTREGÁVEIS INCLUSOS:', {
            x: 60, y: yPos, size: 16, font: helveticaBold, color: textColor
        });
        yPos -= 40;

        const inclusions = [
            'Design Premium de Alta Conversão',
            'Desenvolvimento em Tecnologia Astro (Velocidade Máxima)',
            'Hospedagem de Performance Mundial (Vercel/Cloudflare)',
            'Certificado de Segurança SSL Vitalício',
            'Manual do Projeto (Página Digital de Instruções)',
            'Suporte Alpha para Dúvidas e Micro-ajustes',
            'SEO Estrutural Completo para Google'
        ];

        inclusions.forEach(item => {
            page2.drawCircle({ x: 70, y: yPos + 4, size: 3, color: primaryRed });
            page2.drawText(item, { x: 85, y: yPos, size: 13, font: helvetica, color: textColor });
            yPos -= 30;
        });

        yPos -= 40;
        page2.drawRectangle({ x: 60, y: yPos, width: width - 120, height: 1, color: borderColor });
        yPos -= 40;
        page2.drawText('SOBRE O MANUAL DO PROJETO:', {
            x: 60, y: yPos, size: 13, font: helveticaBold, color: primaryRed
        });
        yPos -= 25;
        page2.drawText('Todos os nossos planos agora incluem uma Central de Documentação Digital.', {
            x: 60, y: yPos, size: 12, font: helvetica, color: subTextColor
        });
        yPos -= 18;
        page2.drawText('Você receberá o link de acesso assim que sua estrutura estiver publicada.', {
            x: 60, y: yPos, size: 12, font: helvetica, color: subTextColor
        });

        // --- PAGE 3: TERMS & NEXT STEPS ---
        const page3 = pdfDoc.addPage([595.28, 841.89]);
        page3.drawRectangle({ x: 0, y: 0, width, height, color: bgColor });
        page3.drawRectangle({ x: 0, y: 0, width: 20, height, color: primaryRed });

        page3.drawText('PRÓXIMOS PASSOS E TERMOS', {
            x: 60, y: height - 85, size: 24, font: helveticaBold, color: textColor
        });

        const steps = [
            { t: '01. BRIEFING TÉCNICO', d: 'Nossa equipe analisará os detalhes enviados e entrará em contato.' },
            { t: '02. DESENVOLVIMENTO', d: 'O projeto entra em produção seguindo o padrão Alpha Elite.' },
            { t: '03. REVISÃO E AJUSTES', d: 'Você valida cada detalhe antes da publicação oficial.' },
            { t: '04. LANÇAMENTO', d: 'Seu canal de vendas digital entra no ar com performance total.' }
        ];

        yPos = height - 170;
        steps.forEach(s => {
            page3.drawText(s.t, { x: 60, y: yPos, size: 16, font: helveticaBold, color: primaryRed });
            yPos -= 25;
            page3.drawText(s.d, { x: 60, y: yPos, size: 13, font: helvetica, color: textColor });
            yPos -= 65;
        });

        yPos -= 10;
        page3.drawRectangle({
            x: 60, y: yPos - 120, width: width - 120, height: 150,
            color: surfaceColor,
            borderColor: borderColor,
            borderWidth: 1
        });

        page3.drawText('TERMOS DE COMPROMISSO ALPHA:', {
            x: 85, y: yPos + 10, size: 12, font: helveticaBold, color: textColor
        });

        const terms = [
            'Propriedade Intelectual integral do cliente após quitação.',
            'Compromisso com pontuação 90+ no Google PageSpeed.',
            'Hospedagem protegida pela infraestrutura Alpha Code.',
            'Suporte técnico via WhatsApp e Email de segunda a sexta.'
        ];

        let termY = yPos - 25;
        terms.forEach(term => {
            page3.drawCircle({ x: 90, y: termY + 3, size: 2, color: primaryRed });
            page3.drawText(term, { x: 105, y: termY, size: 11, font: helvetica, color: subTextColor });
            termY -= 22;
        });

        page3.drawText('Este documento serve como comprovante oficial de contratação.', {
            x: 60, y: 100, size: 10, font: helvetica, color: subTextColor
        });

        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    } catch (error) {
        console.error("ERRO GERAÇÃO PDF CONTRATO:", error);
        return null;
    }
}

async function sendAnaContract() {
    const metadata = {
        customer_name: 'Ana Bottesi',
        customer_email: 'ana.bottesi@gmail.com',
        customer_phone: '(XX) XXXXX-XXXX',
        plan_name: 'Plano Prata'
    };

    const paymentData = {
        transaction_amount: '449,00',
        payment_method_id: 'pix'
    };

    console.log(`✉️ Gerando contrato para: ${metadata.customer_name}`);
    const contractBuffer = await generateContractPdf(metadata, paymentData);

    if (contractBuffer) {
        const mailOptions = {
            from: `"Alpha Code (Antigravity AI)" <${process.env.SMTP_USER}>`,
            to: (process.env.SMTP_USER || 'alphacodecontato@gmail.com'),
            subject: `📄 Contrato de Ana Bottesi - Plano Prata`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; padding: 25px; border-radius: 12px;">
                    <h2 style="color: #6E0F18;">Olá! 📄</h2>
                    <p>Conforme solicitado, estamos encaminhando o contrato de <strong>Ana Bottesi</strong> (Plano Prata) que estava pendente.</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #6E0F18; margin: 20px 0;">
                        <p style="margin: 0;"><strong>O PDF segue em anexo a este e-mail.</strong></p>
                    </div>

                    <p>Esta é uma ação automatizada para garantir que nenhum contrato seja esquecido.</p>
                    
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;">
                    <p style="font-size: 12px; color: #999; text-align: center;">Alpha Code - Sistema de Automação de Contratos</p>
                </div>
            `,
            attachments: [
                {
                    filename: `Contrato_AlphaCode_Ana_Bottesi.pdf`,
                    content: contractBuffer
                }
            ]
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('✅ Contrato de Ana Bottesi enviado com sucesso para seu e-mail!');
            process.exit(0);
        } catch (err) {
            console.error('❌ Erro enviando e-mail:', err);
            process.exit(1);
        }
    } else {
        console.error('❌ Falha ao gerar o PDF do contrato.');
        process.exit(1);
    }
}

sendAnaContract();
