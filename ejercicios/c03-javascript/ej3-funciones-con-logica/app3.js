function calcularPrecioFinal(monto, medioPago) {

    let total;

    if (monto > 400) {
        total = monto * 0.6;
    } else if (monto >= 200 && monto <= 400) {

        if (medioPago === "E") {
            total = monto * 0.7;
        } else if (medioPago === "D") {
            total = monto * 0.8;
        } else if (medioPago === "C") {
            total = monto * 0.9;
        }

    } else {
        total = monto;
    }

    return total;
}

console.log(`Monto: 150 | Pago: E | Final: $${calcularPrecioFinal(150, "E")}`);
console.log(`Monto: 300 | Pago: E | Final: $${calcularPrecioFinal(300, "E")}`);
console.log(`Monto: 300 | Pago: D | Final: $${calcularPrecioFinal(300, "D")}`);
console.log(`Monto: 300 | Pago: C | Final: $${calcularPrecioFinal(300, "C")}`);
console.log(`Monto: 500 | Pago: C | Final: $${calcularPrecioFinal(500, "C")}`);