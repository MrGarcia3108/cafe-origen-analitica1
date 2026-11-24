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

function comboRegaloFuerzaBruta(catalogo, valor) {
    for (let i = 0; i < catalogo.length; i++) {
        for (let j = i + 1; j < catalogo.length; j++) {
            if (catalogo[i].precio + catalogo[j].precio === valor) {
                return [catalogo[i], catalogo[j]];
            }
        }
    }
    return null;
}

function comboRegalo(catalogo, valor) {
    const vistos = new Map();
    for (const producto of catalogo) {
        const complemento = valor - producto.precio;
        if (vistos.has(complemento)) {
            return [vistos.get(complemento), producto];
        }
        vistos.set(producto.precio, producto);
    }
    return null;
}

function productoEstrellaPorCiudad(ventas) {
    const ciudades = new Map();

    for (const venta of ventas) {
        const ciudad = venta.ciudad.trim().toLowerCase();
        const producto = venta.producto;
        if (!ciudades.has(ciudad)) {
            ciudades.set(ciudad, new Map());
        }
        const productos = ciudades.get(ciudad);
        if (productos.has(producto)) {
            productos.set(producto, productos.get(producto) + 1);
        }
        else {
            productos.set(producto, 1);
        }
    }

    const resultado = new Map();
    for (const [ciudad, productos] of ciudades) {
        let estrella = null;
        let frecuenciaMayor = 0;
        for (const [producto, frecuencia] of productos) {
            if (frecuencia > frecuenciaMayor) {
                estrella = producto;
                frecuenciaMayor = frecuencia;
            }
        }
        resultado.set(ciudad, estrella);
    }
    return resultado;
}

function primerClienteUnico(ventas) {
    const compras = comprasPorCliente(ventas);
    for (const venta of ventas) {
        if (compras.get(venta.cliente) === 1) {
            return venta.cliente;
        }
    }
    return null;
}


module.exports = {
  clientesRecurrentesSet,
  comprasPorCliente,
  clientesRecurrentesMap,
  comboRegaloFuerzaBruta,
  comboRegalo,
  productoEstrellaPorCiudad,
  primerClienteUnico
};