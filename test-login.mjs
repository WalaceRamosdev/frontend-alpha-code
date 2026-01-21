// Test login endpoint
const testLogin = async () => {
    console.log("🧪 Testando login...");

    const credentials = {
        email: "walace@alphacode.com.br",
        password: "senha123456"
    };

    try {
        // First, get CSRF token
        const csrfResponse = await fetch("http://localhost:4321/api/auth/csrf");
        const { csrfToken } = await csrfResponse.json();
        console.log("✅ CSRF Token obtido:", csrfToken);

        // Try to sign in
        const response = await fetch("http://localhost:4321/api/auth/callback/credentials", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                email: credentials.email,
                password: credentials.password,
                csrfToken: csrfToken,
                callbackUrl: "/dashboard",
                json: "true"
            }),
        });

        console.log("📊 Status:", response.status);
        const data = await response.text();
        console.log("📄 Resposta:", data);

    } catch (error) {
        console.error("❌ Erro:", error);
    }
};

testLogin();
