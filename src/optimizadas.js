function clientesRecurrentesSet(ventas) {
  const vistos = new Set();
  const recurrentes = new Set();

  for (const venta of ventas) {
    const cliente = venta.cliente;
    if (vistos.has(cliente)) {
      recurrentes.add(cliente);
    } else {
      vistos.add(cliente);
    }
  }
  return [...recurrentes];
}

function comprasPorCliente(ventas) {
  const compras = new Map();

  for (const venta of ventas) {
    const cliente = venta.cliente;
    if (compras.has(cliente)) {
      compras.set(cliente, compras.get(cliente) + 1);
    } else {
      compras.set(cliente, 1);
    }
  }
  return compras;
}

function clientesRecurrentesMap(ventas) {
  const compras = comprasPorCliente(ventas);
  const recurrentes = [];

  for (const [cliente, cantidad] of compras) {
    if (cantidad > 1) {
      recurrentes.push(cliente);
    }
  }

  
  return recurrentes;
}

module.exports = {
  clientesRecurrentesSet,
  comprasPorCliente,
  clientesRecurrentesMap
};