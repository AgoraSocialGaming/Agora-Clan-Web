# Auditoría y rediseño de agoraclan.com · noviembre 2026

## 1. Diagnóstico de la web anterior

### Mensaje y contenido
- **No se entendía qué es Ágora en el primer pantallazo.** «Encuentra jugadores y organiza tus torneos» es genérico: lo dice cualquier app de gaming. No aparecían ni los premios reales, ni los torneos oficiales, ni el ranking de temporada, ni las batallas de clanes, ni las tarjetas regalo.
- **Premios reales escondidos** en una línea de la tabla de /torneos y en una respuesta de la FAQ.
- **El programa para comunidades estaba mal colocado**: un párrafo dentro de «Clanes», sin mencionar el pago por jugador.
- **Textos con tono de IA**: «La arena digital», «Sin hojas de cálculo, sin bracket en otra web, sin alguien haciendo de árbitro a mano», tríadas por todas partes, eyebrow + título + regla en cada sección.
- **Exceso de inventario**: la sección de recompensas enseñaba todos los marcos, cofres, emblemas, perfiles y rarezas. Quita las ganas de descubrirlo en la app y alarga la página.
- **Cinta «Los juegos no cambiaron · Nosotros sí · Cero pay-to-win»**: decorativa, no explica nada.
- **/juegos** prometía un «catálogo rotativo» con 10 juegos que no están disponibles (CS2, Fortnite, FC…). Engañoso y sin valor para el usuario.

### UI / UX
- Todas las secciones con la misma plantilla (antetítulo monoespaciado + H2 + intro + raya verde + rejilla de tarjetas). Es justo lo que hace que parezca hecha por IA.
- «Ágora por dentro»: pestañas + móvil pequeño dentro de una tarjeta, con rotación automática. Difícil de leer y se veía apretado.
- Carruseles con flechas para tres tarjetas («Encontrar, competir, progresar»): interacción innecesaria.
- Página de inicio de ~7.800 px en escritorio con 8 bloques y pocos que aportan.
- Formularios: el de comunidades centrado y Gorgo tapando la primera etiqueta.

### Efectos
- **Bug: las apariciones escalonadas no funcionaban.** Los elementos `data-reveal-item` no tenían estado inicial oculto, así que GSAP animaba de «visible» a «visible». Corregido.
- Sin efectos ligados al scroll más allá de aparecer. Ningún momento «wow».

### Mascotas
- Usadas como relleno, sin papel definido.
- **`ladon-senala.png` no es Ladón**: es el marco de cuervos con otro nombre.
- **`styxx-cofre.png` y `styxx-mision.png` tenían fondo blanco**; en /juegos se veía un recuadro blanco sobre fondo oscuro. Recortados con transparencia.

### SEO (estaba bien, se mantiene)
- Base sólida: canonical, OG/Twitter, JSON-LD (Organization, WebSite, MobileApplication, FAQPage, BreadcrumbList), sitemap, robots, alt en todas las imágenes, imágenes optimizadas.
- Mejorable: títulos sin las palabras clave reales del producto («torneos con premios», «torneos para comunidades»), `featureList` del schema desactualizada, /juegos indexada con contenido que no existe.

### Otros
- El pie mostraba `agoragaming99@gmail.com` en vez de `support@agoraclan.com`.

## 2. Qué se ha hecho

### Inicio nuevo (en este orden, cada bloque responde a una pregunta)
1. **Hero** — «Tu comunidad. Tus torneos. Premios reales.» + qué es Ágora en una frase + dos CTA (jugador / creador) + juegos compatibles. Móvil real con avisos flotantes (torneo oficial, tu torneo, tu clan sube), bracket que se dibuja detrás y luz que sigue al ratón.
2. **Premios reales** — bloque dorado, visible desde lejos. Podio con Styxx abriendo su cofre en el 1.º. Incluye las tarjetas regalo por jugar.
3. **Torneos** — oficiales (dorado) frente a personalizados (verde) + franja de batallas (amigos, aleatoria, clan contra clan).
4. **Comunidades** — «¿Tienes comunidad? Tráela a Ágora.» Pago por jugador, clan ampliado y torneos con tu nombre. Programa de lanzamiento, plazas limitadas.
5. **Ranking de temporada** — tabla individual / clanes (cambia sola) y recompensas exclusivas de fin de temporada.
6. **Progresión** — misiones diarias con barras que se llenan, nivel y una muestra corta de recompensas. «El resto, mejor descúbrelo dentro.»
7. **Así se ve Ágora** — 5 pantallas reales en fila escalonada con parallax (carrusel en móvil).
8. **Pre-registro / descarga** — el mismo bloque por fases de antes (no se ha tocado la lógica).
9. **Dudas** — 6 preguntas clave y enlace a la FAQ.

### Sistema visual propio
- Etiqueta de sección con forma de **nodo de bracket** ( ]─ ) en lugar del antetítulo genérico.
- **Un color por personaje y por tema**: dorado = premios, verde Gorgo = comunidades, naranja Ladón = ranking y batallas, azul Styxx = progresión.
- Paneles con borde degradado, grano fino de fondo, botón dorado solo para premios.
- Mascotas con entrada «elástica» al aparecer su sección.

### Mascotas, con papel fijo
| Mascota | Papel | Dónde |
|---|---|---|
| **Styxx** (azul) | El jugador: compite, gana, progresa | Podio de premios, misiones, torneos oficiales, pre-registro |
| **Gorgo** (verde) | El estratega: organiza, trae a su gente | Comunidades, torneos personalizados, FAQ |
| **Ladón** (naranja) | El rival chulo: ranking y pique | Ranking de temporada, 404 |

