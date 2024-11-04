document.addEventListener('DOMContentLoaded', () => {
    // FAQ interativo
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answerWrapper = item.querySelector('.faq-answer-wrapper');
        const answer = item.querySelector('.faq-answer');

        let isExpanded = false;

        question.addEventListener('click', () => {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    const otherWrapper = otherItem.querySelector('.faq-answer-wrapper');
                    otherItem.classList.remove('active');
                    otherWrapper.style.height = '0px';
                }
            });

            // Alterna o item atual
            isExpanded = !isExpanded;
            item.classList.toggle('active');

            // Define a altura para animação suave
            if (isExpanded) {
                answerWrapper.style.height = answer.offsetHeight + 'px';
            } else {
                answerWrapper.style.height = '0px';
            }
        });

        // Ajusta a altura ao redimensionar a janela
        window.addEventListener('resize', () => {
            if (isExpanded) {
                answerWrapper.style.height = answer.offsetHeight + 'px';
            }
        });
    });

    // HAMBURGUER
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        mobileMenuToggle.setAttribute('aria-expanded', isActive);
    });

    // Fechar o menu ao clicar fora
    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', false);

            navLinks.classList.add('closing');
            navLinks.addEventListener('animationend', () => {
                navLinks.classList.remove('closing');
            }, { once: true });
        }
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