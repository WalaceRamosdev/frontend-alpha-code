import React, { useState, useEffect } from 'react';

const plans = {
    'simples': {
        name: 'Plano Bronze',
        subtitle: 'Página Simples',
        price: 'R$ 347',
        numericPrice: 347,
        numericPriceEUR: 249,
        id: 'Plano Bronze',
        stripeLink: 'https://buy.stripe.com/aFacN7aky67s3jg8Eg93y01',
        mpLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=placeholder_simples'
    },
    'completa': {
        name: 'Plano Prata',
        subtitle: 'Página Completa',
        price: 'R$ 599',
        numericPrice: 599,
        numericPriceEUR: 499,
        id: 'Plano Prata',
        stripeLink: 'https://buy.stripe.com/7sYbJ32S62Vg2fc7Ac93y02',
        mpLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=placeholder_completa'
    },
    'premium': {
        name: 'Plano Ouro',
        subtitle: 'Página Premium',
        price: 'R$ 947',
        numericPrice: 947,
        numericPriceEUR: 949,
        id: 'Plano Ouro',
        stripeLink: 'https://buy.stripe.com/4gMcN72S6cvQ9HE9Ik93y03',
        mpLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=placeholder_premium'
    },
    'manutencao': { name: 'Manutenção', price: 'R$ 100', numericPrice: 100, numericPriceEUR: 50, id: 'Manutenção' }
};

const COUPONS = {
    'ALPHA25': { type: 'percent', value: 25 }, // Promoção Válida até 14/02/2026
    'ALPHAFIRST': { type: 'percent', value: 10 },
    'QUERO50': { type: 'fixed', value: 50 },
    'PARCEIRO15': { type: 'percent', value: 15 }
};

