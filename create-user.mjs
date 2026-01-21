import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createTestUser() {
    try {
        console.log("🔐 Criando usuário de teste...\n");

        const hashedPassword = await bcrypt.hash("senha123456", 10);

        const user = await prisma.user.create({
            data: {
                name: "Walace Ramos",
                email: "walace@alphacode.com.br",
                password: hashedPassword,
            },
        });

        console.log("✅ Usuário criado com sucesso!");
        console.log("\n📋 Dados do usuário:");
        console.log("ID:", user.id);
        console.log("Nome:", user.name);
        console.log("Email:", user.email);
        console.log("\n🔑 Credenciais de login:");
        console.log("Email: walace@alphacode.com.br");
        console.log("Senha: senha123456");
        console.log("\n🌐 Acesse: http://localhost:4321/login");
    } catch (error) {
        if (error.code === "P2002") {
            console.log("⚠️  Este email já está cadastrado!");
            console.log("\n🔑 Use as credenciais:");
            console.log("Email: walace@alphacode.com.br");
            console.log("Senha: senha123456");
        } else {
            console.error("❌ Erro:", error.message);
        }
    } finally {
        await prisma.$disconnect();
    }
}

createTestUser();
