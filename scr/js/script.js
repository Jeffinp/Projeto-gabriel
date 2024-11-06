document.addEventListener('DOMContentLoaded', () => {
        
    // FAQ INTERATIVO
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-item');
            const answer = item.querySelector('.faq-answer-wrapper');
            
            // Fecha todas as outras respostas
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.faq-answer-wrapper').style.height = '0px';
                }
            });
            
            // Toggle atual
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                answer.style.height = answer.querySelector('.faq-answer').offsetHeight + 'px';
            } else {
                answer.style.height = '0px';
            }
        });
    });

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Função para fechar o menu
    const closeMenu = () => {
        navLinks.classList.add('closing');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        
        navLinks.addEventListener('animationend', () => {
            navLinks.classList.remove('active', 'closing');
        }, { once: true });
    };
    
    // Toggle do menu
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            closeMenu();
        } else {
            navLinks.classList.add('active');
            mobileMenuToggle.classList.add('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && 
            !mobileMenuToggle.contains(event.target) && 
            navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Fechar menu ao redimensionar a janela para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active', 'closing');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Fechar menu ao clicar em um link (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                closeMenu();
            }
        });
    });
    
    // Carrossel (Swiper)
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 800,
        effect: 'slide',
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
        grabCursor: true,
        resistance: true,
        resistanceRatio: 0.85,
        touchRatio: 1,
        touchAngle: 45,
        watchSlidesProgress: true,
        normalizeSlideIndex: true,
        centeredSlides: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        observer: true,
        observeParents: true,
        loopAdditionalSlides: 3,
        loopedSlides: 3,
        momentum: true,
        momentumRatio: 1,
        momentumVelocityRatio: 1,
    });

    // Interação com o Swiper
    swiper.on('touchStart', function () {
        swiper.autoplay.stop();
    });

    swiper.on('touchEnd', function () {
        swiper.autoplay.start();
    });

    const swiperContainer = document.querySelector('.swiper');
    swiperContainer.addEventListener('mouseenter', () => {
        swiper.autoplay.stop();
    });

    swiperContainer.addEventListener('mouseleave', () => {
        swiper.autoplay.start();
    });
});

