
const ventas = require("./datos.js");

const {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad
} = require("./analitica.js");

// Prueba con el arreglo completo
console.log("TOTAL:", totalVendido(ventas));
console.log("UNIDADES:", unidadesVendidas(ventas));
console.log("VENTA MAYOR:", ventaMayor(ventas));
console.log("TICKET PROMEDIO:", Math.round(ticketPromedio(ventas)));
console.log("VENTAS MEDELLÍN:", ventasPorCiudad(ventas, "Medellín"));

// Prueba con un solo registro
const unaVenta = [ventas[0]];
console.log("-----UN SOLO REGISTRO-----");
console.log("UNA VENTA - TOTAL:", totalVendido(unaVenta));
console.log("UNA VENTA - UNIDADES:", unidadesVendidas(unaVenta));
console.log("UNA VENTA - MAYOR:", ventaMayor(unaVenta));
console.log("UNA VENTA - PROMEDIO:", ticketPromedio(unaVenta));
console.log("UNA VENTA - CIUDAD:", ventasPorCiudad(unaVenta, "Medellín"));
console.log("UNA VENTA - VALOR", valorVenta(unaVenta));

// Prueba con arreglo vacío
const ventasVacias = [];
console.log("-----ARREGLO VACIO-----");
console.log("VACÍO - TOTAL:", totalVendido(ventasVacias));
console.log("VACÍO - UNIDADES:", unidadesVendidas(ventasVacias));
console.log("VACÍO - MAYOR:", ventaMayor(ventasVacias));
console.log("VACÍO - PROMEDIO:", ticketPromedio(ventasVacias));
console.log("VACÍO - CIUDAD:", ventasPorCiudad(ventasVacias, "Medellín"));
