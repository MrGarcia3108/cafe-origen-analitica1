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

