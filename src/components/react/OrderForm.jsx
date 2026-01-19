import React, { useState, useEffect } from 'react';

const plans = {
    'simples': { name: 'Página Simples', price: 'R$ 347', numericPrice: 347, id: 'Página Simples' },
    'completa': { name: 'Página Completa', price: 'R$ 599', numericPrice: 599, id: 'Página Completa' },
    'premium': { name: 'Página Premium', price: 'R$ 947', numericPrice: 947, id: 'Página Premium' },
    'manutencao': { name: 'Manutenção', price: 'R$ 100', numericPrice: 100, id: 'Manutenção' }
};

const COUPONS = {
    'ALPHAFIRST': { type: 'percent', value: 10 },
    'QUERO50': { type: 'fixed', value: 50 },
    'PARCEIRO15': { type: 'percent', value: 15 }
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
    const [payBtnText, setPayBtnText] = useState('Pagar Agora (Pix ou Cartão) 💳');

    // Coupon States
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const planKey = urlParams.get('plan');

        if (planKey && plans[planKey]) {
            const plan = plans[planKey];
            setSelectedPlan(plan);
            setFormData(prev => ({ ...prev, plano: plan.name }));
            setFinalPrice(plan.numericPrice);

            if (planKey === 'manutencao') {
                setIsMaintenance(true);
            }
        }

        fetch('https://backend-rp7j.onrender.com/health').catch(() => { });
    }, []);

    useEffect(() => {
        if (selectedPlan) {
            let price = selectedPlan.numericPrice;
            if (appliedCoupon) {
                if (appliedCoupon.type === 'percent') {
                    price = price * (1 - appliedCoupon.value / 100);
                } else {
                    price = Math.max(0, price - appliedCoupon.value);
                }
            }
            setFinalPrice(price);
        }
    }, [selectedPlan, appliedCoupon]);

    const handleApplyCoupon = () => {
        setCouponError('');
        const code = couponCode.trim().toUpperCase();
        if (COUPONS[code]) {
            setAppliedCoupon({ ...COUPONS[code], code });
            setCouponCode('');
        } else {
            setCouponError('Cupom inválido ou expirado.');
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const apiUrl = 'https://backend-rp7j.onrender.com/send-email';

        let payloadOrcamento = formData.cores;
        if (isMaintenance) {
            payloadOrcamento = formData.profissao;
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
                    profissao: formData.profissao,
                    servico: isMaintenance ? 'Manutenção' : formData.objetivo,
                    detalhes: formData.detalhes,
                    plano: formData.plano,
                    orcamento: payloadOrcamento,
                    isMaintenance: isMaintenance,
                    isPaid: isPaidTest,
                    coupon: appliedCoupon ? appliedCoupon.code : null,
                    price: finalPrice
                })
            });

            if (response.ok) {
                let messageBody = `*NOVO PEDIDO DE SITE - ALPHA CODE* 🚀\n\n` +
                    `*DADOS DO CLIENTE:*\n` +
                    `- *Nome:* ${formData.nome}\n` +
                    `- *WhatsApp:* ${formData.whatsapp}\n` +
                    `- *Email:* ${formData.email}\n` +
                    `- *${isMaintenance ? 'Link do Site' : 'Profissão'}:* ${formData.profissao}\n\n` +
                    `----------------------------------\n` +
                    `*RESUMO DO PEDIDO:*\n` +
                    `- *Serviço:* ${isMaintenance ? 'Manutenção' : formData.plano}\n` +
                    `- *Valor Original:* ${selectedPlan?.price}\n` +
                    (appliedCoupon ? `- *Cupom:* ${appliedCoupon.code} (${appliedCoupon.type === 'percent' ? appliedCoupon.value + '%' : 'R$ ' + appliedCoupon.value} OFF)\n` : '') +
                    `- *VALOR FINAL:* R$ ${finalPrice.toFixed(2)}\n` +
                    `----------------------------------\n` +
                    `*DETALHES / EXPECTATIVAS:*\n` +
                    `${formData.detalhes}`;

                const encodedMessage = encodeURIComponent(messageBody);
                setWhatsappUrl(`https://wa.me/5521999064502?text=${encodedMessage}`);
                setModalOpen(true);
                // Don't reset everything yet to keep context for payment, but clear form
                setFormData({ ...formData, nome: '', whatsapp: '', email: '', profissao: '', objetivo: '', cores: '', referencias: '', detalhes: '' });
            } else {
                throw new Error('Erro na resposta do servidor');
            }
        } catch (error) {
            console.error('Erro:', error);
            setErrorMessage('Ocorreu um erro ao enviar. Por favor, tente falar diretamente no WhatsApp.');
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
                    planName: selectedPlan?.id + (appliedCoupon ? ` (Cupom: ${appliedCoupon.code})` : ''),
                    price: finalPrice.toFixed(2)
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
        <div className="order-container-react" style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px'
        }}>
            <aside className="plan-summary">
                <div className="card" style={{
                    padding: '30px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1px solid var(--color-primary)',
                    boxShadow: 'var(--shadow-glow)',
                    position: 'sticky',
                    top: '100px',
                    zIndex: 10
                }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Resumo do Pedido</h3>

                    <div className="selected-plan-details">
                        <span className="plan-label" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '5px' }}>Serviço Selecionado:</span>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: 'var(--color-text-main)' }}>{selectedPlan ? selectedPlan.name : 'Selecione um plano'}</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {appliedCoupon && (
                                <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>
                                    {selectedPlan?.price}
                                </span>
                            )}
                            <div className="summary-price" style={{ fontSize: '2.8rem', fontWeight: 'bold', color: 'var(--color-primary)', textShadow: '0 0 15px var(--color-primary-glow)' }}>
                                R$ {finalPrice.toFixed(2).replace('.', ',')}
                            </div>
                        </div>

                        <hr style={{ margin: '20px 0', borderColor: 'rgba(255,255,255,0.1)' }} />

                        {/* Coupon Section */}
                        <div className="coupon-section" style={{ marginBottom: '20px' }}>
                            {!appliedCoupon ? (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Cupom de Desconto"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: 'var(--radius-sm)',
                                            padding: '8px 12px',
                                            color: '#fff',
                                            width: '100%',
                                            fontSize: '0.9rem'
                                        }}
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="btn-primary"
                                        style={{ padding: '8px 15px', fontSize: '0.8rem' }}
                                    >
                                        Aplicar
                                    </button>
                                </div>
                            ) : (
                                <div style={{
                                    background: 'rgba(37, 211, 102, 0.1)',
                                    border: '1px dashed #25D366',
                                    padding: '10px 15px',
                                    borderRadius: 'var(--radius-sm)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <span style={{ color: '#25D366', fontWeight: 'bold', fontSize: '0.9rem' }}>{appliedCoupon.code}</span>
                                        <span style={{ color: '#fff', marginLeft: '10px', fontSize: '0.8rem' }}>Aplicado!</span>
                                    </div>
                                    <button onClick={removeCoupon} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 'bold' }}>&times;</button>
                                </div>
                            )}
                            {couponError && <p style={{ color: 'var(--color-primary)', fontSize: '0.8rem', mt: '5px', textAlign: 'left' }}>{couponError}</p>}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-secondary)' }}>
                            <span style={{ fontSize: '1.2rem' }}>💎</span>
                            <p style={{ margin: 0, fontSize: '0.85rem' }}>{isMaintenance ? 'Manutenção Profissional' : 'Pagamento Único • Sem Mensalidades'}</p>
                        </div>
                    </div>
                </div>
            </aside>

            <form onSubmit={handleSubmit} className="order-form" style={{
                background: 'var(--color-bg-surface)',
                padding: '40px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-soft)'
            }}>
                <div style={{ marginBottom: '60px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
                        <span style={{ background: 'var(--color-primary)', color: 'white', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</span>
                        <h3 style={{ margin: 0, fontSize: '1.6rem' }}>Suas Informações</h3>
                    </div>

                    <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '25px' }}>
                        <div className="form-control">
                            <label>Nome Completo *</label>
                            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="input-field" placeholder="Como devemos te chamar?" />
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
                            <input type="text" name="profissao" value={formData.profissao} onChange={handleChange} required className="input-field" placeholder={isMaintenance ? 'https://...' : 'Ex: Psicólogo, Advogado...'} />
                        </div>
                    </div>
                </div>

                {!isMaintenance && (
                    <div style={{ marginBottom: '60px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
                            <span style={{ background: 'var(--color-primary)', color: 'white', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</span>
                            <h3 style={{ margin: 0, fontSize: '1.6rem' }}>Sobre o Projeto</h3>
                        </div>

                        <div className="form-control">
                            <label>Qual o objetivo principal do site? *</label>
                            <select name="objetivo" value={formData.objetivo} onChange={handleChange} required className="input-field dropdown-select">
                                <option value="" disabled style={{ color: '#888' }}>Selecione uma opção...</option>
                                <option value="Captar Clientes">Captar mais clientes (Leads)</option>
                                <option value="Autoridade Profissional">Gerar Autoridade Profissional</option>
                                <option value="Apresentar Serviços">Apresentar Serviços/Portfólio</option>
                                <option value="Venda Direta">Venda Direta</option>
                                <option value="Outro">Outro (especificar nos detalhes)</option>
                            </select>
                        </div>
                        <div className="grid-2" style={{ display: 'grid', gap: '25px', marginTop: '30px' }}>
                            <div className="form-control">
                                <label>Ideia de cores</label>
                                <input type="text" name="cores" value={formData.cores} onChange={handleChange} className="input-field" placeholder="Ex: Azul marinho e Dourado" />
                            </div>
                            <div className="form-control">
                                <label>Referências (Opcional)</label>
                                <input type="text" name="referencias" value={formData.referencias} onChange={handleChange} className="input-field" placeholder="Links de sites que você gosta" />
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
                        <span style={{ background: 'var(--color-primary)', color: 'white', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</span>
                        <h3 style={{ margin: 0, fontSize: '1.6rem' }}>Detalhes Adicionais</h3>
                    </div>
                    <div className="form-control">
                        <label>{isMaintenance ? 'O que precisa ser feito? *' : 'Conte mais sobre o que você precisa *'}</label>
                        <textarea name="detalhes" value={formData.detalhes} onChange={handleChange} rows="5" required className="input-field" placeholder="Fale um pouco sobre seu negócio e suas expectativas..." style={{ width: '100%', padding: '15px' }}></textarea>
                    </div>
                </div>

                {errorMessage && (
                    <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(214, 40, 57, 0.1)', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '15px' }}>{errorMessage}</p>
                        {whatsappUrl && (
                            <a href={whatsappUrl} target="_blank" className="btn btn-outline" style={{ display: 'inline-flex' }}>
                                Falar no WhatsApp agora
                            </a>
                        )}
                    </div>
                )}

                <button type="submit" className="btn btn-primary lg" style={{
                    width: '100%',
                    marginTop: '20px',
                    height: '60px',
                    fontSize: '1.2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }} disabled={loading}>
                    {loading ? 'Enviando seu pedido...' : 'Finalizar e Enviar Pedido'}
                </button>
                <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    🔒 Seus dados estão seguros e serão usados apenas para o seu projeto.
                </p>
            </form>

            {loading && (
                <div className="loading-overlay" style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', zIndex: 2000
                }}>
                    <div className="loader" style={{
                        width: '60px',
                        height: '60px',
                        border: '5px solid rgba(255,255,255,0.1)',
                        borderTop: '5px solid var(--color-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginBottom: '20px'
                    }}></div>
                    <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>Enviando seu pedido...</p>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '10px' }}>Por favor, aguarde um instante.</p>
                </div>
            )}

            {modalOpen && (
                <div className="modal-overlay active" style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                    backdropFilter: 'blur(5px)'
                }}>
                    <div className="modal-content" style={{
                        background: 'var(--color-bg-card)',
                        padding: '40px',
                        borderRadius: 'var(--radius-md)',
                        maxWidth: '500px',
                        width: '95%',
                        position: 'relative',
                        color: 'var(--color-text-main)',
                        border: '1px solid var(--color-primary)',
                        boxShadow: '0 0 30px var(--color-primary-glow)',
                        textAlign: 'center'
                    }}>
                        <button onClick={() => setModalOpen(false)} style={{
                            position: 'absolute', top: '15px', right: '15px',
                            background: 'none', border: 'none', fontSize: '2rem',
                            cursor: 'pointer', color: 'var(--color-text-muted)'
                        }}>&times;</button>

                        <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="/assets/logo.svg" alt="Alpha Code Logo" style={{ width: '120px', height: 'auto', marginBottom: '20px' }} />
                            <h2 style={{ marginBottom: '15px', color: 'var(--color-text-main)', fontSize: '2rem' }}>
                                Pedido Recebido!
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '10px', fontSize: '1.1rem' }}>
                                Seus dados foram enviados com sucesso.
                            </p>
                            <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: '600' }}>
                                📧 Enviamos uma confirmação para seu e-mail.<br />
                                <span style={{ opacity: 0.8 }}>(Verifique também sua pasta de SPAM)</span>
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
                            <button onClick={handlePayment} className="btn btn-primary lg" style={{ width: '100%' }}>
                                {payBtnText}
                            </button>
                            <a href={whatsappUrl} target="_blank" className="btn btn-outline lg" style={{ width: '100%', textDecoration: 'none' }}>
                                Confirmar no WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                 .order-container-react {
                     animation: fadeIn 0.8s ease-out;
                 }
                 @keyframes fadeIn {
                     from { opacity: 0; transform: translateY(20px); }
                     to { opacity: 1; transform: translateY(0); }
                 }
                 .form-control {
                     margin-bottom: 5px;
                 }
                 .input-field {
                     width: 100%;
                     box-sizing: border-box;
                     padding: 15px;
                     border: 1px solid rgba(255,255,255,0.1);
                     border-radius: var(--radius-sm);
                     background: rgba(255,255,255,0.05);
                     color: #fff;
                     font-size: 1rem;
                     transition: all 0.3s ease;
                 }
                 .input-field:focus {
                     outline: none;
                     border-color: var(--color-primary);
                     background: rgba(255,255,255,0.08);
                     box-shadow: 0 0 15px rgba(138, 28, 38, 0.2);
                 }
                 
                 .dropdown-select option {
                     background-color: var(--color-bg-card);
                     color: var(--color-text-main);
                     padding: 10px;
                 }

                 label {
                     display: block;
                     margin-bottom: 10px;
                     font-weight: 500;
                     font-size: 0.9rem;
                     color: var(--color-text-secondary);
                 }
                 @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                 @media (min-width: 992px) {
                     .order-container-react {
                         grid-template-columns: 350px 1fr !important;
                     }
                 }
                 @media (max-width: 768px) {
                     .order-form { padding: 25px !important; }
                     .grid-2 { grid-template-columns: 1fr !important; }
                     .plan-summary { position: static !important; }
                 }
             `}</style>
        </div>
    );
}
