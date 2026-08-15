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

---

# Revisión 5 — el fallo de GitHub Pages y repaso completo

## El fallo que viste
La web estaba publicada en `usuario.github.io/Agora-Clan-Web/`, o sea dentro de una **carpeta**,
pero todos los enlaces a CSS, JS e imágenes apuntaban a la raíz del dominio. Resultado: 404 en
todos los recursos y el HTML sin estilos (eso morado era el logo SVG sin CSS).

Arreglado de raíz y para los dos escenarios:
- `astro.config.mjs` lee `SITE_URL` y `BASE_PATH` del entorno.
- El workflow usa `actions/configure-pages`, que detecta si hay dominio propio configurado y
  pasa la base correcta. Con dominio → `/`; sin dominio → `/Agora-Clan-Web`.
- Nuevo ayudante `src/lib/url.js` y **todos** los enlaces internos pasan por él (páginas,
  cabecera, pie, menú móvil, favicons, manifest, sitemap y el fallback de `/r/CODIGO`).
- La URL canónica y el `og:image` se calculan desde `Astro.site`, así que nunca apuntan a una
  URL que no existe.
- Probado compilando de las dos formas: con base `/` y con base `/Agora-Clan-Web/`.

## Sitemap
No está en el repositorio porque **se genera al compilar**. Además del `sitemap-index.xml` de
Astro, ahora `scripts/postbuild.mjs` deja también un `sitemap.xml` clásico, que es el que busca
todo el mundo. Los dos aparecen en `robots.txt`.

## Escritorio
- Los carruseles (cómo funciona, perfiles, marcos, cómo se resuelve una partida) dejaban las
  tarjetas con ancho de móvil en pantallas grandes. Ahora, a partir de `lg`, el carrusel se
  convierte en rejilla: las tarjetas reparten el ancho completo y desaparecen flechas y
  degradados. En móvil se sigue deslizando igual.
- La FAQ ocupaba los 1.250 px de ancho y las preguntas quedaban lejísimos del icono; ahora va a
  un máximo de 4xl.

## Auditoría (sin un solo aviso pendiente)
- 6 páginas: un `<h1>` por página, jerarquía de encabezados sin saltos, canonical, `og:image`,
  `lang="es"` y JSON-LD válido en todas.
- Todas las imágenes con `alt` y con `width`/`height` (nada de saltos de maquetación al cargar).
- Cero enlaces rotos y cero anclas inexistentes.
- Títulos ≤ 60 caracteres y descripciones entre 70 y 160.
- Accesibilidad: ningún botón o enlace sin nombre accesible, `target="_blank"` siempre con `rel`,
  y añadidas etiquetas a los desplegables de mes y año del pre-registro.
- JavaScript del cliente comprobado sintácticamente tras el build.

---

# Revisión 6

1. **/juegos · «Y más en Ágora»**: ahí salía un marco de pájaros porque el archivo
   `ladon-senala.png` contenía en realidad ese marco, no la mascota. Archivo eliminado y
   sustituido por Styxx con el cofre.
2. **Recompensas (inicio)**: la antigua «Tu vitrina» pasa a ser una sección ordenada en tres
   pasos numerados —01 tu perfil, 02 los cofres, 03 qué puedes conseguir— con el bloque 03 en
   pestañas (Marcos · Emblemas · Títulos · Relics) para que ocupe poco en móvil y en PC.
   - **Emblemas**: los tres tiers (madera, plata, oro) con la lista de misiones del PDF
     (La Voz, El Juez, Gladiador, Campeón, Racha, Duelista, Publicador, Reclutador).
   - **Títulos**: agrupados por rareza (básicos, épicos, legendarios).
   - **Relics**: la moneda, con su imagen, para qué sirve y de dónde sale.
3. **Cofres**: fuera el titular «se ganan, no se compran». Ahora los tres en fila con el de Oro
   en el centro, más grande y resaltado en dorado. Fuera también «lo que sale de los cofres».
4. **Menú móvil**: vuelve a marcarse en verde la página actual. Se había roto al publicar en una
   subcarpeta: la ruta llevaba delante `/Agora-Clan-Web` y no coincidía con `/torneos`. Ahora se
   descuenta la base antes de comparar.
5. **Carátulas de juegos**: estaban intercambiadas Brawl Stars y League of Legends. Corregido.
   Nota: la portada de los dos reyes es la de **Clash Royale** (la de Clash of Clans es el
   bárbaro), así que esa se ha dejado como estaba.
6. **Flechas de los carruseles**: de la derecha a la izquierda, en todos.

---

# Revisión 7

## 1 · El formulario
El mensaje «No hemos podido conectar» sale cuando la llamada a
`https://api.agoraclan.com/api/v1/preregister` **ni siquiera llega al servidor**. Con el dominio
todavía sin apuntar, `api.agoraclan.com` no resuelve, así que el navegador corta antes de pedir
nada. La otra causa posible, si la API ya existe, es CORS: tiene que responder
`Access-Control-Allow-Origin` con el origen desde el que se abre la web
(`https://agorasocialgaming.github.io` ahora, `https://agoraclan.com` después) y aceptar el
preflight `OPTIONS`.

Mientras tanto:
- El endpoint se puede cambiar sin tocar código: variable `PUBLIC_FORM_ENDPOINT` al compilar.
- La llamada corta a los 12 s en vez de dejar el botón bloqueado.
- Los errores se distinguen: 409 usuario cogido, 400/422 datos mal, otros muestran el código real.
- El fallo de red se escribe en la consola con la URL exacta, y al usuario se le ofrece escribir
  a support@agoraclan.com para que no se pierda la reserva.

## 2 · Orden y proporciones
Todas las páginas comparten ahora el mismo ritmo: cabecera de sección → contenido `mt-12`,
bloques internos `mt-12`, hero → párrafo `mt-6` → botones `mt-8`. Y los paddings de tarjeta se
unifican en `p-6 sm:p-7`.

## 3 · Modalidades desplegables
Las tres tarjetas de /torneos se pliegan: se ve el icono, el nombre y el gancho, con una pastilla
«Ver más» y una flecha con un latido suave que invita a tocarla. Al abrir, el cuerpo crece con una
transición de altura real. Añadida una cuarta: **Torneos personalizados**, con individual, por
equipos o entre clanes, generación y actualización automática del bracket, reglas, invitación por
enlace y arbitraje desde el mismo panel.

## 4 · Fuera la tarjeta «Regla inviolable».

## 5 · Pre-registro y comunidad más compactos
Las tres recompensas pasan a una fila de tres tarjetas finas (en móvil solo icono y nombre, con un
desplegable «Qué incluye cada cosa»). El formulario pierde textos de ayuda redundantes y aprieta
paddings. En «Trae tu comunidad», las ventajas y los pasos se convierten en filas finas en móvil y
recuperan formato tarjeta en escritorio.

## 6 · Efectos también en móvil
Con GSAP + ScrollTrigger, que ya estaban en el proyecto:
- **Barra de progreso** de lectura en la cabecera.
- **Parallax** con scrub, que funciona igual con el dedo que con la rueda.
- **Flotación en bucle** de los móviles del hero y de las mascotas.
- **Respuesta al toque**: botones y tarjetas se hunden un poco al pulsar, porque en móvil no hay
  hover que valga.
Todo respeta `prefers-reduced-motion`.
