let currentSlide = 0;

function updateFocus() {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
        item.classList.remove('focused');
        if (index === currentSlide) {
            item.classList.add('focused');
        }
    });
}

function moveSlide(direction) {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const visibleItems = Math.floor(carousel.clientWidth / document.querySelector('.carousel-item').clientWidth);

    // Actualizar slide
    currentSlide += direction;

    // Ajustar el índice si se sale del rango
    if (currentSlide < 0) {
        currentSlide = totalItems - 1;
    } else if (currentSlide >= totalItems) {
        currentSlide = 0;
    }

    const offset = -currentSlide * (100 / visibleItems);
    carousel.style.transform = `translateX(${offset}%)`;

    updateFocus();
}

window.addEventListener('resize', () => {
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = 'translateX(0%)';
    currentSlide = 0;
    updateFocus();
});

// Inicializar el foco al cargar la página
updateFocus();