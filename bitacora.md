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

## MiniReto 9: Optimización de clientes recurrentes

### Entender el problema
La función original utiliza ciclos anidados para encontrar clientes recurrentes,e l objetivo es procesar 100.000 ventas en menos de un segundo.

### Analizar ejemplos
Con los datos del Día 1, los clientes recurrentes esperados son C01, C02 y C03, porque aparecen más de una vez.

### Fuerza bruta
La solución original compara cada venta con las demás. La cantidad de comparaciones crece de forma cuadrática y el uso de `includes()` puede aumentar su costo.

### Optimizar

- **Set:** detectar clientes repetidos y evitar duplicados.
- **Map:** contar las compras de cada cliente e identificar aquellos con más de una compra.

### Implementar

Archivo `optimizadas.js` con las funciones `clientesRecurrentesSet()`, `comprasPorCliente()` y `clientesRecurrentesMap()`. También `verificar.js` y `medir.js`.

### Probar
Las tres versiones entregan los mismos resultados, 5.000 ventas generadas y los casos borde.

### Mediciones de rendimiento

| Ventas | Original | Set | Map |
|---|---|---|---|
| 1.000 | 14.649ms | 0.499ms | 1.108ms |
| 10.000 | 951.907ms | 4.703ms | 5.808ms |
| 100.000 | No se ejecuta, tiene un alto costo de ejecucion | 67.27ms | 66.372ms |

## MiniReto 10: Combos y frecuencias

### Traza del combo de $87.000

| Precio actual | Complemento | ¿Existe en Map? |
|---|---|---|
| 26.000 | 61.000 | No |
| 42.000 | 45.000 | No |
| 45.000 | 42.000 | Sí |

Resultado esperado: Origen Huila 500 g y Origen Sierra 500 g.

### Conteo de frecuencias

- Utilicé un Map por ciudad para contar las apariciones de cada producto.
- Para encontrar el primer cliente único, reutilicé `comprasPorCliente()`.

### Complejidades

| Función | Tiempo | Espacio |
|---|---|---|
| comboRegaloFuerzaBruta | O(n²) | O(1) |
| comboRegalo | O(n) | O(n) |
| productoEstrellaPorCiudad | O(n) | O(n) |
| primerClienteUnico | O(n) | O(n) |

## MiniReto 11: La mejor racha y el presupuesto

### Traza

Primera ventana: [320, 410, 280, 390, 510, 620, 700] 300 290
Total: 3230.

Segunda ventana: 320 [410, 280, 390, 510, 620, 700, 300] 290
Total: 3230 - 320 + 300 = 3210.

Tercera ventana: 320 410 [280, 390, 510, 620, 700, 300, 290]
Total: 3210 - 410 + 290 = 3090.

### Traza: presupuesto de $100.000

| Izquierda | Derecha | Suma | Acción |
|---|---|---|---|
| 18.000 | 120.000 | 138.000 | Derecha-- |
| 18.000 | 95.000 | 113.000 | Derecha-- |
| 18.000 | 79.000 | 97.000 | Guardar, izquierda++ |
| 26.000 | 79.000 | 105.000 | Derecha-- |
| 26.000 | 45.000 | 71.000 | Izquierda++ |
| 35.000 | 45.000 | 80.000 | Izquierda++ |
| 42.000 | 45.000 | 87.000 | Izquierda++ |

Resultados esperados:
- $100.000: combinación de $97.000.
- $140.000: combinación exacta de $140.000.
- $40.000: null.

### Complejidades

| Función | Tiempo | Espacio |
|---|---|---|
| mejorSemanaBruta | O(n · k) | O(1) |
| mejorSemana | O(n) | O(1) |
| parMasCercano | O(n log n) | O(n) |

### Mediciones

| Días | bruta | deslizante |
|---|---|---|
| 30 | 0.207ms | 0.245ms |
| 100.000 | 3.445ms | 1.23ms |

