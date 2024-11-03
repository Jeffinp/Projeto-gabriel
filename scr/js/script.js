// Carrossel
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndex = 0;

function showSlide(index) {
carouselInner.style.transform = `translateX(-${index * 100}%)`;
}

prevButton.addEventListener('click', () => {
currentIndex = Math.max(0, currentIndex - 1);
showSlide(currentIndex);
});

nextButton.addEventListener('click', () => {
currentIndex = Math.min(carouselItems.length - 1, currentIndex + 1);
showSlide(currentIndex);
});

// Rolagem Suave
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
});
});

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
    const item = question.parentElement;
    const isActive = item.classList.contains('active');
    
    // Fecha todos os items
    document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
    });
    
    // Abre o item clicado se não estava ativo
    if (!isActive) {
        item.classList.add('active');
    }
    });
});