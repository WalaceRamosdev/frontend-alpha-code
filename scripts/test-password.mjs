import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function testPassword() {
    try {
        const user = await prisma.user.findUnique({
            where: { email: "walace@alphacode.com.br" }
        });

        if (!user) {
            console.log("❌ Usuário não encontrado!");
            return;
        }

        console.log("✅ Usuário encontrado:");
        console.log("ID:", user.id);
        console.log("Nome:", user.name);
        console.log("Email:", user.email);
        console.log("Tem senha?", !!user.password);

        if (user.password) {
            const isValid = await bcrypt.compare("senha123456", user.password);
            console.log("\n🔑 Teste de senha:");
            console.log("Senha 'senha123456' é válida?", isValid);

            if (!isValid) {
                console.log("\n⚠️  A senha não confere! Vou resetar...");
                const newHash = await bcrypt.hash("senha123456", 10);
                await prisma.user.update({
                    where: { id: user.id },
                    data: { password: newHash }
                });
                console.log("✅ Senha resetada com sucesso!");
            }
        }
    } catch (error) {
        console.error("❌ Erro:", error);
    } finally {
        await prisma.$disconnect();
    }
}

testPassword();
