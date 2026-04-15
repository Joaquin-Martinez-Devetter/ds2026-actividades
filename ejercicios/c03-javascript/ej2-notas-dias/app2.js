
/*función para la nota*/
function clasificarNota(nota) {
    if (nota < 4){
        return "Desaprobado";
    } else if (nota >= 4 && nota <= 7) {
        return "Aprobado";
    } else {
        return "promocionado";
    }
}


/*función para los dias*/
function diaDeLaSemana(numero) {
    /* declara la variable en bloque */
    let dia;

    switch (numero) {
        case 1:
            dia = "Lunes";
            break;
        case 2:
            dia = "Martes";
            break;
        case 3:
            dia = "Miercoles";
            break;
        case 4: 
            dia = "Jueves";
            break;
        case 5:
            dia = "Viernes";
            break;
        case 6:
            dia = "Sabado";
            break;
        case 7:
            dia = "Domingo";
            break;
            default:
                return "Dia inválido"

     }

     /*para agregar un fin de semana*/
     if (numero === 6 || numero === 7 ){
        dia = dia + "(fin de semana)"
     }
     return dia;

}
console.log(clasificarNota(3)); /*debería tirar desaprobado*/
console.log(clasificarNota(6)); /* devolver aprobado*/
console.log(clasificarNota(9)); /* devuelve promocionado*/

console.log(diaDeLaSemana(1)); /*lunes*/
console.log(diaDeLaSemana(6)); /*finde*/
console.log(diaDeLaSemana(9)); /*no existe*/


