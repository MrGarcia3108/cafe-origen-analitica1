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

function mejorSemanaBruta(dias, k) {
    if (!Number.isInteger(k) || k <= 0 || k > dias.length) {
        return null;
    }
    let totalMaximo = -Infinity;
    let diaInicio = 0;
    for (let i = 0; i <= dias.length - k; i++) {
        let total = 0;
        for (let j = i; j < i + k; j++) {
            total += dias[j];
        }
        if (total > totalMaximo) {
            totalMaximo = total;
            diaInicio = i + 1;
        }
    }
    return {
        total: totalMaximo,
        diaInicio: diaInicio
    };
}

function mejorSemana(dias, k) {
    if (!Number.isInteger(k) || k <= 0 || k > dias.length) {
        return null;
    }
    let sumaVentana = 0;
    for (let i = 0; i < k; i++) {
        sumaVentana += dias[i];
    }
    let totalMaximo = sumaVentana;
    let diaInicio = 1;
    for (let i = k; i < dias.length; i++) {
        sumaVentana += dias[i];
        sumaVentana -= dias[i - k];
        if (sumaVentana > totalMaximo) {
            totalMaximo = sumaVentana;
            diaInicio = i - k + 2;
        }
    }
    return {
        total: totalMaximo,
        diaInicio: diaInicio
    };
}

function parMasCercano(precios, presupuesto) {
    const ordenados = [...precios].sort(
        (a, b) => a.precio - b.precio
    );
    let izquierda = 0;
    let derecha = ordenados.length - 1;
    let mejorPar = null;
    let mejorSuma = -Infinity;

    while (izquierda < derecha) {
        const suma =
            ordenados[izquierda].precio +
            ordenados[derecha].precio;
        if (suma > presupuesto) {
            derecha--;
        }
        else {
            if (suma > mejorSuma) {
                mejorSuma = suma;
                mejorPar = [
                    ordenados[izquierda],
                    ordenados[derecha]
                ];
            }
            if (suma === presupuesto) {
                return mejorPar;
            }
            izquierda++;
        }
    }
    return mejorPar;
}

module.exports = {
  clientesRecurrentesSet,
  comprasPorCliente,
  clientesRecurrentesMap,
  comboRegaloFuerzaBruta,
  comboRegalo,
  productoEstrellaPorCiudad,
  primerClienteUnico,
  mejorSemanaBruta,
  mejorSemana,
  parMasCercano
};