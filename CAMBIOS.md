# Ágora web · revisión de agosto 2026

## 1. Explorador de la app («Ágora por dentro»)
- Cabecera reescrita: eyebrow «La app», título «Ágora por dentro», sin frases rebuscadas.
- Cada apartado admite **varias capturas** (hay pantallas que no caben en una sola):
  - **Inicio**: racha y misiones + publicación del feed.
  - **Arena**: torneos y modos + amistoso/competitivo.
  - **Perfil**: marco y título + logros y estadísticas (capturas nuevas).
- Se puede **deslizar con el dedo** sobre el móvil (o arrastrar con el ratón).
- Avance automático más ágil: 3,6 s por captura (antes 5,2 s). Al tocar o deslizar se para
  9 s y vuelve solo; antes se paraba para siempre.
- Puntos inferiores: uno por apartado, con una marca por captura.

## 2. «Tu vitrina»
- Fuera la captura del perfil de Brawl Stars (esa vive ahora solo en /juegos, donde tiene sentido).
- Entra un carrusel con **cuatro variantes del mismo perfil** (Rey de la Arena, Habitante del
  Olimpo, Berserker, Señor de la Guerra), recortadas al avatar + marco + título + fondo.

## 3. Menú móvil
- Rueda radial eliminada. Ahora es un panel que baja desde arriba con: logo, cerrar, una fila
  por sección (icono + nombre + descripción), la página actual marcada en verde con etiqueta
  «Aquí», botón de pre-registro y redes.
- Bloquea el scroll de fondo (también el suave de Lenis) y se cierra con Esc, tocando fuera,
  al pulsar un enlace o al pasar a escritorio.

## 4. «Tengo una comunidad» → sección propia en /torneos#comunidad
- Explica la oferta: clan gratuito con límite de miembros mucho más amplio, recompensas para
  ti y para los tuyos, torneos con tu marca y acompañamiento en el primero.
- Tres pasos (escríbenos → montamos el clan → lanzas tu torneo) + CTA a support@agoraclan.com.
- Enlazada desde el home (teaser de torneos y bloque de clanes) y con pregunta propia en la
  FAQ y en el schema (SEO).

## 5. /descargar
- Un único mockup (bienvenida) con Styxx y el estandarte al lado, solapando solo un pelín.
- Fuera la segunda captura casi idéntica y el segundo mascota del bloque de redes.

## 6. Cofres y marcos
- Ya no ocupan dos secciones enteras: van resumidos en dos tarjetas dentro de «Tu vitrina»,
  con la explicación completa (qué son, cómo se consiguen, que los cofres no se compran).

## 7. Mockups
- Ninguna captura se repite en toda la web:
  feed → home · feed-misiones, feed-post, arena-modos, modo-juego, clanes, perfil, perfil-stats
  → explorador · bienvenida → descargar · perfil-juegos → juegos.
- /torneos ya no usa móviles: su visual es un cuadro de eliminatorias en SVG que se dibuja solo.

## 8. Longitud
- Ritmo vertical reducido (secciones un 20 % más cortas en móvil).
- /torneos: flujo de 7 pasos a 5 en rejilla, fuera el bloque repetido de cofres y el de
  antitrampas con mascotas, tablas de modalidades más cortas.
- Home: cofres y marcos fusionados con el perfil, clanes y comunidad en una sola sección,
  mascotas más compactas.

## Archivos nuevos
- `src/assets/app/perfil-stats.png`
- `src/assets/personalizacion/perfil-oro.png`, `perfil-olimpo.png`, `perfil-berserker.png`,
  `perfil-richards.png`

---

# Revisión 2

1. **/torneos**: sección «Juego limpio» eliminada por completo.
2. **Carruseles en vez de listas infinitas**: «Cómo se resuelve una partida» (/torneos) y
   «Encontrar, competir, progresar» (home) ahora son carruseles horizontales con flechas.
3. **Sección «El universo» (personajes) eliminada** del home. Las mascotas siguen apareciendo
   integradas: Styxx en el pre-registro y en /descargar, Gorgo en el bloque de comunidad.
4. **Hero**: «acumula un perfil» → «mejora tu perfil con cada partida»; «Tres verbos, una app»
   → «Todo esto y más en una app».
5. **Trío bajo el hero**: Encuentra · Amigos y equipo / Compite · En torneos / Mejora · Tu perfil.
6. **Mockups del hero**: tres pantallas distintas (clanes, inicio y perfil) en abanico y
   bastante más pequeñas.
