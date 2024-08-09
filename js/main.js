let boton = document.getElementById('burguer')
// let contNav = document.getElementByClassName('navbar');
// let menu = document.getElementById('nav-menu');

boton.addEventListener('click', function() {
    boton.classList.toggle('is-active');
    document.getElementById('nav-menu').classList.toggle('activo')
});