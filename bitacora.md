# Bitacora

## Reto 1: configuracion y exploracion

### Diccionario de datos

| Propiedad | Tipo | Significado |
|---|---|---|
| id | number | Numero unico de la venta |
| fecha | string | Fecha de la venta |
| cliente | string | Codigo del cliente |
| producto | string | Nombre del producto vendido |
| ciudad | string | Ciudad donde se hizo la venta |
| cantidad | number | Unidades vendidas |
| precio | number | Precio por unidad en pesos |

### Casos borde detectados

1. **Ciudad escrita distinto:** La venta 5 tiene "medellin" en minuscula y las demas "Medellin".
- **Solucion:** Normalizar la ciudades para compararlas o agruparlas.

2. **Cantidad en 0:** La venta 8 tiene cantidad 0.
- **Solucion:** No aceptarla como una venta valida.

3. **Clientes repetidos:** Clientes repetidos.
- **Solucion:** No es necesario eliminarlos, pueden ser compras diferentes y no unos duplicados.

## Reto 2: indicadores con ciclos

### Pseudocodigo

**valorVenta:** devuelvo cantidad × precio de la venta.

**totalVendido:** inicio total en 0.

**unidadesVendidas:** inicio unidades en 0.

**ventaMayor:** si el arreglo esta vacio devuelvo null.

**ticketPromedio:** inicio total en 0 y validas en 0.

**ventasPorCiudad:** la ciudad buscada con trim y toLowerCase.

### Traza 1: total vendido
Se recorrieron los 12 registros y se sumó el valor de cada venta.

| ID | Valor de venta | Total acumulado |
|---:|---:|---:|
| 1 | 84000 | 84000 |
| 2 | 26000 | 110000 |
| 3 | 95000 | 205000 |
| 4 | 42000 | 247000 |
| 5 | 135000 | 382000 |
| 6 | 52000 | 434000 |
| 7 | 120000 | 554000 |
| 8 | 0 | 554000 |
| 9 | 90000 | 644000 |
| 10 | 168000 | 812000 |
| 11 | 95000 | 907000 |
| 12 | 78000 | 985000 |

Resultado: 985000.  

### Traza 2: ventas por ciudad (Medellín)

| ID | Ciudad original | ¿Coincide? | Total acumulado |
|---:|---|---|---:|
| 1 | Medellín | Sí | 84000 |
| 2 | Bogotá | No | 84000 |
| 3 | Cali | No | 84000 |
| 4 | Medellín | Sí | 126000 |
| 5 | medellín | Sí | 261000 |
| 6 | Bogotá | No | 261000 |
| 7 | Bogotá | No | 261000 |
| 8 | Cali | No | 261000 |
| 9 | Cali | No | 261000 |
| 10 | Pereira | No | 261000 |
| 11 | Medellín | Sí | 356000 |
| 12 | Bogotá | No | 356000 |

Resultado: 356000.

## Reto 3: ciclo vs metodos

### totalVendidoM
- Recorro: todas las ventas.
- Filtro: nada.
- Transformo: valor con map.
- Acumulo: iniciando en 0.
- Agrupo: no agrupo.

### unidadesVendidasM
- Recorro: todas las ventas.
- Filtro: nada.
- Transformo: cada venta en su cantidad con map.
- Acumulo: iniciando en 0.
- Agrupo: no agrupo.

### ventasPorCiudadM
- Recorro: todas las ventas.
- Filtro: las de la ciudad buscada.
- Transformo: venta valor con map.
- Acumulo: iniciando en 0.
- Agrupo: no agrupo.

### totalPorCiudad
- Recorro: todas las ventas.
- Filtro: nada.
- Transformo: con trim y toLowerCase, "Bogota" y "Bogota ".
- Acumulo: el valor de cada venta.
- Agrupo: la clave es la ciudad.

### unidadesPorProducto
- Recorro: todas las ventas.
- Filtro: nada.
- Transformo: nada.
- Acumulo: la cantidad de cada venta en las unidades de su producto.
- Agrupo: con un objeto donde la clave es el producto.

### topProductosPorValor
- Recorro: todas las ventas.
- Filtro: con slice.
- Transformo: nada.
- Acumulo: el valor de cada venta.
- Agrupo: con un objeto por producto.

## Reto 4: depuracion de errores reportados

### Error 1: Bogota aparece dos veces

- **Error:** Bogota salia como dos grupos distintos.
- **Entrada:** ventas con ciudad "Bogota" y "Bogota ".
- **Correccion:** en totalPorCiudad uso trim() y toLowerCase() antes de usar la ciudad como clave.

### Error 2: NaN en un dia sin ventas

- **Error:** al filtrar un dia sin ventas daba NaN.
- **Entrada:** un arreglo vacio, por ejemplo las ventas del 2026-09-10.
- **Correccion:** en ticketPromedio, si validas es 0 devuelvo 0.

## Reto 5: generador de datos