7. **Recompensas**: cofres en fila pequeña con su explicación y, debajo, los marcos en carrusel.
8. **Sin repeticiones**: fuera el teaser «Tres formas de competir» del home (ya está en
   /torneos) y fuera la pestaña Clanes del explorador (esa captura vive ahora en el hero).
   El home queda en 8 secciones: hero, cómo funciona, la app por dentro, vitrina y recompensas,
   clanes y comunidad, juegos, pre-registro y dudas.

---

# Revisión 3

## 1. Sección «Ágora por dentro»
- Mockup bastante más pequeño (218 px) y **todo dentro de una sola tarjeta**: pestañas arriba,
  y debajo explicación + móvil + puntos. Ya no parecen tres bloques sueltos.
- Cuatro pestañas en orden: **Inicio · Arena · Clanes · Perfil**.
- Captura nueva de Inicio y captura nueva de Clanes (las que enviaste).
- El hero pasa a mostrar tres pantallas que no salen en ningún otro sitio: misiones y racha,
  perfil de jugador y juegos vinculados.

## 2. Favicon
- Generado desde el logo verde que enviaste: `favicon.svg`, `favicon.ico` (16/32/48),
  `favicon-16`, `favicon-32`, `icon-192`, `icon-512`, `icon-maskable-512` (Android) y
  `apple-touch-icon` 180 con fondo de marca. Manifest actualizado.

## 3. SEO
- **Nombres de archivo descriptivos**: todas las capturas pasan a `agora-app-*.png`
  (`agora-app-inicio`, `agora-app-arena-torneos`, `agora-app-clanes`, `agora-app-perfil`,
  `agora-app-perfil-estadisticas`, `agora-app-misiones-racha`, `agora-app-partida-modo`,
  `agora-app-feed-publicacion`, `agora-app-juegos-vinculados`, `agora-app-id-verificado`) y los
  perfiles de personalización a `agora-perfil-*.png`.
- **Alt revisados uno a uno**: 0 imágenes sin alt en las 6 páginas; logo y carátulas con alt
  descriptivo en vez de genérico.
- **Títulos y descripciones** dentro de límite (títulos ≤ 60, descripciones ≤ 160).
- **robots.txt** ampliado (bloquea /404, permite GPTBot, ClaudeBot y PerplexityBot, apunta al
  sitemap).
- **sitemap-index.xml + sitemap-0.xml** con prioridades reales: home 1.0, torneos y descargar
  0.9, juegos 0.8, faq 0.6. Enlazado también con `<link rel="sitemap">`.
- **JSON-LD** ampliado: MobileApplication con featureList, screenshot e image, además de
  Organization, WebSite, BreadcrumbList y FAQPage por página.
- Comprobado: un solo `<h1>` por página, canonical correcto en todas, todos los enlaces y
  anclas internas válidos, y `noindex` solo en el 404.

---

# Revisión 4

1. **GitHub Pages**: fuera `netlify.toml`. Queda el workflow `.github/workflows/deploy.yml`
   (push a `main` → compila y publica), `public/CNAME` con agoraclan.com, `.nojekyll` y la guía
   `DESPLIEGUE.md` con DNS incluido. Los enlaces de referido `/r/CODIGO` se resuelven desde el
   404 por JavaScript, ya que Pages no tiene redirecciones de servidor.
2. **Home**: eliminada la sección «Dudas rápidas» entera. También se quita el `FAQPage` del
   JSON-LD de la home, porque Google penaliza marcar preguntas que no se ven en la página.
   Las FAQ siguen en /faq, /torneos y /descargar, donde sí están visibles.
3. **Rise**: el Pack Fundador da **7 días de Rise**, no un mes. Cambiado en el pre-registro
   (tarjeta, texto y mensaje de confirmación), en los pasos de /descargar y en las
   descripciones SEO. La tarjeta de Rise ahora dice «7 días de Rise · Con insignia y marco
   exclusivos», sin repetirlo en otro sitio. Actualizadas las imágenes de la insignia y del
   marco Rise con las nuevas.
4. **Juegos**: «Con estos cuatro se empieza» → **«Juegos en el lanzamiento»** (también en la
   home). Fuera «arrancamos»: ahora es «empezamos». Y se añade que el catálogo rota cada
   temporada y que puedes crear tus torneos en cualquier juego que esté en la wiki de Ágora.
