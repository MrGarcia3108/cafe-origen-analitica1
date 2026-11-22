const ventas = require("./datos.js");
const {
  totalVendido,
  unidadesVendidas,
  ticketPromedio,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia
} = require("./analitica.js");

function formatoPesos(valor) {
  return "$ " + valor.toLocaleString("es-CO");
}

console.log("========================================");
console.log("       CAFÉ ORIGEN - REPORTE");

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