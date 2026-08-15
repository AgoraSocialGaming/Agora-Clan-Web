# Web de Ágora Clan

Sitio estático en **Astro 5 + Tailwind 4**, preparado para GitHub Pages con dominio propio
(agoraclan.com). Genera HTML puro: nada de framework en el cliente salvo las animaciones.

---

## Poner en marcha

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera /dist
npm run preview  # sirve /dist
```

## Desplegar

Se publica solo en **GitHub Pages** con el workflow `.github/workflows/deploy.yml`: cada push a
`main` compila y publica `dist`. Los pasos completos, con los registros DNS, están en
[`DESPLIEGUE.md`](./DESPLIEGUE.md).

---

## Dónde se cambia cada cosa

| Qué | Fichero |
|---|---|
| Nombre, URL, descripción, redes, menú | `src/data/site.js` |
| Enlaces de App Store y Google Play | `src/data/site.js` → `APP` |
| Endpoint del formulario, edad mínima, plazas | `src/data/site.js` → `FORM` |
| Catálogo de juegos | `src/data/juegos.js` |
| Marcas oficiales en SVG | `src/data/brand-marks.js` (paquete `simple-icons`) |
| Colores, tipografías, espaciados | `src/styles/global.css` (bloque `@theme`) |
| Animaciones y efectos | `src/lib/motion.js` |
| Datos estructurados (schema.org) | `src/lib/schema.js` |

### Cuando salgáis en las tiendas

En `src/data/site.js`:

```js
export const APP = {
  live: true,
  ios: 'https://apps.apple.com/es/app/...',
  android: 'https://play.google.com/store/apps/details?id=com.agoraclan.app',
};
```

Los botones de «Próximamente» pasan solos a botones de descarga y el CTA de la
cabecera cambia de texto.

---

## Páginas

- `/` — recorrido completo del producto
- `/torneos` — las tres modalidades, el flujo de una partida y crear torneos
- `/juegos` — títulos de lanzamiento y catálogo rotativo
- `/descargar` — estado de las tiendas y pre-registro
- `/faq` — preguntas frecuentes filtrables
- `/404`

Los legales apuntan a `agoraclan.com/terminos-y-politicas` (fuera de este sitio) y
solo aparecen en el pie.

---

## SEO

- Meta, canonical, Open Graph y Twitter Card por página.
- JSON-LD: `Organization`, `WebSite`, `MobileApplication`, `FAQPage` y `BreadcrumbList`.
- `sitemap-index.xml` y `robots.txt` generados en el build.
- `hreflang` preparado con `es-ES` y `x-default`. Cuando entréis en LATAM se añaden
  `es-MX` y `en` en `src/components/seo/BaseHead.astro` sin tocar la arquitectura.
- Imágenes: todas pasan por `astro:assets`, que genera WebP en varios tamaños con
  `srcset` y carga diferida. Las 19 MB de originales se sirven como unos pocos
  cientos de KB.

### Antes de publicar

- Verifica los datos estructurados en <https://search.google.com/test/rich-results>.
- Da de alta el dominio en Google Search Console y envía el sitemap.
- Sustituye `public/img/og/default.png` si quieres otra imagen al compartir enlaces.

---

## Assets

Todo vive en `src/assets/`, organizado por tipo:

```
brand/     logos
mascotas/  Styxx, Gorgo y Ladón
cofres/    madera, plata, oro
marcos/    Pionero, Rise, Dragón, Segador, Cuervos, Heraldo, Bosque
app/       capturas de la app
juegos/    carátulas
```

Para añadir un juego con carátula: mete el fichero en `src/assets/juegos/`,
añade la entrada en `src/data/juegos.js` y referencia el import en
`src/pages/juegos.astro` e `index.astro`.

### Sobre las carátulas de juegos

Las cuatro carátulas de lanzamiento son las que ya usáis en la app. Para el
catálogo rotativo, las tarjetas se construyen con el color de marca de cada
juego y su logotipo oficial en SVG (paquete `simple-icons`, iconos bajo CC0),
más una versión ampliada de fondo. Si en algún momento conseguís licencia o
material de prensa de esos títulos, basta con añadir el fichero a
`src/assets/juegos/` y un campo `cover` a la entrada: la tarjeta lo usa sin
tocar nada más.

---

## Formulario de pre-registro

Envía un `POST` en JSON a `FORM.endpoint`:

```json
{ "username": "...", "email": "...", "birth_date": "AAAA-MM" }
```

Espera `200` para mostrar la pantalla de éxito. Si responde error, muestra
`error.message` o `detail` bajo el campo de usuario.

Valida en cliente: usuario de 3 a 20 caracteres (letras, números, `_` y `.`),
correo con formato válido, edad mínima según `FORM.minAge` y consentimiento RGPD
obligatorio.

---

## Librerías de movimiento

Elegidas a conciencia, no por inercia:

| Librería | Para qué | Peso |
|---|---|---|
| **Lenis** | Scroll con inercia sin romper `position: sticky` | ~3 KB |
| **GSAP + ScrollTrigger** | Apariciones escalonadas y contadores | gratis desde 2025 |
| **Atropos** | Inclinación 3D real de los mockups con ratón y dedo | ~2 KB |

**Nada de parallax de scroll en los mockups.** Un móvil que sube y baja solo al
hacer scroll no significa nada. En su lugar, los mockups reaccionan al puntero
con inclinación 3D y profundidad por capas: en el hero, los tres móviles están
en el mismo plano y se separan con `data-atropos-offset`, así que el del centro
sale hacia delante y los laterales se hunden. Con `prefers-reduced-motion` o en
pantallas táctiles el efecto no se activa.

## Componentes reutilizables

| Componente | Qué hace |
|---|---|
| `ui/Tilt.astro` | Envoltorio 3D. Todo lo que va dentro con `data-atropos-offset` gana profundidad |
| `ui/PhoneMockup.astro` | Marco de móvil con muesca y brillo de cristal |
| `ui/Rail.astro` | Carrusel horizontal con snap, flechas y degradados de borde |
| `ui/Section.astro` | Cabecera de sección con antetítulo, título y regla |
| `ui/Icon.astro` | Iconos propios en SVG |
| `ui/BrandMark.astro` | Logotipos oficiales de terceros |
| `sections/AppShowcase.astro` | Explorador de pantallas con pestañas y rotación automática |
| `sections/Preregistro.astro` | Formulario conectado al backend |

## Accesibilidad y rendimiento

- Enlace de salto al contenido, foco visible y navegación por teclado.
- `prefers-reduced-motion` respetado: se desactivan scroll suave, inclinación 3D y apariciones.
- El explorador de pantallas es un `tablist` completo: navegable con flechas del teclado y con `aria-selected` sincronizado.
- Los archivos de `/_astro` llevan hash en el nombre, así que se cachean de forma indefinida.
