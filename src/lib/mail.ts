import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendReferralNotification(partnerEmail: string, partnerName: string, leadData: { name: string, email: string, whatsapp: string, details?: string }) {
    const mailOptions = {
        from: `"Alpha Code Integrations" <${process.env.SMTP_USER}>`,
        to: partnerEmail,
        subject: '🚀 Nova Indicação Recebida! - Alpha Code',
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #8a1c26;">Olá, ${partnerName}!</h2>
                <p>Boas notícias! Alguém acabou de utilizar seu link de parceiro para entrar em contato com a Alpha Code.</p>
                
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Dados do Lead:</h3>
                    <p><strong>Nome:</strong> ${leadData.name}</p>
                    <p><strong>Email:</strong> ${leadData.email}</p>
                    <p><strong>WhatsApp:</strong> ${leadData.whatsapp}</p>
                    ${leadData.details ? `<p><strong>Interesse:</strong> ${leadData.details}</p>` : ''}
                </div>
                
                <p>Nossa equipe comercial já foi notificada e em breve iniciaremos o atendimento. Você pode acompanhar o status desta indicação diretamente no seu painel de parceiro.</p>
                
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://www.sitesalphacode.com.br/dashboard" style="background: #8a1c26; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Ver meu Dashboard</a>
                </div>
                
                <hr style="margin-top: 40px; border: 0; border-top: 1px solid #eee;" />
                <p style="font-size: 12px; color: #888; text-align: center;">Alpha Code - Engenharia de Software e Design Estratégico</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification email sent to partner: ${partnerEmail}`);
    } catch (error) {
        console.error('Failed to send notification email:', error);
    }
}
