# agoraclan.com → GitHub Pages

El DNS lo llevas en Cloudflare y ahora mismo el dominio raíz apunta a Hostinger. Hay que cambiar
tres cosas del DNS y una de GitHub. El correo, la API y los subdominios **no se tocan**.

---

## 1 · Cloudflare (DNS)

### Borrar
| Tipo | Nombre | Contenido actual | Por qué |
|---|---|---|---|
| A | `agoraclan.com` | `34.120.137.41` | Es el servidor de Hostinger |
| AAAA | `agoraclan.com` | `2600:1901:0:84ef::` | Igual, IPv6 de Hostinger |
| NS | `agoraclan.com` | `ns1.dns-parking.com` | Sobra: manda Cloudflare |
| NS | `agoraclan.com` | `ns2.dns-parking.com` | Igual |

### Crear (los cuatro, con **Solo DNS**, nube gris)
| Tipo | Nombre | Contenido | Proxy |
|---|---|---|---|
| A | `@` | `185.199.108.153` | Solo DNS |
| A | `@` | `185.199.109.153` | Solo DNS |
| A | `@` | `185.199.110.153` | Solo DNS |
| A | `@` | `185.199.111.153` | Solo DNS |

Opcional, IPv6 (mismo criterio, Solo DNS): `2606:50c0:8000::153`, `2606:50c0:8001::153`,
`2606:50c0:8002::153`, `2606:50c0:8003::153` como registros `AAAA` de `@`.

> El proxy naranja tiene que estar **apagado** en estos registros. Con el proxy activado GitHub no
> puede validar el dominio ni emitir el certificado.

### Editar
| Tipo | Nombre | Antes | Ahora | Proxy |
|---|---|---|---|---|
| CNAME | `www` | `connect.hostinger.com` | `agorasocialgaming.github.io` | Solo DNS |

### No tocar nada de esto
- **Correo**: los `MX` de Hostinger, el `SPF`, el `DMARC`, los DKIM de `hostingermail-a/b/c`,
  `autoconfig`, `autodiscover`, y todo lo de `send.agoraclan.com` (Amazon SES).
- **Servicios**: `api`, `staging-api` (Railway), `app`, `admin` (Pages.dev) y `assets` (R2).
- **CAA**: ya tienes `letsencrypt.org` con `issue` e `issuewild`, que es justo lo que necesita
  GitHub Pages para el certificado. Déjalos como están.
- El `TXT` de `google-site-verification`.

---

## 2 · GitHub

1. **Settings → Pages → Custom domain**: escribe `agoraclan.com` y pulsa guardar.
2. Espera al «DNS check successful» (suele tardar entre unos minutos y una hora).
3. Marca **Enforce HTTPS** en cuanto se pueda pulsar.
4. **Actions → Desplegar en GitHub Pages → Run workflow**. Este paso importa: al detectar el
   dominio, el sitio se recompila con la base `/` y las URLs canónicas pasan a `agoraclan.com`.

El repositorio ya trae `public/CNAME` con el dominio, así que cada despliegue lo mantiene y no se
pierde la configuración.

---

## 3 · Comprobar que ha ido bien

- `https://agoraclan.com` carga con estilos.
- `https://www.agoraclan.com` redirige al dominio sin www.
- `https://agorasocialgaming.github.io/Agora-Clan-Web/` redirige a `agoraclan.com`.
- Ver código fuente: los enlaces tienen que poner `/_astro/…` (sin `/Agora-Clan-Web/` delante).
- En Search Console, envía `https://agoraclan.com/sitemap.xml`.

---

## 4 · El formulario: rectifico el diagnóstico

Viendo tu DNS, `api.agoraclan.com` **ya existe** (CNAME a Railway, con proxy de Cloudflare). Así
que el problema no es que el dominio no resuelva: es que el navegador bloquea la respuesta o el
servidor no contesta como espera el formulario. Por orden de probabilidad:

1. **CORS.** La API tiene que devolver
   `Access-Control-Allow-Origin: https://agorasocialgaming.github.io` (y después
   `https://agoraclan.com`), y responder al preflight `OPTIONS` con
   `Access-Control-Allow-Methods: POST, OPTIONS` y `Access-Control-Allow-Headers: Content-Type`.
   Sin eso, el navegador tira la respuesta y el `fetch` falla sin decir por qué.
2. **La ruta.** El formulario llama a `POST /api/v1/preregister` con
   `{ "username", "email", "birth_date": "AAAA-MM" }`. Si tu API espera otra ruta u otros campos,
   dímelo y lo cambio.
3. **El servicio dormido.** Si el proyecto de Railway está en pausa, la primera llamada puede
   tardar más de lo que aguanta el navegador.

Para verlo en un segundo: abre la web, pulsa F12 → pestaña **Red**, envía el formulario y mira la
línea de `preregister`. Si pone «CORS error» es el punto 1; si pone 404 es el 2; si se queda en
«pending» y muere, es el 3.

Mientras tanto puedes apuntar el formulario a otro sitio sin tocar código, compilando con la
variable `PUBLIC_FORM_ENDPOINT`.
