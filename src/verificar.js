const ventas = require("./datos.js");
const a = require("./analitica.js");
const generarVentas = require("./generador.js");
const r = require("./recurrentes.js");
const o = require("./optimizadas.js");
const catalogo = require("./catalogo.js");
const ventasDiarias = [
    320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
    480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
    710, 380, 360, 440, 500, 590, 650, 720, 400, 370
];

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

console.log("----------------------------------");
console.log("MINIRETO 9");


function verificarRecurrentes(datos, nombre) {
    const original = r.clientesRecurrentes(datos).sort();
    const conSet = o.clientesRecurrentesSet(datos).sort();
    const conMap = o.clientesRecurrentesMap(datos).sort();

    console.log("\n" + nombre);
    if (datos.length > 100) {
        verificar("Original vs Set: ", true, JSON.stringify(original) === JSON.stringify(conSet));
        verificar("Original vs Map: ", true, JSON.stringify(original) === JSON.stringify(conMap));
        console.log("Primeros 5 clientes:", original.slice(0, 5));
    }
    else {
        verificar("Original vs Set: ", JSON.stringify(original), JSON.stringify(conSet));
        verificar("Original vs Map: ", JSON.stringify(original), JSON.stringify(conMap));
    }
    console.log("Cantidad de clientes recurrentes:", original.length);
}

verificarRecurrentes(ventas, "Datos del Dia 1");
verificar("Resultado esperado del Dia 1: ",
    JSON.stringify(r.clientesRecurrentes(ventas).sort()),
    JSON.stringify(["C01", "C02", "C03"])
);

const ventasGeneradas = generarVentas(5000);

verificarRecurrentes(ventasGeneradas, "5.000 ventas generadas");
verificarRecurrentes([], "Arreglo vacio");
verificarRecurrentes([{ cliente: "C01" }], "Una sola venta");
verificarRecurrentes([
    { cliente: "C01" },
    { cliente: "C02" },
    { cliente: "C03" }
], "Sin clientes recurrentes");
verificarRecurrentes([
    { cliente: "C01" },
    { cliente: "C01" },
    { cliente: "C01" }
], "Todas las compras del mismo cliente");

const compras = o.comprasPorCliente(ventas);
console.log("\nCompras por cliente:");
console.table([...compras].map(([cliente, cantidad]) => ({
    cliente,
    compras: cantidad
})));

console.log("Clientes distintos:", compras.size);
const recurrentesSet = new Set(o.clientesRecurrentesSet(ventas));


console.log("----------------------------------");
console.log("MINIRETO 10");

function verificarCombo(valor) {
    const original = o.comboRegaloFuerzaBruta(catalogo, valor);
    const optimizado = o.comboRegalo(catalogo, valor);
    
    console.log("\nTarjeta de regalo:", valor);
    verificar("Fuerza bruta vs Map: ", JSON.stringify(original), JSON.stringify(optimizado));
    if (optimizado !== null) {
        console.table(optimizado);
        verificar("Suma de precios: ", optimizado[0].precio + optimizado[1].precio, valor);
        verificar("Productos distintos: ", optimizado[0] !== optimizado[1], true);
    }
    else {
        console.log("No existe combinacion");
    }
}

verificarCombo(87000);
verificarCombo(61000);
verificarCombo(10000);
verificar("Combo sin solucion: ", o.comboRegalo(catalogo, 10000), null);
verificar("Catalogo vacio: ", o.comboRegalo([], 87000), null);
verificar("Un solo producto: ", o.comboRegalo([{ producto: "Taza", precio: 35000 }], 70000), null);

const catalogoEmpate = [
    { producto: "Producto A", precio: 35000 },
    { producto: "Producto B", precio: 35000 }
];
verificar("Dos productos con el mismo precio: ",
    JSON.stringify(o.comboRegalo(catalogoEmpate, 70000)),
    JSON.stringify(catalogoEmpate)
);

console.log("\nProducto estrella por ciudad:");
const estrellas = o.productoEstrellaPorCiudad(ventas);
console.table([...estrellas].map(([ciudad, producto]) => ({
    ciudad,
    producto
})));

