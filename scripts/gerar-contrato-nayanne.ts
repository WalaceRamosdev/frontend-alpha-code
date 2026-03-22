import { generateStandardContract } from '../src/lib/contractGenerator';
import fs from 'fs';
import path from 'path';

async function generate() {
    const today = "20/03/2026";
    console.log("Iniciando geração de contrato...");
    
    try {
        const buffer = await generateStandardContract({
            client: {
                name: "NAYANNE JUSTINIANO",
                email: "Não informado",
                whatsapp: "Não informado"
            },
            order: {
                planName: "Plano Prata (Bonificação) + Aquisição de Hospedagem",
                totalValue: "R$ 0,00 (Site) + Hospedagem Adquirida",
                paymentMethod: "CORTESIA / PAGAMENTO ÚNICO HOSPEDAGEM",
                status: "APROVADO / CONFIRMADO",
                deliverables: [
                    "Criação de Website Completo no Plano Prata (Bonificação)",
                    "Configuração e Registro de Hospedagem Profissional",
                    "Certificado de Segurança SSL Vitalício",
                    "Manutenção: R$ 100,00 (Cobrada apenas se houver solicitação)",
                    "Regra de Manutenção: Válida para todo o mês corrente após o pagamento",
                    "Propriedade Intelectual Integral após publicação",
                    "Suporte Alpha para Dúvidas e Estabilidade"
                ],
                date: today
            }
        });

        console.log("PDF gerado em memória, salvando arquivo...");
        const outputPath = path.join(process.cwd(), 'Contrato_Nayanne_Justiniano.pdf');
        fs.writeFileSync(outputPath, buffer);
        console.log(`Contrato de Nayanne Justiniano gerado com sucesso: ${outputPath}`);
    } catch (err) {
        console.error("Erro durante a geração:", err);
    }
}

generate().catch(console.error);
