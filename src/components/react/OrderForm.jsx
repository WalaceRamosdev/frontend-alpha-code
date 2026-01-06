import React, { useState, useEffect } from 'react';

const plans = {
    'simples': { name: 'Página Simples', price: 'R$ 247', id: 'Página Simples' },
    'completa': { name: 'Página Completa', price: 'R$ 399', id: 'Página Completa' },
    'premium': { name: 'Página Premium', price: 'R$ 647', id: 'Página Premium' },
    'manutencao': { name: 'Manutenção', price: 'R$ 100', id: 'Manutenção' }
};

export default function OrderForm() {
    const [formData, setFormData] = useState({
        nome: '',
        whatsapp: '',
        email: '',
        profissao: '',
        objetivo: '',
        cores: '',
        referencias: '',
        detalhes: '',
        plano: ''
    });
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isMaintenance, setIsMaintenance] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [whatsappUrl, setWhatsappUrl] = useState('');
    const [paymentLink, setPaymentLink] = useState(null);
    const [payBtnText, setPayBtnText] = useState('Pagar Agora (Pix ou Cartão) 💳');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const planKey = urlParams.get('plan');

        if (planKey && plans[planKey]) {
            const plan = plans[planKey];
            setSelectedPlan(plan);
            setFormData(prev => ({ ...prev, plano: plan.name }));

            if (planKey === 'manutencao') {
                setIsMaintenance(true);
            }
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const apiUrl = 'https://backend-rp7j.onrender.com/send-email';

        // Prepare Data
        let payloadOrcamento = formData.cores;
        let payloadDetalhes = formData.detalhes;
        let finalProfissao = formData.profissao;

        if (isMaintenance) {
            // For maintenance, profissao is treated as Site Link logic
            payloadOrcamento = formData.profissao; // Sending site link in orcamento field
        }

        const isPaidTest = formData.nome.toUpperCase().includes('TESTE PAGO') || formData.detalhes.toUpperCase().includes('TESTE PAGO');

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: formData.nome,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    profissao: finalProfissao,
                    servico: isMaintenance ? 'Manutenção' : formData.objetivo,
                    detalhes: payloadDetalhes,
                    plano: formData.plano,
                    orcamento: payloadOrcamento,
                    isMaintenance: isMaintenance,
                    isPaid: isPaidTest
                })
            });

            if (response.ok) {
                // Generate WhatsApp Message
                let messageWhatsapp = '';
                if (isMaintenance) {
                    messageWhatsapp = `*NOVO PEDIDO DE SITE - ALPHA CODE* 🚀%0A%0A` +
                        `*DADOS DO CLIENTE:*%0A` +
                        `👤 *Nome:* ${formData.nome}%0A` +
                        `📱 *WhatsApp:* ${formData.whatsapp}%0A` +
                        `📧 *Email:* ${formData.email}%0A` +
                        `💼 *Link do Site:* ${formData.profissao}%0A%0A` +
                        `----------------------------------%0A` +
                        `*RESUMO DO PEDIDO:*%0A` +
                        `🎯 *Objetivo:* Manutenção%0A` +
                        `💰 *Valor:* ${selectedPlan?.price} (Pgto Único)%0A` +
                        `----------------------------------%0A` +
                        `*DETALHES / EXPECTATIVAS:*%0A` +
                        `${formData.detalhes}`;
                } else {
                    messageWhatsapp = `*NOVO PEDIDO DE SITE - ALPHA CODE* 🚀%0A%0A` +
                        `*DADOS DO CLIENTE:*%0A` +
                        `👤 *Nome:* ${formData.nome}%0A` +
                        `📱 *WhatsApp:* ${formData.whatsapp}%0A` +
                        `📧 *Email:* ${formData.email}%0A` +
                        `💼 *Profissão:* ${formData.profissao}%0A%0A` +
                        `----------------------------------%0A` +
                        `*RESUMO DO PEDIDO:*%0A` +
                        `📊 *Plano Escolhido:* ${formData.plano}%0A` +
                        `💰 *Valor:* ${selectedPlan?.price} (Pgto Único)%0A` +
                        `🎯 *Objetivo:* ${formData.objetivo}%0A` +
                        `🎨 *Cores:* ${formData.cores}%0A` +
                        `🔗 *Ref:* ${formData.referencias}%0A` +
                        `----------------------------------%0A` +
                        `*DETALHES / EXPECTATIVAS:*%0A` +
                        `${formData.detalhes}`;
                }
                setWhatsappUrl(`https://wa.me/5521999064502?text=${messageWhatsapp}`);
                setModalOpen(true);
                setFormData({ ...formData, nome: '', whatsapp: '', email: '', profissao: '', objetivo: '', cores: '', referencias: '', detalhes: '' });
            } else {
                throw new Error('Erro na resposta do servidor');
            }
        } catch (error) {
            console.error('Erro:', error);
            setErrorMessage('Ocorreu um erro ao enviar. Por favor, tente falar diretamente no WhatsApp.');
            // Fallback: set whatsapp url anyway so user can click the button
            let messageWhatsapp = `*Olá, tentei enviar um pedido pelo site mas deu erro.*%0AMeu nome: ${formData.nome}`;
            setWhatsappUrl(`https://wa.me/5521999064502?text=${messageWhatsapp}`);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        setPayBtnText('Redirecionando... 🔒');
        setErrorMessage('');
        try {
            const backendUrl = 'https://backend-rp7j.onrender.com/create-checkout-session';
            const res = await fetch(backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    planName: selectedPlan?.id,
                    price: selectedPlan?.price
                })
            });

            if (!res.ok) throw new Error('Erro no pagamento');
            const data = await res.json();
            if (data.url) {
                window.open(data.url, '_blank');
            } else {
                throw new Error('URL de pagamento não gerada');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Não foi possível iniciar o pagamento agora. Tente pelo WhatsApp.');
            setPayBtnText('Pagar Agora (Pix ou Cartão) 💳');
        }
    };

    return (
        <div className="order-container-react">
            {/* Plan Summary Sidebar logic handled via CSS Grid usually, but here simplified */}
            <aside className="plan-summary mb-8 md:mb-0">
                <div className="card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--border-color)' }}>
                    <h3>Resumo do Pedido</h3>
                    <div className="selected-plan-details">
                        <span className="plan-label" style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Serviço Selecionado:</span>
                        <h2>{selectedPlan ? selectedPlan.name : 'Selecione um plano'}</h2>
                        <div className="summary-price" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{selectedPlan ? selectedPlan.price : '--'}</div>
                        <hr style={{ margin: '15px 0', borderColor: 'var(--border-color)' }} />
                        <p>{isMaintenance ? 'Pagamento por Manutenção' : 'Pagamento único'}</p>
                    </div>
                </div>
            </aside>

            <form onSubmit={handleSubmit} className="order-form" style={{ marginTop: '40px' }}>
                <div style={{ marginBottom: '50px' }}>
                    <h3 style={{ marginBottom: '30px', fontSize: '1.4rem' }}>1. Suas Informações</h3>
                    <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
                        <div className="form-control">
                            <label>Nome Completo *</label>
                            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="input-field" placeholder="Seu nome" />
                        </div>
                        <div className="form-control">
                            <label>WhatsApp *</label>
                            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required className="input-field" placeholder="(XX) XXXXX-XXXX" />
                        </div>
                        <div className="form-control">
                            <label>E-mail *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" placeholder="seu@email.com" />
                        </div>
                        <div className="form-control">
                            <label>{isMaintenance ? 'Link do Site (para manutenção) *' : 'Profissão / Área *'}</label>
                            <input type="text" name="profissao" value={formData.profissao} onChange={handleChange} required className="input-field" placeholder={isMaintenance ? 'https://...' : 'Ex: Psicólogo...'} />
                        </div>
                    </div>
                </div>

                {!isMaintenance && (
                    <div style={{ marginBottom: '50px' }}>
                        <h3 style={{ marginBottom: '30px', fontSize: '1.4rem' }}>2. Sobre o Projeto</h3>
                        <div className="form-control">
                            <label>Qual o objetivo principal do site? *</label>
                            <select name="objetivo" value={formData.objetivo} onChange={handleChange} required className="input-field">
                                <option value="" disabled>Selecione...</option>
                                <option value="Captar Clientes">Captar mais clientes (Leads)</option>
                                <option value="Autoridade Profissional">Gerar Autoridade Profissional</option>
                                <option value="Apresentar Serviços">Apresentar Serviços/Portfólio</option>
                                <option value="Venda Direta">Venda Direta</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>
                        <div className="grid-2" style={{ display: 'grid', gap: '30px', marginTop: '30px' }}>
                            <div className="form-control">
                                <label>Ideia de cores</label>
                                <input type="text" name="cores" value={formData.cores} onChange={handleChange} className="input-field" placeholder="Ex: Azul..." />
                            </div>
                            <div className="form-control">
                                <label>Referências (Opcional)</label>
                                <input type="text" name="referencias" value={formData.referencias} onChange={handleChange} className="input-field" placeholder="Links..." />
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ marginBottom: '50px' }}>
                    <h3 style={{ marginBottom: '30px', fontSize: '1.4rem' }}>3. Detalhes</h3>
                    <div className="form-control">
                        <label>{isMaintenance ? 'O que precisa ser feito? *' : 'Conte mais sobre o que você precisa *'}</label>
                        <textarea name="detalhes" value={formData.detalhes} onChange={handleChange} rows="5" required className="input-field" placeholder="Descreva..." style={{ width: '100%', padding: '10px' }}></textarea>
                    </div>
                </div>

                {errorMessage && (
                    <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(214, 40, 57, 0.1)', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '10px' }}>{errorMessage}</p>
                        {whatsappUrl && (
                            <a href={whatsappUrl} target="_blank" className="btn btn-outline" style={{ display: 'inline-flex', marginTop: '5px' }}>
                                Falar no WhatsApp
                            </a>
                        )}
                    </div>
                )}

                <button type="submit" className="btn btn-primary lg" style={{ width: '100%', marginTop: '40px' }} disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar Pedido'}
                </button>
            </form>

            {/* Loading Overlay */}
            {loading && (
                <div className="loading-overlay" style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(20, 20, 20, 0.4)', /* Dark glass background */
                    backdropFilter: 'blur(15px)', /* Premium Glass Effect */
                    WebkitBackdropFilter: 'blur(15px)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', zIndex: 2000,
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <div style={{
                        width: '120px', height: '120px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative'
                    }}>
                        {/* Static Logo or Pulsing Logo */}
                        <img src="/assets/logoText.svg" alt="Carregando..." style={{ width: '100%', height: 'auto', animation: 'pulse 1.5s infinite ease-in-out' }} />
                    </div>
                    <p style={{ marginTop: '20px', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Enviando pedido...</p>
                </div>
            )}

            {modalOpen && (
                <div className="modal-overlay active" style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="modal-content" style={{ background: '#fff', padding: '30px', borderRadius: '10px', maxWidth: '500px', width: '90%', position: 'relative', color: '#333' }}>
                        <button onClick={() => setModalOpen(false)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        <h2 style={{ marginBottom: '15px', color: 'var(--color-primary)' }}>Pedido Recebido! 🚀</h2>
                        <p>Seus dados foram enviados. Prossiga para o pagamento ou fale no WhatsApp.</p>

                        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
                            <button onClick={handlePayment} className="btn btn-primary" style={{ justifyContent: 'center' }}>
                                {payBtnText}
                            </button>
                            <a href={whatsappUrl} target="_blank" className="btn btn-outline" style={{ justifyContent: 'center', display: 'flex' }}>
                                Falar no WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                 .form-control {
                     margin-bottom: 30px; /* Explicit gap between inputs */
                 }
                 .input-field {
                     width: 100%;
                     max-width: 100%; /* Prevent overflow */
                     box-sizing: border-box; /* Include padding in width */
                     padding: 15px; /* Comfortable padding */
                     border: 1px solid var(--border-color);
                     border-radius: var(--radius-md); /* Rounded premium corners */
                     background: var(--color-bg-surface);
                     color: var(--color-text-main);
                     font-size: 1rem;
                     transition: all 0.3s ease;
                 }
                 .input-field:focus {
                     outline: none;
                     border-color: var(--color-primary);
                     box-shadow: 0 0 0 3px rgba(214, 40, 57, 0.2); /* Focus ring */
                 }
                 label {
                     display: block;
                     margin-bottom: 12px;
                     font-weight: 600;
                     font-size: 0.95rem;
                     color: var(--color-text-main);
                 }
                 @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                 @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
                 @media (min-width: 768px) {
                     .grid-2 { grid-template-columns: 1fr 1fr !important; }
                 }
             `}</style>
        </div>
    );
}
