const inputBusqueda = document.getElementById("busqueda");
const botonBuscar = document.getElementById("buscar");
const resultados = document.getElementById("resultados");
const cargando = document.getElementById("cargando")
const error = document.getElementById("error")

async function buscarLibros(texto) {
    const respuesta = await fetch(`https://openlibrary.org/search.json?q=${texto}`);
    if (!respuesta.ok) {
        throw new Error("Error al buscar libros");
    }
    const datos = await respuesta.json();
    return datos.docs;

}
function renderizarLibros(libros) {
  resultados.innerHTML = "";

  for (let i = 0; i < libros.length && i < 10; i++) {
    const libro = libros[i];

    const autor = libro.author_name
      ? libro.author_name[0]
      : "Autor desconocido";

    const anio = libro.first_publish_year
      ? libro.first_publish_year
      : "Año desconocido";

    const portada = libro.cover_i
      ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-L.jpg`
      : "https://via.placeholder.com/300x450?text=Sin+Imagen";

    resultados.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow">

          <img
            src="${portada}"
            class="card-img-top"
            style="height: 450px; object-fit: cover;"
            alt="${libro.title}"
          >

          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${libro.title}</h5>

            <p class="card-text">${autor}</p>

            <p class="text-muted">${anio}</p>

            <a href="libro.html" class="btn btn-primary mt-auto">
              Ver más
            </a>
          </div>

        </div>
      </div>
    `;
  }
}

botonBuscar.addEventListener("click", async function () {
  const texto = inputBusqueda.value.trim();

  if (texto === "") {
    error.textContent = "Ingresá un libro para buscar.";
    cargando.textContent = "";
    resultados.innerHTML = "";
    return;
  }

  try {
    error.textContent = "";
    cargando.textContent = "Cargando...";
    resultados.innerHTML = "";

    const libros = await buscarLibros(texto);

    cargando.textContent = "";

    renderizarLibros(libros);

  } catch (e) {
    cargando.textContent = "";
    error.textContent = "Ocurrió un error al buscar libros.";
  }
});
