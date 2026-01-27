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
        <div className="auth-page-wrapper">
            {/* Background Animation */}
            <div className="bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="auth-left-panel">
                <a href="/" className="brand-logo-text" style={{ textDecoration: 'none' }}>
                    <img src="/assets/logo.svg" alt="Alpha Code" width="32" height="32" />
                    Alpha Code
                </a>

                <h1 className="login-heading">CADASTRE-SE</h1>

                <p className="welcome-subtext">
                    Sua jornada Alpha começa agora. <br />
                    Onde grandes ideias encontram o código certo.
                </p>

                <div className="signup-hint">
                    Já tem uma conta? <a href="/login">Entre agora</a>
                </div>
            </div>

            <div className="auth-right-panel">
                <div className="glass-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Nome Completo</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="form-input"
                                placeholder="Seu nome completo"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">E-mail</label>
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
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label className="form-label">Senha</label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="form-input"
                                    placeholder="Senha"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirmar</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="form-input"
                                    placeholder="Repetir"
                                />
                            </div>
                        </div>

                        {error && (
                            <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            CRIAR MINHA CONTA
                        </button>
                    </form>
                </div>
            </div>

            <div className="copyright">
                © Copyright 2025 Alpha Code
            </div>
        </div>
    );
}
