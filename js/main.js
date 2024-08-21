let boton = document.getElementById('burguer')

boton.addEventListener('click', function() {
    boton.classList.toggle('is-active');
    document.getElementById('nav-menu').classList.toggle('activo')
    document.getElementById('header').classList.toggle('activador')
});

// LIBROS EN CARRUSEL
fetch('libros.json')
    .then((response) => response.json())
    .then((data) => {

        let contenedor = document.querySelector(".carousel")
        let contenido = '';

        for (let i = 0; i < data.length; i++) {
            
            contenido += `
                <a href="${data[i].vinculo}" class="carousel-item">
                        <img src="${data[i].imgUrl}" alt="${data[i].titulo}">
                        <p>${data[i].titulo}</p>
                </a>
            `
        }

        contenedor.innerHTML = contenido;
    })

    // LIBROS EN LA PAGINA DE LIBROS
fetch('libros.json')
.then((response) => response.json())
.then((data) => {

    let container = document.querySelector(".main__libros")
    let content = '';

    for (let i = 0; i < data.length; i++) {
        
        content += `
            <a href="${data[i].vinculo}" class="book">
                <figure>
                    <img src="${data[i].imgUrl}" alt="book1">
                </figure>
                <h3>${data[i].titulo}</h3>
            </a>
        `
    }

    container.innerHTML = content;
})