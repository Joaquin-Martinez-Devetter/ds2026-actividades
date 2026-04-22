"use strict";
const inputAltura = document.getElementById("altura");
const boton = document.getElementById("btnGenerar");
const resultado = document.getElementById("resultado");
const error = document.getElementById("error");
function generarAsteriscos(altura) {
    let arbol = "";
    for (let i = 1; i <= altura; i++) {
        arbol += "*".repeat(i) + "\n";
    }
    return arbol;
}
boton.addEventListener("click", () => {
    const altura = Number(inputAltura.value);
    if (inputAltura.value === "" || altura < 1) {
        error.textContent = "Ingresá un número válido mayor o igual a 1";
        resultado.textContent = "";
        return;
    }
    error.textContent = "";
    resultado.textContent = generarAsteriscos(altura);
});
