const generarVentas = require("./generador.js");

function totalCiudadCadena(ventas, ciudad) {

    const Buscada = ciudad.trim().toLowerCase();
    return ventas
    .map(v => ( {
        ...v,
        ciudad: v.ciudad.trim().toLowerCase()
    }))
    .filter(v => v.ciudad === Buscada)
    .map(v => v.cantidad * v.precio)
    .reduce((acum, valor) => acum + valor, 0);
}

function totalCiudadUnaPasada(ventas, ciudad) {

  const Buscada = ciudad.trim().toLowerCase();
  let total = 0;
  for (const v of ventas) {
    const ciudadVenta = v.ciudad.trim().toLowerCase();
    if (ciudadVenta === Buscada) {
        total += v.cantidad * v.precio;
    }
  }
  return total;
}

const ventas = generarVentas(10000);

const resultadoCadena = totalCiudadCadena(ventas, "Medellín");

const resultadoUnaPasada = totalCiudadUnaPasada(ventas, "Medellín");

console.log("Resultado con métodos:", resultadoCadena);

console.log("Resultado con un ciclo:", resultadoUnaPasada);

console.log("¿Los resultados son iguales?", ((resultadoCadena === resultadoUnaPasada) ? "SI" : "NO"));


module.exports = {
  totalCiudadCadena,
  totalCiudadUnaPasada
};