document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Theme Switcher Logic
    // ==========================================
    // ==========================================
    // Theme Switcher Logic (Checkbox)
    // ==========================================
    const themeCheckbox = document.getElementById('checkbox-theme');
    const htmlElement = document.documentElement;

    // Check local storage or preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Initialize State
    // Light Mode (Default) = Unchecked (Knob Right)
    // Dark Mode = Checked (Knob Left)
    // User requested default to be LIGHT, ignoring system preference unless already saved.
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        if (themeCheckbox) themeCheckbox.checked = true;
        updateLogo(true);
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        if (themeCheckbox) themeCheckbox.checked = false;
        updateLogo(false);
    }

    // Event Listener
    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', () => {
            if (themeCheckbox.checked) {
                // Determine: Checked -> Dark Mode
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateLogo(true);
            } else {
                // Determine: Unchecked -> Light Mode
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateLogo(false);
            }
        });
    }

    function updateLogo(isDark) {
        const logoImg = document.querySelector('.nav-logo');
        if (logoImg) {
            if (isDark) {
                logoImg.src = 'assets/logoText.svg'; // Default White/Gold Logo
            } else {
                logoImg.src = 'assets/logoTemaDark.svg'; // Dark Theme Logo for Light Background
            }
        }
    }

    // ==========================================
    // Mobile Menu Logic
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            if (isOpen) {
                mobileMenu.classList.remove('open');
                // Animate hamburger back to normal if needed
            } else {
                mobileMenu.classList.add('open');
            }
        });
    }

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    // Close menu when clicking outside
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenuBtn && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
        }
    });

    // ==========================================
    // Scroll Animations (IntersectionObserver)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .card, .service-item, .price-card');
    animatedElements.forEach(el => observer.observe(el));

    // ==========================================
    // Hero Background Slider Logic
    // ==========================================
    const heroSlides = document.querySelectorAll('.hero-bg-slider .hero-slide');
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        const totalSlides = heroSlides.length;

        function nextHeroSlide() {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % totalSlides;
            heroSlides[currentSlide].classList.add('active');
        }

        setInterval(nextHeroSlide, 5000); // 5 seconds interval
    }

    // ==========================================
    // Projects Population Logic
    // ==========================================
    const projectsGrid = document.querySelector('.projects-grid');

    if (projectsGrid) {
        // Data Array - Easy to Edit
        // Add or remove objects here to change the projects displayed.
        const projectsData = [
            {
                name: 'Aline Barbosa',
                type: 'Advogados',
                image: './assets/imagens-de-paginas/alineBarbosa.svg',
                link: 'https://advogada-aline-barbosa.vercel.app/'
            },
            {
                name: 'Drª. Silvia Orlandi',
                type: 'Terapeutas',
                image: './assets/imagens-de-paginas/silviaOrlandi.svg',
                link: 'https://silvia-terapeuta.vercel.app/'
            },
            {
                name: 'Ana Ribeiro',
                type: 'Nutricionista',
                image: './assets/imagens-de-paginas/anaRibeiroNutri.svg',
                link: 'https://nutricao-pied.vercel.app/'
            },
            {
                name: 'João Silva',
                type: 'Professores Particular',
                image: './assets/imagens-de-paginas/profJoao.svg',
                link: 'https://landing-page-professor.vercel.app/'
            },
            {
                name: 'Escola Aprender',
                type: 'Educação',
                image: 'https://placehold.co/600x400/252525/FFF?text=Escola+Aprender',
                link: '#'
            },
            {
                name: 'Tech Solutions',
                type: 'Tecnologia',
                image: 'https://placehold.co/600x400/252525/FFF?text=Tech+Solutions',
                link: '#'
            },
            {
                name: 'Café & Aroma',
                type: 'Gastronomia',
                image: 'https://placehold.co/600x400/252525/FFF?text=Cafe+Aroma',
                link: '#'
            },
            {
                name: 'Studio Fitness',
                type: 'Esporte',
                image: 'https://placehold.co/600x400/252525/FFF?text=Studio+Fitness',
                link: '#'
            }
        ];

        // Initialize render functionality
        function renderProjects() {
            // Determine Context
            const isProjectsPage = window.location.pathname.includes('projetos.html');
            const targetGrid = isProjectsPage ? document.getElementById('full-projects-grid') : projectsGrid;

            if (!targetGrid) return; // Guard clause

            targetGrid.innerHTML = ''; // Clear content

            projectsData.forEach((project, index) => {
                const card = document.createElement('div');
                card.classList.add('project-card', 'fade-up');

                // Animation delays
                if (index > 0 && index < 6) card.classList.add(`delay-${index % 3}`);

                // Visibility Logic (Only for Home Page)
                if (!isProjectsPage) {
                    // Desktop: Hide 4th onwards (index 3+)
                    if (index >= 3) card.classList.add('desktop-hidden');

                    // Mobile: Hide 4th onwards (index 3+)
                    if (index >= 3) card.classList.add('mobile-hidden');
                }

                card.innerHTML = `
                    <div class="project-image">
                        <img src="${project.image}" alt="Site ${project.type} - ${project.name}">
                    </div>
                    <div class="project-info">
                        <span class="project-type">${project.type}</span>
                        <h3>${project.name}</h3>
                        <a href="${project.link}" class="project-link" target="_blank">Ver Site <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
                    </div>
                `;

                targetGrid.appendChild(card);
                if (window.IntersectionObserver) observer.observe(card);
            });

            // Button Logic (Only for Home Page)
            if (!isProjectsPage && projectsData.length > 3) {
                // Remove existing if any
                const existingBtn = document.getElementById('see-more-projects');
                if (existingBtn) existingBtn.closest('.see-more-container').remove();

                const btnContainer = document.createElement('div');
                btnContainer.className = 'see-more-container';

                const btn = document.createElement('button');
                btn.id = 'see-more-projects';
                btn.className = 'btn btn-outline';
                btn.textContent = 'Ver mais projetos';

                btn.addEventListener('click', () => {
                    // Always redirect to projects page on both Desktop and Mobile
                    window.location.href = 'projetos.html';
                });

                btnContainer.appendChild(btn);
                targetGrid.parentNode.appendChild(btnContainer);

                // Add Mobile Scroll Icon Hint
                const scrollHint = document.createElement('div');
                scrollHint.className = 'scroll-hint-icon';
                scrollHint.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                    <span>Deslize</span>
                `;
                targetGrid.parentNode.insertBefore(scrollHint, btnContainer);
            }
        }

        renderProjects();

        // Scroll Triggered Popup Logic
        const ctaPopup = document.getElementById('cta-popup');
        if (ctaPopup) {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                const triggerPoint = 400; // Show after scrolling 400px

                // Logic: Show if scrolled past trigger AND not at very bottom (footer)
                // Optional: Hide at footer to avoid clash? For now, just show.

                if (scrollY > triggerPoint) {
                    ctaPopup.classList.add('visible');
                } else {
                    ctaPopup.classList.remove('visible');
                }
            });
        }
    }

    // ==========================================
    // Order Page Logic (Pedido)
    // ==========================================
    const orderForm = document.getElementById('order-form');

    if (orderForm) {
        // 1. Get Plan from URL
        const urlParams = new URLSearchParams(window.location.search);
        const selectedPlan = urlParams.get('plan');

        // Plan Data
        const plans = {
            'simples': {
                name: 'Página Simples',
                price: 'R$ 97',
                id: 'Página Simples'
            },
            'completa': {
                name: 'Página Completa',
                price: 'R$ 199',
                id: 'Página Completa'
            },
            'premium': {
                name: 'Página Premium',
                price: 'R$ 497',
                id: 'Página Premium'
            },
            'manutencao': {
                name: 'Manutenção',
                price: 'R$ 100',
                id: 'Manutenção'
            }
        };

        // 2. Populate Fields
        const planNameEl = document.getElementById('summary-plan-name');
        const planPriceEl = document.getElementById('summary-plan-price');
        const planInput = document.getElementById('plano-input');

        if (selectedPlan && plans[selectedPlan]) {
            const plan = plans[selectedPlan];
            if (planNameEl) planNameEl.textContent = plan.name;
            if (planPriceEl) planPriceEl.textContent = plan.price;
            if (planInput) planInput.value = plan.name;

            // --- Maintenance Mode Adapter ---
            if (selectedPlan === 'manutencao') {
                // Change Header
                const formHeader = document.querySelector('.form-header h1');
                const formDesc = document.querySelector('.form-header p');
                if (formHeader) formHeader.textContent = 'Solicitar Manutenção';
                if (formDesc) formDesc.textContent = 'Informe os dados e o link do site para ajuste.';

                // Repurpose "Profissão" -> "Link do Site"
                const profissaoLabel = document.querySelector('label[for="profissao"]');
                const profissaoInput = document.getElementById('profissao');
                if (profissaoLabel) profissaoLabel.textContent = 'Link do Site (para manutenção) *';
                if (profissaoInput) {
                    profissaoInput.placeholder = 'https://www.seusite.com.br';
                }

                // Hide Unnecessary Fields (Objetivo, Cores, Referencias)
                ['objetivo', 'cores', 'referencias'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.closest('.form-control').style.display = 'none';
                        el.removeAttribute('required');
                        if (id === 'objetivo') el.value = 'Manutenção'; // Set dummy value
                    }
                });

                // Update "Detalhes" Label
                const detalhesLabel = document.querySelector('label[for="detalhes"]');
                const detalhesHint = document.querySelector('.input-hint');
                if (detalhesLabel) detalhesLabel.textContent = 'O que precisa ser feito? *';
                if (detalhesHint) detalhesHint.textContent = 'Descreva as alterações ou correções necessárias.';

                // Update Payment Description
                const paymentDesc = document.getElementById('payment-description');
                if (paymentDesc) paymentDesc.textContent = 'Pagamento por Manutenção';

                // Hide Section 2 Header if desired
                const section2Header = document.querySelector('.form-group-section:nth-of-type(2) h3');
                if (section2Header) section2Header.style.display = 'none';
            } else {
                // Reset Payment Description for Regular Plans
                const paymentDesc = document.getElementById('payment-description');
                if (paymentDesc) paymentDesc.textContent = 'Pagamento único';
            }
        } else {
            // Default or Error state
            if (planNameEl) planNameEl.textContent = 'Escolha um plano';
            if (planPriceEl) planPriceEl.textContent = '--';
            if (planInput) planInput.value = 'Nenhum selecionado';
        }

        // 3. Form Submission (Email + WhatsApp + Modal)
        orderForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // --- CONFIGURAÇÃO ---
            // URL do Backend (Render)
            const apiUrl = 'https://backend-rp7j.onrender.com/send-email';
            // Para testar localmente, você pode descomentar a linha abaixo:
            // const apiUrl = 'http://localhost:3000/send-email';
            // ---------------------

            const btn = orderForm.querySelector('button[type="submit"]');
            // User requested minimal button change or static text
            // We'll keep it static as requested, or just disable it to prevent double-submit
            btn.disabled = true;
            // Optional: btn.innerHTML = 'Enviando...'; (User asked to keep "Enviar pedido", so we skip this or revert quickly)

            // Get Values
            const nome = document.getElementById('nome').value;
            const whatsapp = document.getElementById('whatsapp').value;
            const email = document.getElementById('email').value;
            const profissao = document.getElementById('profissao').value;
            const objetivo = document.getElementById('objetivo').value;
            const plano = document.getElementById('plano-input').value;
            const cores = document.getElementById('cores').value;
            const referencias = document.getElementById('referencias').value;
            const detalhes = document.getElementById('detalhes').value;

            // Find price based on plan name
            let precoPlano = 'Sob consulta';
            for (let key in plans) {
                if (plans[key].name === plano) {
                    precoPlano = plans[key].price; // Use price for display
                    break;
                }
            }

            // Construct Message (Used for both WhatsApp and Email)
            // Determine labels based on plan
            let labelCampoOpcional = 'Profissão';
            let valorCampoOpcional = profissao;

            if (plano === 'Manutenção') {
                labelCampoOpcional = 'Link do Site';
                // If the user didn't type http/https, maybe we can accept it as is, or rely on them.
            }

            // Construct Message (Used for both WhatsApp and Email)
            // Construct Message (Used for both WhatsApp and Email)
            let messagePlain = '';
            let messageWhatsapp = '';

            if (plano === 'Manutenção') {
                // Simplified Message for Maintenance
                messagePlain = `
                NOVO PEDIDO DE SITE - ALPHA CODE 🚀

                DADOS DO CLIENTE:
                👤 Nome: ${nome}
                📱 WhatsApp: ${whatsapp}
                📧 Email: ${email}
                💼 ${labelCampoOpcional}: ${valorCampoOpcional}

                ----------------------------------
                RESUMO DO PEDIDO:
                🎯 Objetivo: Manutenção
                💰 Valor: ${precoPlano} (Pgto Único)

                DETALHES / EXPECTATIVAS:
                ${detalhes}
            `;

                messageWhatsapp = `*NOVO PEDIDO DE SITE - ALPHA CODE* 🚀%0A%0A` +
                    `*DADOS DO CLIENTE:*%0A` +
                    `👤 *Nome:* ${nome}%0A` +
                    `📱 *WhatsApp:* ${whatsapp}%0A` +
                    `📧 *Email:* ${email}%0A` +
                    `💼 *${labelCampoOpcional}:* ${valorCampoOpcional}%0A%0A` +
                    `----------------------------------%0A` +
                    `*RESUMO DO PEDIDO:*%0A` +
                    `🎯 *Objetivo:* Manutenção%0A` +
                    `💰 *Valor:* ${precoPlano} (Pgto Único)%0A` +
                    `----------------------------------%0A` +
                    `*DETALHES / EXPECTATIVAS:*%0A` +
                    `${detalhes}`;

            } else {
                // Standard Message for Other Plans
                messagePlain = `
                NOVO PEDIDO DE SITE - ALPHA CODE 🚀

                DADOS DO CLIENTE:
                👤 Nome: ${nome}
                📱 WhatsApp: ${whatsapp}
                📧 Email: ${email}
                💼 ${labelCampoOpcional}: ${valorCampoOpcional}

                ----------------------------------
                RESUMO DO PEDIDO:
                📊 Plano Escolhido: ${plano}
                💰 Valor: ${precoPlano} (Pgto Único)
                🎯 Objetivo: ${objetivo}
                🎨 Cores: ${cores}
                🔗 Ref: ${referencias}

                ----------------------------------
                DETALHES / EXPECTATIVAS:
                ${detalhes}
            `;

                messageWhatsapp = `*NOVO PEDIDO DE SITE - ALPHA CODE* 🚀%0A%0A` +
                    `*DADOS DO CLIENTE:*%0A` +
                    `👤 *Nome:* ${nome}%0A` +
                    `📱 *WhatsApp:* ${whatsapp}%0A` +
                    `📧 *Email:* ${email}%0A` +
                    `💼 *${labelCampoOpcional}:* ${valorCampoOpcional}%0A%0A` +
                    `----------------------------------%0A` +
                    `*RESUMO DO PEDIDO:*%0A` +
                    `📊 *Plano Escolhido:* ${plano}%0A` +
                    `💰 *Valor:* ${precoPlano} (Pgto Único)%0A` +
                    `🎯 *Objetivo:* ${objetivo}%0A` +
                    `🎨 *Cores:* ${cores}%0A` +
                    `🔗 *Ref:* ${referencias}%0A` +
                    `----------------------------------%0A` +
                    `*DETALHES / EXPECTATIVAS:*%0A` +
                    `${detalhes}`;
            }


            // 3.5 Show Loading Overlay
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) loadingOverlay.classList.add('active');

            try {
                // A. Enviar Email (API Própria)
                // Prepare final details for backend
                let finalDetalhes = detalhes;
                if (plano === 'Manutenção') {
                    // Force the link to appear in 'detalhes' with clear separation
                    finalDetalhes = `🔗 LINK DO SITE:\n${profissao}\n\n-----------------------------------\n\n📝 DESCRIÇÃO / PROBLEMA:\n${detalhes}`;
                }

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: nome,
                        email: email,
                        whatsapp: whatsapp,
                        servico: objetivo, // Mapped from 'objetivo'
                        detalhes: finalDetalhes,
                        plano: plano,
                        orcamento: cores // Mapped from 'cores'
                    })
                });

                if (loadingOverlay) loadingOverlay.classList.remove('active'); // Hide Loader

                if (response.ok) {
                    console.log('Email enviado com sucesso via API!');

                    // Success! Show Modal
                    const modal = document.getElementById('success-modal');
                    const btnWhatsappModal = document.getElementById('btn-whatsapp-modal');
                    const btnPay = document.getElementById('btn-pay');

                    // Prepare WhatsApp Url (Dynamic)
                    const whatsappUrl = `https://wa.me/5521999064502?text=${messageWhatsapp}`;

                    if (btnWhatsappModal) {
                        btnWhatsappModal.href = whatsappUrl;
                    }

                    // --- PAYMENT LOGIC (MERCADO PAGO) ---
                    if (btnPay) {
                        btnPay.onclick = async () => {
                            btnPay.innerText = 'Redirecionando... 🔒';
                            btnPay.disabled = true;

                            try {
                                const backendUrl = 'https://backend-rp7j.onrender.com/create-checkout-session';

                                const res = await fetch(backendUrl, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        planName: plano,
                                        price: precoPlano
                                    })
                                });

                                if (!res.ok) {
                                    throw new Error(`Erro no Servidor: ${res.status} ${res.statusText}`);
                                }

                                const data = await res.json();
                                if (data.url) {
                                    window.location.href = data.url;
                                } else {
                                    throw new Error('Sem URL de pagamento na resposta');
                                }
                            } catch (err) {
                                console.error('Erro detalhado do Pagamento:', err);
                                alert(`Não foi possível iniciar o pagamento. Detalhe: ${err.message}. Tente pelo WhatsApp.`);
                                btnPay.innerText = 'Pagar Agora (Pix ou Cartão) 💳';
                                btnPay.disabled = false;
                            }
                        };
                    }
                    // -----------------------------

                    if (modal) {
                        modal.classList.add('active');
                    }
                    orderForm.reset();

                } else {
                    throw new Error('Erro na resposta do servidor');
                }

            } catch (err) {
                console.error('Erro ao enviar email:', err);
                if (loadingOverlay) loadingOverlay.classList.remove('active'); // Hide Loader

                // Fallback: Show success modal anyway? Or Alert?
                // User wants to ensure they know it connected. If it fails, we should tell them.
                alert('Ocorreu um erro ao enviar o pedido. Por favor, tente novamente ou nos chame no WhatsApp.');
                btn.disabled = false;
            }
        });

        // Close Modal Logic (X Button)
        const closeModalBtn = document.getElementById('close-modal-x');
        const modal = document.getElementById('success-modal');
        if (closeModalBtn && modal) {
            closeModalBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                // Optional: Redirect to Home?
                // window.location.href = 'index.html'; 
            });

            // Allow outside click to close (optional: maybe remove to force button click?)
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    }
});

