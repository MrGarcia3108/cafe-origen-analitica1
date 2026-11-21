const ventas = require('./datos.js');

// cantidad de datos
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
console.table(ventas);