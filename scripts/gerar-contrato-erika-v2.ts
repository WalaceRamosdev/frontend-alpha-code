import { generateStandardContract } from '../src/lib/contractGenerator';
import fs from 'fs';
import path from 'path';

async function generate() {
    const today = "11/03/2026";
    
    const buffer = await generateStandardContract({
        client: {
            name: "ÉRIKA SPINOLA",
            email: "Não informado",
            whatsapp: "Não informado"
        },
        order: {
            planName: "Plano Bronze + SEO Turbinado + Hospedagem",
            totalValue: "R$ 504,00",
            paymentMethod: "Pix",
            status: "APROVADO / CONFIRMADO",
            deliverables: [
                "Criação e desenvolvimento do website (Plano Bronze)",
                "Otimização avançada para mecanismos de busca (SEO)",
                "Contratação e configuração do serviço de hospedagem",
                "Certificado de Segurança SSL",
                "Propriedade Intelectual Integral"
            ],
            date: today
        }
    });

    const outputPath = path.join(process.cwd(), 'Contrato_Erika_Spinola.pdf');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Contrato de Érika Spinola gerado com sucesso: ${outputPath}`);
}

generate().catch(console.error);
