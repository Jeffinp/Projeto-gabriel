// main.js
document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
    initMobileMenu();
    initSwiper();
    initParticles();
});

// Módulo FAQ
const initFAQ = () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    const closeOtherAnswers = (currentItem) => {
        document.querySelectorAll('.faq-item.active').forEach(activeItem => {
            if (activeItem !== currentItem) {
                activeItem.classList.remove('active');
                activeItem.querySelector('.faq-answer-wrapper').style.height = '0px';
            }
        });
    };

    const toggleAnswer = (item) => {
        const answer = item.querySelector('.faq-answer-wrapper');
        if (item.classList.contains('active')) {
            answer.style.height = answer.querySelector('.faq-answer').offsetHeight + 'px';
        } else {
            answer.style.height = '0px';
        }
    };

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-item');
            closeOtherAnswers(item);
            item.classList.toggle('active');
            toggleAnswer(item);
        });
    });
};

// Módulo Menu Mobile
const initMobileMenu = () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    const closeMenu = () => {
        navLinks.classList.add('closing');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');

        navLinks.addEventListener('animationend', () => {
            navLinks.classList.remove('active', 'closing');
        }, { once: true });
    };

    const handleMenuToggle = (e) => {
        e.stopPropagation();
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            closeMenu();
        } else {
            navLinks.classList.add('active');
            mobileMenuToggle.classList.add('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }
    };

    const handleOutsideClick = (event) => {
        if (!navLinks.contains(event.target) &&
            !mobileMenuToggle.contains(event.target) &&
            navLinks.classList.contains('active')) {
            closeMenu();
        }
    };

    const handleResize = () => {
        if (window.innerWidth >= 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active', 'closing');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    };

    // Event Listeners
    mobileMenuToggle.addEventListener('click', handleMenuToggle);
    document.addEventListener('click', handleOutsideClick);
    window.addEventListener('resize', handleResize);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) closeMenu();
        });
    });
};

// Módulo Swiper
const initSwiper = () => {
    const swiperConfig = {
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
    };

    const swiper = new Swiper('.swiper', swiperConfig);
    const swiperContainer = document.querySelector('.swiper');

    // Event Handlers
    swiper.on('touchStart', () => swiper.autoplay.stop());
    swiper.on('touchEnd', () => swiper.autoplay.start());
    swiperContainer.addEventListener('mouseenter', () => swiper.autoplay.stop());
    swiperContainer.addEventListener('mouseleave', () => swiper.autoplay.start());
};

// Módulo Particles
const initParticles = () => {
    const hero = document.querySelector('.hero');
    const numParticles = 55;
    const particles = [];
    const repelRadius = 100;
    const repelStrength = 20;
    let mouseX = 0;
    let mouseY = 0;

    const createParticle = () => {
        const particle = document.createElement('div');
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 5 + 2;

        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;

        hero.appendChild(particle);

        return {
            element: particle,
            x,
            y,
            initialX: x,
            initialY: y,
            size,
            speed: Math.random() * 0.5 + 0.2
        };
    };

    const updateParticlePosition = (particle) => {
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repelRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (repelRadius - distance) / repelRadius;
            particle.x += Math.cos(angle) * force * repelStrength;
            particle.y += Math.sin(angle) * force * repelStrength;
        } else {
            particle.x += (particle.initialX - particle.x) * particle.speed;
            particle.y += (particle.initialY - particle.y) * particle.speed;
        }

        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
    };

    const updateParticles = () => {
        particles.forEach(updateParticlePosition);
        requestAnimationFrame(updateParticles);
    };

    const handleMove = (e) => {
        mouseX = e.clientX || e.touches[0].clientX;
        mouseY = e.clientY || e.touches[0].clientY;
    };

    const handleResize = () => {
        particles.forEach(particle => {
            particle.initialX = Math.random() * window.innerWidth;
            particle.initialY = Math.random() * window.innerHeight;
        });
    };

    // Inicialização
    for (let i = 0; i < numParticles; i++) {
        particles.push(createParticle());
    }

    // Event Listeners
    hero.addEventListener('mousemove', handleMove);
    hero.addEventListener('touchmove', handleMove);
    window.addEventListener('resize', handleResize);

    // Iniciar animação
    updateParticles();
};