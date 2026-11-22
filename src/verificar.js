const ventas = require("./datos.js");
const a = require("./analitica.js");

function verificar(nombre, conCiclo, conMetodo) {
    if (conCiclo === conMetodo) {
        console.log(nombre + "OK");
        console.log("Con ciclo: " ,conCiclo);
        console.log("Con metodo: " ,conMetodo);
    }
    else {
        console.log(nombre + "DIFERENTE");
    }
}

verificar("Total vendido: " ,a.totalVendido(ventas), a.totalVendidoM(ventas));
verificar("Unidades vendidas: " ,a.unidadesVendidas(ventas), a.unidadesVendidasM(ventas));
verificar("Ventas por ciudad: " ,a.ventasPorCiudad(ventas, "Medellín"), a.ventasPorCiudadM(ventas, "Medellín"))