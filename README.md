# Café Origen Analítica v1.0

## Descripción

Es un motor de análisis de ventas que transforma registros de ventas en información.
El proyecto permite analizar ingresos, productos, ciudades, clientes y tendencias de ventas mediante algoritmos.

## Características

- Análisis de ventas originales y datos simulados.
- Generación de grandes cantidades de registros.
- Reporte comercial integrado desde la terminal.
- Identificación de clientes recurrentes.
- Conteo de frecuencias por ciudad y producto.
- Búsqueda de combinaciones de productos.
- Análisis de períodos consecutivos de ventas.
- Medición y comparación del rendimiento de algoritmos.
- Validación de argumentos y pruebas de casos borde.

## Requisitos

- Node.js.
- Git.
- Terminal de comandos.

## Instalación

Clonar:

```bash
git clone URL_DEL_REPOSITORIO cafe-origen-analitica
cd cafe-origen-analitica
```

Node.js esté instalado:

```bash
node --version
```

## Cómo ejecutar el proyecto

Todos los comandos deben ejecutarse desde la raíz del repositorio.

### Reporte con los datos originales

```bash
node src/reporte.js
```

### Reporte con 10.000 ventas generadas

```bash
node src/reporte.js 10000
```

## Preguntas que responde el motor

| Sección | Pregunta comercial |
|---|---|
| Resumen general | ¿Dinero  vendido, cuántas unidades y cuál es el ticket promedio? |
| Ventas por ciudad | ¿Dinero genera cada ciudad? |
| Unidades por producto | ¿Cuántas unidades se venden de cada producto? |
| Top 3 productos | ¿Productos que generan mayores ingresos? |
| Consulta de días | ¿Resultados de una fecha específica? |
| Clientes recurrentes | ¿Clientes han realizado más de una compra? |
| Producto estrella | ¿Producto con más apariciones por ciudad? |
| Combo de regalo | ¿Productos suman exactamente $87.000? |
| Cliente para cupón | ¿Primer cliente que compró una vez? |
| Mejor semana | ¿Siete días con mayores ventas? |
| Presupuesto corporativo | ¿Combinación de productos aprovecha mejor? |
| Rendimiento | ¿Cuánto tiempo tarda en ejecutarse? |

## Estructura del proyecto

```text
cafe-origen-analitica/
├── src/
│   ├── datos.js
│   ├── analitica.js
│   ├── explorar.js
│   ├── verificar.js
│   ├── reporte.js
│   ├── generador.js
│   ├── instrumentadas.js
│   ├── medir.js
│   ├── recurrentes.js
│   ├── totalCiudad.js
│   ├── optimizadas.js
│   └── catalogo.js
├── README.md
├── RENDIMIENTO.md
└── bitacora.md
```

## Responsabilidad de los archivos

| Archivo | Descripción |
|---|---|
| datos.js | Registros originales de ventas. |
| analitica.js | Funciones generales. |
| explorar.js | Exploración inicial. |
| verificar.js | Pruebas de funcionamiento y casos borde. |
| reporte.js | Reporte v1.0. |
| generador.js | Generación de ventas. |
| instrumentadas.js | Funciones para contar operaciones. |
| medir.js | Comparaciones de rendimiento. |
| recurrentes.js | Algoritmo original. |
| totalCiudad.js | Comparación de recorridos. |
| optimizadas.js | Algoritmos optimizados con Map, Set, ventana deslizante y dos punteros. |
| catalogo.js | Catálogo de productos. |
| RENDIMIENTO.md | complejidades, mediciones y proyecciones. |
| bitacora.md | Registro. |

