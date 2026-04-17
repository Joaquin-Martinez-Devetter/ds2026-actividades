const inputAltura = document.getElementById("altura");
const boton = document.getElementById("btnGenerar");
const resultado = document.getElementById("resultado");
const error = document.getElementById("error");

boton.addEventListener("click", function () {

    //
    let altura = Number(inputAltura.value);

    // validacion
    if (inputAltura.value === "" || altura < 1) {
        error.textContent = "Error: ingresá un número mayor o igual a 1.";
        resultado.textContent = "";
        return;
    }

    error.textContent = "";

    // limpia resultado 
    resultado.textContent = "";

    let arbol = "";

    // generar árbol
    for (let i = 1; i <= altura; i++) {

        let linea = "";

        for (let j = 0; j < i; j++) {
            linea += "*";
        }

        arbol += linea + "\n";
    }

    resultado.textContent = arbol;
});