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



module.exports = {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad
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