import { prisma } from "../config/prisma";

export async function findAll() {
  return prisma.autor.findMany();
}

export async function findById(id: number) {
  return prisma.autor.findUnique({
    where: {
      id,
    },
  });
}

export async function create(datos: {
  nombre: string;
  nacionalidad: string;
}) {
  return prisma.autor.create({
    data: datos,
  });
}

export async function update(
  id: number,
  datos: {
    nombre?: string;
    nacionalidad?: string;
  }
) {
  return prisma.autor.update({
    where: {
      id,
    },
    data: datos,
  });
}

export async function remove(id: number) {
  return prisma.autor.delete({
    where: {
      id,
    },
  });
}