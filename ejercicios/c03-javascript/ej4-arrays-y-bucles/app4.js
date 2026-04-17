const numeros = [19, 5, 8, 23, 3, 17, 7, 12]; /*array*/

/*creo las variables*/
let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];

/*función bucle (recorro el array) */
for (let i = 0; i < numeros.length; i++) {

    suma += numeros[i];

    if (numeros[i] > mayor) {
        mayor = numeros[i];
    }

    if (numeros[i] < menor) {
        menor = numeros[i];
    }
}
/*saco el promedio */ /*length cuenta la cantidad de elemntos del array */
let promedio = suma / numeros.length;

console.log(`Suma total: ${suma}`);
console.log(`Promedio: ${promedio}`);
console.log(`Número mayor: ${mayor}`);
console.log(`Número menor: ${menor}`);

function generarAsteriscos(n) {
    let resultado = "";

    for (let i = 0; i < n; i++) {
        resultado += "*";
    }

    return resultado;
}

console.log(generarAsteriscos(5));