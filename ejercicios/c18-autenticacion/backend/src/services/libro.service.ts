import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";

export type LibroConAutor = Prisma.LibroGetPayload<{
  include: {
    autor: true;
  };
}>;

export type LibroDetalle = Prisma.LibroGetPayload<{
  include: {
    autor: true;
    categorias: true;
  };
}>;

export async function findAll(
  disponible?: boolean
): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({
    where: {
      disponible,
    },
    include: {
      autor: true,
    },
  });
}

export async function findById(
  id: number
): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: {
      id,
    },
    include: {
      autor: true,
      categorias: true,
    },
  });
}

export async function create(datos: {
  titulo: string;
  precio: number;
  imagen: string;
  disponible?: boolean;
  autorId: number;
}) {
  const {
    autorId,
    ...datosLibro
  } = datos;

  return prisma.libro.create({
    data: {
      ...datosLibro,

      autor: {
        connect: {
          id: autorId,
        },
      },
    },
  });
}

export async function update(
  id: number,
  datos: {
    titulo?: string;
    precio?: number;
    imagen?: string;
    disponible?: boolean;
    autorId?: number;
  }
) {
  const {
    autorId,
    ...datosLibro
  } = datos;

  return prisma.libro.update({
    where: {
      id,
    },
    data: {
      ...datosLibro,

      ...(autorId !== undefined
        ? {
            autor: {
              connect: {
                id: autorId,
              },
            },
          }
        : {}),
    },
  });
}

export async function remove(id: number) {
  return prisma.libro.delete({
    where: {
      id,
    },
  });
}