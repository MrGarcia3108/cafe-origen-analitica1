const ventas = require("./datos.js");
const a = require("./analitica.js");
const generarVentas = require("./generador.js");
const r = require("./recurrentes.js");
const o = require("./optimizadas.js");

function verificar(nombre, conCiclo, conMetodo) {
    if (conCiclo === conMetodo) {
        console.log(nombre + "OK");
        console.log("Con ciclo: " ,conCiclo);
        console.log("Con metodo: " ,conMetodo);
    }
    else {
        console.log(nombre + "DIFERENTE");
    }
}

verificar("Total vendido: " ,a.totalVendido(ventas), a.totalVendidoM(ventas));
verificar("Unidades vendidas: " ,a.unidadesVendidas(ventas), a.unidadesVendidasM(ventas));
verificar("Ventas por ciudad: " ,a.ventasPorCiudad(ventas, "Medellín"), a.ventasPorCiudadM(ventas, "Medellín"))

function verificarRecurrentes(datos, nombre) {
    const original = r.clientesRecurrentes(datos).sort();
    const conSet = o.clientesRecurrentesSet(datos).sort();
    const conMap = o.clientesRecurrentesMap(datos).sort();

    console.log("\n" + nombre);

    if (datos.length > 100) {
        verificar(
            "Original vs Set: ",
            true,
            JSON.stringify(original) === JSON.stringify(conSet)
        );
        verificar(
            "Original vs Map: ",
            true,
            JSON.stringify(original) === JSON.stringify(conMap)
        );
        console.log("Primeros 5 clientes:", original.slice(0, 5));
    }
    else {
        verificar(
            "Original vs Set: ",
            JSON.stringify(original),
            JSON.stringify(conSet)
        );

        verificar(
            "Original vs Map: ",
            JSON.stringify(original),
            JSON.stringify(conMap)
        );
    }

    console.log("Cantidad de clientes recurrentes:", original.length);
}

verificarRecurrentes(ventas, "Datos del Dia 1");

verificar(
    "Resultado esperado del Dia 1: ",
    JSON.stringify(r.clientesRecurrentes(ventas).sort()),
    JSON.stringify(["C01", "C02", "C03"])
);

const ventasGeneradas = generarVentas(5000);

verificarRecurrentes(ventasGeneradas, "5.000 ventas generadas");

verificarRecurrentes([], "Arreglo vacio");

verificarRecurrentes(
    [{ cliente: "C01" }],
    "Una sola venta"
);

verificarRecurrentes(
    [
        { cliente: "C01" },
        { cliente: "C02" },
        { cliente: "C03" }
    ],
    "Sin clientes recurrentes"
);

verificarRecurrentes(
    [
        { cliente: "C01" },
        { cliente: "C01" },
        { cliente: "C01" }
    ],
    "Todas las compras del mismo cliente"
);

const compras = o.comprasPorCliente(ventas);

console.log("\nCompras por cliente:");
console.table(
    [...compras].map(([cliente, cantidad]) => ({
        cliente,
        compras: cantidad
    }))
);

console.log("Clientes distintos:", compras.size);

const recurrentesSet = new Set(o.clientesRecurrentesSet(ventas));

console.log("Clientes recurrentes:", recurrentesSet.size);