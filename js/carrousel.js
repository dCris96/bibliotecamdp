let currentSlide = 0;
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationID = 0;
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function updateFocus() {
    items.forEach((item, index) => {
        item.classList.remove('focused');
        if (index === currentSlide) {
            item.classList.add('focused');
        } else {
            item.classList.remove('focused');
        }
    });

    // Ajusta la posición para centrar el ítem enfocado
    const visibleItems = Math.floor(carousel.clientWidth / document.querySelector('.carousel-item').clientWidth);
    const offset = -currentSlide * (100 / visibleItems);
    carousel.style.transform = `translateX(${offset}%)`;
}

function moveSlide(direction) {
    const visibleItems = Math.floor(carousel.clientWidth / document.querySelector('.carousel-item').clientWidth);
    currentSlide = (currentSlide + direction + totalItems) % totalItems;
    const offset = -currentSlide * (100 / visibleItems);
    carousel.style.transform = `translateX(${offset}%)`;
    updateFocus();
}

function autoMoveSlide() {
    moveSlide(1);
}

function setPositionByIndex() {
    const visibleItems = Math.floor(carousel.clientWidth / document.querySelector('.carousel-item').clientWidth);
    currentTranslate = currentSlide * (-100 / visibleItems);
    previousTranslate = currentTranslate;
    setCarouselPosition();
    updateFocus();
}

function setCarouselPosition() {
    carousel.style.transform = `translateX(${currentTranslate}%)`;
}

function startDrag(event) {
    isDragging = true;
    startPosition = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    carousel.classList.add('grabbing');
}

function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    carousel.classList.remove('grabbing');
    
    const movedBy = currentTranslate - previousTranslate;

    if (movedBy < -15) {
        moveSlide(1);
    } else if (movedBy > 15) {
        moveSlide(-1);
    } else {
        currentTranslate = previousTranslate;
        setCarouselPosition();
    }
}

function dragging(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = previousTranslate + currentPosition - startPosition;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setCarouselPosition();
    if (isDragging) requestAnimationFrame(animation);
}

carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('mouseup', endDrag);
carousel.addEventListener('mouseleave', endDrag);
carousel.addEventListener('mousemove', dragging);

carousel.addEventListener('touchstart', startDrag);
carousel.addEventListener('touchend', endDrag);
carousel.addEventListener('touchmove', dragging);

window.addEventListener('resize', () => {
    carousel.style.transform = 'translateX(0%)';
    currentSlide = 0;
    setPositionByIndex();
});

// Inicializar el foco y el avance automático
updateFocus();
let autoSlideInterval = setInterval(autoMoveSlide, 2000);

// Pausar el avance automático cuando se arrastra y reanudar al soltar
carousel.addEventListener('mousedown', () => clearInterval(autoSlideInterval));
carousel.addEventListener('mouseup', () => autoSlideInterval = setInterval(autoMoveSlide, 2000));
carousel.addEventListener('touchstart', () => clearInterval(autoSlideInterval));
carousel.addEventListener('touchend', () => autoSlideInterval = setInterval(autoMoveSlide, 2000));
