const inputAltura = document.getElementById("altura") as HTMLInputElement;
const boton = document.getElementById("btnGenerar") as HTMLButtonElement;
const resultado = document.getElementById("resultado") as HTMLPreElement;
const error = document.getElementById("error") as HTMLParagraphElement;

function generarAsteriscos(altura: number): string {
    let arbol: string = "";

    for (let i = 1; i <= altura; i++) {
        arbol += "*".repeat(i) + "\n";
    }

    return arbol;
}

boton.addEventListener("click", () => {
    const altura: number = Number(inputAltura.value);

    if (inputAltura.value === "" || altura < 1) {
        error.textContent = "Ingresá un número válido mayor o igual a 1";
        resultado.textContent = "";
        return;
    }

    error.textContent = "";
    resultado.textContent = generarAsteriscos(altura);
});