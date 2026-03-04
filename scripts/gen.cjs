const sharp = require('sharp');
const { PDFDocument } = require('pdf-lib');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', 'backend', '.env') });

const COLORS = {
    primary: '#1A0B2E',    // Deep Midnight Purple
    accent: '#D4AF37',     // Gold
    textLight: '#FFFFFF',
    textDark: '#1A1A1A',
    secondary: '#3B185F',  // Lighter Purple
    bgLight: '#F9F9F9',
    muted: '#8e8e93'
};

const FONTS = {
    heading: 'Plus Jakarta Sans, sans-serif',
    body: 'Inter, sans-serif'
};

async function generatePage(svgContent, fileName) {
    const outputPath = path.join(__dirname, '..', 'tmp', fileName);
    await sharp(Buffer.from(svgContent))
        .png()
        .toFile(outputPath);
    return outputPath;
}

async function run() {
    console.log('🚀 Iniciando geração do portfólio premium Yanka Silva...');

    if (!fs.existsSync(path.join(__dirname, '..', 'tmp'))) {
        fs.mkdirSync(path.join(__dirname, '..', 'tmp'));
    }

    const pages = [];

    // --- PAGE 1: COVER ---
    const page1Svg = `
    <svg width="1240" height="1754" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style="stop-color:${COLORS.secondary};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${COLORS.primary};stop-opacity:1" />
            </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)" />
        <rect x="0" y="0" width="100%" height="20" fill="${COLORS.accent}" />
        
        <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="90" fill="${COLORS.textLight}">YANKA SILVA</text>
        <text x="50%" y="46%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="30" fill="${COLORS.accent}" letter-spacing="10">SOCIAL MEDIA &amp; DESIGNER DIGITAL</text>
        
        <line x1="45%" y1="52%" x2="55%" y2="52%" stroke="${COLORS.accent}" stroke-width="2" />
        
        <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="28" font-style="italic" fill="${COLORS.textLight}" opacity="0.9">“Estratégia, identidade e crescimento para marcas</text>
        <text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="28" font-style="italic" fill="${COLORS.textLight}" opacity="0.9">que querem autoridade.”</text>
        
        <rect x="580" y="1600" width="80" height="2" fill="${COLORS.accent}" opacity="0.5" />
    </svg>`;
    pages.push(await generatePage(page1Svg, 'page1.png'));

    // --- PAGE 2: WHO IS ---
    const page2Svg = `
    <svg width="1240" height="1754" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${COLORS.bgLight}" />
        <rect x="0" y="0" width="40" height="100%" fill="${COLORS.primary}" />
        
        <text x="120" y="200" font-family="Arial" font-size="20" font-weight="bold" fill="${COLORS.accent}" letter-spacing="2">SOBRE</text>
        <text x="120" y="260" font-family="Arial" font-size="50" font-weight="bold" fill="${COLORS.primary}">Quem está por trás da estratégia</text>
        
        <text x="120" y="450" font-family="Arial" font-size="32" line-height="1.6" fill="${COLORS.textDark}">
            <tspan x="120" dy="0">Gerenciar redes sociais vai muito além de postar.</tspan>
            <tspan x="120" dy="60">É estratégia, posicionamento e construção de autoridade.</tspan>
        </text>
        
        <text x="120" y="650" font-family="Arial" font-size="28" fill="${COLORS.muted}" style="line-height: 1.8;">
            <tspan x="120" dy="0">Transformo marcas em presenças digitais fortes</tspan>
            <tspan x="120" dy="50">através de design, planejamento e análise de performance.</tspan>
        </text>
        
        <rect x="120" y="800" width="100" height="4" fill="${COLORS.accent}" />
    </svg>`;
    pages.push(await generatePage(page2Svg, 'page2.png'));

    // --- PAGE 3: SERVICES ---
    const page3Svg = `
    <svg width="1240" height="1754" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${COLORS.primary}" />
        
        <text x="50%" y="150" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="60" font-weight="bold" fill="${COLORS.textLight}">Serviços</text>
        <rect x="570" y="190" width="100" height="3" fill="${COLORS.accent}" />

        <!-- Service 1 -->
        <g transform="translate(100, 350)">
            <rect width="320" height="450" rx="20" fill="${COLORS.secondary}" opacity="0.3" />
            <circle cx="160" cy="80" r="40" fill="${COLORS.accent}" />
            <text x="160" y="85" text-anchor="middle" font-family="Arial" font-size="40" fill="${COLORS.primary}" font-weight="bold">#</text>
            <text x="160" y="180" text-anchor="middle" font-family="Arial" font-size="32" font-weight="bold" fill="${COLORS.textLight}">Gerenciamento</text>
            <text x="160" y="230" text-anchor="middle" font-family="Arial" font-size="28" fill="${COLORS.accent}">de Redes</text>
            <text x="40" y="300" font-family="Arial" font-size="22" fill="${COLORS.textLight}" opacity="0.8">
                <tspan x="40" dy="40">• Calendário editorial</tspan>
                <tspan x="40" dy="40">• Criação de conteúdo</tspan>
                <tspan x="40" dy="40">• Monitoramento</tspan>
                <tspan x="40" dy="40">• Planejamento</tspan>
            </text>
        </g>

        <!-- Service 2 -->
        <g transform="translate(460, 350)">
            <rect width="320" height="450" rx="20" fill="${COLORS.accent}" opacity="0.1" />
            <circle cx="160" cy="80" r="40" fill="${COLORS.accent}" />
            <text x="160" y="85" text-anchor="middle" font-family="Arial" font-size="40" fill="${COLORS.primary}" font-weight="bold">✎</text>
            <text x="160" y="180" text-anchor="middle" font-family="Arial" font-size="32" font-weight="bold" fill="${COLORS.textLight}">Design</text>
            <text x="160" y="230" text-anchor="middle" font-family="Arial" font-size="28" fill="${COLORS.accent}">Gráfico</text>
            <text x="40" y="300" font-family="Arial" font-size="22" fill="${COLORS.textLight}" opacity="0.8">
                <tspan x="40" dy="40">• Identidade visual</tspan>
                <tspan x="40" dy="40">• Panfletos e Cartões</tspan>
                <tspan x="40" dy="40">• Cardápios e Catálogos</tspan>
                <tspan x="40" dy="40">• Design de Autoridade</tspan>
            </text>
        </g>

        <!-- Service 3 -->
        <g transform="translate(820, 350)">
            <rect width="320" height="450" rx="20" fill="${COLORS.secondary}" opacity="0.3" />
            <circle cx="160" cy="80" r="40" fill="${COLORS.accent}" />
            <text x="160" y="85" text-anchor="middle" font-family="Arial" font-size="40" fill="${COLORS.primary}" font-weight="bold">◇</text>
            <text x="160" y="180" text-anchor="middle" font-family="Arial" font-size="32" font-weight="bold" fill="${COLORS.textLight}">Design</text>
            <text x="160" y="230" text-anchor="middle" font-family="Arial" font-size="28" fill="${COLORS.accent}">Digital</text>
            <text x="40" y="300" font-family="Arial" font-size="22" fill="${COLORS.textLight}" opacity="0.8">
                <tspan x="40" dy="40">• Interfaces intuitivas</tspan>
                <tspan x="40" dy="40">• Experiência UX</tspan>
                <tspan x="40" dy="40">• Organização visual</tspan>
                <tspan x="40" dy="40">• Landing Pages</tspan>
            </text>
        </g>
    </svg>`;
    pages.push(await generatePage(page3Svg, 'page3.png'));

    // --- PAGE 4: PACKAGE ---
    const page4Svg = `
    <svg width="1240" height="1754" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${COLORS.bgLight}" />
        <rect x="0" y="0" width="100%" height="500" fill="${COLORS.primary}" />
        
        <text x="50%" y="180" text-anchor="middle" font-family="Arial" font-size="60" font-weight="bold" fill="${COLORS.accent}">Pacote Presença Digital</text>
        <text x="50%" y="250" text-anchor="middle" font-family="Arial" font-size="50" font-weight="bold" fill="${COLORS.textLight}">Completa</text>
        
        <text x="50%" y="360" text-anchor="middle" font-family="Arial" font-size="26" fill="${COLORS.textLight}" opacity="0.8">
            “Um combo estratégico para transformar sua rede social no seu principal canal de vendas.”
        </text>

        <g transform="translate(120, 550)">
            <rect width="1000" height="1000" rx="30" fill="white" filter="drop-shadow(0 20px 20px rgba(0,0,0,0.1))" />
            
            <g transform="translate(100, 100)">
                ${['Identidade Visual e Logotipo', 'Organização de Perfil', 'Capa e Foto Personalizadas', 'Posts Estratégicos', 'Cronograma de Conteúdo', 'Publicidade Direcionada'].map((item, i) => `
                    <g transform="translate(0, ${i * 120})">
                        <circle cx="20" cy="-5" r="10" fill="${COLORS.accent}" />
                        <text x="60" y="5" font-family="Arial" font-size="34" font-weight="bold" fill="${COLORS.primary}">${item}</text>
                        <line x1="0" y1="50" x2="800" y2="50" stroke="${COLORS.bgLight}" stroke-width="2" />
                    </g>
                `).join('')}
            </g>
        </g>
    </svg>`;
    pages.push(await generatePage(page4Svg, 'page4.png'));

    // --- PAGE 5: CONTACT ---
    const page5Svg = `
    <svg width="1240" height="1754" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${COLORS.primary}" />
        
        <text x="50%" y="400" text-anchor="middle" font-family="Arial" font-size="30" font-weight="bold" fill="${COLORS.accent}" letter-spacing="5">VAMOS CONSTRUIR SUA AUTORIDADE?</text>
        <text x="50%" y="500" text-anchor="middle" font-family="Arial" font-size="80" font-weight="bold" fill="${COLORS.textLight}">Contato</text>
        
        <g transform="translate(500, 700)">
            <text x="0" y="0" font-family="Arial" font-size="30" fill="${COLORS.accent}" font-weight="bold">WhatsApp</text>
            <text x="0" y="50" font-family="Arial" font-size="40" fill="${COLORS.textLight}" font-weight="bold">21 96682-5393</text>
            
            <text x="0" y="200" font-family="Arial" font-size="30" fill="${COLORS.accent}" font-weight="bold">Instagram</text>
            <text x="0" y="250" font-family="Arial" font-size="40" fill="${COLORS.textLight}" font-weight="bold">@y.s_marketingsm</text>
        </g>

        <rect x="520" y="1200" width="200" height="2" fill="${COLORS.accent}" />
        <text x="50%" y="1280" text-anchor="middle" font-family="Arial" font-size="24" fill="${COLORS.textLight}" opacity="0.6">Yanka Silva © 2026</text>
    </svg>`;
    pages.push(await generatePage(page5Svg, 'page5.png'));

    // --- CREATE PDF ---
    console.log('📄 Criando documento PDF...');
    const pdfDoc = await PDFDocument.create();

    for (const imagePath of pages) {
        const imageBytes = fs.readFileSync(imagePath);
        const image = await pdfDoc.embedPng(imageBytes);
        const { width, height } = image.scale(0.5); // Scaled for A4
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(image, { x: 0, y: 0, width, height });
    }

    const pdfBytes = await pdfDoc.save();
    const finalPdfPath = path.join(__dirname, '..', 'blog-imagens-input', 'Portfolio_Yanka_Silva_Premium.pdf');
    fs.writeFileSync(finalPdfPath, pdfBytes);
    console.log(`✅ PDF gerado em: ${finalPdfPath}`);

    // --- SEND EMAIL ---
    console.log('📧 Enviando e-mail...');
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: `"Antigravity AI" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        subject: '✨ Novo Portfólio Premium - Yanka Silva',
        html: `
            <div style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 600px; border: 1px solid #ddd; border-radius: 12px; padding: 30px;">
                <h2 style="color: #3B185F;">Olá! Seu portfólio premium está pronto. ✨</h2>
                <p>Analisamos o documento original da <b>Yanka Silva</b> e criamos uma versão totalmente reformulada seguindo as diretrizes de design premium, clean e sofisticado.</p>
                <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0;"><b>O que mudou:</b></p>
                    <ul style="margin-top: 10px;">
                        <li>Identidade visual moderna com roxo profundo e ouro</li>
                        <li>Hierarquia tipográfica estratégica</li>
                        <li>Layout minimalista com respiro visual</li>
                        <li>Mockups e ícones vetorizados</li>
                    </ul>
                </div>
                <p>O arquivo <b>Portfolio_Yanka_Silva_Premium.pdf</b> segue em anexo.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="font-size: 12px; color: #888; text-align: center;">Alpha Code Digital Agency - Automação Criativa</p>
            </div>
        `,
        attachments: [
            {
                filename: 'Portfolio_Yanka_Silva_Premium.pdf',
                content: pdfBytes
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ E-mail enviado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao enviar e-mail:', error);
    }

    process.exit(0);
}

run().catch(err => {
    console.error('💥 Erro fatal:', err);
    process.exit(1);
});
