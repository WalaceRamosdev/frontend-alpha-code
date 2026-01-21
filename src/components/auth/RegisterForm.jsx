import { useState } from "react";
import { signIn } from "auth-astro/client";

export default function RegisterForm() {
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.message || "Erro desconhecido");
            }

            // Auto login
            await signIn("credentials", {
                email: data.email,
                password: data.password,
                callbackUrl: "/dashboard",
            });

        } catch (err) {
            setError(err.message);
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
            <h2 className="auth-title">Criar Conta</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Nome</label>
                    <input
                        name="name"
                        type="text"
                        required
                        className="form-input"
                        placeholder="Seu nome completo"
                    />
                </div>
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
                        placeholder="Mínimo 6 caracteres"
                    />
                </div>

                {error && <div className="auth-error">{error}</div>}

                <button
                    type="submit"
                    className="submit-btn text-white"
                >
                    Cadastrar
                </button>
            </form>
            <p className="auth-footer">
                Já tem conta? <a href="/login" className="auth-link">Entrar</a>
            </p>
        </div>
    );
}
