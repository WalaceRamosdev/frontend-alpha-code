import { useState } from "react";
import { signIn } from "auth-astro/client";

export default function RegisterForm() {
    const [error, setError] = useState("");

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[\W_]/.test(password);
        const isLengthValid = password.length >= 6;

        if (!isLengthValid) return "A senha deve ter no mínimo 6 caracteres.";
        if (!hasUpperCase) return "A senha deve conter pelo menos uma letra maiúscula.";
        if (!hasNumber) return "A senha deve conter pelo menos um número.";
        if (!hasSymbol) return "A senha deve conter pelo menos um símbolo especial (!@#$...).";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Validation
        if (data.password !== data.confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        const passwordError = validatePassword(data.password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        // Show Loading
        if (window.showModal) {
            window.showModal("Criando Conta...", "Estamos configurando seu perfil", "loading");
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const contentType = res.headers.get("content-type");
                let errorMessage = "Erro no servidor";
                if (contentType && contentType.includes("application/json")) {
                    const json = await res.json();
                    errorMessage = json.message || errorMessage;
                } else {
                    const text = await res.text();
                    console.error("Erro não-JSON:", text);
                }
                throw new Error(errorMessage);
            }

            // Success Modal
            if (window.showModal) {
                window.showModal("Sucesso!", "Sua conta foi criada com sucesso.", "success");
            }

            // Wait a bit before logging in
            await new Promise(r => setTimeout(r, 1500));

            // Auto login
            if (window.showModal) {
                window.showModal("Entrando...", "Acessando seu painel", "loading");
            }

            await signIn("credentials", {
                email: data.email,
                password: data.password,
                callbackUrl: "/dashboard",
            });

        } catch (err) {
            console.error(err);
            setError(err.message);
            if (window.showModal) {
                window.showModal("Erro no Cadastro", err.message, "error");
                setTimeout(() => window.hideModal && window.hideModal(), 3000);
            }
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
                    <label className="form-label">Telefone (Celular)</label>
                    <input
                        name="phone"
                        type="tel"
                        className="form-input"
                        placeholder="(11) 99999-9999"
                    />
                    <small style={{ color: "var(--color-text-muted)", fontSize: "0.75rem", marginTop: "0.25rem", display: "block" }}>
                        Usado para login e recuperação
                    </small>
                </div>
                <div className="form-group">
                    <label className="form-label">Senha</label>
                    <input
                        name="password"
                        type="password"
                        required
                        className="form-input"
                        placeholder="Senha forte (Maiúscula, número e símbolo)"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Repetir Senha</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        className="form-input"
                        placeholder="Confirme sua senha"
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
