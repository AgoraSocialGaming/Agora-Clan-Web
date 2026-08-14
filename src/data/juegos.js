// Catálogo de juegos. `cover` apunta a src/assets/juegos/*.
// Para añadir un juego con carátula: mete el fichero y referencia el nombre.
export const LANZAMIENTO = [
  {
    slug: 'brawl-stars',
    name: 'Brawl Stars',
    studio: 'Supercell',
    platform: 'Móvil',
    modes: ['Duelo', 'Batalla aleatoria', 'Torneos'],
    color: '#FFC01E',
    cover: 'brawl-stars.jpg',
    mark: 'supercell',
    note: 'Vinculación por API oficial y estadísticas en tu perfil.',
  },
  {
    slug: 'clash-royale',
    name: 'Clash Royale',
    studio: 'Supercell',
    platform: 'Móvil',
    modes: ['Duelo', 'Batalla aleatoria', 'Torneos'],
    color: '#4A9BFF',
    cover: 'clash-royale.png',
    mark: 'supercell',
    note: 'Partidas cortas, ciclos de torneo rápidos.',
  },
  {
    slug: 'valorant',
    name: 'Valorant',
    studio: 'Riot Games',
    platform: 'PC',
    modes: ['Torneos', 'Torneos de clan'],
    color: '#FF4655',
    cover: 'valorant.jpg',
    mark: 'valorant',
    note: 'Vinculación con tu cuenta de Riot.',
  },
  {
    slug: 'league-of-legends',
    name: 'League of Legends',
    studio: 'Riot Games',
    platform: 'PC',
    modes: ['Torneos', 'Torneos de clan'],
    color: '#C8AA6E',
    cover: 'league-of-legends.jpg',
    mark: 'leagueoflegends',
    note: 'Vinculación con tu cuenta de Riot.',
  },
];

// Rotación del catálogo: se activan por temporadas.
// `mark` referencia una marca oficial de src/data/brand-marks.js (opcional).
export const CATALOGO = [
  { name: 'Counter-Strike 2', studio: 'Valve', platform: 'PC', color: '#F0A73C', mark: 'counterstrike', genre: 'Táctico 5v5' },
  { name: 'EA Sports FC', studio: 'EA', platform: 'Consola · PC', color: '#00D46A', mark: 'ea', genre: 'Deportes 1v1' },
  { name: 'Fortnite', studio: 'Epic Games', platform: 'Multiplataforma', color: '#8B5CF6', mark: 'fortnite', genre: 'Battle royale' },
  { name: 'Call of Duty: Mobile', studio: 'Activision', platform: 'Móvil', color: '#E0592A', mark: 'activision', genre: 'Shooter por equipos' },
  { name: 'Teamfight Tactics', studio: 'Riot Games', platform: 'Multiplataforma', color: '#39C0BA', mark: 'riotgames', genre: 'Autobattler' },
  { name: 'Clash of Clans', studio: 'Supercell', platform: 'Móvil', color: '#8DC63F', mark: 'supercell', genre: 'Estrategia' },
  { name: 'Apex Legends', studio: 'EA', platform: 'Multiplataforma', color: '#DA292A', mark: 'ea', genre: 'Battle royale' },
  { name: 'Rocket League', studio: 'Psyonix', platform: 'Consola · PC', color: '#2C8CFF', mark: null, genre: 'Deportes 3v3' },
  { name: 'Free Fire', studio: 'Garena', platform: 'Móvil', color: '#FF6B2C', mark: null, genre: 'Battle royale' },
  { name: 'Among Us', studio: 'Innersloth', platform: 'Multiplataforma', color: '#C8102E', mark: null, genre: 'Social deduction' },
];
