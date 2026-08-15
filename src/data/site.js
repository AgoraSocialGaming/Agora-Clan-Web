// ---------------------------------------------------------------------------
// FUENTE ÚNICA DE VERDAD
// Cambia aquí y cambia en toda la web: SEO, schema, footer, CTAs y enlaces.
// ---------------------------------------------------------------------------

export const SITE = {
  name: 'Agora Clan',
  shortName: 'Ágora',
  url: 'https://agoraclan.com',
  locale: 'es-ES',
  lang: 'es',
  description:
    'La arena digital para gamers. Encuentra con quién jugar, monta tu propio torneo con brackets y haz crecer un perfil que demuestra lo que has conseguido.',
  themeColor: '#0AFF7A',
  twitterHandle: '@agoraclan_',
};

// --- Estado de las tiendas --------------------------------------------------
// Cuando estéis publicados: pon las URLs y `live: true`.
export const APP = { live: false, ios: '', android: '' };

// --- Pre-registro -----------------------------------------------------------
export const FORM = {
  // Se puede sobrescribir al compilar con PUBLIC_FORM_ENDPOINT, sin tocar el código.
  endpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || 'https://api.agoraclan.com/api/v1/preregister',
  legalUrl: 'https://agoraclan.com/terminos-y-politicas',
  minAge: 14,
  slots: 7000,
};

export const SOCIAL = [
  { name: 'Instagram', url: 'https://www.instagram.com/agoraclan_', handle: '@agoraclan_' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@agoraclan_', handle: '@agoraclan_' },
];

export const NAV = [
  { label: 'Inicio', href: '/', icon: 'home', hint: 'La arena, de un vistazo' },
  { label: 'Torneos', href: '/torneos', icon: 'trophy', hint: 'Descubre la arena y sus posibilidades' },
  { label: 'Juegos', href: '/juegos', icon: 'pad', hint: 'Nuestro catálogo' },
  { label: 'Descargar', href: '/descargar', icon: 'download', hint: 'Próximamente en iOS y Android' },
  { label: 'FAQ', href: '/faq', icon: 'help', hint: 'Todas las dudas resueltas' },
];

export const LEGAL = [
  { label: 'Términos y privacidad', href: 'https://agoraclan.com/terminos-y-politicas' },
];
