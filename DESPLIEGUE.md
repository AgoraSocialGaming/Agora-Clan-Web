# Subir Ágora a GitHub Pages

La web es estática y ya está todo preparado: solo hay que subir el repo y activar Pages.

## Lo que ya viene hecho
- `.github/workflows/deploy.yml`: al hacer push a `main` compila con Node 22 y publica `dist`.
- `public/CNAME` con `agoraclan.com` (Pages lo lee para el dominio propio).
- `public/.nojekyll` + `touch dist/.nojekyll` en el workflow, para que Pages no ignore `/_astro`.
- `astro.config.mjs` con `site: 'https://agoraclan.com'` y `build.format: 'file'`, que es lo que
  hace que `/torneos` funcione sin barra final en Pages.
- `404.html` propio. Además, como Pages no tiene redirecciones de servidor, los enlaces de
  referido `/r/CODIGO` se resuelven en el navegador desde el 404 y acaban en
  `/descargar?ref=CODIGO`.

## Pasos
1. Sube el repo a GitHub (rama `main`).
2. Settings → Pages → **Source: GitHub Actions**.
3. Settings → Pages → Custom domain: `agoraclan.com` y marca **Enforce HTTPS** cuando se active.
4. En tu DNS (donde tengas el dominio):
   - `A` para el apex `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153`
   - `AAAA` (opcional, IPv6) → `2606:50c0:8000::153`, `2606:50c0:8001::153`,
     `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` para `www` → `TU-USUARIO.github.io`
   El certificado tarda entre unos minutos y unas horas.
5. En Search Console, añade la propiedad de dominio y envía
   `https://agoraclan.com/sitemap-index.xml`.

## Detalles a tener en cuenta
- **Cabeceras**: Pages no permite cabeceras propias (X-Frame-Options, Referrer-Policy…). No es
  grave: los archivos de `/_astro` llevan hash en el nombre y Pages ya los cachea bien.
- **Redirecciones**: `www` → apex lo hace Pages solo si tienes el CNAME de `www` apuntando a
  `TU-USUARIO.github.io`. La de `/r/CODIGO` va por JavaScript desde el 404, como se explica arriba.
- **Probar en local antes de subir**: `npm run build && npm run preview`.
