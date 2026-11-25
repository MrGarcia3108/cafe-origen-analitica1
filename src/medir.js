const generarVentas = require("./generador.js");
const r = require("./recurrentes.js");
const o = require("./optimizadas.js");
const ventasDiarias = [
    320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
    480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
    710, 380, 360, 440, 500, 590, 650, 720, 400, 370
];

const {
  totalVendidoInstrumentado,
  ventaMayorInstrumentada,
  totalPorCiudadInstrumentado,
  primeraVentaInstrumentada
} = require("./instrumentadas.js");

const tamanos = [100, 1000, 10000, 100000];

const resultados = [];

for (const n of tamanos) {
  const ventas = generarVentas(n);

  const contadorTotal = { operaciones: 0 };
  const contadorMayor = { operaciones: 0 };
  const contadorCiudad = { operaciones: 0 };
  const contadorPrimera = { operaciones: 0 };

  totalVendidoInstrumentado(ventas, contadorTotal);

  ventaMayorInstrumentada(ventas, contadorMayor);

  totalPorCiudadInstrumentado(ventas, contadorCiudad);

  primeraVentaInstrumentada(ventas, contadorPrimera);

  resultados.push({
    n: n,
    totalVendido: contadorTotal.operaciones,
    ventaMayor: contadorMayor.operaciones,
    totalPorCiudad: contadorCiudad.operaciones,
    primeraVenta: contadorPrimera.operaciones
  });
}

console.table(resultados);

const tamanosRecurrentes = [1000, 10000, 100000];

console.log("RENDIMIENTO - MINIRETO 9");

for (const n of tamanosRecurrentes) {
  const ventas = generarVentas(n);

  console.log("\nCantidad de ventas:", n);

  if (n <= 10000) {
    console.time("Original");

    r.clientesRecurrentes(ventas);

    console.timeEnd("Original");
  } else {
    console.log("Original: No ejecutada por su alto costo");
  }

  console.time("Set");

  o.clientesRecurrentesSet(ventas);

  console.timeEnd("Set");

  console.time("Map");

  o.clientesRecurrentesMap(ventas);

  console.timeEnd("Map");
}

console.log("\n================================");
console.log("RENDIMIENTO - MINIRETO 11");

const diasAleatorios = [];
for (let i = 0; i < 100000; i++) {
    diasAleatorios.push(
        Math.floor(Math.random() * 1000) + 1
    );
}

function medirMejorSemana(dias, k, nombre) {
    console.log("\n" + nombre);
    console.log("Cantidad de dias:", dias.length);
    console.log("Tamano de ventana:", k);
    console.time("Fuerza bruta");
    const bruta = o.mejorSemanaBruta(dias, k);
    console.timeEnd("Fuerza bruta");
    console.time("Ventana deslizante");
    const optimizada = o.mejorSemana(dias, k);
    console.timeEnd("Ventana deslizante");
    console.log("Resultado fuerza bruta:", bruta);
    console.log("Resultado optimizado:", optimizada);
    console.log(
        "Resultados iguales:",
        JSON.stringify(bruta) === JSON.stringify(optimizada)
    );
}

medirMejorSemana(
    ventasDiarias,
    7,
    "Ventas de septiembre"
);
medirMejorSemana(
    diasAleatorios,
    7,
    "100.000 dias aleatorios"
);