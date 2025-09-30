# Entrega: Diseño de la Interfaz (5 pantallas)

Este documento sirve como guía y plantilla para preparar la evidencia (capturas + fragmentos de código) que demuestran el cumplimiento del criterio: "Implementación en código de la interfaz gráfica con al menos cinco pantallas funcionales".

---
## 1. Pantallas Seleccionadas
| Nº | Pantalla | Ruta URL | Archivos Principales | Propósito UX | Elementos que mostrar en captura |
|----|----------|---------|----------------------|--------------|----------------------------------|
| 1 | Home / Landing | `/` | `pages/home/home.html / .ts / .css` | Entrada y navegación | Hero, botones de acceso rápido |
| 2 | Reservaciones (Catálogo) | `/reservaciones` | `pages/reservaciones/reservaciones.ts / .html / .css` | Exploración categorías y modales | Tabs/categorías, filtros, modal abierto |
| 3 | Pagos (Flujo Multi-paso) | `/pagos?concepto=...&monto=...` | `pages/pagos/pagos.ts / .html / .css` | Proceso de conversión | Paso 2 (datos) y paso 4 (confirmación) |
| 4 | Mis Reservas | `/mis-reservas` | `pages/mis-reservas/*` | Historial y estados | Lista con estados (pendiente/pagado) |
| 5 | Panel Admin Reservas (si añadimos) o Contacto | `/admin/reservas` (admin) / `/contacto` | `pages/contact/contact.*` o admin nuevo | Gestión global o formulario | Tabla global / formulario completo |

> Nota: Si aún no implementamos Panel Admin, usar la pantalla de **Contacto** como 5ª evidencia (formulario + info + redes).

---
## 2. Estructura de Evidencia en el Informe Final
Para cada pantalla:
1. Título (H2) con nombre de la pantalla.
2. Captura (imagen incrustada). Nombre de archivo: `0X-nombre.png`.
3. Tabla corta de metadatos:
   - Ruta: `/...`
   - Objetivo UX
   - Componentes involucrados (solo nombres de archivos clave)
4. Fragmentos de código (solo lo esencial):
   - HTML (hasta 20–25 líneas relevantes)
   - TypeScript (solo métodos o signals que afectan la UI visible en la captura)
   - CSS (clases principales: layout / colores / badges)
5. Observaciones de interacción: qué puede hacer el usuario ahí.
6. Criterio de aceptación cumplido (checkbox o ✅).

Ejemplo (markdown dentro del informe):
```markdown
## Pantalla 2: Reservaciones
**Ruta:** /reservaciones  
**Objetivo UX:** permitir explorar y pre-reservar recursos turísticos en múltiples categorías.  
**Componentes:** reservaciones.ts, reservaciones.html, reserva.service.ts

![Catálogo](/evidencias/02-reservaciones.png)

### Código (extracto - HTML)
```html
<!-- Categorías -->
<div class="categorias" *ngFor="let cat of categorias"> ... </div>
<!-- Modal de detalle -->
<div class="modal" *ngIf="modalAbierto()"> ... </div>
```
```ts
// Signals para filtros y tipo seleccionado
modalAbierto = signal(false);
modalTipo = signal<'sitio'|'hotel'|'restaurante'|'vehiculo'|'transporte'|null>(null);
```
**Observaciones:** Se muestran filtros por ciudad + modal con mapa embed.  
**Estado:** ✅ Cumple.
```

---
## 3. Captura de Pantallas (Buenas Prácticas)
| Aspecto | Recomendación |
|---------|---------------|
| Resolución | 1920x1080 (o 1366x768 si tu pantalla no da más). |
| Limpieza | Oculta barra de marcadores y paneles dev. |
| Consistencia | Todas las capturas con mismo tamaño y sin recortes dispares. |
| Modo | Tema claro/oscuro consistente (usa el actual). |
| Resaltado | Evitar subrayar a mano; si es necesario, usa un borde sutil o numeración sobrepuesta. |

### Herramientas sugeridas
- Windows: Recorte y Anotación (Shift + Win + S) → Guardar en `/evidencias`.
- Alternativa: Extensión Chrome "Full Page Screen Capture" (solo si necesitas scroll completo).

Estructura de carpeta sugerida:
```
/evidencias
  01-home.png
  02-reservaciones.png
  03-pagos-paso2.png
  03-pagos-paso4.png
  04-mis-reservas.png
  05-contacto.png (o 05-admin.png)
```
> Si una pantalla requiere dos fases (ej: Pagos), nombra `03a` / `03b` o añade sufijo `-paso2`.

---
## 4. Selección de Código (Criterios)
Incluye SOLO lo que evidencie:
- Uso de signals / estado reactivo.
- Control de flujo (switch de pasos, modal abierto, validaciones).
- Interacción con servicios (llamada a `reservaService.add()` o `updateEstado`).

Evita pegar archivos completos; resume secciones irrelevantes con `// ...`.

Ejemplo de reducción:
```ts
// ...imports
export class PagosComponent {
  paso = signal(1);
  monto = signal(0);
  continuar() {
    if (this.paso() === 4) { /* procesa pago */ }
    // ...
  }
}
```

---
## 5. (Opcional) Automatizar Capturas con Puppeteer
Script Node para generar imágenes automáticamente (requiere que la app corra en http://localhost:4200):
```bash
npm install --save-dev puppeteer
```
`scripts/capturas.js`:
```js
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const rutas = [
  { url: 'http://localhost:4200/', nombre: '01-home.png' },
  { url: 'http://localhost:4200/reservaciones', nombre: '02-reservaciones.png' },
  { url: 'http://localhost:4200/pagos?concepto=Test&monto=10', nombre: '03-pagos-paso2.png' },
  { url: 'http://localhost:4200/mis-reservas', nombre: '04-mis-reservas.png' },
  { url: 'http://localhost:4200/contacto', nombre: '05-contacto.png' }
];

(async () => {
  const outDir = path.join(__dirname, '..', 'evidencias');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (const r of rutas) {
    await page.goto(r.url, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(outDir, r.nombre), fullPage: true });
    console.log('Capturada:', r.nombre);
  }
  await browser.close();
})();
```
Ejecución:
```bash
node scripts/capturas.js
```

---
## 6. Checklist Final para la Entrega
| Ítem | OK |
|------|----|
| 5 pantallas con captura | ☐ |
| Código relevante debajo de cada captura | ☐ |
| Tabla de mapeo ruta ↔ archivo | ☐ |
| Mostrar flujo reserva→pago→mis reservas | ☐ |
| Consistencia visual (colores / tipografía) | ☐ |
| Estados de reserva visibles | ☐ |
| Archivo final (PDF / Word) consolidado | ☐ |

---
## 7. Integración al Informe Global
Puedes agregar una sección "ANEXO A: Evidencias de Interfaz" y pegar cada bloque. Si el informe principal es en Word, inserta las imágenes y debajo usa bloques de código (o cambia fuente a monoespaciada).

---
## 8. Próximos Ajustes (si hay tiempo extra)
- Añadir badges de colores en Mis Reservas (si no existen ya en el momento de la captura).
- Incluir un mini gráfico (placeholder) de conteo de reservas por estado en Admin (si se implementa).
- Generar versión reducida (1 página) sólo con miniaturas + tabla de referencia.

---
**Fin de la guía.**
