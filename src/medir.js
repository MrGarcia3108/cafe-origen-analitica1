const generarVentas = require("./generador.js");
const r = require("./recurrentes.js");
const o = require("./optimizadas.js");

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