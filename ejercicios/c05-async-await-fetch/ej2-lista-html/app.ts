interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const lista = document.getElementById("lista") as HTMLUListElement;
const cargando = document.getElementById("cargando") as HTMLParagraphElement;
const error = document.getElementById("error") as HTMLParagraphElement;

//funcion para traer los usuarios
async function obtenerUsuarios(): Promise<Usuario[]> {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!respuesta.ok) {
    throw new Error("Error al traer usuarios");
  }

  return await respuesta.json();
}

//funció para renderizar
function renderizar(usuarios: Usuario[]): void {
  lista.innerHTML = "";

  for (let i = 0; i < usuarios.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${usuarios[i].name} - ${usuarios[i].email}`;
    lista.appendChild(li);
  }
}

//función iniciar
async function iniciar(): Promise<void> {
  try {
    cargando.textContent = "Cargando...";
    error.textContent = "";

    const usuarios = await obtenerUsuarios();

    cargando.textContent = "";

    renderizar(usuarios);

  } catch (e) {
    cargando.textContent = "";
    error.textContent = "Error al cargar los usuarios";
  }
}

iniciar();



