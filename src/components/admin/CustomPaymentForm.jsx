import React, { useState } from 'react';

export default function CustomPaymentForm() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        whatsapp: '',
        descricao: '',
        valor: ''
    });
    const [loading, setLoading] = useState(false);
    const [generatedLink, setGeneratedLink] = useState('');
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setGeneratedLink('');
        setCopySuccess(false);

        // Basic validation
        if (!formData.valor || isNaN(formData.valor.replace(',', '.'))) {
            setError('Por favor, insira um valor numérico válido.');
            setLoading(false);
            return;
        }

        const price = parseFloat(formData.valor.replace(',', '.'));

        const payload = {
            planName: formData.descricao || 'Serviço Alpha Code',
            price: price.toFixed(2),
            customerData: {
                nome: formData.nome || 'Cliente Alpha',
                email: formData.email || '',
                whatsapp: formData.whatsapp || '',
                detalhes: `Venda personalizada: ${formData.descricao}`,
                isMaintenance: false
            }
        };

        try {
            const backendBase = 'https://backend-rp7j.onrender.com';
            const res = await fetch(`${backendBase}/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok && data.url) {
                setGeneratedLink(data.url);
            } else {
                throw new Error(data.error || data.details || 'Falha ao gerar link de pagamento');
            }
        } catch (err) {
            console.error('Erro ao gerar link:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <div className="custom-payment-container">
            <div className="admin-card">
                <header className="card-header">
                    <h3>Gerador de Link de Pagamento</h3>
                    <p>Crie uma cobrança personalizada com valor variável</p>
                </header>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-grid">
                        <div className="field">
                            <label>Nome do Cliente (opcional)</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Ex: João Silva"
                            />
                        </div>

                        <div className="field">
                            <label>E-mail (opcional)</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="cliente@email.com"
                            />
                        </div>

                        <div className="field">
                            <label>WhatsApp (opcional)</label>
                            <input
                                type="text"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                placeholder="(21) 99999-9999"
                            />
                        </div>

                        <div className="field">
                            <label>Valor da Venda (R$)</label>
                            <input
                                type="text"
                                name="valor"
                                value={formData.valor}
                                onChange={handleChange}
                                required
                                placeholder="R$ 0,00"
                            />
                        </div>

                        <div className="field full">
                            <label>Descrição do Serviço / Produto</label>
                            <input
                                type="text"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                required
                                placeholder="Ex: Web Design Personalizado - Site Institucional"
                            />
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Gerando Link...' : 'Gerar Link de Pagamento 🚀'}
                    </button>
                </form>

                {generatedLink && (
                    <div className="result-area fade-in">
                        <div className="result-header">
                            <i className="fas fa-check-circle"></i>
                            <span>Link Gerado com Sucesso!</span>
                        </div>
                        <div className="link-box">
                            <input type="text" readOnly value={generatedLink} />
                            <button onClick={copyToClipboard} className={copySuccess ? 'copy-btn success' : 'copy-btn'}>
                                {copySuccess ? <i className="fas fa-check"></i> : <i className="fas fa-copy"></i>}
                            </button>
                        </div>
                        <div className="actions">
                            <a href={generatedLink} target="_blank" rel="noopener noreferrer" className="test-link">
                                Abrir Link para Conferir <i className="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-payment-container {
                    max-width: 800px;
                    margin: 0 auto;
                }
                .admin-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 16px;
                    padding: 2.5rem;
                }
                .card-header {
                    margin-bottom: 2rem;
                }
                .card-header h3 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(135deg, #fff 0%, #888 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .card-header p {
                    color: rgba(255, 255, 255, 0.4);
                }
                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                .field.full {
                    grid-column: 1 / -1;
                }
                .field {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .field label {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.5);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 600;
                }
                .field input {
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    color: #fff;
                    padding: 0.85rem 1.2rem;
                    outline: none;
                    transition: 0.3s;
                }
                .field input:focus {
                    border-color: #8a1c26;
                    background: rgba(0, 0, 0, 0.5);
                    box-shadow: 0 0 0 3px rgba(138, 28, 38, 0.1);
                }
                .submit-btn {
                    width: 100%;
                    background: #8a1c26;
                    color: #fff;
                    border: none;
                    padding: 1rem;
                    border-radius: 14px;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: 0.3s;
                    box-shadow: 0 4px 15px rgba(138, 28, 38, 0.3);
                }
                .submit-btn:hover {
                    background: #a52030;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(138, 28, 38, 0.5);
                }
                .submit-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    transform: none;
                }
                .error-message {
                    background: rgba(231, 76, 60, 0.1);
                    border: 1px solid rgba(231, 76, 60, 0.3);
                    color: #e74c3c;
                    padding: 1rem;
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    font-size: 0.9rem;
                }
                .result-area {
                    margin-top: 2.5rem;
                    padding-top: 2.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                .result-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #27ae60;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }
                .link-box {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 1.5rem;
                }
                .link-box input {
                    flex: 1;
                    background: rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(39, 174, 96, 0.3);
                    border-radius: 10px;
                    color: #27ae60;
                    padding: 0.8rem 1rem;
                    font-size: 0.85rem;
                }
                .copy-btn {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                    width: 45px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .copy-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                .copy-btn.success {
                    background: #27ae60;
                    border-color: #27ae60;
                }
                .test-link {
                    color: rgba(255, 255, 255, 0.6);
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 600;
                    transition: 0.3s;
                }
                .test-link:hover {
                    color: #fff;
                }
                .fade-in {
                    animation: fadeIn 0.5s ease forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 600px) {
                    .admin-card {
                        padding: 1.5rem;
                    }
                    .form-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
                    .card-header h3 {
                        font-size: 1.25rem;
                    }
                }
            ` }} />
        </div>
    );
}
