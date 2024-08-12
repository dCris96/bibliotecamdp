let currentSlide = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let autoAdvanceInterval;

const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');

function updateFocus() {
    items.forEach((item, index) => {
        item.classList.remove('focused');
        if (index === currentSlide) {
            item.classList.add('focused');
        }
    });
}

function moveSlide(direction) {
    const totalItems = items.length;
    const visibleItems = Math.floor(carousel.clientWidth / document.querySelector('.carousel-item').clientWidth);

    currentSlide = (currentSlide + direction + totalItems) % totalItems;
    const offset = -currentSlide * (100 / visibleItems);
    carousel.style.transform = `translateX(${offset}%)`;

    updateFocus();
}

function startAutoAdvance() {
    autoAdvanceInterval = setInterval(() => moveSlide(1), 3000);
}

function stopAutoAdvance() {
    clearInterval(autoAdvanceInterval);
}

function touchStart(event) {
    isDragging = true;
    stopAutoAdvance();
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    carousel.classList.add('grabbing');
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    carousel.classList.remove('grabbing');

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50) moveSlide(1);
    if (movedBy > 50) moveSlide(-1);

    currentTranslate = 0;
    prevTranslate = 0;

    setTimeout(startAutoAdvance, 2000);
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    carousel.style.transform = `translateX(${currentTranslate}px)`;
    if (isDragging) requestAnimationFrame(animation);
}

carousel.addEventListener('touchstart', touchStart);
carousel.addEventListener('touchmove', touchMove);
carousel.addEventListener('touchend', touchEnd);
carousel.addEventListener('mousedown', touchStart);
carousel.addEventListener('mousemove', touchMove);
carousel.addEventListener('mouseup', touchEnd);
carousel.addEventListener('mouseleave', () => {
    if (isDragging) touchEnd();
});

// Inicializar el foco y el avance automático al cargar la página
updateFocus();
startAutoAdvance();
