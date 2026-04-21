const inputProducto = document.getElementById("producto");
const btnAgregar = document.getElementById("btnAgregar");
const mensajeError = document.getElementById("mensajeError");
const listaProductos = document.getElementById("listaProductos");
const contador = document.getElementById("contador");

let cantidad = 0;

btnAgregar.addEventListener("click", function () {

  let nombre = inputProducto.value;

  if (nombre === "") {
    mensajeError.textContent = "Error: ingresá un producto";
    return;
  }

  mensajeError.textContent = "";

  let item = document.createElement("li");
  item.textContent = nombre;

  let botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar";

  botonEliminar.addEventListener("click", function () {
    listaProductos.removeChild(item);
    cantidad--;
    contador.textContent = `${cantidad} productos en la lista`;
  });

  item.appendChild(botonEliminar);
  listaProductos.appendChild(item);

  cantidad++;
  contador.textContent = `${cantidad} productos en la lista`;

  inputProducto.value = "";
});