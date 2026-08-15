// Retoques posteriores al build, pensados para GitHub Pages.
import { copyFile, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';

const DIST = new URL('../dist/', import.meta.url);
const file = (name) => new URL(name, DIST);

// 1. Pages ignora las carpetas que empiezan por guion bajo (como /_astro) si cree que es Jekyll.
await writeFile(file('.nojekyll'), '');

// 2. Astro genera sitemap-index.xml (un índice de una línea) y sitemap-0.xml (las URLs).
//    En /sitemap.xml dejamos el que lista las páginas de verdad: es el que la gente abre
//    y el que se envía a Search Console.
try {
  await access(file('sitemap-0.xml'), constants.F_OK);
  await copyFile(file('sitemap-0.xml'), file('sitemap.xml'));
  console.log('postbuild: sitemap.xml (urlset) y .nojekyll listos');
} catch {
  console.warn('postbuild: no se encontró sitemap-0.xml');
}
