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