verificar("Estrella de Medellin: ", estrellas.get("medellín"), "Origen Huila 500 g");
verificar("Estrella de Bogota: ", estrellas.get("bogotá"), "Origen Nariño 250 g");
verificar("Estrella de Cali: ", estrellas.get("cali"), "Prensa francesa");
verificar("Estrella de Pereira: ", estrellas.get("pereira"), "Origen Huila 500 g");
verificar("Cantidad de ciudades: ", estrellas.size, 4);

const ventasEmpate = [
    { ciudad: "Cali", producto: "Producto A" },
    { ciudad: "Cali", producto: "Producto B" }
];
verificar("Desempate de producto estrella: ", o.productoEstrellaPorCiudad(ventasEmpate).get("cali"), "Producto A");
verificar("Producto estrella sin ventas: ", o.productoEstrellaPorCiudad([]).size, 0);

console.log("\nPrimer cliente unico:");
verificar("Primer cliente unico del Dia 1: ", o.primerClienteUnico(ventas), "C04");
verificar("Primer cliente unico sin ventas: ", o.primerClienteUnico([]), null);
verificar("Todos los clientes son recurrentes: ",
    o.primerClienteUnico([
        { cliente: "C01" },
        { cliente: "C02" },
        { cliente: "C01" },
        { cliente: "C02" }
    ]), null
);
verificar("Cliente unico con una venta: ", o.primerClienteUnico([{ cliente: "C01" }]), "C01");

console.log("\n================================");
console.log("MINIRETO 11");

function verificarMejorSemana(dias, k, nombre) {
    const bruta = o.mejorSemanaBruta(dias, k);
    const optimizada = o.mejorSemana(dias, k);
    console.log("\n" + nombre);
    verificar("Fuerza bruta vs Ventana deslizante: ", JSON.stringify(bruta), JSON.stringify(optimizada));
}

function verificarPresupuesto(presupuesto, totalEsperado) {
    const par = o.parMasCercano(catalogo, presupuesto);

    console.log("\nPresupuesto:", presupuesto);
    if (par === null) {
        console.log("No existe combinacion");
        verificar("Resultado esperado: ", par, totalEsperado);
    }
    else {
        console.table(par);
        const suma = par[0].precio + par[1].precio;
        verificar("Total esperado: ", suma, totalEsperado);
        verificar("No supera el presupuesto: ", suma <= presupuesto, true);
        verificar("Productos distintos: ", par[0] !== par[1], true);
        console.log("Presupuesto restante:", presupuesto - suma);
    }
}

const diasAleatorios = [];

for (let i = 0; i < 100000; i++) {
    diasAleatorios.push(Math.floor(Math.random() * 1000) + 1);
}

verificarMejorSemana(ventasDiarias, 7, "Ventas de septiembre");
verificarMejorSemana(diasAleatorios, 7, "100.000 dias aleatorios");
verificar("Mejor semana esperada: ",
    JSON.stringify(o.mejorSemana(ventasDiarias, 7)),
    JSON.stringify({ total: 3670, diaInicio: 24 })
);

verificarMejorSemana([320, 410, 280], 7, "Ventana mayor que el arreglo");
verificarMejorSemana([], 7, "Dias vacios");
verificar("Ventana invalida: ", o.mejorSemana([320, 410, 280], 7), null);
verificar("Arreglo vacio: ", o.mejorSemana([], 7), null);
verificar("Ventana igual al arreglo: ",
    JSON.stringify(o.mejorSemana([100, 200, 300], 3)),
    JSON.stringify({ total: 600, diaInicio: 1 })
);
verificar("Empate entre ventanas: ",
    JSON.stringify(o.mejorSemana([100, 100, 100], 2)),
    JSON.stringify({ total: 200, diaInicio: 1 })
);

verificarPresupuesto(100000, 97000);
verificarPresupuesto(140000, 140000);
verificarPresupuesto(40000, null);

verificar("Presupuesto con catalogo vacio: ", o.parMasCercano([], 100000), null);
verificar("Presupuesto con un solo producto: ", o.parMasCercano([{ producto: "Taza", precio: 35000 }], 100000), null);