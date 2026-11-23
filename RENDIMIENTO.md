# Informe de rendimiento — Café Origen Analítica v0.2

## Clasificación de funciones

| Funcion | Que hace | Tiempo | Espacio | Justificacion | Con 10.000 ventas |
|---|---|---|---|---|---|
| valorVenta | Multiplica cantidad por precio de una venta | O(1) | O(1) | Una sola multiplicacion| 1 operacion |
| totalVendido | Suma el valor de todas las ventas | O(n) | O(1) | solo usa la variable total | 10.000 operaciones |
| unidadesVendidas | Suma todas las ventas | O(n) | O(1) | solo usa la variable unidades | 10.000 operaciones |
| ventaMayor | Devuelve la venta de mayor valor | O(n) | O(1) | compara en cada vuelta | 20.000 operaciones |
| ticketPromedio | Valor ventas validas | O(n) | O(1) | solo usa dos variables | 10.000 operaciones |
| ventasPorCiudad | Total vendido en una ciudad | O(n) | O(1) | solo usa la variable total | 10.000 operaciones |
| totalVendidoM | Con map y reduce | O(n) | O(n) | map crea un arreglo y reduce lo recorre | 2 recorridos |
| unidadesVendidasM | Con map y reduce | O(n) | O(n) | map crea un arreglo y reduce lo recorre | 2 recorridos |
| ventasPorCiudadM | Con filter, map y reduce | O(n) | O(n) | filter recorre y crea un arreglo, map y reduce recorren el arreglo | 3 recorridos |
| totalPorCiudad | Por cada ciudad | O(n) | O(k) | el objeto tiene una clave por ciudad distinta | 20.000 operaciones |
| unidadesPorProducto | Por cada producto | O(n) | O(p) | el objeto tiene una clave por producto | 10.000 operaciones |
| topProductosPorValor | Los productos que mas dinero generan | O(n + p log p) | O(p) | para agrupar y un sort las listas de Object.entries, la copia ... y slice | 10.000 operaciones |
| ventasDelDia | Resumen de un dia | O(n) | O(n) | filtrar, y luego totalVendido y ticketPromedio | 3 recorridos |
| clientesRecurrentes | Clientes que compraron mas de una vez | O(n^2) | O(c) | Ciclos anidados que comparan cada venta, |  |
| totalCiudadCadena | Con map, filter, map y reduce | O(n) | O(n) | Hace recorridos y crea arreglos | 4 recorridos, 3 arreglos |
| totalCiudadUnaPasada | Total de una ciudad | O(n) | O(1) | y solo la variable total | 10.000 operaciones |

## Proyección para 1.000.000 de ventas

| (index) | ventas | clientesRecurrentes |
| :--- | :--- | :--- |
| 0 | 1000 | 265 |
| 1 | 2000 | 539 |
| 2 | 4000 | 1066 |
| 3 | 8000 | 2129 |
| 4 | 16000 | 4287 |
| 5 | 100000 | 26678 |

- Estimacion para 1.000.000 de ventas: 1.000.000 = 924.78 ms x 3906.25 = 3.612.421,87 = 60,2 min 

Las proyecciones teóricas son:

- O(1): tiempo medido multiplicado por 1.
- O(n): tiempo medido multiplicado por 100.
- O(n²): tiempo medido multiplicado por 10.000.
- O(n³): tiempo medido multiplicado por 1.000.000.

## Riesgos

1. **clientesRecurrentes:** es O(n^2). Si n se duplica, el tiempo se cuadruplica, y con 1.000.000 de ventas tardaria una hora.
2. **topProductosPorValor:** recorre las ventas y ademas ordena la lista.
3. **totalCiudadCadena, ventasPorCiudadM, totalVendidoM, unidadesVendidasM y ventasDelDia:** su tiempo es O(n), pero su memoria tambien es O(n).
4. **totalPorCiudad y unidadesPorProducto:** son O(n) en tiempo y su memoria depende de cuantas ciudades o productos hay.
5. **Funciones O(n) en tiempo y O(1)** (totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, totalCiudadUnaPasada): crecen en linea recta.
6. **valorVenta:** O(1), sin riesgo.

## Plan de optimización

### Función prioritaria: `clientesRecurrentes()`

**Trabajo que se repite:**

- Comparar una venta con otras ventas.
- Buscar repetidamente si un cliente ya está registrado.
- Volver a recorrer registros.

**Propuesta de mejora:**

Utilizar un objeto para llevar un registro de las compras de cada cliente.
Se podría guardar cuántas veces aparece cada cliente.
Utilizando memoria adicional O(n).