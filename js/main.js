let boton = document.getElementById('burguer')

boton.addEventListener('click', function() {
    boton.classList.toggle('is-active');
    document.getElementById('nav-menu').classList.toggle('activo')
    document.getElementById('header').classList.toggle('activador')
});

let currentSlide = 0;

function moveSlide(direction) {
    const carousel = document.querySelector('.carousel');
    const totalItems = document.querySelectorAll('.carousel-item').length;
    const visibleItems = Math.floor(carousel.clientWidth / document.querySelector('.carousel-item').clientWidth);

    currentSlide = (currentSlide + direction + totalItems) % totalItems;

    const offset = -currentSlide * (100 / visibleItems);

    carousel.style.transform = `translateX(${offset}%)`;
}

window.addEventListener('resize', () => {
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = 'translateX(0%)';
    currentSlide = 0;
});