## Día 3 - MiniReto 12: Lanzamiento Café Origen v1.0

### Objetivo

Integrar las funciones optimizadas en un reporte final, comparar el rendimiento de las versiones v0.1 y v1.0 y documentar el producto para su entrega.

### Método de resolución

1. **Entender:** identificar las funcionalidades que debía incluir el reporte final.
2. **Ejemplificar:** ejecutar el reporte con datos originales y ventas generadas.
3. **Solución inicial:** reutilizar el reporte desarrollado durante el Día 1.
4. **Optimizar:** integrar las funciones eficientes de los MiniRetos 9, 10 y 11.
5. **Implementar:** utilizar process.argv, integrar módulos y medir el tiempo de ejecución.
6. **Verificar:** comprobar resultados, rendimiento y funcionamiento desde un clon limpio.

### Implementación

Actualicé reporte.js conservando las secciones originales e incorporando clientes recurrentes, producto estrella por ciudad, combo de regalo, cliente para cupón, mejor semana y presupuesto corporativo.

Utilicé process.argv para seleccionar entre los datos originales y las ventas generadas. También incorporé process.hrtime.bigint() para medir el tiempo de ejecución.

En medir.js agregué una comparación integrada entre los algoritmos originales y los optimizados.

### Resultados esperados

| Indicador | Resultado |
|---|---|
| Total vendido | $985.000 |
| Unidades vendidas | 21 |
| Clientes recurrentes | C01, C02 y C03 |
| Combo de regalo | $87.000 |
| Cliente para cupón | C04 |
| Mejor semana | Del 24 al 30 de septiembre |
| Total de mejor semana | $3.670.000 |
| Presupuesto corporativo utilizado | $97.000 |

### Verificación final

- Reporte con datos originales: pendiente de confirmar.
- Reporte con 10.000 ventas: pendiente de confirmar.
- Reporte con 100.000 ventas: pendiente de confirmar.
- Tiempo de ejecución inferior a cinco segundos: pendiente de medir.
- Comparación v0.1 vs. v1.0: pendiente de registrar.
- Clon limpio: pendiente de verificar.

### Aprendizaje

Comprendí cómo integrar diferentes módulos en un producto funcional, recibir argumentos desde la terminal y medir el rendimiento de un programa completo.

## Resumen 12 MiniRetos

| MiniReto | Trabajo realizado |
|---|---|
| 1 | Creación del repositorio, exploración de datos y diccionario de información. |
| 2 | Desarrollo de funciones mediante ciclos y condicionales. |
| 3 | Uso de map, filter, reduce, agrupaciones y rankings. |
| 4 | Verificación de resultados y creación del reporte v0.1. |
| 5 | Generación de ventas y conteo de operaciones. |
| 6 | Identificación de clientes recurrentes mediante fuerza bruta. |
| 7 | Comparación de métodos encadenados y recorridos de una sola pasada. |
| 8 | Análisis de complejidades, rendimiento y proyecciones. |
| 9 | Optimización de clientes recurrentes mediante Set y Map. |
| 10 | Búsqueda de complementos y conteo de frecuencias mediante Map. |
| 11 | Implementación de ventana deslizante y dos punteros. |
| 12 | Integración, documentación y preparación del lanzamiento v1.0. |

## Estrategias 

| Problema | Estrategia | Beneficio |
|---|---|---|
| Total por ciudad | Una sola pasada | Menor uso de memoria. |
| Clientes recurrentes | Set y Map | Evitar comparaciones entre pares. |
| Combo de regalo | Map de complementos | Encontrar combinaciones. |
| Producto estrella | Map de frecuencias | Contabilizar. |
| Primer cliente único | Map y dos recorridos | Evitar búsquedas repetidas. |
| Mejor semana | Ventana deslizante | Reutilizar las sumas anteriores. |
| Presupuesto corporativo | Dos punteros | Descartar combinaciones. |
| Reporte final | Integración de algoritmos eficientes | Procesar grandes cantidades de datos. |