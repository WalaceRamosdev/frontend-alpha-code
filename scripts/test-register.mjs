// Script de teste de cadastro
// Execute este arquivo com: node test-register.mjs

const testData = {
    name: "Walace Ramos",
    email: "walace@alphacode.com.br",
    password: "senha123456"
};

console.log("🧪 Testando cadastro de usuário...\n");
console.log("Dados:", testData);

try {
    const response = await fetch("http://localhost:4321/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
    });

    const result = await response.json();

    console.log("\n📊 Resposta do servidor:");
    console.log("Status:", response.status);
    console.log("Mensagem:", result.message);

    if (response.ok) {
        console.log("✅ Usuário criado com sucesso!");
        console.log("Dados do usuário:", result.user);

        console.log("\n🔐 Agora você pode fazer login em:");
        console.log("http://localhost:4321/login");
        console.log("Email:", testData.email);
        console.log("Senha:", testData.password);
    } else {
        console.log("❌ Erro ao criar usuário:", result.message);
    }
} catch (error) {
    console.error("❌ Erro na requisição:", error.message);
}
