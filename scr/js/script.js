
const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 800, // Increased transition speed
    effect: 'slide', // Use slide effect for smoother transitions
    autoplay: {
        delay: 4000, // Increased delay to 4 seconds
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true, // Adds dynamic bullets effect
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
    // Add grab cursor and resistance
    grabCursor: true,
    resistance: true,
    resistanceRatio: 0.85,
    // Enable better touch support
    touchRatio: 1,
    touchAngle: 45,
    // Improved transitions
    watchSlidesProgress: true,
    normalizeSlideIndex: true,
    centeredSlides: true,
    // Add keyboard control
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    // Add better responsive handling
    observer: true,
    observeParents: true,
    // Improve loop handling
    loopAdditionalSlides: 3,
    loopedSlides: 3,
    // Add better momentum
    momentum: true,
    momentumRatio: 1,
    momentumVelocityRatio: 1,
});

// Add event listeners for better interaction
swiper.on('touchStart', function() {
    swiper.autoplay.stop();
});

swiper.on('touchEnd', function() {
    swiper.autoplay.start();
});

// Pause on hover
const swiperContainer = document.querySelector('.swiper');
swiperContainer.addEventListener('mouseenter', () => {
    swiper.autoplay.stop();
});

swiperContainer.addEventListener('mouseleave', () => {
    swiper.autoplay.start();
});



document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answerWrapper = item.querySelector('.faq-answer-wrapper');
        const answer = item.querySelector('.faq-answer');
        
        // Initialize height for smooth transitions
        let isExpanded = false;
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    const otherWrapper = otherItem.querySelector('.faq-answer-wrapper');
                    otherItem.classList.remove('active');
                    otherWrapper.style.height = '0px';
                }
            });
            
            // Toggle current item
            isExpanded = !isExpanded;
            item.classList.toggle('active');
            
            // Set height for smooth animation
            if (isExpanded) {
                answerWrapper.style.height = answer.offsetHeight + 'px';
            } else {
                answerWrapper.style.height = '0px';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (isExpanded) {
                answerWrapper.style.height = answer.offsetHeight + 'px';
            }
        });
    });
});



const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');

  if (navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    navLinks.classList.add('closing');

    navLinks.addEventListener('animationend', () => {
      navLinks.classList.remove('closing');
    }, { once: true });
  } else {
    navLinks.classList.add('active');
  }
});

// Fechar o menu ao clicar fora
document.addEventListener('click', (event) => {
  if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target) && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    navLinks.classList.add('closing');

    navLinks.addEventListener('animationend', () => {
      navLinks.classList.remove('closing');
    }, { once: true });
  }
});