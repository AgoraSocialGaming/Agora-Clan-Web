# Fases públicas, fundador y disponibilidad por tienda

La web no afirma que el pre-registro esté abierto ni que una app esté publicada
hasta que `GET /api/v1/config` lo confirma. Este documento fija el contrato que
aplica `public/assets/public-phase.js` (noviembre 2026).

## Contrato de `/api/v1/config`

Campos que usa la landing:

- `signup_enabled` (bool): el acceso público normal está abierto.
- `invite_required` (bool): el acceso exige invitación.
- `preregistration_open` (bool): la ventana de fundador sigue abierta.
- `ios_public_available` (bool): App Store publicada y comprobada.
- `android_public_available` (bool): Google Play publicada y comprobada.

Los flags de tienda son independientes y su valor por defecto es `false`. El
operador solo los pone a `true` después de leer la ficha pública real. Un campo
ausente, `false`, un texto (`"true"`) o cualquier valor que no sea el booleano
`true` deja esa tienda cerrada.

## Reglas de fase

- `registrationOpen = signup_enabled === true && invite_required === false`.
- `phase` describe el acceso al registro: `live`, `preregister`, `upcoming` o
  `unknown`.
- `founderOpen = !registrationOpen && preregistration_open === true`. La
  apertura pública cierra la promoción de fundador aunque el backend todavía no
  haya retirado `preregistration_open`. Los derechos ya reservados no cambian:
  el formulario y las instrucciones de misma cuenta siguen igual.
- `stores.ios` / `stores.android` solo son `true` con `registrationOpen` y el
  flag estricto correspondiente.
- El acceso web/canario puede estar abierto con ambas tiendas cerradas.
- Una tienda puede estar publicada y la otra pendiente: cada enlace, cada botón
  «Próximamente» (`data-store-pending="ios|android"`) y cada copia de
  disponibilidad se resuelve por plataforma.

## Fallos cerrados

- Config inalcanzable, no-200, JSON roto o forma inesperada → `unknown`: sin
  oferta de fundador, sin enlaces de tienda y sin copy de disponibilidad.
- Flags de tienda ausentes o malformados → esa tienda permanece cerrada.
- `IOS_URL`/`ANDROID_URL` vacías en `src/data/site.js` → no se publica ningún
  `href`, aunque el flag sea `true`; se mantiene «Próximamente».
- Los datos estructurados (`src/lib/schema.js`) solo emiten `installUrl` si el
  interruptor estático `APP.stores.android` y `APP.live` están activos. Nunca se
  deduce de que el registro esté abierto.

## Marcado

- `data-phase="live|preregister|upcoming|unknown"`: bloque de fase.
- `data-store-link="ios|android"`: enlace real; empieza `hidden`.
- `data-store-pending="ios|android"`: botón desactivado de esa tienda.
- `data-store-status`: texto de disponibilidad que el runtime reescribe; solo
  nombra una tienda cuando su enlace está realmente listo.
- `data-app-cta`: «Descargar» solo con al menos un enlace real; «Entrar» si el
  acceso está abierto sin tiendas; «Entrar antes» en el resto.

## Rutas que no cambian

`/r` y `/t` conservan su fallback de GitHub Pages, el token/código, la query, el
hash y el destino `app.agoraclan.com`. Privacidad, soporte y eliminación de
cuenta no dependen de esta lógica.
