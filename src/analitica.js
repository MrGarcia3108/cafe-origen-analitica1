const ventas = require('./datos.js');

/* function valorVenta(venta) {
    return venta.cantidad * venta.precio;
} */    

const valorVenta = (venta) => venta.cantidad * venta.precio;

// total vendido

function totalVendido(ventas) {
    let total = 0;
    for (const v of ventas) {
        total += valorVenta(v);
    }
    return total;
}

function unidadesVendidas(ventas) {
    let total = 0;
    for (const v of ventas) {
        total += v.cantidad;
    }
    return total;
}

function ventaMayor(ventas) {
    let mayor = null;
    for (const v of ventas) {
        if (mayor === null || valorVenta(v) > valorVenta(mayor)) {
            mayor = v;
        }
    }
    return mayor;
}

function ticketPromedio(ventas) {
    let total = 0;
    let validas = 0;
    for (const v of ventas) {
        if (v.cantidad > 0) {
            total += valorVenta(v);
            validas++;
        }
    }
    return validas === 0 ? 0 : total / validas ; 
}
function ventasPorCiudad(ventas, ciudad) {
    const buscada = ciudad.trim().toLowerCase();
    let total = 0;
    for (const v of ventas) {
        if (v.ciudad.trim().toLowerCase() === buscada) {
            total += valorVenta(v);
        }
    }
    return total
}

// Con Metodos

function totalVendidoM(ventas) {
    return ventas
    .map((v) => valorVenta(v))
    .reduce((acum, v) => acum + v, 0);
}

function unidadesVendidasM(ventas) {
    return ventas
    .map((v) => v.cantidad)
    .reduce((acum, v) => acum + v , 0);
}

function ventasPorCiudadM(ventas, ciudad){
    const buscada = ciudad.trim().toLowerCase();
    return ventas
    .filter((v) => v.ciudad.trim().toLowerCase() === buscada)
    .map((v) => valorVenta(v))
    .reduce((acum, v) => acum + v, 0);
}

/* function totalPorCiudad(ventas) {
    const total = {}
    for (const v of ventas) {
        const ciudad = v.ciudad.trim().toLowerCase();
        if (total[ciudad] === undefined) 
            total[ciudad] = 0;
            total[ciudad] += valorVenta(v);
    }
    return total;
} */
function totalPorCiudad(ventas) {
  return ventas.reduce((acum, v) => {
    const ciudad = v.ciudad.trim().toLowerCase();
    acum[ciudad] = (acum[ciudad] || 0) + valorVenta(v);
    return acum;
  }, {});
}

function unidadesPorProducto(ventas) {
    return ventas.reduce((acum, v) => {
        acum[v.producto] = (acum[v.producto] || 0) + v.cantidad;
        return acum;
    }, {});
}

function topProductosPorValor(ventas, k) {
    const porProducto = ventas.reduce((acum, v) => {
        acum[v.producto] = (acum[v.producto] || 0) + valorVenta(v);
        return acum;
    }, {});
    return Object.entries(porProducto)
    .sort((a, b) => b[1] - a[1])
    .slice(0 , k)
    .map(([producto, valor]) => ({ producto, valor }));
} 


console.log(totalPorCiudad(ventas));
console.log(unidadesPorProducto(ventas));
console.log(topProductosPorValor(ventas));

module.exports = {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM
};

/* // cantidad de datos
console.log("numero de datos");
console.log(ventas.length);

// primero
console.log("primero");
console.log(ventas[0]);

// ultimo
console.log("ultimo");
console.log(ventas[ventas.length - 1]);

// propiedad producto de la posicion 4
console.log("producto posicion 4");
console.log(ventas[4].producto);

// todas las ventas
console.log("todas las ventas");
console.table(ventas); */