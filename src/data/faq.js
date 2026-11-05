// Preguntas frecuentes. Las usan /faq (todas) y el inicio (las marcadas con `home`).
import { FORM } from './site.js';

export const FAQ = [
  {
    id: 'general',
    label: 'General',
    items: [
      {
        home: true,
        q: '¿Qué es Ágora?',
        a: 'La app de torneos para comunidades gamer. Puedes jugar torneos oficiales con premios reales, crear torneos para tu comunidad, retar a tus amigos, buscar rival con matchmaking y enfrentar a tu clan con otros clanes. Todo cuenta para el ranking de cada temporada.',
      },
      {
        home: true,
        q: '¿Cuánto cuesta?',
        a: 'Descargar Ágora y competir es gratis. Hay cosméticos opcionales y una suscripción, Ágora Rise, que no dan ninguna ventaja en partida.',
      },
      {
        q: '¿En qué plataformas está?',
        a: 'Ágora llegará a iOS y Android, con foco inicial en España. En la página de descarga verás el estado de App Store y Google Play y, en cuanto la app esté publicada, el enlace de cada tienda.',
      },
      {
        q: '¿Qué juegos hay?',
        a: 'Los torneos oficiales se juegan en Brawl Stars, Clash Royale, League of Legends y Valorant, los juegos con API oficial. Los torneos que crea la comunidad admiten muchos más juegos.',
      },
      {
        q: '¿Está en español?',
        a: 'Sí, Ágora nace en español. También está disponible en inglés desde los ajustes de la app.',
      },
    ],
  },
  {
    id: 'torneos',
    label: 'Torneos y batallas',
    items: [
      {
        home: true,
        q: '¿Qué diferencia hay entre torneos oficiales y personalizados?',
        a: 'Los oficiales los organiza Ágora, reparten premios reales y cuentan para el ranking de temporada. Los personalizados los crea cualquier jugador o clan: elige el juego, el formato, las plazas, las reglas y la entrada, e invita a quien quiera con un enlace.',
      },
      {
        q: '¿Qué tipos de batalla hay?',
        a: 'Tres. Con amigos: retas a quien quieras, de 1v1 a 5v5, amistosa o con apuesta. Aleatorias: matchmaking contra un rival de tu nivel. De clan: tu clan contra otro. Las dos primeras suman a tu ranking individual; las de clan, al ranking de clanes.',
      },
      {
        q: '¿Necesito equipo para jugar un torneo?',
        a: 'No. Puedes apuntarte en solitario a los torneos individuales, o unirte a un clan si prefieres competir en equipo.',
      },
      {
        q: '¿Por qué tengo que añadir mi ID del juego?',
        a: 'Porque es lo que garantiza que juegas con tu cuenta y que tu rival puede encontrarte. Sin el ID en tu perfil no puedes competir en ese juego. Cuando el juego tiene API oficial, Ágora además verifica la cuenta y tus estadísticas.',
      },
      {
        q: '¿Cómo se registra el resultado de una partida?',
        a: 'Al terminar, cada parte reporta el resultado y puede adjuntar capturas. Si los dos reportes coinciden, el marcador se cierra al instante. Si no, un administrador revisa las pruebas y decide.',
      },
      {
        q: '¿Qué pasa si alguien hace trampas?',
        a: 'Reportar un resultado falso tiene sanciones progresivas, avisadas de antemano y visibles en el perfil. Quien reincide pierde el acceso a los modos competitivos.',
      },
    ],
  },
  {
    id: 'premios',
    label: 'Premios y ranking',
    items: [
      {
        home: true,
        q: '¿Cómo se ganan los premios reales?',
        a: 'Jugando los torneos oficiales de Ágora. Los mejores de cada torneo se llevan premios de verdad (consolas, juegos, periféricos o saldo, según el torneo), que se anuncian antes de empezar. Los torneos con premio físico son para mayores de 18 años.',
      },
      {
        home: true,
        q: '¿Puedo conseguir tarjetas regalo sin ganar?',
        a: 'Sí. Cada torneo que juegas suma, ganes o no, y lo canjeas por tarjetas regalo desde la app.',
      },
      {
        q: '¿Cómo funciona el ranking?',
        a: 'Cada temporada hay dos clasificaciones. La individual suma tus torneos oficiales y tus batallas con amigos y aleatorias. La de clanes suma las batallas de clan. Al cerrar la temporada, los primeros puestos reciben recompensas exclusivas; en la de clanes, para cada miembro.',
      },
      {
        q: '¿El resultado depende de la suerte?',
        a: 'No. El resultado depende solo de la habilidad de los jugadores: no hay azar en el emparejamiento de los brackets ni en cómo se decide el ganador.',
      },
      {
        q: '¿Los cofres se pueden comprar?',
        a: 'No. Los cofres se consiguen jugando: con la racha diaria, con misiones o como premio de torneo.',
      },
      {
        q: '¿Pagar da ventaja?',
        a: 'No. Lo que se compra es apariencia y comodidad. Quien paga y quien no compiten exactamente en las mismas condiciones.',
      },
    ],
  },
  {
    id: 'progresion',
    label: 'Progresión',
    items: [
      {
        q: '¿Cómo subo de nivel?',
        a: 'Jugando y completando misiones diarias. Ganas experiencia, Agora Relics y cofres con títulos, emblemas y marcos para tu perfil.',
      },
      {
        q: '¿Qué son las Agora Relics?',
        a: 'La moneda de Ágora. Se ganan jugando y con misiones, y se usan dentro de la app, por ejemplo en la tienda de cosméticos.',
      },
    ],
  },
  {
    id: 'comunidades',
    label: 'Comunidades',
    items: [
      {
        home: true,
        q: '¿Qué me dais si traigo mi comunidad?',
        a: 'Si ya tienes clan en Ágora, lo ampliamos gratis por encima de las 25 plazas para que entre toda tu comunidad. Si eres creador y traes a tu comunidad desde fuera, durante el lanzamiento te pagamos por cada jugador: escríbenos desde agoraclan.com/comunidad y lo hablamos.',
      },
      {
        q: '¿Cuántos miembros caben en un clan?',
        a: 'Un clan tiene 25 plazas. Las comunidades grandes pueden pedir una ampliación gratuita desde agoraclan.com/comunidad.',
      },
      {
        q: '¿Quién puede entrar en el programa de creadores?',
        a: 'Streamers, creadores de contenido y administradores de servidores de Discord o grupos con una comunidad de jugadores activa. Las condiciones se acuerdan por correo, caso a caso.',
      },
    ],
  },
  {
    id: 'cuenta',
    label: 'Cuenta y edad',
    items: [
      {
        q: '¿Desde qué edad puedo usar Ágora?',
        a: `La app está pensada para mayores de ${FORM.minAge} años. Los torneos con premio físico enviado a casa son solo para mayores de 18, y se comprueba al inscribirse.`,
      },
      {
        q: '¿Qué datos recogéis?',
        a: 'Datos de cuenta, correo, el contenido que publicas, los ID de tus juegos y datos de uso. Nada de datos sensibles. El detalle está en la política de privacidad.',
      },
      {
        q: '¿Puedo borrar mi cuenta?',
        a: 'Sí, desde la propia app o desde la página de eliminación de cuenta. También puedes ejercer tus derechos de acceso, rectificación, supresión y portabilidad escribiéndonos.',
      },
      {
        q: 'Me apunté al pre-registro, ¿y ahora qué?',
        a: 'Confirma el correo que te enviamos. Cuando la app esté publicada, entra con la misma cuenta y recibirás tu Pack Fundador.',
      },
    ],
  },
];

export const FAQ_HOME = FAQ.flatMap((g) => g.items).filter((f) => f.home);
export const FAQ_ALL = FAQ.flatMap((g) => g.items);