export default function OrderForm() {
    const [formData, setFormData] = useState({
        nome: '', whatsapp: '', email: '', profissao: '', objetivo: '', cores: '', referencias: '', detalhes: '', plano: ''
    });
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isMaintenance, setIsMaintenance] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [whatsappUrl, setWhatsappUrl] = useState('');
    const [payBtnText, setPayBtnText] = useState('Pagar Agora 💳');
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');
    const [finalPrice, setFinalPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [showUpsell, setShowUpsell] = useState(false);
    const [upsellAnswered, setUpsellAnswered] = useState(false);
    const [hasSEO, setHasSEO] = useState(false);
    const [seoPrice] = useState(150);

    const isPortugal = typeof navigator !== 'undefined' && (
        navigator.language === 'pt-PT' ||
        navigator.languages.includes('pt-PT') ||
        (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('locale') === 'pt-PT')
    );
    const currency = isPortugal ? '€' : 'R$';
    const defaultBtnText = isPortugal ? 'Ir para Pagamento 💳' : 'Pagar Agora (Pix ou Cartão) 💳';

    useEffect(() => {
        setPayBtnText(isRedirecting ? 'Redirecionando...' : defaultBtnText);
    }, [isPortugal, defaultBtnText, isRedirecting]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const planKey = urlParams.get('plan');
        if (planKey && plans[planKey]) {
            const plan = plans[planKey];
            setSelectedPlan(plan);
            setFormData(prev => ({ ...prev, plano: plan.name }));
            setFinalPrice(isPortugal ? plan.numericPriceEUR : plan.numericPrice);
            if (planKey === 'manutencao') setIsMaintenance(true);
        }
    }, [isPortugal]);

    useEffect(() => {
        if (selectedPlan) {
            let price = isPortugal ? selectedPlan.numericPriceEUR : selectedPlan.numericPrice;
            if (appliedCoupon) {
                price = appliedCoupon.type === 'percent'
                    ? price * (1 - appliedCoupon.value / 100)
                    : Math.max(0, price - appliedCoupon.value);
            }
            if (hasSEO) {
                price += isPortugal ? 25 : seoPrice; // Placeholder for EUR SEO
            }
            setFinalPrice(price);
        }
    }, [selectedPlan, appliedCoupon, isPortugal, hasSEO]);

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

    const removeCoupon = () => setAppliedCoupon(null);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // SEO Upsell check for Bronze (simples) and Silver (completa)
        const currentPlanKey = Object.keys(plans).find(k => plans[k].name === formData.plano);
        if ((currentPlanKey === 'simples' || currentPlanKey === 'completa') && !upsellAnswered) {
            setShowUpsell(true);
            return;
        }

        setLoading(true);
        setErrorMessage('');
        try {
            const apiUrl = 'https://backend-rp7j.onrender.com/send-email';
            const isPaidTest = formData.nome.toUpperCase().includes('TESTE PAGO') || formData.detalhes.toUpperCase().includes('TESTE PAGO');
            const payload = {
                ...formData,
                plano: hasSEO ? `${formData.plano} + SEO Turbinado` : formData.plano,
                // Compatibilidade com backend antigo (Render)
                servico: formData.objetivo || (isMaintenance ? 'Manutenção' : 'Não informado'),
                // Hack de Injeção: Ajusta label se for manutenção
                orcamento: isMaintenance
                    ? `(Manutenção)</p><p><strong>Link do Site:</strong> ${formData.referencias}`
                    : `${formData.cores || 'Não informado'}</p><p><strong>Sites de Referência:</strong> ${formData.referencias || 'Nenhum'}`,
                detalhes: formData.detalhes,
                isMaintenance,
                isPaid: isPaidTest,
                coupon: appliedCoupon?.code,
                price: finalPrice
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const linkLabel = isMaintenance ? 'LINK DO SITE' : 'REFERÊNCIAS';
                let messageBody = `*NOVO PEDIDO - ALPHA CODE* 🚀\n\n` +
                    `*CLIENTE:* ${formData.nome}\n` +
                    `*WHATSAPP:* ${formData.whatsapp}\n` +
                    `*EMAIL:* ${formData.email}\n` +
                    `*PROFISSÃO:* ${formData.profissao}\n\n` +
                    `*DETALHES DO PROJETO*\n` +
                    `*PLANO:* ${hasSEO ? `${formData.plano} + SEO Turbinado` : formData.plano}\n` +
                    `*VALOR:* ${currency} ${finalPrice.toFixed(2).replace('.', ',')}\n` +
                    (isMaintenance ? '' : `*OBJETIVO:* ${formData.objetivo || 'Não informado'}\n`) +
                    (isMaintenance ? '' : `*CORES:* ${formData.cores || 'Não informado'}\n`) +
                    `*${linkLabel}:* ${formData.referencias || 'Nenhuma informada'}\n\n` +
                    `*DESCRIÇÃO:* ${formData.detalhes}`;
                setWhatsappUrl(`https://wa.me/5521999064502?text=${encodeURIComponent(messageBody)}`);
                setModalOpen(true);
            } else throw new Error('Erro servidor');
        } catch (error) {
            setErrorMessage('Erro ao enviar. Tente o WhatsApp.');
        } finally { setLoading(false); }
    };

    const handlePayment = async () => {
        setPayBtnText('Redirecionando...');
        setIsRedirecting(true);

        // LOGICA DE REDIRECIONAMENTO POR REGIÃO
        if (isPortugal) {
            if (selectedPlan?.stripeLink && !appliedCoupon) {
                setTimeout(() => {
                    window.open(selectedPlan.stripeLink, '_blank');
                    setIsRedirecting(false);
                    setPayBtnText(defaultBtnText);
                }, 1500);
                return;
            }
        }

        try {
            const res = await fetch('https://backend-rp7j.onrender.com/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    planName: selectedPlan?.id + (hasSEO ? ' + SEO' : '') + (appliedCoupon ? ` (${appliedCoupon.code})` : ''),
                    price: finalPrice.toFixed(2)
                })
            });
            const data = await res.json();
            if (data.url) {
                setTimeout(() => {
                    window.open(data.url, '_blank');
                    setIsRedirecting(false);
                    setPayBtnText(defaultBtnText);
                }, 1000);
            }
        } catch (err) {
            setPayBtnText(defaultBtnText);
            setIsRedirecting(false);
        }
    };

    return (
        <div className="order-main-wrapper">
            <div className="order-grid">
                {/* SIDEBAR */}
                <aside className="order-sidebar">
                    <div className="premium-card sticky-card">
                        <div className="summary-section">
                            <span className="label">Resumo do Pedido</span>
                            <h2 className="plan-name">{selectedPlan ? selectedPlan.name : 'Carregando...'}</h2>
                            <span className="plan-subtitle-form">{selectedPlan ? selectedPlan.subtitle : ''}</span>

                            <div className="price-stack">
                                {appliedCoupon && <span className="old-price">{selectedPlan?.price.replace('R$', currency)}</span>}
                                {hasSEO && <div className="sidebar-item-row"><span>+ Plano SEO (3 meses)</span><span>{currency} {isPortugal ? '25,00' : '150,00'}</span></div>}
                                <span className="final-price">{currency} {finalPrice.toFixed(2).replace('.', ',')}</span>
                            </div>

                            <div className="coupon-box">
                                {!appliedCoupon ? (
                                    <div className="coupon-input-group">
                                        <input type="text" placeholder="Cupom" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                                        <button type="button" onClick={handleApplyCoupon} className="apply-btn">OK</button>
                                    </div>
                                ) : (
                                    <div className="applied-badge">
                                        <span>{appliedCoupon.code} <small>Ativado</small></span>
                                        <button type="button" onClick={removeCoupon}>&times;</button>
                                    </div>
                                )}
                                {couponError && <p className="error">{couponError}</p>}
                            </div>

                            <div className="trust-badges">
                                <span>💎 Pagamento Único</span>
                                <span>🔒 Seguro</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* FORM */}
                <main className="order-content">
                    <form onSubmit={handleSubmit} className="premium-card form-inner">
                        <section className="form-step">
                            <div className="step-header">
                                <span className="step-num">01</span>
                                <h3>Seus Dados</h3>
                            </div>
                            <div className="inputs-grid">
                                <div className="field">
                                    <label>Nome Completo</label>
                                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} required placeholder="Como devemos te chamar?" />
                                </div>
                                <div className="field">
                                    <label>WhatsApp</label>
                                    <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required placeholder="(XX) XXXXX-XXXX" />
                                </div>
                                <div className="field">
                                    <label>E-mail</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="seu@email.com" />
                                </div>
                                <div className="field">
                                    <label>Sua Profissão / Negócio</label>
                                    <input type="text" name="profissao" value={formData.profissao} onChange={handleChange} required placeholder="Ex: Arquiteto, Psicóloga..." />
                                </div>
                            </div>
                        </section>

                        {!isMaintenance && (
                            <section className="form-step">
                                <div className="step-header">
                                    <span className="step-num">02</span>
                                    <h3>Projeto</h3>
                                </div>
                                <div className="field">
                                    <label>Objetivo</label>
                                    <select name="objetivo" value={formData.objetivo} onChange={handleChange} required>
                                        <option value="">Selecione...</option>
                                        <option value="Captar Clientes">Captar mais clientes</option>
                                        <option value="Autoridade">Gerar Autoridade</option>
                                        <option value="Vendas">Venda Direta</option>
                                    </select>
                                </div>
                                <div className="inputs-grid">
                                    <div className="field">
                                        <label>Cores de Preferência</label>
                                        <input type="text" name="cores" value={formData.cores} onChange={handleChange} placeholder="Ex: Azul e Branco, Dark Mode..." />
                                    </div>
                                </div>
                            </section>
                        )}

                        <section className="form-step">
                            <div className="step-header">
                                <span className="step-num">{isMaintenance ? '02' : '03'}</span>
                                <h3>Expectativas</h3>
                            </div>
                            <div className="field">
                                <label>{isMaintenance ? 'Link do Site (Obrigatório)' : 'Link de Referência / Site Atual'}</label>
                                <input
                                    type="text"
                                    name="referencias"
                                    value={formData.referencias}
                                    onChange={handleChange}
                                    required={isMaintenance}
                                    placeholder={isMaintenance ? "seu-site.com.br" : "https://..."}
                                />
                            </div>
                            <div className="field">
                                <label>Conte mais sobre sua ideia</label>
                                <textarea name="detalhes" value={formData.detalhes} onChange={handleChange} rows="4" required placeholder="Fale um pouco sobre o que você espera do seu site..."></textarea>
                            </div>
                        </section>

                        <button type="submit" className="submit-main-btn" disabled={loading}>
                            {loading ? 'Processando...' : 'Finalizar Pedido'}
                        </button>
                    </form>
                </main>
            </div>

            {/* MODAL & LOADERS */}
            {(loading || isRedirecting) && (
                <div className="fixed-overlay loader-overlay">
                    <div className="loader-content">
                        <div className="logo-pulsar">
                            <img src="/assets/logo.svg" className="loading-logo" />
                            <div className="glow-ring"></div>
                        </div>
                        <div className="loader-text">
                            {loading ? (
                                <>
                                    <h3>Enviando seu Briefing</h3>
                                    <p>Organizando os detalhes do seu projeto Alpha...</p>
                                </>
                            ) : (
                                <>
                                    <h3>Acedendo ao Checkout Seguro</h3>
                                    <p>Quase lá! Preparando ambiente de pagamento...</p>
                                </>
                            )}
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill"></div>
                        </div>
                    </div>
                </div>
            )}

            {showUpsell && (
                <div className="fixed-overlay upsell-overlay">
                    <div className="modal-box upsell-box">
                        <div className="upsell-badge">OFERTA DE LANÇAMENTO</div>
                        <h2>Site pronto não é site visto! 🔍</h2>
                        <p>
                            Por apenas <strong>R$ 150,00</strong>, ative nosso <strong>Plano de SEO Otimizado</strong> por 3 meses.
                            <br /><br />
                            Seu site configurado para aparecer no Google, atraindo clientes qualificados de forma orgânica.
                            Após os 3 meses, você decide se quer renovar.
                        </p>
                        <div className="modal-actions">
                            <button
                                onClick={() => {
                                    setHasSEO(true);
                                    setUpsellAnswered(true);
                                    setShowUpsell(false);
                                    setTimeout(() => handleSubmit(), 100);
                                }}
                                className="upsell-confirm-btn"
                            >
                                SIM, ADICIONAR SEO AO MEU SITE! 🚀
                            </button>
                            <button
                                onClick={() => {
                                    setHasSEO(false);
                                    setUpsellAnswered(true);
                                    setShowUpsell(false);
                                    setTimeout(() => handleSubmit(), 100);
                                }}
                                className="upsell-decline-btn"
                            >
                                Não, obrigado. Quero apenas o site por enquanto.
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalOpen && !loading && !isRedirecting && (
                <div className="fixed-overlay">
                    <div className="modal-box checkout-summary-box">
                        <button onClick={() => setModalOpen(false)} className="close-modal-btn" aria-label="Fechar Modal">&times;</button>
                        <img src="/assets/logo.svg" className="modal-logo" />
                        <h2>Confirmação do Pedido</h2>
                        <p className="summary-intro">Veja o que estamos preparando para você:</p>

                        <div className="checkout-items-list">
                            <div className="checkout-item">
                                <span className="item-name">📦 {selectedPlan?.name}</span>
                                <span className="item-price">{currency} {isPortugal ? selectedPlan.numericPriceEUR : selectedPlan.numericPrice}</span>
                            </div>

                            {hasSEO && (
                                <div className="checkout-item highlight-item">
                                    <span className="item-name">🔍 Plano SEO (3 Meses)</span>
                                    <span className="item-price">{currency} {isPortugal ? '25,00' : '150,00'}</span>
                                </div>
                            )}

                            {appliedCoupon && (
                                <div className="checkout-item coupon-item">
                                    <span className="item-name">🎫 Cupom: {appliedCoupon.code}</span>
                                    <span className="item-price">-{appliedCoupon.type === 'percent' ? `${appliedCoupon.value}%` : `${currency} ${appliedCoupon.value}`}</span>
                                </div>
                            )}

                            <div className="checkout-total">
                                <span>TOTAL A PAGAR</span>
                                <span>{currency} {finalPrice.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </div>

                        <p className="summary-footer">Tudo certo? Clique abaixo para pagar e iniciar seu projeto.</p>

                        <div className="modal-actions">
                            <button onClick={handlePayment} className="pay-btn">{payBtnText}</button>
                            <a href={whatsappUrl} target="_blank" className="wa-btn">Confirmar via WhatsApp</a>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .order-main-wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 5%;
                }
                .order-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 30px;
                    align-items: start;
                }
                @media (min-width: 992px) {
                    .order-grid { grid-template-columns: 350px 1fr; gap: 50px; }
                }

                .premium-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    backdrop-filter: blur(10px);
                }

                /* Sidebar Styles */
                .sticky-card { padding: 30px; position: sticky; top: 100px; border-color: rgba(138, 28, 38, 0.3); }
                .label { color: rgba(255,255,255,0.4); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }
                .plan-name { font-size: 1.8rem; margin: 10px 0 5px 0; font-weight: 800; line-height: 1; }
                .plan-subtitle-form { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.5); margin-bottom: 20px; font-weight: 600; }
                .price-stack { margin: 10px 0 20px 0; display: flex; flex-direction: column; }
                .old-price { text-decoration: line-through; color: rgba(255,255,255,0.3); font-size: 1.1rem; }
                .final-price { font-size: 2.5rem; font-weight: 900; color: #d62839; text-shadow: 0 0 20px rgba(214, 40, 57, 0.2); }
                .sidebar-item-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.6);
                    margin-bottom: 5px;
                    padding: 5px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                /* Form Styles */
                .form-inner { padding: 40px; }
                .form-step { margin-bottom: 40px; }
                .step-header { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
                .step-num { width: 32px; height: 32px; background: #d62839; border-radius: 50%; display: grid; place-items: center; font-weight: 900; font-size: 0.8rem; }
                .inputs-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
                @media (min-width: 600px) { .inputs-grid { grid-template-columns: 1fr 1fr; } }
                
                .field { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
                .field label { font-size: 0.8rem; font-weight: 700; color: rgba(255,255,255,0.6); text-transform: uppercase; }
                .field input, .field select, .field textarea {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 15px; border-radius: 12px; color: #fff; font-size: 1rem;
                }
                .field select option {
                    background: #111;
                    color: #fff;
                }
                .field input:focus, .field select:focus, .field textarea:focus { border-color: #d62839; outline: none; background: rgba(255,255,255,0.06); }

                .submit-main-btn {
                    width: 100%; padding: 20px; border-radius: 15px; background: #d62839; color: #fff;
                    font-weight: 900; font-size: 1.1rem; border: none; cursor: pointer; transition: 0.3s;
                }
                .submit-main-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(214, 40, 57, 0.3); }

                /* Coupon Box */
                .coupon-box { margin: 20px 0; }
                .coupon-input-group { display: flex; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden; }
                .coupon-input-group input { background: none; border: none; padding: 12px; color: #fff; flex: 1; }
                .apply-btn { background: #fff; color: #000; border: none; padding: 0 20px; font-weight: 800; cursor: pointer; }
                .applied-badge { background: rgba(37, 211, 102, 0.1); border: 1px dashed #25D366; padding: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; color: #25D366; }

                /* Fixed Overlay */
                .fixed-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(15px); display: grid; place-items: center; z-index: 1000; padding: 20px; }
                .loader-overlay { background: rgba(0,0,0,0.95); }
                
                .loader-content { text-align: center; max-width: 400px; }
                
                .logo-pulsar { position: relative; margin: 0 auto 40px auto; display: block; width: fit-content; }
                .loading-logo { width: 120px; position: relative; z-index: 2; animation: logo-float 3s infinite ease-in-out; }
                
                .glow-ring {
                    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
                    width: 150px; height: 150px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(214,40,57,0.4) 0%, transparent 70%);
                    animation: glow-pulse 2s infinite ease-in-out;
                }

                @keyframes logo-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }

                @keyframes glow-pulse {
                    0%, 100% { transform: translate(-50%,-50%) scale(0.8); opacity: 0.3; }
                    50% { transform: translate(-50%,-50%) scale(1.2); opacity: 0.8; }
                }

                .loader-text h3 { font-size: 1.5rem; margin-bottom: 10px; color: #fff; }
                .loader-text p { color: rgba(255,255,255,0.5); font-size: 0.9rem; }

                .progress-bar-container { width: 100%; height: 4px; background: rgba(255,255,255,0.05); border-radius: 10px; margin-top: 30px; overflow: hidden; }
                .progress-bar-fill { height: 100%; background: #d62839; width: 0; animation: progress-load 3s forwards ease-in-out; box-shadow: 0 0 15px #d62839; }

                @keyframes progress-load {
                    0% { width: 0; }
                    100% { width: 100%; }
                }

                .modal-box { background: #0a0a0a; padding: 40px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.1); max-width: 450px; width: 100%; text-align: center; position: relative; }
                .modal-logo { width: 100px; margin: 0 auto 20px auto; display: block; }
                .modal-actions { display: grid; gap: 10px; margin-top: 30px; }
                .pay-btn { background: #d62839; color: #fff; padding: 15px; border-radius: 12px; border: none; font-weight: bold; cursor: pointer; }
                .wa-btn { border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 15px; border-radius: 12px; font-weight: bold; }
                
                .close-modal-btn {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: transparent;
                    border: none;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 1.5rem;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                .close-modal-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                }

                .upsell-overlay {
                    z-index: 1001;
                }
                .upsell-box {
                    border: 2px solid #d62839;
                    box-shadow: 0 0 40px rgba(214, 40, 57, 0.3);
                }
                .upsell-badge {
                    background: #d62839;
                    color: #fff;
                    display: inline-block;
                    padding: 5px 15px;
                    border-radius: 50px;
                    font-size: 0.7rem;
                    font-weight: 900;
                    margin-bottom: 20px;
                }

                .upsell-confirm-btn {
                    background: linear-gradient(135deg, #d62839 0%, #ff4d5a 100%);
                    color: #fff;
                    padding: 20px;
                    border-radius: 15px;
                    border: none;
                    font-weight: 900;
                    font-size: 1.1rem;
                    cursor: pointer;
                    box-shadow: 0 10px 25px rgba(214, 40, 57, 0.4);
                    transition: all 0.3s ease;
                    animation: button-pulse 2s infinite;
                }

                .upsell-confirm-btn:hover {
                    transform: scale(1.03);
                    box-shadow: 0 15px 35px rgba(214, 40, 57, 0.6);
                }

                .upsell-decline-btn {
                    background: transparent;
                    color: rgba(255, 255, 255, 0.3);
                    padding: 10px;
                    border: none;
                    font-size: 0.85rem;
                    cursor: pointer;
                    text-decoration: underline;
                    transition: all 0.2s ease;
                }

                .upsell-decline-btn:hover {
                    color: rgba(255, 255, 255, 0.6);
                }

                @keyframes button-pulse {
                    0% { box-shadow: 0 0 0 0 rgba(214, 40, 57, 0.7); }
                    70% { box-shadow: 0 0 0 15px rgba(214, 40, 57, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(214, 40, 57, 0); }
                }

                .checkout-summary-box {
                    max-width: 500px !important;
                    text-align: left !important;
                }
                .summary-intro {
                    color: rgba(255,255,255,0.6);
                    margin-bottom: 25px;
                    text-align: center;
                }
                .checkout-items-list {
                    background: rgba(255,255,255,0.03);
                    border-radius: 15px;
                    padding: 20px;
                    margin-bottom: 25px;
                }
                .checkout-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .checkout-item:last-child {
                    border-bottom: none;
                }
                .item-name {
                    color: rgba(255,255,255,0.8);
                }
                .item-price {
                    font-weight: 700;
                }
                .highlight-item {
                    color: #d62839;
                }
                .highlight-item .item-name { color: #d62839; font-weight: 700; }
                .coupon-item .item-name { color: #25D366; }
                .coupon-item .item-price { color: #25D366; }
                
                .checkout-total {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 2px solid rgba(255,255,255,0.1);
                    font-size: 1.2rem;
                    font-weight: 900;
                    color: #fff;
                }
                .summary-footer {
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.4);
                    text-align: center;
                    margin-bottom: 20px;
                }
            `}</style>
        </div>
    );
}
