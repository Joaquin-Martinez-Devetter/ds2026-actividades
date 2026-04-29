interface LibroOL {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

interface RespuestaOL {
  docs: LibroOL[];
}

const inputBusqueda = document.getElementById("busqueda") as HTMLInputElement;
const botonBuscar = document.getElementById("buscar") as HTMLButtonElement;
const resultados = document.getElementById("resultados") as HTMLDivElement;
const error = document.getElementById("error") as HTMLParagraphElement;
const cargando = document.getElementById("cargando") as HTMLParagraphElement;

async function buscarLibros(texto: string): Promise<LibroOL[]> {
  const respuesta = await fetch(`https://openlibrary.org/search.json?q=${texto}`);

  if (!respuesta.ok) {
    throw new Error("Error al buscar libros");
  }

  const datos: RespuestaOL = await respuesta.json();

  return datos.docs;
}

//función para buscar en la librería
function renderizarLibros(libros: LibroOL[]): void {
  resultados.innerHTML = "";

  for (let i = 0; i < libros.length && i < 10; i++) {
    const tarjeta = document.createElement("div");

    const autor = libros[i].author_name ? libros[i].author_name![0] : "Autor desconocido";
    const anio = libros[i].first_publish_year ? libros[i].first_publish_year : "Año desconocido";

    tarjeta.innerHTML = `
      <h3>${libros[i].title}</h3>
      <p>Autor: ${autor}</p>
      <p>Año: ${anio}</p>
    `;

    resultados.appendChild(tarjeta);
  }
}

//Botón buscar
botonBuscar.addEventListener("click", async () => {
  const texto = inputBusqueda.value.trim();

  if (texto === "") {
    error.textContent = "Error: ingresá un texto para buscar.";
    resultados.innerHTML = "";
    return;
  }

  try {
    error.textContent = "";            //limpia los errores anteriores
    cargando.textContent = "Cargando...";
    resultados.innerHTML = "";         //limpia los resultados anteriores

    const libros = await buscarLibros(texto);

    cargando.textContent = "";
    renderizarLibros(libros);         //muestra los libros

  } catch (e) {                                //si el fetch falla entra acá y borra el mensaje cargando y muestra fallo
    cargando.textContent = "";
    error.textContent = "Ocurrió un error al buscar los libros.";
  }
});
