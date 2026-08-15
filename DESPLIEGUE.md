# Subir Ágora a GitHub Pages

La web es estática y el repositorio ya trae todo lo necesario. El workflow detecta solo si
está publicada en el dominio propio o en la URL de proyecto de GitHub y compila en consecuencia,
así que **no se rompe en ninguno de los dos casos**.

## Lo que ya viene hecho
- `.github/workflows/deploy.yml`: en cada push a `main` compila con Node 22 y publica `dist`.
  Usa `actions/configure-pages`, que le dice a Astro la URL y la carpeta base reales
  (`SITE_URL` y `BASE_PATH`).
- `public/CNAME` con `agoraclan.com`.
- `.nojekyll` (si no, Pages ignora la carpeta `/_astro` por empezar con guion bajo).
- `scripts/postbuild.mjs`: genera `sitemap.xml` (copia del índice de Astro) y el `.nojekyll`.
- Enlaces internos con el ayudante `src/lib/url.js`, que respeta la carpeta base.
- `404.html` propio. Como Pages no tiene redirecciones de servidor, los enlaces de referido
  `/r/CODIGO` se resuelven ahí en el navegador y acaban en `/descargar?ref=CODIGO`.

## Pasos
1. Sube el repositorio a GitHub (rama `main`).
2. **Settings → Pages → Source: GitHub Actions**.
3. **Settings → Pages → Custom domain**: `agoraclan.com`. Guarda y, cuando GitHub lo valide,
   marca **Enforce HTTPS**.
4. En el DNS del dominio (Hostinger):

   | Tipo | Nombre | Valor |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `TU-USUARIO.github.io` |

   Opcional (IPv6): registros `AAAA` de `@` a `2606:50c0:8000::153`, `2606:50c0:8001::153`,
   `2606:50c0:8002::153` y `2606:50c0:8003::153`.

   Borra cualquier registro A o CNAME anterior del dominio que apunte a otro sitio.
5. Espera a que GitHub emita el certificado (de minutos a un par de horas) y vuelve a lanzar
   el workflow: al detectar el dominio propio recompila con la base `/` y las URLs canónicas
   quedan en `agoraclan.com`.
6. En Search Console, añade la propiedad de dominio y envía
   `https://agoraclan.com/sitemap.xml`.

## Mientras el dominio no esté listo
La web funciona igual en `https://TU-USUARIO.github.io/Agora-Clan-Web/`: el workflow compila con
esa carpeta base y el CSS, el JS y las imágenes cargan bien. En cuanto configures el dominio y
vuelvas a desplegar, todo pasa a la raíz sin tocar una línea de código.

## Dónde está el sitemap
No está en el repositorio: **se genera al compilar**. Después de `npm run build` lo tienes en
`dist/sitemap.xml`, `dist/sitemap-index.xml` y `dist/sitemap-0.xml`, y en producción queda en
`https://agoraclan.com/sitemap.xml`.

## Detalles a tener en cuenta
- Pages no permite cabeceras propias (X-Frame-Options, Referrer-Policy…). No es grave: los
  archivos de `/_astro` llevan hash en el nombre y se cachean bien igualmente.
- `www` → apex lo resuelve Pages solo si existe el CNAME de `www`.
- Para probar en local antes de subir: `npm run build && npm run preview`.
