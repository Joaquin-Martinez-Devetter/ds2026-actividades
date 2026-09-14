export type UsuarioSesion = {
  id: number;
  email: string;
  nombre: string;
  rol: "ADMIN" | "CLIENTE";
};

export type Sesion = {
  token: string;
  usuario: UsuarioSesion;
};