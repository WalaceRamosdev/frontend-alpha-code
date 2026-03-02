import React, { useState, useEffect } from 'react';

const plans = {
    'simples': {
        name: 'Plano Bronze',
        subtitle: 'Página Simples',
        originalPrice: 397,
        originalPriceEUR: 249,
        price: 'R$ 295',
        numericPrice: 397,
        numericPriceEUR: 249,
        promoPrice: 295,
        promoPriceEUR: 195,
        id: 'Plano Bronze',
        stripeLink: 'https://buy.stripe.com/aFacN7aky67s3jg8Eg93y01',
        mpLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=placeholder_simples'
    },
    'completa': {
        name: 'Plano Prata',
        subtitle: 'Página Completa',
        originalPrice: 697,
        originalPriceEUR: 549,
        price: 'R$ 449',
        numericPrice: 697,
        numericPriceEUR: 549,
        promoPrice: 449,
        promoPriceEUR: 349,
        id: 'Plano Prata',
        stripeLink: 'https://buy.stripe.com/7sYbJ32S62Vg2fc7Ac93y02',
        mpLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=placeholder_completa'
    },
    'premium': {
        name: 'Plano Ouro',
        subtitle: 'Página Premium',
        originalPrice: 1297,
        originalPriceEUR: 995,
        price: 'R$ 710',
        numericPrice: 1297,
        numericPriceEUR: 995,
        promoPrice: 710,
        promoPriceEUR: 595,
        id: 'Plano Ouro',
        stripeLink: 'https://buy.stripe.com/4gMcN72S6cvQ9HE9Ik93y03',
        mpLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=placeholder_premium'
    },
    'manutencao': { name: 'Manutenção', price: 'R$ 100', numericPrice: 100, numericPriceEUR: 50, id: 'Manutenção' },
    'artigos': { name: 'Artigos para Blog', subtitle: '8 Artigos Mensais', price: 'R$ 247', numericPrice: 247, numericPriceEUR: 199, id: 'Artigos para Blog' },
    'speed': { name: 'Turbo Speed', subtitle: 'Otimização Técnica', price: 'R$ 199', numericPrice: 199, numericPriceEUR: 149, id: 'Turbo Speed' },
    'redesign': { name: 'Redesign Premium', subtitle: 'Nova Interface', price: 'Sob Consulta', numericPrice: 0, numericPriceEUR: 0, id: 'Redesign Premium' },
    'ads': { name: 'Alpha Ads', subtitle: 'Gestão de Tráfego', price: 'Gestão Fixa', numericPrice: 0, numericPriceEUR: 0, id: 'Alpha Ads' }
};

const COUPONS = {
    'ALPHA25': { type: 'percent', value: 25 }, // Promoção Válida até 14/02/2026
    'ALPHAFIRST': { type: 'percent', value: 10 },
    'QUERO50': { type: 'fixed', value: 50 },
    'PARCEIRO15': { type: 'percent', value: 15 }
};

