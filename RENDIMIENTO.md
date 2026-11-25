# Informe de rendimiento — Café Origen Analítica v1.0

## Clasificación de funciones

| Función | Tiempo | Espacio | Justificación |
|---|---|---|---|
| valorVenta | O(1) | O(1) | Una multiplicación. |
| totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad | O(n) | O(1) | Un recorrido sin arreglos adicionales. |
| totalVendidoM, ventasPorCiudadM | O(n) | O(n) | Crean arreglos intermedios. |
| unidadesVendidasM | O(n) | O(1) | Utiliza reduce con un acumulador. |
| totalPorCiudad | O(n) | O(k) | Agrupa por ciudad. |
| unidadesPorProducto | O(n) | O(p) | Agrupa por producto. |
| topProductosPorValor | O(n + p log p) | O(p) | Agrupa y ordena los productos. |
| ventasDelDia | O(n) | O(n) | Filtra las ventas. |
| generarVentas | O(n) | O(n) | Genera n registros. |
| totalVendidoInstrumentado, ventaMayorInstrumentada | O(n) | O(1) | Recorren y cuentan operaciones. |
| totalPorCiudadInstrumentado | O(n) | O(k) | Agrupa y cuenta operaciones. |
| primeraVenta, primeraVentaInstrumentada | O(1) | O(1) | Acceso directo al primer elemento. |
| clientesRecurrentes | O(n³), peor caso | O(c) | Ciclos anidados y uso de includes. |
| totalCiudadCadena | O(n) | O(n) | Crea tres arreglos intermedios. |
| totalCiudadUnaPasada | O(n) | O(1) | Un recorrido y un acumulador. |
| clientesRecurrentesSet | O(n) | O(c) | Registra clientes mediante Set. |
| comprasPorCliente, clientesRecurrentesMap | O(n) | O(c) | Conteo de frecuencias con Map. |
| comboRegaloFuerzaBruta | O(m²) | O(1) | Compara pares de productos. |
| comboRegalo | O(m) | O(m) | Búsqueda de complementos con Map. |
| productoEstrellaPorCiudad | O(n) | O(n) | Conteo de frecuencias con Map anidados. |
| primerClienteUnico | O(n) | O(c) | Conteo de compras y segundo recorrido. |
| mejorSemanaBruta | O(d · w) | O(1) | Recalcula cada ventana. |
| mejorSemana | O(d) | O(1) | Reutiliza la suma anterior. |
| parMasCercano | O(m log m) | O(m) | Ordenamiento y dos punteros. |
| mostrarResumenDia | O(n) | O(n) | Filtra y calcula indicadores. |
| analisisOriginal | O(n³ + d · w) | O(n) | Ejecuta algoritmos originales. |
| analisisOptimizado | O(n + d) | O(n) | Utiliza algoritmos optimizados. |

## Proyección para 1.000.000 de ventas

| Ventas | Clientes recurrentes |
|---|---|
| 1.000 | 265 |
| 2.000 | 539 |
| 4.000 | 1066 |
| 8.000 | 2129 |
| 16.000 | 4287 |
| 100.000 | 26678 |

Estimación original bajo un modelo cuadrático:

- 924,78 ms × 3906,25 = 3.612.421,875 ms.
- Tiempo estimado: 60,2 minutos.

Al pasar de 10.000 a 1.000.000 de ventas:

- O(1): tiempo multiplicado por 1.
- O(n): tiempo multiplicado por 100.
- O(n²): tiempo multiplicado por 10.000.
- O(n³): tiempo multiplicado por 1.000.000.

## Riesgos

- clientesRecurrentes realiza comparaciones cuadráticas.
- topProductosPorValor y parMasCercano requieren ordenamiento.
- Las funciones que crean arreglos intermedios utilizan memoria O(n).
- Map y Set necesitan memoria adicional para almacenar clientes y frecuencias.
- Generar cantidades demasiado grandes de ventas puede aumentar considerablemente.

## Optimizaciones implementadas

| Problema | Estrategia | Antes | Después |
|---|---|---|---|
| Total por ciudad | Una sola pasada | O(n) espacio | O(1) espacio |
| Clientes recurrentes | Set y Map | O(n³) peor caso | O(n) esperado |
| Combo de regalo | Complementos con Map | O(m²) | O(m) esperado |
| Producto estrella | Map de frecuencias | — | O(n) esperado |
| Primer cliente único | Map y dos recorridos | — | O(n) esperado |
| Mejor semana | Ventana deslizante | O(d · w) | O(d) |
| Presupuesto corporativo | Dos punteros | O(m²) por fuerza bruta | O(m log m) |

### MiniReto 9 — Clientes recurrentes

| Ventas | Original (ms) | Set (ms) | Map (ms) |
|---|---|---|---|
| 1.000 | 11.913ms | 0.538ms | 1.103ms |
| 10.000 | 921.988ms | 3.142ms | 3.918ms |
| 100.000 | No ejecutado, alto costo | 28.5ms | 63.926ms |

### MiniReto 11 — Mejor semana

| Días | Fuerza bruta (ms) | Ventana deslizante (ms) | Iguales |
|---|---|---|---|
| 30 | 0.318ms | 0.329ms | SI |
| 100.000 | 6.005ms | 2.78ms | SI |

### MiniReto 12 — Comparación integrada de algoritmos

| Ventas | Original (ms) | Optimizado (ms) | Mejora |
|---|---|---|---|
| 10.000 | 883.502 ms | 2.630 ms | 335.92x |
| 100.000 | No ejecutado | 35.300 ms | No medida |

## Comparación del reporte v0.1 vs. v1.0

La versión v0.1 incluía los análisis básicos. La versión v1.0 incorpora clientes recurrentes, producto estrella, combos de regalo, cliente para cupón, mejor semana y presupuesto corporativo.


