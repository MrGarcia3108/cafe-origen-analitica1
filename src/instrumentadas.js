
function totalVendidoInstrumentado(ventas, contador) {
  let total = 0;
  for (const venta of ventas) {
    contador.operaciones++;
    total += venta.cantidad * venta.precio;
  }
  return total;
}

function ventaMayorInstrumentada(ventas, contador) {
  let mayor = null;
  for (const venta of ventas) {
    contador.operaciones++;
    contador.operaciones++;
    if (mayor === null) {
      mayor = venta;
    } else {
      contador.operaciones++;
      if (
        venta.cantidad * venta.precio >
        mayor.cantidad * mayor.precio
      ) {
        mayor = venta;
      }
    }
  }
  return mayor;
}

function totalPorCiudadInstrumentado(ventas, contador) {
  const totales = {};
  for (const venta of ventas) {
    contador.operaciones++;
    const ciudad = venta.ciudad.trim().toLowerCase();
    contador.operaciones++;
    if (totales[ciudad] === undefined) {
      totales[ciudad] = 0;
    }
    totales[ciudad] += venta.cantidad * venta.precio;
  }
  return totales;
}

function primeraVenta(ventas) {
  return ventas[0] || null;
}

function primeraVentaInstrumentada(ventas, contador) {
  contador.operaciones++;
  return ventas[0] || null;
}

module.exports = {
  totalVendidoInstrumentado,
  ventaMayorInstrumentada,
  totalPorCiudadInstrumentado,
  primeraVenta,
  primeraVentaInstrumentada
};
