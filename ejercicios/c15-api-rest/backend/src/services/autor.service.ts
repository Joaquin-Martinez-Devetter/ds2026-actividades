import type { Autor } from "../types/autor.types";

let autores: Autor[] = [
  {
    id: 1,
    nombre: "J. K. Rowling",
    nacionalidad: "Británica",
  },
  {
    id: 2,
    nombre: "George Orwell",
    nacionalidad: "Británica",
  },
  {
    id: 3,
    nombre: "Antoine de Saint-Exupéry",
    nacionalidad: "Francesa",
  },
];

let proximoId = 4;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find((autor) => autor.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevoAutor: Autor = {
    id: proximoId++,
    ...datos,
  };

  autores.push(nuevoAutor);

  return nuevoAutor;
}

export function update(
  id: number,
  datos: Omit<Autor, "id">,
): Autor | undefined {
  const indice = autores.findIndex((autor) => autor.id === id);

  if (indice === -1) {
    return undefined;
  }

  const autorActualizado: Autor = {
    id,
    ...datos,
  };

  autores[indice] = autorActualizado;

  return autorActualizado;
}

export function remove(id: number): boolean {
  const indice = autores.findIndex((autor) => autor.id === id);

  if (indice === -1) {
    return false;
  }

  autores.splice(indice, 1);

  return true;
}