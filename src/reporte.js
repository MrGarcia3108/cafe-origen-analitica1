const inicioReporte = process.hrtime.bigint();

const datos = require("./datos.js");
const generarVentas = require("./generador.js");
const catalogo = require("./catalogo.js");
const o = require("./optimizadas.js");

const {
  totalVendido,
  unidadesVendidas,
  ticketPromedio,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia
} = require("./analitica.js");

let ventas = datos;
const argumento = process.argv[2];

if (argumento !== undefined) {
  const cantidad = Number(argumento);
  if (!Number.isSafeInteger(cantidad) || cantidad <= 0) {
    console.log("Ingresa una cantidad de ventas valida.");
    process.exit(1);
  }
  ventas = generarVentas(cantidad);
}
const ventasDiarias = [
  320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
  480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
  710, 380, 360, 440, 500, 590, 650, 720, 400, 370
];
function formatoPesos(valor) {
  return "$ " + valor.toLocaleString("es-CO");
}

console.log("    CAFÉ ORIGEN - REPORTE v1.0");
console.log("========================================");
console.log("Origen:", argumento === undefined ? "Datos originales" : "Datos generados");
console.log("Cantidad de ventas:", ventas.length);
console.log("\n1. RESUMEN GENERAL");
console.log("----------------------------------------");

console.log("Total vendido:       ", formatoPesos(totalVendido(ventas)));
console.log("Unidades vendidas:   ", unidadesVendidas(ventas));
console.log("Ticket promedio:     ", formatoPesos(ticketPromedio(ventas)));

console.log("\n2. VENTAS POR CIUDAD");
console.log("----------------------------------------");
const ciudades = Object.entries(totalPorCiudad(ventas)).map(
  ([ciudad, total]) => {
    return {
      Ciudad: ciudad,
      "Total vendido": formatoPesos(total)
    };
  }
);
console.table(ciudades);
console.log("\n3. UNIDADES POR PRODUCTO");
console.log("----------------------------------------");

const productos = Object.entries(unidadesPorProducto(ventas)).map(
  ([producto, unidades]) => {
    return {
      Producto: producto,
      Unidades: unidades
    };
  }
);
console.table(productos);

console.log("\n4. TOP 3 PRODUCTOS POR VALOR");
console.log("----------------------------------------");

const topProductos = topProductosPorValor(ventas, 3).map(
  (producto, indice) => {
    return {
      Posición: indice + 1,
      Producto: producto.producto,
      "Dinero generado": formatoPesos(producto.valor)
    };
  }
);
console.table(topProductos);

function mostrarResumenDia(fecha) {
  const ventasDia = ventasDelDia(ventas, fecha);

  console.log("\nRESUMEN DEL DÍA:", fecha);
  console.log("----------------------------------------");
  if (ventasDia.length === 0) {
    console.log("No se encontraron ventas para esta fecha.");
  }
  console.log("Cantidad de ventas:", ventasDia.length);
  console.log("Dinero vendido:", formatoPesos(totalVendido(ventasDia)));
  console.log("Unidades vendidas:", unidadesVendidas(ventasDia));
  console.log("Ticket promedio:", formatoPesos(ticketPromedio(ventasDia)));
}

console.log("\n5. CONSULTA DE DÍAS");
mostrarResumenDia("2026-09-01");
mostrarResumenDia("2026-09-10");

console.log("\n6. CLIENTES RECURRENTES");
console.log("----------------------------------------");

const recurrentes = o.clientesRecurrentesSet(ventas);
console.log("Cantidad de clientes recurrentes:", recurrentes.length);
console.log("Primeros 10 clientes:", recurrentes.slice(0, 10));
console.log("\n7. PRODUCTO ESTRELLA POR CIUDAD");
console.log("----------------------------------------");

const estrellas = o.productoEstrellaPorCiudad(ventas);

console.table([...estrellas].map(([ciudad, producto]) => ({
  Ciudad: ciudad,
  Producto: producto
})));

console.log("\n8. COMBO DE REGALO SUGERIDO");
console.log("----------------------------------------");

const valorTarjeta = 87000;
const combo = o.comboRegalo(catalogo, valorTarjeta);

console.log("Valor de la tarjeta:", formatoPesos(valorTarjeta));

if (combo !== null) {
  console.table(combo);
  console.log("Total:", formatoPesos(combo[0].precio + combo[1].precio));
}
else {
  console.log("No existe combinacion");
}

console.log("\n9. CLIENTE PARA CUPÓN DE REGRESO");
console.log("----------------------------------------");

const clienteUnico = o.primerClienteUnico(ventas);

console.log("Cliente:", clienteUnico === null ? "No disponible" : clienteUnico);

console.log("\n10. MEJOR SEMANA DE SEPTIEMBRE");
console.log("----------------------------------------");

const semana = o.mejorSemana(ventasDiarias, 7);

console.log("Fuente: Totales diarios del MiniReto 11");

if (semana !== null) {
  console.log("Dia de inicio:", semana.diaInicio);
  console.log("Dia de finalizacion:", semana.diaInicio + 6);
  console.log("Total vendido:", formatoPesos(semana.total * 1000));
}
else {
  console.log("No hay suficientes dias");
}

console.log("\n11. PRESUPUESTO CORPORATIVO");
console.log("----------------------------------------");

const presupuesto = 100000;
const par = o.parMasCercano(catalogo, presupuesto);

console.log("Presupuesto:", formatoPesos(presupuesto));

if (par !== null) {
  const suma = par[0].precio + par[1].precio;
  console.table(par);
  console.log("Total:", formatoPesos(suma));
  console.log("Presupuesto restante:", formatoPesos(presupuesto - suma));
}
else {
  console.log("No existe combinacion");
}

console.log("\n12. RENDIMIENTO DEL REPORTE");
console.log("----------------------------------------");

const finReporte = process.hrtime.bigint();
const tiempoReporte = Number(finReporte - inicioReporte) / 1000000;

console.log("Tiempo de ejecucion:", tiempoReporte.toFixed(3), "ms");
console.log("Tiempo en segundos:", (tiempoReporte / 1000).toFixed(3), "s");
console.log("Objetivo de 5 segundos:", tiempoReporte < 5000 ? "CUMPLIDO" : "NO CUMPLIDO");