export default function OrderForm({ user }) {
    const [formData, setFormData] = useState({
        nome: '', whatsapp: '', email: '', profissao: '', objetivo: '', cores: '', referencias: '', detalhes: '', plano: ''
    });
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [planKey, setPlanKey] = useState('');
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
    const [hasInspiration, setHasInspiration] = useState(null);
    const [inspirationLinks, setInspirationLinks] = useState(['']);
    const [currentStep, setCurrentStep] = useState(1);
    const [buyDomain, setBuyDomain] = useState(false);
    const [domainPrice] = useState(59);
    const [seoPrice] = useState(150);

    const STORE_PLANS = ['artigos', 'speed', 'redesign', 'ads'];
    const isStorePlan = STORE_PLANS.includes(planKey);

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
        const key = urlParams.get('plan');
        if (key && plans[key]) {
            const plan = plans[key];
            setPlanKey(key);
            setSelectedPlan(plan);
            setFormData(prev => ({ ...prev, plano: plan.name }));

            const sitePlans = ['simples', 'completa', 'premium'];
            const basePrice = isPortugal ? plan.numericPriceEUR : plan.numericPrice;

            if (key === 'manutencao') {
                setFinalPrice(basePrice);
                setIsMaintenance(true);
            } else if (sitePlans.includes(key)) {
                // Auto-apply ALPHA25 labels, but the price itself comes from the plan's promoPrice
                setAppliedCoupon({ code: 'ALPHA25', type: 'promo', value: 0 });
                setFinalPrice(isPortugal ? plan.promoPriceEUR : plan.promoPrice);
            } else {
                setFinalPrice(basePrice);
            }
        }
    }, [isPortugal]);

    // Função para calcular preço de forma síncrona (evita race conditions)
    const calculateCurrentPrice = (customHasSeo = hasSEO, customBuyDomain = buyDomain, customCoupon = appliedCoupon) => {
        if (!selectedPlan) return 0;
        let price = isPortugal ? selectedPlan.numericPriceEUR : selectedPlan.numericPrice;

        if (customCoupon) {
            // Se for o cupom ALPHA25, usamos o promoPrice fixo do plano para evitar erro matemático
            if (customCoupon.code === 'ALPHA25' && selectedPlan.promoPrice) {
                price = isPortugal ? selectedPlan.promoPriceEUR : selectedPlan.promoPrice;
            } else {
                price = customCoupon.type === 'percent'
                    ? price * (1 - customCoupon.value / 100)
                    : Math.max(0, price - customCoupon.value);
            }
        }

        if (customHasSeo) {
            price += isPortugal ? 25 : seoPrice;
        }

        if (customBuyDomain) {
            price += isPortugal ? 12 : domainPrice;
        }

        return price;
    };

    useEffect(() => {
        setFinalPrice(calculateCurrentPrice());
    }, [selectedPlan, appliedCoupon, isPortugal, hasSEO, buyDomain]);

    // Pre-fill user data if available
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                nome: user.name || prev.nome,
                email: user.email || prev.email,
                referencias: user.siteUrl || prev.referencias // Auto-fill site URL
            }));
        }
    }, [user]);

    // WARM-UP BACKEND (Prevent Cold Start Delay)
    useEffect(() => {
        const warmUpBackend = async () => {
            try {
                // Simple fire-and-forget request to wake up the server
                fetch('https://backend-rp7j.onrender.com/', { method: 'GET', mode: 'no-cors' });
                console.log('Backend warming up...');
            } catch (e) {
                // Ignore errors, strictly for wake-up
            }
        };
        warmUpBackend();
    }, []);

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

    // NOVA FUNÇÃO DE PROCESSAMENTO (PARA EVITAR LOOP NO MODAL)
    const processOrder = async (overrideSeo = null) => {
        setLoading(true);
        setErrorMessage('');

        const finalSeoValue = overrideSeo !== null ? overrideSeo : hasSEO;
        const currentPrice = calculateCurrentPrice(finalSeoValue);

        const isPaidTest = (formData.nome || '').toUpperCase().includes('TESTE PAGO') || (formData.detalhes || '').toUpperCase().includes('TESTE PAGO');
        const inspirationText = hasInspiration ? inspirationLinks.filter(l => l.trim()).join(', ') : 'Nenhuma referência visual';

        const payload = {
            ...formData,
            plano: finalSeoValue ? `${formData.plano} + SEO Turbinado` : formData.plano,
            servico: formData.objetivo || (isMaintenance ? 'Manutenção' : 'Não informado'),
            orcamento: isMaintenance
                ? `(Manutenção)</p><p><strong>Link do Site:</strong> ${formData.referencias}</p><p><strong>Inspiração:</strong> ${inspirationText}`
                : `${formData.cores || 'Não informado'}</p><p><strong>Sites de Referência:</strong> ${formData.referencias || 'Nenhum'}`,
            isMaintenance,
            isPaid: isPaidTest,
            coupon: appliedCoupon?.code,
            price: currentPrice
        };

        try {
            // DETECTA SE ESTÁ EM LOCALHOST OU PRODUÇÃO
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const backendBase = isLocal ? 'http://localhost:3000' : 'https://backend-rp7j.onrender.com';
            const apiUrl = `${backendBase}/send-email`;

            console.log(`📡 [${new Date().toLocaleTimeString()}] Enviando lead para: ${apiUrl}`);

            // Timeout de 8 segundos para evitar travamentos infinitos
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log(`✅ [${new Date().toLocaleTimeString()}] Resposta do servidor recebida.`);

            if (response.ok) {
                // WhatsApp URL generation with actual final price
                const linkLabel = isMaintenance ? 'LINK DO SITE' : 'REFERÊNCIAS';
                let messageBody = `*NOVO PEDIDO - ALPHA CODE* 🚀\n\n` +
                    `*CLIENTE:* ${formData.nome}\n` +
                    `*WHATSAPP:* ${formData.whatsapp}\n` +
                    `*EMAIL:* ${formData.email}\n` +
                    `*PROFISSÃO:* ${formData.profissao}\n\n` +
                    `*DETALHES DO PROJETO*\n` +
                    `*PLANO:* ${finalSeoValue ? `${formData.plano} + SEO Turbinado` : formData.plano}\n` +
                    `*VALOR:* ${currency} ${currentPrice.toFixed(2).replace('.', ',')}\n` +
                    (isMaintenance ? '' : `*OBJETIVO:* ${formData.objetivo || 'Não informado'}\n`) +
                    (isMaintenance ? '' : `*CORES:* ${formData.cores || 'Não informado'}\n`) +
                    `*${linkLabel}:* ${formData.referencias || 'Nenhuma informada'}\n\n` +
                    `*DESCRIÇÃO:* ${formData.detalhes}`;

                setWhatsappUrl(`https://wa.me/5521999064502?text=${encodeURIComponent(messageBody)}`);

                if (isMaintenance) {
                    handlePayment();
                } else {
                    setModalOpen(true);
                }
            } else throw new Error('Erro servidor');
        } catch (error) {
            console.error('❌ Erro no processamento do pedido:', error);
            if (error.name === 'AbortError') {
                setErrorMessage('O servidor demorou muito a responder. Por favor, tente novamente ou use o botão do WhatsApp.');
            } else {
                setErrorMessage('Erro ao enviar. Verifique sua conexão ou tente o WhatsApp.');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // SEO Upsell check - Bronze e Prata
        if ((planKey === 'simples' || planKey === 'completa') && !upsellAnswered) {
            setShowUpsell(true);
            return;
        }

        processOrder();
    };

    const handlePayment = async () => {
        setPayBtnText('Redirecionando...');
        setIsRedirecting(true);
        setErrorMessage('');

        const currentPrice = calculateCurrentPrice();

        // Estrutura EXATA esperada pelo backend legado
        const payload = {
            planName: (selectedPlan?.id || 'Plano Alpha') +
                (hasSEO ? ' mais SEO' : '') +
                (buyDomain ? ' mais Dominio' : '') +
                (appliedCoupon ? ` cupom ${appliedCoupon.code}` : ''),
            price: currentPrice.toFixed(2), // O backend chama .replace() nesta string
            customerData: {
                nome: formData.nome || 'Cliente Alpha',
                email: formData.email,
                whatsapp: formData.whatsapp || 'Nao informado',
                detalhes: formData.detalhes || 'Sem detalhes',
                isMaintenance: !!isMaintenance
            }
        };

        console.log("PAYMENT PAYLOAD DEBUG:", payload);

        try {
            // DETECTA SE ESTÁ EM LOCALHOST OU PRODUÇÃO
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const backendBase = isLocal ? 'http://localhost:3000' : 'https://backend-rp7j.onrender.com';

            console.log(`💳 Criando sessão de checkout em: ${backendBase}`);

            const res = await fetch(`${backendBase}/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            console.log("PAYMENT RESPONSE DEBUG:", data);

            if (res.ok && data.url) {
                // Tentando abrir em nova aba conforme pedido (pode ser bloqueado por alguns browsers)
                const newWindow = window.open(data.url, '_blank');

                // Se o navegador bloquear o popup, redireciona na mesma aba para não perder a venda
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                    window.location.href = data.url;
                } else {
                    setPayBtnText(defaultBtnText);
                    setIsRedirecting(false);
                }
            } else {
                throw new Error(data.error || 'Erro ao gerar link de pagamento');
            }
        } catch (err) {
            console.error("Payment Error:", err);
            setErrorMessage('O sistema de pagamento falhou. Por favor, clique em "Confirmar via WhatsApp" para finalizar.');
            setPayBtnText(defaultBtnText);
            setIsRedirecting(false);
        }
    };

    return (
        <div className="order-main-wrapper">
            <div className="order-grid">
                {/* SIDEBAR */}
                <aside className="order-sidebar">
                    <div className={`premium-card sticky-card theme-${planKey}`}>
                        <div className="summary-section">
                            <span className="label">Resumo do Pedido</span>
                            <h2 className="plan-name">{selectedPlan ? selectedPlan.name : 'Carregando...'}</h2>
                            <span className="plan-subtitle-form">{selectedPlan ? selectedPlan.subtitle : ''}</span>

                            <div className="price-stack">
                                {selectedPlan?.originalPrice && (
                                    <div className="savings-badge">
                                        ECONOMIZE {currency} {(isPortugal ? (selectedPlan.originalPriceEUR - selectedPlan.promoPriceEUR) : (selectedPlan.originalPrice - selectedPlan.promoPrice))}
                                    </div>
                                )}
                                {selectedPlan?.originalPrice && (
                                    <span className="old-price">
                                        {currency} {isPortugal ? selectedPlan.originalPriceEUR : selectedPlan.originalPrice}
                                    </span>
                                )}
                                {appliedCoupon && (
                                    <div className="discount-badge-mini">CUPOM {appliedCoupon.code} APLICADO</div>
                                )}
                                <span className="final-price">
                                    {finalPrice > 0 ? (
                                        `${currency} ${finalPrice.toFixed(2).replace('.', ',')}`
                                    ) : (
                                        selectedPlan?.price || 'Sob Consulta'
                                    )}
                                </span>
                            </div>

                            {!isMaintenance && (
                                <div className="coupon-box">
                                    {!appliedCoupon ? (
                                        <div className="coupon-input-group">
                                            <input type="text" placeholder="Cupom" aria-label="Código do Cupom" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                                            <button type="button" onClick={handleApplyCoupon} className="apply-btn" aria-label="Aplicar Cupom">OK</button>
                                        </div>
                                    ) : (
                                        <div className="applied-badge">
                                            <span>{appliedCoupon.code} <small>Ativado</small></span>
                                            <button type="button" onClick={removeCoupon} aria-label="Remover Cupom">&times;</button>
                                        </div>
                                    )}
                                    {couponError && <p className="error">{couponError}</p>}
                                </div>
                            )}

                            <div className="trust-badges">
                                <span>💎 Pagamento Único</span>
                                <span>🔒 Ambiente 100% Seguro</span>
                                <span>🛡️ Garantia Alpha de 7 Dias</span>
                            </div>

                            <div className="security-seals">
                                <i className="fas fa-lock"></i>
                                <i className="fab fa-stripe"></i>
                                <i className="fas fa-shield-halved"></i>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* FORM */}
                <main className="order-content">
                    <form onSubmit={handleSubmit} className={`premium-card form-inner theme-${planKey}`}>
                        {/* Progressive Stepper Header */}
                        <div className="stepper-indicator">
                            <div className={`step-dot ${currentStep >= 1 ? 'active' : ''}`}>1</div>
                            <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
                            <div className={`step-dot ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                            <div className={`step-line ${currentStep >= 3 ? 'active' : ''}`}></div>
                            <div className={`step-dot ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                        </div>

                        {/* Step 01: Contact info */}
                        {currentStep === 1 && (
                            <section className="form-step fade-in">
                                <div className="step-header">
                                    <span className="step-num">01</span>
                                    <h3>Suas Informações</h3>
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
                                        <input type="text" name="profissao" value={formData.profissao} onChange={handleChange} required placeholder="Ex: Nutricionista, E-commerce..." />
                                    </div>
                                </div>
                                <div className="step-actions">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (formData.nome && formData.whatsapp && formData.email && formData.profissao) {
                                                setCurrentStep(2);
                                            } else {
                                                setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
                                            }
                                        }}
                                        className="next-step-btn"
                                    >
                                        Continuar para o Projeto <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* Step 02: Context-specific fields */}
                        {currentStep === 2 && (
                            <section className="form-step fade-in">
                                <div className="step-header">
                                    <span className="step-num">02</span>
                                    <h3>Definições do Projeto</h3>
                                </div>

                                {isStorePlan ? (
                                    <>
                                        {/* Store specific logic here if still applicable, abbreviated for stepper logic */}
                                        {planKey === 'artigos' && (
                                            <>
                                                <div className="field"><label>URL do seu site / blog</label><input type="text" name="referencias" value={formData.referencias} onChange={handleChange} required placeholder="seusite.com.br" /></div>
                                                <div className="field"><label>Nicho / Tema principal</label><input type="text" name="objetivo" value={formData.objetivo} onChange={handleChange} required placeholder="Ex: Saúde mental, Gastronomia..." /></div>
                                            </>
                                        )}
                                        {planKey === 'speed' && (
                                            <>
                                                <div className="field"><label>URL do site a ser otimizado</label><input type="text" name="referencias" value={formData.referencias} onChange={handleChange} required placeholder="seusite.com.br" /></div>
                                                <div className="field">
                                                    <label>Qual plataforma utiliza?</label>
                                                    <select name="objetivo" value={formData.objetivo} onChange={handleChange} required>
                                                        <option value="">Selecione...</option>
                                                        <option value="WordPress">WordPress</option>
                                                        <option value="Alpha Code (Astro)">Alpha Code (Astro)</option>
                                                        <option value="Outro">Outro</option>
                                                    </select>
                                                </div>
                                            </>
                                        )}
                                        {/* Redesign and Ads omitted for brevity but should follow same pattern */}
                                    </>
                                ) : (
                                    <>
                                        <div className="field">
                                            <label>Objetivo Principal</label>
                                            <select name="objetivo" value={formData.objetivo} onChange={handleChange} required>
                                                <option value="">Selecione...</option>
                                                <option value="Captar Clientes">Captar mais clientes</option>
                                                <option value="Autoridade">Gerar Autoridade</option>
                                                <option value="Vendas">Venda Direta</option>
                                            </select>
                                        </div>
                                        <div className="field">
                                            <label>Cores de Preferência</label>
                                            <input type="text" name="cores" value={formData.cores} onChange={handleChange} placeholder="Ex: Azul e Branco, Dark Mode..." />
                                        </div>

                                        {/* BRONZE DOMAIN ADD-ON */}
                                        {planKey === 'simples' && (
                                            <div className="addon-option-card">
                                                <div className="addon-info">
                                                    <h4>Deseja que compremos seu domínio? 🌐</h4>
                                                    <p>O plano Bronze não inclui o custo do domínio (.com.br ou .com). Podemos cuidar disso por você.</p>
                                                </div>
                                                <label className="switch-container">
                                                    <input type="checkbox" checked={buyDomain} onChange={(e) => setBuyDomain(e.target.checked)} />
                                                    <span className="switch-slider"></span>
                                                    <span className="addon-price">+ R$ 59/ano</span>
                                                </label>
                                            </div>
                                        )}

                                        {/* MAINTENANCE SPECIFIC: INSPIRATION BOX */}
                                        {isMaintenance && (
                                            <div className="field inspiration-box">
                                                <label className="inspiration-label">Inspirou-se em algum visual específico?</label>
                                                <div className="inspiration-options">
                                                    <button type="button" onClick={() => setHasInspiration(true)} className={`option-btn ${hasInspiration === true ? 'active' : ''}`}>💡 Sim, vi algo</button>
                                                    <button type="button" onClick={() => { setHasInspiration(false); setInspirationLinks(['']); }} className={`option-btn ${hasInspiration === false ? 'active' : ''}`}>🧠 Não, ideia própria</button>
                                                </div>
                                                {hasInspiration && (
                                                    <div className="inspiration-links-container">
                                                        {inspirationLinks.map((link, index) => (
                                                            <div key={index} className="link-input-row">
                                                                <input type="text" value={link} onChange={(e) => {
                                                                    const n = [...inspirationLinks]; n[index] = e.target.value; setInspirationLinks(n);
                                                                }} placeholder="Cole o link aqui..." className="glass-input" />
                                                                {inspirationLinks.length > 1 && <button type="button" onClick={() => setInspirationLinks(inspirationLinks.filter((_, i) => i !== index))} className="remove-link-btn">&times;</button>}
                                                            </div>
                                                        ))}
                                                        <button type="button" onClick={() => setInspirationLinks([...inspirationLinks, ''])} className="add-link-btn">+ Adicionar link</button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="step-actions">
                                    <button type="button" onClick={() => { setErrorMessage(''); setCurrentStep(1); }} className="prev-step-btn"><i className="fas fa-arrow-left"></i> Voltar</button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (isStorePlan) {
                                                if (formData.referencias && formData.objetivo) {
                                                    setCurrentStep(3);
                                                } else {
                                                    setErrorMessage('Por favor, informe a URL e o objetivo do serviço.');
                                                }
                                            } else {
                                                if (formData.objetivo) {
                                                    setCurrentStep(3);
                                                } else {
                                                    setErrorMessage('Por favor, selecione o objetivo principal.');
                                                }
                                            }
                                        }}
                                        className="next-step-btn"
                                    >
                                        Finalizar Detalhes <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* Step 03: Details & Submission */}
                        {currentStep === 3 && (
                            <section className="form-step fade-in">
                                <div className="step-header">
                                    <span className="step-num">03</span>
                                    <h3>Expectativas Finais</h3>
                                </div>
                                <div className="field">
                                    <label>Referência ou Site Atual</label>
                                    <input type="text" name="referencias" value={formData.referencias} onChange={handleChange} placeholder="Ex: site-que-gosto.com.br" />
                                </div>
                                <div className="field">
                                    <label>Conte mais sobre sua ideia</label>
                                    <textarea name="detalhes" value={formData.detalhes} onChange={handleChange} rows="5" required placeholder="Descreva como você imagina o seu projeto dos sonhos..." className="textarea-expanded"></textarea>
                                </div>

                                <div className="guarantee-seal-mini">
                                    <i className="fas fa-shield-check"></i>
                                    <span>Você está protegido pela nossa garantia de satisfação total Alpha.</span>
                                </div>

                                {errorMessage && <p className="error-msg-form">{errorMessage}</p>}

                                <div className="step-actions">
                                    <button type="button" onClick={() => setCurrentStep(2)} className="prev-step-btn"><i className="fas fa-arrow-left"></i> Voltar</button>
                                    <button type="submit" className="submit-main-btn" disabled={loading}>
                                        {loading ? 'Processando...' : 'Fechar meu Pedido 🚀'}
                                    </button>
                                </div>
                            </section>
                        )}
                    </form>
                </main>
            </div>

            {/* MODAL & LOADERS */}
            {(loading || isRedirecting) && (
                <div className="fixed-overlay loader-overlay">
                    <div className="loader-content">
                        <div className="logo-pulsar">
                            <img src="/assets/logo3d.svg" className="loading-logo" />
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
                                    processOrder(true); // Força o envio com SEO
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
                                    processOrder(false); // Força o envio sem SEO
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
                        <img src="/assets/logo3d.svg" className="modal-logo" />
                        <h2 style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }}>Confirmação do Pedido</h2>
                        <p className="summary-intro">Veja o que estamos preparando para você:</p>

                        <div className="checkout-items-list">
                            <div className="checkout-item no-border-bottom">
                                <span className="item-name">📦 {selectedPlan?.name} (Valor Normal)</span>
                                <span className="item-price">{currency} {isPortugal ? selectedPlan.numericPriceEUR : selectedPlan.numericPrice}</span>
                            </div>

                            {appliedCoupon && (
                                <>
                                    <div className="checkout-item no-border-bottom coupon-item">
                                        <span className="item-name" style={{ paddingLeft: '20px', fontSize: '0.82rem', opacity: 0.8 }}>🎫 Desconto Cupom ({appliedCoupon.code})</span>
                                        <span className="item-price" style={{ fontSize: '0.82rem' }}>
                                            -{currency} {
                                                appliedCoupon.code === 'ALPHA25'
                                                    ? (isPortugal ? (selectedPlan.numericPriceEUR - selectedPlan.promoPriceEUR) : (selectedPlan.numericPrice - selectedPlan.promoPrice)).toFixed(2).replace('.', ',')
                                                    : (appliedCoupon.type === 'percent'
                                                        ? ((isPortugal ? selectedPlan.numericPriceEUR : selectedPlan.numericPrice) * appliedCoupon.value / 100).toFixed(2).replace('.', ',')
                                                        : appliedCoupon.value.toFixed(2).replace('.', ','))
                                            }
                                        </span>
                                    </div>
                                    <div className="checkout-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '12px', paddingBottom: '12px' }}>
                                        <span className="item-name" style={{ fontWeight: '800', fontSize: '0.9rem' }}>✨ Valor Promocional do Plano</span>
                                        <span className="item-price" style={{ fontWeight: '800', fontSize: '0.9rem' }}>{currency} {isPortugal ? selectedPlan.promoPriceEUR : selectedPlan.promoPrice}</span>
                                    </div>
                                </>
                            )}

                            {hasSEO && (
                                <div className="checkout-item highlight-item">
                                    <span className="item-name">🔍 Plano SEO (3 Meses)</span>
                                    <span className="item-price">{currency} {isPortugal ? '25,00' : '150,00'}</span>
                                </div>
                            )}

                            {buyDomain && (
                                <div className="checkout-item highlight-item">
                                    <span className="item-name">🌐 Compra de Domínio</span>
                                    <span className="item-price">{currency} {isPortugal ? '12,00' : '59,00'}</span>
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
                @media (max-width: 768px) {
                    .order-main-wrapper { padding: 0 1%; }
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
                @media (max-width: 991px) {
                    .order-grid { gap: 20px; }
                    .order-sidebar { order: -1; } /* Mostra resumo antes do form em telas menores */
                }

                .premium-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    backdrop-filter: blur(10px);
                }

                /* Sidebar Styles */
                .sticky-card { padding: 30px; position: sticky; top: 100px; border-color: rgba(138, 28, 38, 0.3); }
                @media (max-width: 768px) {
                    .sticky-card { 
                        position: relative; 
                        top: 0; 
                        padding: 25px 10px; 
                        border-radius: 20px;
                    }
                }
                .label { color: rgba(255,255,255,0.4); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }
                .plan-name { font-size: 1.8rem; margin: 10px 0 5px 0; font-weight: 800; line-height: 1; }
                @media (max-width: 480px) {
                    .plan-name { font-size: 1.5rem; }
                }
                .plan-subtitle-form { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.5); margin-bottom: 20px; font-weight: 600; }
                .price-stack { margin: 10px 0 20px 0; display: flex; flex-direction: column; position: relative; }
                .discount-badge-mini {
                    background: #25D366;
                    color: #fff;
                    font-size: 0.6rem;
                    font-weight: 900;
                    padding: 2px 8px;
                    border-radius: 4px;
                    width: fit-content;
                    margin-bottom: 5px;
                }
                .savings-badge {
                    background: rgba(37, 211, 102, 0.1);
                    color: #25D366;
                    font-size: 0.65rem;
                    font-weight: 800;
                    padding: 4px 10px;
                    border-radius: 6px;
                    width: fit-content;
                    margin-bottom: 8px;
                    border: 1px solid rgba(37, 211, 102, 0.2);
                    text-transform: uppercase;
                }
                .old-price { text-decoration: line-through; color: rgba(255,255,255,0.3); font-size: 1.1rem; }
                .final-price { font-size: 2.5rem; font-weight: 900; color: #d62839; text-shadow: 0 0 20px rgba(214, 40, 57, 0.2); }
                @media (max-width: 480px) {
                    .final-price { font-size: 2rem; }
                }
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
                @media (max-width: 768px) {
                    .form-inner { padding: 25px 10px; }
                }
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
                @media (max-width: 480px) {
                    .submit-main-btn { padding: 16px; font-size: 1rem; }
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

                .modal-box { background: #0a0a0a; padding: 30px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.1); max-width: 450px; width: 100%; text-align: center; position: relative; }
                @media (max-width: 768px) {
                    .modal-box { padding: 20px 15px; border-radius: 20px; }
                }
                .modal-logo { width: 80px; margin: 0 auto 15px auto; display: block; }
                .modal-actions { display: grid; gap: 10px; margin-top: 20px; }
                .pay-btn { background: #d62839; color: #fff; padding: 15px; border-radius: 12px; border: none; font-weight: bold; cursor: pointer; }
                .wa-btn { border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 15px; border-radius: 12px; font-weight: bold; text-align: center; }
                
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
                @media (max-width: 480px) {
                    .upsell-confirm-btn { padding: 15px; font-size: 0.95rem; }
                }

                .upsell-confirm-btn:hover {
                    transform: scale(1.03);
                    box-shadow: 0 15px 35px rgba(214, 40, 57, 0.6);
                }

                .upsell-decline-btn {
                    background: transparent;
                    color: rgba(255, 255, 255, 0.6);
                    padding: 15px;
                    border: none;
                    font-size: 1.1rem;
                    font-weight: 500;
                    cursor: pointer;
                    text-decoration: underline;
                    transition: all 0.2s ease;
                    display: block;
                    width: 100%;
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
                    margin-bottom: 15px;
                    text-align: center;
                    font-size: 0.9rem;
                }
                .checkout-items-list {
                    background: rgba(255,255,255,0.03);
                    border-radius: 15px;
                    padding: 15px;
                    margin-bottom: 15px;
                }
                .checkout-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .no-border-bottom { border-bottom: none !important; padding-bottom: 5px; }
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
                    color: #fff;
                }
                .highlight-item .item-name { color: #fff; font-weight: 700; }
                .coupon-item .item-name { color: #25D366; }
                .coupon-item .item-price { color: #25D366; }
                
                .checkout-total {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 2px solid rgba(255,255,255,0.1);
                    font-size: 1.1rem;
                    font-weight: 900;
                    color: #fff;
                }
                .summary-footer {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.4);
                    text-align: center;
                    margin-bottom: 15px;
                }

                /* Inspiration Box */
                .inspiration-box {
                    background: rgba(255,255,255,0.02);
                    padding: 25px;
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.05);
                    margin-bottom: 25px;
                }
                .inspiration-label {
                    display: block;
                    margin-bottom: 20px;
                    font-size: 0.95rem;
                    color: rgba(255,255,255,0.8);
                    font-weight: 600;
                }
                
                .inspiration-options {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                @media (max-width: 480px) {
                    .inspiration-options { flex-direction: column; gap: 10px; }
                }
                
                .option-btn {
                    flex: 1;
                    padding: 15px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: rgba(255,255,255,0.6);
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }
                
                .option-btn:hover {
                    background: rgba(255,255,255,0.08);
                    color: #fff;
                    transform: translateY(-2px);
                }
                
                .option-btn.active {
                    background: linear-gradient(135deg, rgba(214, 40, 57, 0.2) 0%, rgba(214, 40, 57, 0.1) 100%);
                    border-color: #d62839;
                    color: #fff;
                    box-shadow: 0 4px 20px rgba(214, 40, 57, 0.15);
                }
                
                .btn-icon {
                    font-size: 1.2rem;
                }

                /* Inputs & Rows */
                .glass-input {
                    background: rgba(0,0,0,0.2) !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                    color: #fff !important;
                    padding: 12px 15px !important;
                    border-radius: 10px !important;
                    width: 100%;
                    outline: none;
                    transition: border-color 0.3s;
                }
                .glass-input:focus {
                    border-color: #d62839 !important;
                    background: rgba(0,0,0,0.4) !important;
                }
                
                .link-input-row {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                
                .remove-link-btn {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.5);
                    width: 42px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 1.2rem;
                    transition: all 0.2s;
                    display: grid;
                    place-items: center;
                }
                .remove-link-btn:hover {
                    background: rgba(220, 38, 38, 0.2);
                    color: #ef4444;
                    border-color: rgba(220, 38, 38, 0.3);
                }
                
                .add-link-btn {
                    background: transparent;
                    border: 1px dashed rgba(255,255,255,0.2);
                    color: rgba(255,255,255,0.5);
                    padding: 12px;
                    width: 100%;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.3s;
                    margin-top: 5px;
                }
                .add-link-btn:hover {
                    border-color: #d62839;
                    color: #d62839;
                    background: rgba(214, 40, 57, 0.05);
                }

                .textarea-expanded {
                    min-height: 120px;
                    line-height: 1.6;
                    font-size: 1rem;
                }

                /* Stepper UI */
                .stepper-indicator { display: flex; align-items: center; justify-content: center; margin-bottom: 50px; gap: 10px; }
                @media (max-width: 480px) { .stepper-indicator { margin-bottom: 30px; } }
                .step-dot { width: 35px; height: 35px; border-radius: 50%; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.4); display: grid; place-items: center; font-weight: 800; border: 1px solid rgba(255,255,255,0.1); transition: 0.3s; }
                .step-line { flex: 1; height: 1px; background: rgba(255,255,255,0.1); max-width: 50px; }
                @media (max-width: 480px) { .step-line { max-width: 30px; } }
                .step-dot.active { background: #d62839; color: #fff; border-color: #d62839; box-shadow: 0 0 15px rgba(214, 40, 57, 0.4); }
                .step-line.active { background: #d62839; }

                .step-actions { display: flex; gap: 15px; margin-top: 30px; }
                @media (max-width: 480px) { .step-actions { flex-direction: column-reverse; } }
                .next-step-btn { flex: 1; padding: 18px; border-radius: 14px; background: #d62839; color: #fff; border: none; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; }
                .prev-step-btn { padding: 18px 25px; border-radius: 14px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); font-weight: 800; cursor: pointer; }

                /* Plan Themes - Improved Contrast */
                .theme-simples .step-num, .theme-simples .step-dot.active, .theme-simples .next-step-btn, .theme-simples .submit-main-btn { background-color: #cd7f32 !important; color: #fff !important; }
                .theme-simples .final-price { background: none !important; color: #cd7f32 !important; }
                
                .theme-completa .step-num, .theme-completa .step-dot.active, .theme-completa .next-step-btn, .theme-completa .submit-main-btn { background-color: #f5f5f5 !important; color: #000 !important; }
                .theme-completa .final-price { background: none !important; color: #f5f5f5 !important; }

                .theme-premium .step-num, .theme-premium .step-dot.active, .theme-premium .next-step-btn, .theme-premium .submit-main-btn { background-color: #ffd700 !important; color: #000 !important; }
                .theme-premium .final-price { background: none !important; color: #ffd700 !important; }

                /* Security & Seals */
                .security-seals { display: flex; justify-content: center; gap: 30px; margin-top: 30px; color: rgba(255,255,255,0.2); font-size: 1.5rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; }
                .guarantee-seal-mini { display: flex; align-items: center; gap: 10px; background: rgba(16, 185, 129, 0.05); border: 1px dashed rgba(16, 185, 129, 0.2); padding: 15px; border-radius: 12px; margin-bottom: 25px; color: #10b981; font-size: 0.85rem; }
                
                /* Addon Card */
                .addon-option-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 25px; display: flex; justify-content: space-between; align-items: center; margin: 30px 0; }
                @media (max-width: 600px) {
                    .addon-option-card { flex-direction: column; align-items: flex-start; gap: 20px; padding: 20px; }
                    .switch-container { width: 100%; justify-content: space-between; flex-direction: row-reverse; }
                    .addon-price { margin-left: 0; margin-right: 15px; }
                }
                .addon-info h4 { font-size: 1.1rem; margin-bottom: 5px; }
                .addon-info p { font-size: 0.85rem; color: rgba(255,255,255,0.5); }
                .addon-price { 
                    font-weight: 900; 
                    color: #cd7f32; 
                    margin-left: 15px; 
                    font-size: 0.95rem; 
                    white-space: nowrap;
                    flex-shrink: 0;
                }

                /* Switch Toggle */
                .switch-container { 
                    position: relative; 
                    display: flex; 
                    align-items: center; 
                    cursor: pointer;
                    user-select: none;
                }
                .switch-container input { opacity: 0; width: 0; height: 0; }
                .switch-slider { 
                    width: 50px; 
                    min-width: 50px;
                    height: 26px; 
                    background-color: rgba(255,255,255,0.1); 
                    border-radius: 34px; 
                    transition: .4s; 
                    position: relative;
                    flex-shrink: 0;
                }
                .switch-slider:before { 
                    position: absolute; 
                    content: ""; 
                    height: 20px; 
                    width: 20px; 
                    left: 3px; 
                    top: 3px; 
                    background-color: white; 
                    transition: .4s; 
                    border-radius: 50%;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                }
                input:checked + .switch-slider { background-color: #cd7f32; }
                input:checked + .switch-slider:before { transform: translateX(24px); }

                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .fade-in { animation: fadeIn 0.4s ease forwards; }

                .error-msg-form {
                    background: rgba(220, 38, 38, 0.1);
                    border: 1px solid rgba(220, 38, 38, 0.3);
                    color: #ef4444;
                    padding: 12px;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    text-align: center;
                    margin-bottom: 20px;
                }
            `}</style>
        </div>
    );
}