### Otras páginas
- **/torneos**: reescrita. Oficiales, personalizados (4 pasos), batallas, cómo se resuelve una partida, juegos compatibles y dudas.
- **/comunidad**: ahora es la página del programa para creadores, con el formulario fijo al lado.
- **/faq**: preguntas reescritas y ampliadas (oficiales vs personalizados, premios reales, tarjetas regalo, ranking, batallas, Agora Relics, programa de comunidades). Un único fichero de datos (`src/data/faq.js`) para el inicio y /faq.
- **/juegos**: eliminada del menú. Redirige a `/torneos#juegos`, `noindex` y fuera del sitemap.
- **Menú**: Inicio · Torneos · Comunidades · Descargar · FAQ.
- **Pie**: `support@agoraclan.com`.

### No se ha tocado
- Política de privacidad, /soporte, eliminación de cuenta, deep links (`/r`, `/t`, `.well-known`), lógica de fases de `public-phase.js`.

### SEO
- Título del inicio: «Ágora: torneos para tu comunidad con premios reales».
- Descripciones nuevas en inicio, /torneos, /comunidad y /faq.
- `featureList` del schema actualizada con las funciones reales.
- Schema `ItemList` de juegos en /torneos y `FAQPage` actualizado.

## 3. Sobre pagar por traer comunidades

**Recomendación: sí, pero dirigido a creadores y sin cifra pública.**
- Es el gancho más fuerte para el lanzamiento y quien tiene comunidad tiene que verlo en el inicio. Por eso hay un bloque propio y un botón «Tengo una comunidad» en el hero.
- No publicar el importe: lo da en privado al apuntarse («Te contamos las condiciones al apuntarte»). Así puedes cambiarlo, negociar con creadores grandes y cerrar el programa sin dejar promesas públicas.
- Se presenta como «programa de lanzamiento · plazas limitadas»: crea urgencia y deja claro que se acaba.
- En las condiciones privadas: pagar solo por usuario **verificado/activo** (cuenta de juego vinculada o primera partida), para evitar registros falsos.

## 4. Decisiones tomadas (ronda 2)

1. **Tarjetas regalo**: se consiguen jugando torneos. La web dice «cada torneo que juegas suma para canjear tarjetas regalo», ganes o no.
2. **Ranking**: se queda la tabla de ejemplo en HTML.
3. **/comunidad tiene dos caminos**:
   - **Amplía tu clan** (formulario): para quien ya tiene clan en Ágora y necesita más de las 25 plazas normales. «Clan» y «usuario» en Ágora son opcionales.
   - **Programa de creadores** (correo): para quien trae a su comunidad desde fuera y quiere cobrar por jugador. Botón que abre un correo a `support@agoraclan.com` con asunto y plantilla. Las condiciones se cierran por correo, caso a caso; la web no publica importes ni promete un sistema automático.
4. **/soporte y documentos legales**: se quedan con su contacto actual por ahora.

## 5. Ronda 3

1. **Estado «bloqueado» en /descargar**: si `/api/v1/config` falla (en local siempre, por CORS; en producción, puntualmente), la web ahora reintenta dos veces, muestra un mensaje neutro y mantiene visibles los botones de App Store y Google Play como «Próximamente» desactivados. Solo se activan con enlace cuando la app está publicada.
2. **Botón de cabecera**: «Descargar» (antes «Ver disponibilidad»). Con el pre-registro abierto muestra «Entrar antes».
3. **Modos de competir**: torneos oficiales (premios reales, los más grandes), batallas con amigos (amistosas o con apuesta), batallas aleatorias (matchmaking) y batallas de clan. Las de clan suman al ranking de clanes; el resto, al individual. Los torneos personalizados van aparte.
4. **ID de juego**: es obligatorio en todos los juegos; la verificación por API oficial solo cuando el juego la tiene.
5. **Juegos**: Brawl Stars, Clash Royale, League of Legends y Valorant son los de los **torneos oficiales**; los personalizados admiten muchos más. Fuera la sección «Dónde se compite».
6. Revisión completa de textos: sin «entre medias», sin frases genéricas, cada bloque dice qué es y para qué sirve.

## 6. Ronda 4

1. **Botón de cabecera fijo en «Entrar antes»** desde el HTML: ya no cambia de texto mientras se consulta la config. Solo pasa a «Descargar» cuando la app está publicada.
2. **iPhone**: `viewport-fit=cover` + franja opaca bajo la barra de estado; ya no se ve el contenido por encima de la cabecera. `theme-color` pasa a `#101016`.
3. **Cabecera en móvil**: se esconde al bajar (queda solo la línea de progreso) y vuelve al subir. En escritorio no cambia.
4. **Posicionamiento para todos los jugadores, no solo creadores**:
   - Título: «Ágora: app de torneos gaming con premios reales».
   - H1: «Torneos. Clanes. Premios reales.»
   - Descripción y textos generales: «la app de torneos para jugadores, clanes y comunidades».

## 7. Pendiente

- Imagen OG (`public/img/og/default.png`): conviene una nueva con el mensaje de premios reales.
- Capturas reales de ranking, batallas de clanes, canje de tarjetas regalo y torneo oficial cuando estén, para sustituir la tabla de ejemplo.
