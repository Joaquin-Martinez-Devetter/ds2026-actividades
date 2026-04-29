interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!respuesta.ok) {
      throw new Error("No se pudieron obtener los usuarios");
    }

    const usuarios: Usuario[] = await respuesta.json();

    return usuarios;

  } catch (error) {
    console.log("Ocurrió un error:", error);
    return [];
  }
}

obtenerUsuarios().then((usuarios) => {
  for (let i = 0; i < usuarios.length; i++) {
    console.log(`Nombre: ${usuarios[i].name} | Email: ${usuarios[i].email}`);
  }
});