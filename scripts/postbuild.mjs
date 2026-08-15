// Retoques posteriores al build, pensados para GitHub Pages.
import { copyFile, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';

const DIST = new URL('../dist/', import.meta.url);
const file = (name) => new URL(name, DIST);

// 1. Pages ignora las carpetas que empiezan por guion bajo (como /_astro) si cree que es Jekyll.
await writeFile(file('.nojekyll'), '');

// 2. Mucha gente (y algún validador) busca /sitemap.xml. El de Astro se llama
//    sitemap-index.xml, así que dejamos una copia con el nombre de siempre.
try {
  await access(file('sitemap-index.xml'), constants.F_OK);
  await copyFile(file('sitemap-index.xml'), file('sitemap.xml'));
  console.log('postbuild: sitemap.xml y .nojekyll listos');
} catch {
  console.warn('postbuild: no se encontró sitemap-index.xml');
}
