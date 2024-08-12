let boton = document.getElementById('burguer')

boton.addEventListener('click', function() {
    boton.classList.toggle('is-active');
    document.getElementById('nav-menu').classList.toggle('activo')
    document.getElementById('header').classList.toggle('activador')
});