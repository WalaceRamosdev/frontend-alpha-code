import { signIn } from "auth-astro/client";
import { useState } from "react";

export default function LoginForm() {
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        console.log("🔐 Tentando fazer login...");

        try {
            // Get CSRF token first
            const csrfRes = await fetch("/api/auth/csrf");
            const { csrfToken } = await csrfRes.json();

            // Submit credentials
            const response = await fetch("/api/auth/callback/credentials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    email: email,
                    password: password,
                    csrfToken: csrfToken,
                    callbackUrl: "/dashboard",
                }),
                redirect: "manual"
            });

            console.log("📊 Status:", response.status);

            if (response.status === 0 || response.type === "opaqueredirect") {
                // Redirect happened - success!
                console.log("✅ Login bem-sucedido! Redirecionando...");
                window.location.href = "/dashboard";
            } else if (response.ok) {
                window.location.href = "/dashboard";
            } else {
                console.error("❌ Erro no login");
                setError("Credenciais inválidas");
            }
        } catch (err) {
            console.error("❌ Erro:", err);
            setError("Erro ao fazer login. Tente novamente.");
        }
    };

    return (
        <div className="auth-container">
            <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <a href="/" style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Voltar ao início
                </a>
                <img src="/assets/logo.svg" alt="Alpha Code" width="24" height="24" style={{ opacity: 0.8 }} />
            </div>
            <h2 className="auth-title">Acesse sua Conta</h2>

            <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="google-btn"
            >
                <svg className="google-icon" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    ></path>
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    ></path>
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    ></path>
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    ></path>
                </svg>
                Entrar com Google
            </button>

            <div className="divider">
                <span>Ou continue com email</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        className="form-input"
                        placeholder="seu@email.com"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Senha</label>
                    <input
                        name="password"
                        type="password"
                        required
                        className="form-input"
                        placeholder="••••••••"
                    />
                </div>

                {error && <div className="auth-error">{error}</div>}

                <button type="submit" className="submit-btn text-white">
                    Entrar
                </button>
            </form>

            <p className="auth-footer">
                Não tem conta? <a href="/cadastro" className="auth-link">Cadastre-se</a>
            </p>
        </div>
    );
}
