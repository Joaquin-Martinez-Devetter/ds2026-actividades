import { prisma } from "../config/prisma";

export async function findAll() {
  return prisma.categoria.findMany();
}

export async function findById(id: number) {
  return prisma.categoria.findUnique({
    where: {
      id,
    },
  });
}

export async function create(datos: {
  nombre: string;
}) {
  return prisma.categoria.create({
    data: datos,
  });
}

export async function update(
  id: number,
  datos: {
    nombre?: string;
  }
) {
  return prisma.categoria.update({
    where: {
      id,
    },
    data: datos,
  });
}

export async function remove(id: number) {
  return prisma.categoria.delete({
    where: {
      id,
    },
  });
}