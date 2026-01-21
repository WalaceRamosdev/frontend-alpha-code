import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
    const email = "walace@alphacode.com.br";
    const passwordAttempt = "senha123456";

    console.log(`🔍 Procurando usuário: ${email}`);
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.log("❌ Usuário não encontrado no banco!");
        // Criar?
        console.log("🛠️ Criando usuário...");
        const hash = await bcrypt.hash(passwordAttempt, 10);
        await prisma.user.create({
            data: { name: "Walace Ramos", email, password: hash }
        });
        console.log("✅ Usuário criado com senha 'senha123456'");
        return;
    }

    console.log("✅ Usuário encontrado:", user.id);
    console.log("HASH Atual:", user.password);

    if (!user.password) {
        console.log("❌ Usuário sem senha definida!");
    } else {
        const match = await bcrypt.compare(passwordAttempt, user.password);
        console.log(`🔐 Comparação com '${passwordAttempt}': ${match ? "SUCESSO" : "FALHA"}`);

        if (!match) {
            console.log("⚠️ A senha no banco NÃO é 'senha123456'.");
            console.log("🛠️ Atualizando senha para 'senha123456'...");
            const newHash = await bcrypt.hash(passwordAttempt, 10);
            await prisma.user.update({
                where: { email },
                data: { password: newHash }
            });
            console.log("✅ Senha atualizada com sucesso!");
        } else {
            console.log("👍 A senha JÁ é 'senha123456'. O problema pode ser outro (ex: CSRF ou lógica do AuthJS).");
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
