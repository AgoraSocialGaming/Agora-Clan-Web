# Publicar Ágora en GitHub Pages

## Por qué se veía sin estilos

La web está publicada en `agorasocialgaming.github.io/Agora-Clan-Web/`, es decir, **dentro de una
carpeta**. El build anterior generaba las rutas a la raíz (`/_astro/estilos.css`), así que el
navegador las pedía a `agorasocialgaming.github.io/_astro/…` y recibía 404. Sin CSS ni JS, lo que
queda es el HTML desnudo: el enlace «Saltar al contenido» y el logo gigante.

Ahora el build pregunta a GitHub dónde va a publicarse y genera las rutas con esa carpeta
delante. Además, el workflow **falla a propósito** si las rutas no coinciden con la base, para que
nunca vuelva a subirse una versión rota sin avisar.

Ojo con una trampa que también estaba: el repositorio traía un archivo `CNAME` con
`agoraclan.com`. Al desplegar, GitHub lo lee y da por hecho que la web vive en ese dominio, así
que compila con base `/` aunque el dominio todavía no exista. Lo he quitado: el dominio se
configura desde la web de GitHub cuando el DNS esté listo, no con ese archivo.

## Pasos (esta vez, en orden)

1. Sustituye el contenido del repositorio por el de este zip y haz push a `main`.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
   Si estaba en «Deploy from a branch», cámbialo.
3. **Settings → Pages → Custom domain: déjalo vacío de momento.**
4. Mira la pestaña **Actions**: el workflow debe terminar en verde. En el paso «Comprobar que las
   rutas apuntan a la base correcta» verás la base usada.
5. Abre `https://agorasocialgaming.github.io/Agora-Clan-Web/` con **Ctrl + F5** (la caché del
   navegador guarda la versión rota).

Para comprobar que ha ido bien sin fiarte de la vista: botón derecho → «Ver código fuente» y
busca `_astro`. Tiene que poner `/Agora-Clan-Web/_astro/…`, no `/_astro/…`.

## Cuando quieras el dominio agoraclan.com

1. En tu DNS (por lo que veo lo llevas en Cloudflare):

   | Tipo | Nombre | Valor | Proxy |
   |---|---|---|---|
   | A | `@` | `185.199.108.153` | **DNS only** (nube gris) |
   | A | `@` | `185.199.109.153` | DNS only |
   | A | `@` | `185.199.110.153` | DNS only |
   | A | `@` | `185.199.111.153` | DNS only |
   | CNAME | `www` | `agorasocialgaming.github.io` | DNS only |

   El proxy de Cloudflare (nube naranja) impide que GitHub emita el certificado. Cuando el
   candado ya funcione, si quieres, lo activas.
   Borra antes cualquier A o CNAME del dominio que apunte a otro sitio.

2. **Settings → Pages → Custom domain:** escribe `agoraclan.com` y guarda. GitHub crea el archivo
   CNAME por su cuenta.
3. Espera al certificado (de minutos a un par de horas) y marca **Enforce HTTPS**.
4. Vuelve a lanzar el workflow (**Actions → Desplegar en GitHub Pages → Run workflow**). Al
   detectar el dominio, compila con base `/` y las URLs canónicas pasan a `agoraclan.com`.
5. En Search Console, añade la propiedad de dominio y envía `https://agoraclan.com/sitemap.xml`.

## Atajo que se ahorra todo esto

Si renombras el repositorio a **`agorasocialgaming.github.io`** (Settings → General → Repository
name), la web se sirve en la raíz de ese dominio y la base siempre es `/`. Es la opción con menos
cosas que puedan romperse, y el dominio propio funciona igual después.

## Dónde está el sitemap

No está en el repositorio: **se genera al compilar**. Tras `npm run build` lo tienes en
`dist/sitemap.xml`, `dist/sitemap-index.xml` y `dist/sitemap-0.xml`. En producción queda en
`https://agoraclan.com/sitemap.xml`, que es el que aparece en `robots.txt`.

## Otros detalles

- Pages no permite cabeceras propias. No es grave: los archivos de `/_astro` llevan hash en el
  nombre y se cachean igual.
- Los enlaces de referido `/r/CODIGO` se resuelven desde el 404 en el navegador, porque Pages no
  tiene redirecciones de servidor.
- Para probar en local: `npm run build && npm run preview`.
