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
    'La app de torneos gaming para jugadores, clanes y comunidades: torneos oficiales con premios reales, batallas, ranking por temporadas y torneos propios.',
  // Color de la barra del navegador: el fondo de la web, no el verde (en móvil quedaba chillón).
  themeColor: '#101016',
  twitterHandle: '@agoraclan_',
};

// --- Estado de las tiendas --------------------------------------------------
// Las URLs reales viven aquí, pero la web solo las expone cuando
// GET /api/v1/config confirma el acceso público normal (`signup_enabled &&
// !invite_required`) Y el flag estricto de esa tienda (`ios_public_available`
// / `android_public_available`). Son flags independientes: una plataforma
// puede estar publicada y la otra pendiente.
//
// `APP.live` es el interruptor estático histórico y no se toca a mano. `stores`
// solo alimenta los datos estructurados cuando alguien haya comprobado la ficha
// pública real; los enlaces visibles siempre dependen de la config en runtime.
export const APP = {
  live: false,
  stores: { ios: false, android: false },
  ios: 'https://apps.apple.com/app/id6790832454',
  android: 'https://play.google.com/store/apps/details?id=com.agoraclan.app',
};

// --- Config pública en runtime ---------------------------------------------
// Una sola URL para que la fase se calcule igual en toda la web.
export const CONFIG_ENDPOINT =
  import.meta.env.PUBLIC_CONFIG_ENDPOINT || 'https://api.agoraclan.com/api/v1/config';

// --- Pre-registro -----------------------------------------------------------
export const FORM = {
  // Se puede sobrescribir al compilar con PUBLIC_FORM_ENDPOINT, sin tocar el código.
  endpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || 'https://api.agoraclan.com/api/v1/preregister',
  legalUrl: `${SITE.url}/privacy`,
  minAge: 14,
  slots: 7000,
};

export const SOCIAL = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/agoraclan_',
    handle: '@agoraclan_',
    title: 'Ágora en Instagram: novedades y torneos',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@agoraclan_',
    handle: '@agoraclan_',
    title: 'Ágora en TikTok: jugadas, torneos y comunidad',
  },
];

export const NAV = [
  {
    label: 'Inicio',
    href: '/',
    icon: 'home',
    hint: 'Qué es Ágora, de un vistazo',
    title: 'Ágora: app de torneos gaming con premios reales',
  },
  {
    label: 'Torneos',
    href: '/torneos',
    icon: 'trophy',
    hint: 'Oficiales, personalizados, batallas y ranking',
    title: 'Torneos oficiales y personalizados en Ágora',
  },
  {
    label: 'Comunidades',
    href: '/comunidad',
    icon: 'users',
    hint: 'Trae a tu comunidad a Ágora',
    title: 'Trae tu comunidad a Ágora: programa para creadores',
  },
  {
    label: 'Descargar',
    href: '/descargar',
    icon: 'download',
    hint: 'Cómo descargar Ágora',
    title: 'Descargar Ágora en iOS y Android',
  },
  {
    label: 'FAQ',
    href: '/faq',
    icon: 'help',
    hint: 'Todas las dudas resueltas',
    title: 'Preguntas frecuentes sobre Ágora',
  },
];

// Correo al que escribe la gente desde la web.
export const CONTACT = { email: 'support@agoraclan.com' };

export const LEGAL = [
  { label: 'Política de privacidad', href: `${SITE.url}/privacy`, title: 'Política de privacidad de Ágora' },
  { label: 'Soporte', href: `${SITE.url}/soporte`, title: 'Soporte de Ágora' },
  {
    label: 'Eliminar cuenta',
    href: `${SITE.url}/assets/legal/account-deletion.html`,
    title: 'Cómo solicitar la eliminación de cuenta o datos',
  },
];