### Prediccion

Si n se multiplica por 10:
- totalVendido: las operaciones se multiplican por 10.
- ventaMayor: se multiplican por 10.
- totalPorCiudad: se multiplican por 10.
- primeraVenta: no cambia.

### Resultados de las mediciones

| n | Total vendido | Venta mayor | Total por ciudad | Primera venta |
|---:|---:|---:|---:|---:|
| 100 | 100 | 299 | 200 | 1 |
| 1.000 | 1.000 | 2.999 | 2.000 | 1 |
| 10.000 | 10.000 | 29.999 | 20.000 | 1 |
| 100.000 | 100.000 | 299.999 | 200.000 | 1 |

### Comparacion

Las predicciones coincidieron con los resultados.

- `totalVendidoInstrumentado`: crecimiento lineal. O(n)
- `ventaMayorInstrumentada`: crecimiento lineal. O(n)
- `totalPorCiudadInstrumentado`: crecimiento lineal. O(n)
- `primeraVentaInstrumentada`: accede directamente a la primera posición. O(1)

## Reto 6: ciclos anidados

### Tiempos medidos

| n | Tiempo (ms) |
|---|---|
| 1.000 | 5.435 ms |
| 2.000 | 14.056 ms |
| 4.000 | 49.17 ms |
| 8.000 | 253.287 ms |
| 16.000 | 924.78 ms |

### Estimacion

Cuando n se duplica, el tiempo se multiplica.

Con el tiempo de n = 16.000 (924.78 ms):

Utilizamos los ms de 16000 y dividimos 100000/16000 y el resultado los elevamos a la dos: 39.06

100.000 = 924.78 ms x 39.06 = 36.121 ms = 36.1 seg
1.000.000 = 924.78 ms x 3906.25 = 3.612.421,87 = 60,2 min 

Medicion real con 100.000: 48.968s ms.

### Costo oculto

Revisa los elementos de recurrentes uno por uno hasta encontrar el cliente.

En el peor caso, recurrentes crece mucho y cada includes tiene que recorrer una lista larga.

### Conclusion

El reporte se vuelve lento porque, para saber que clientes repiten compra, el programa compara cada venta con todas las demas.

## MiniReto 7 — Tiempo, memoria y cadenas de métodos

### Funciones construidas

- `totalCiudadCadena(ventas, ciudad)`: utiliza `map`, `filter`, `map` y `reduce`.
- `totalCiudadUnaPasada(ventas, ciudad)`: utiliza un ciclo `for...of` y un acumulador.

### Comprobación

Se generaron 10.000 ventas utilizando `generarVentas(10000)`.
Se ejecutaron ambas funciones con los mismos datos y la ciudad Medellín.
Los resultados fueron iguales:

`resultadoCadena === resultadoUnaPasada`
- Sele le agrego condiciones con `?` "SI" : "NO" 
Resultado de la comparación: `SI`.

### Comparación de recorridos y arreglos

| Característica | Métodos encadenados | Un solo ciclo |
|---|---:|---:|
| Recorridos | 4 | 1 |
| Arreglos intermedios | 3 | 0 |
| Complejidad temporal | O(n) | O(n) |
| Complejidad espacial adicional | O(n) | O(1) |

La versión encadenada realiza cuatro recorridos. Crea tres arreglos intermedios `map`, `filter`, `map` y `reduce` devuelve un valor y no crea un arreglo.

Ambas funciones tienen complejidad temporal lineal, aunque la cantidad de recorridos sea diferente.

### Clasificación espacial del motor

| Función | Complejidad espacial |
|---|---|
| `valorVenta` | O(1) |
| `totalVendido` | O(1) |
| `unidadesVendidas` | O(1) |
| `ventaMayor` | O(1) |
| `ticketPromedio` | O(1) |
| `ventasPorCiudad` | O(1) |
| `totalVendidoM` | O(n) |
| `unidadesVendidasM` | O(1) |
| `ventasPorCiudadM` | O(n) |
| `totalPorCiudad` | O(n) en el peor caso |
| `unidadesPorProducto` | O(n) en el peor caso |
| `topProductosPorValor` | O(n) en el peor caso |
| `ventasDelDia` | O(n) |
| `generarVentas` | O(n) |
| `totalVendidoInstrumentado` | O(1) |
| `ventaMayorInstrumentada` | O(1) |
| `totalPorCiudadInstrumentado` | O(n) en el peor caso |
| `primeraVentaInstrumentada` | O(1) |
| `clientesRecurrentes` | O(n) |
| `totalCiudadCadena` | O(n) |
| `totalCiudadUnaPasada` | O(1) |

### Decisión final

Decidí conservar `totalCiudadUnaPasada()` como implementación principal del motor.
Aunque ambas funciones tienen complejidad temporal O(n), la versión de un solo ciclo necesita memoria adicional O(1), mientras que la versión encadenada necesita O(n).

