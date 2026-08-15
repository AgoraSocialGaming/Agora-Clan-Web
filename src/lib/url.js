/**
 * Prefija las rutas internas con la base del sitio.
 *
 * En el dominio propio (agoraclan.com) la base es "/" y no cambia nada.
 * En una GitHub Page de proyecto (usuario.github.io/repo) la base es "/repo",
 * y sin este prefijo el CSS, el JS y los enlaces se van a 404.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path = '/') => {
  if (!path.startsWith('/')) return path; // externo, mailto:, #ancla…
  const out = `${BASE}${path}`;
  return out === '' ? '/' : out;
};
