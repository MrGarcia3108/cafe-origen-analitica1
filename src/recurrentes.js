const generarVentas = require("./generador.js");

function clientesRecurrentes(ventas) {
  const recurrentes = [];

  for (let i = 0; i < ventas.length; i++) {
    for (let j = i + 1; j < ventas.length; j++) {
      if (
        ventas[i].cliente === ventas[j].cliente &&
        !recurrentes.includes(ventas[i].cliente)
      ) {
        recurrentes.push(ventas[i].cliente);
      }
    }
  }

  return recurrentes;
}

const tamanos = [1000, 2000, 4000, 8000, 16000, 100000];

const resultados = [];

for (const n of tamanos) {
  console.log(`\nMidiendo ${n} ventas...`);

  const ventas = generarVentas(n);

  const etiqueta = `clientesRecurrentes con ${n} ventas`;

  console.time(etiqueta);

  const resultado = clientesRecurrentes(ventas);

  console.timeEnd(etiqueta);

  resultados.push({
    ventas: n,
    clientesRecurrentes: resultado.length
  });
}

console.table(resultados);

module.exports = clientesRecurrentes;