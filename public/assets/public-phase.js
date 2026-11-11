/*
 * Fases públicas de Ágora (pre-registro / descarga / próximamente).
 *
 * Fuente única de verdad: GET /api/v1/config. La web NO afirma que el
 * pre-registro esté abierto ni que la app esté publicada hasta que la API lo
 * confirma. Mientras carga, falla la red o el contrato no trae el dato, el
 * estado es `unknown` y no se muestra ninguna oferta de fundador.
 *
 * Script clásico (sin módulos) para que los scripts inline de Astro puedan
 * usarlo sin bundler. También se importa desde los tests de Node con `vm`.
 */
(function (global) {
  'use strict';

  var PHASE = {
    LIVE: 'live',
    PREREGISTER: 'preregister',
    UPCOMING: 'upcoming',
    UNKNOWN: 'unknown',
  };

  // URLs de las tiendas. La fuente única es `APP` en src/data/site.js y se
  // inyecta con `configure` antes de `init`; mientras no lleguen, no se
  // expone ningún enlace. La UI solo las usa cuando la config confirma el
  // acceso público normal y el flag estricto de esa tienda.
  var STORE_LINKS = { ios: '', android: '' };
  var STORE_NAMES = { ios: 'App Store', android: 'Google Play' };

  function configure(options) {
    var links = options && options.storeLinks;
    if (!links || typeof links !== 'object') return STORE_LINKS;
    // Se muta el mismo objeto para que la referencia publicada siga válida.
    STORE_LINKS.ios = typeof links.ios === 'string' ? links.ios : '';
    STORE_LINKS.android = typeof links.android === 'string' ? links.android : '';
    return STORE_LINKS;
  }

  function noStores() {
    return { ios: false, android: false };
  }

  function unknownState(error) {
    return {
      phase: PHASE.UNKNOWN,
      // `live` se mantiene como alias de `registrationOpen`: describe el
      // acceso público normal, NO la publicación en las tiendas. Los enlaces,
      // botones y copias de tienda usan siempre `stores`.
      live: false,
      registrationOpen: false,
      founderOpen: false,
      signupEnabled: false,
      inviteRequired: false,
      stores: noStores(),
      anyStore: false,
      known: false,
      error: error === true,
    };
  }

  /**
   * Una tienda solo está disponible con acceso público normal Y su flag
   * `*_public_available` a `true` estricto. Ausente, `false`, texto o
   * cualquier otro valor deja la tienda cerrada.
   */
  function storeAvailability(config, registrationOpen) {
    return {
      ios: registrationOpen === true && config.ios_public_available === true,
      android: registrationOpen === true && config.android_public_available === true,
    };
  }

  function anyStore(stores) {
    return !!stores && (stores.ios === true || stores.android === true);
  }

  /** Un enlace solo se publica si la tienda está abierta y hay URL canónica. */
  function storeReady(stores, platform) {
    return !!stores && stores[platform] === true && !!STORE_LINKS[platform];
  }

  function readyStores(stores) {
    return {
      ios: storeReady(stores, 'ios'),
      android: storeReady(stores, 'android'),
    };
  }

  /** Copia de disponibilidad: solo nombra una tienda que esté realmente lista. */
  function storeStatusText(stores) {
    var ready = readyStores(stores);
    var live = [];
    var pending = [];
    if (ready.ios) live.push(STORE_NAMES.ios);
    else pending.push(STORE_NAMES.ios);
    if (ready.android) live.push(STORE_NAMES.android);
    else pending.push(STORE_NAMES.android);

    if (live.length === 2) {
      return 'El acceso ya está abierto: Ágora ya está en App Store y Google Play.';
    }
    if (live.length === 1) {
      return (
        'El acceso ya está abierto: Ágora ya está en ' +
        live[0] +
        '. ' +
        pending[0] +
        ' llegará pronto.'
      );
    }
    return 'El acceso ya está abierto. Los enlaces de App Store y Google Play aparecerán aquí en cuanto las apps estén publicadas.';
  }

  /**
   * Traduce la config pública a una fase de registro. `live` gana a
   * `preregister`: una vez abierto el acceso normal, la oferta de fundador
   * deja de mostrarse. La disponibilidad de cada tienda se resuelve aparte en
   * `stores`, para que el acceso web pueda estar abierto sin publicar apps.
   * Cualquier valor ausente o inesperado falla cerrado.
   */
  function resolveConfig(config) {
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
      return unknownState(false);
    }
    if (
      typeof config.signup_enabled !== 'boolean' ||
      typeof config.invite_required !== 'boolean'
    ) {
      return unknownState(false);
    }

    var signupEnabled = config.signup_enabled === true;
    var inviteRequired = config.invite_required === true;
    var registrationOpen = signupEnabled && !inviteRequired;

    // Sin el flag no se puede afirmar ni apertura ni cierre: estado neutral.
    if (!registrationOpen && typeof config.preregistration_open !== 'boolean') {
      return unknownState(false);
    }

    var founderOpen = !registrationOpen && config.preregistration_open === true;
    var stores = storeAvailability(config, registrationOpen);

    return {
      phase: registrationOpen
        ? PHASE.LIVE
        : founderOpen
          ? PHASE.PREREGISTER
          : PHASE.UPCOMING,
      live: registrationOpen,
      registrationOpen: registrationOpen,
      founderOpen: founderOpen,
      signupEnabled: signupEnabled,
      inviteRequired: inviteRequired,
      stores: stores,
      anyStore: anyStore(stores),
      known: true,
      error: false,
    };
  }

  /**
   * Normaliza la respuesta del POST /preregister. El cierre por cutoff llega
   * como 410 + `preregistration_closed`; la UI debe cerrar el formulario y
   * pasar a la fase de próximamente en vez de ofrecer reintentos.
   */
  function submitOutcome(status, body) {
    var payload = body && typeof body === 'object' ? body : {};
    var rawDetail = payload.detail;
    var rawError = payload.error && payload.error.message;
    var detail =
      typeof rawDetail === 'string'
        ? rawDetail
        : typeof rawError === 'string'
          ? rawError
          : typeof payload.message === 'string'
            ? payload.message
            : '';

    if (status >= 200 && status < 300) {
      return { kind: 'ok', detail: detail };
    }
    if (status === 410 && detail.indexOf('preregistration_closed') !== -1) {
      return { kind: 'closed', detail: detail };
    }
    if (detail.indexOf('invite_required') !== -1) {
      return { kind: 'invite_required', detail: detail };
    }
    if (detail.indexOf('invite_code') !== -1) {
      return { kind: 'invite_code', detail: detail };
    }
    if (status === 409) {
      return { kind: 'conflict', detail: detail };
    }
    if (status === 422 || status === 400) {
      return { kind: 'validation', detail: detail };
    }
    return { kind: 'error', detail: detail };
  }

  function setHidden(element, hide) {
    if (!element) return;
    element.hidden = hide === true;
    if (hide) {
      element.setAttribute('aria-hidden', 'true');
    } else {
      element.removeAttribute('aria-hidden');
    }
  }

  function each(root, selector, visit) {
    if (!root || typeof root.querySelectorAll !== 'function') return;
    var nodes = root.querySelectorAll(selector);
    for (var index = 0; index < nodes.length; index += 1) {
      visit(nodes[index]);
    }
  }

  /** Aplica una fase al DOM. Solo muestra la fase activa y nunca deja enlaces
   * de tienda activos fuera de `live` + flag estricto de esa tienda. */
  function apply(root, state) {
    if (!root || !state || !state.phase) return state;

    var stores = state.stores || noStores();
    var ready = readyStores(stores);
    var hasReadyStore = ready.ios || ready.android;

    each(root, '[data-phase]', function (element) {
      setHidden(element, element.getAttribute('data-phase') !== state.phase);
    });

    each(root, '[data-store-link]', function (element) {
      var store = element.getAttribute('data-store-link');
      var href = ready[store] === true ? STORE_LINKS[store] : '';
      if (href) {
        element.setAttribute('href', href);
        element.setAttribute('rel', 'noopener');
        setHidden(element, false);
      } else {
        element.removeAttribute('href');
        setHidden(element, true);
      }
    });

    each(root, '[data-store-pending]', function (element) {
      // Cada botón «Próximamente» está atado a su tienda: una plataforma puede
      // estar publicada mientras la otra sigue pendiente. Sin clave (marcado
      // antiguo) solo se oculta cuando hay al menos un enlace real.
      var store = element.getAttribute('data-store-pending');
      var available = store ? ready[store] === true : hasReadyStore;
      setHidden(element, available === true);
    });

    each(root, '[data-app-cta]', function (element) {
      // «Descargar» solo si hay un enlace de tienda real; con el acceso abierto
      // pero sin apps publicadas, el CTA no promete una descarga inexistente.
      if (hasReadyStore) element.textContent = 'Descargar';
      else if (state.registrationOpen === true) element.textContent = 'Entrar';
      else element.textContent = 'Entrar antes';
    });

    each(root, '[data-store-status]', function (element) {
      if (state.registrationOpen === true) {
        element.textContent = storeStatusText(stores);
      }
    });

    each(root, '[data-phase-status]', function (element) {
      if (state.phase === PHASE.UNKNOWN && state.error) {
        // Mensaje neutro: sin afirmar apertura ni cierre, y sin parecer un fallo.
        element.textContent =
          'Ágora llega a iOS y Android. Los enlaces de descarga aparecerán aquí en cuanto la app esté publicada.';
      }
    });

    if (root.documentElement && typeof root.documentElement.setAttribute === 'function') {
      root.documentElement.setAttribute('data-agora-phase', state.phase);
    }
    return state;
  }

  /** Cierre recibido del servidor: pasa a próximamente y revela el aviso. */
  function applyClosed(root) {
    var state = {
      phase: PHASE.UPCOMING,
      live: false,
      registrationOpen: false,
      founderOpen: false,
      signupEnabled: false,
      inviteRequired: false,
      stores: noStores(),
      anyStore: false,
      known: true,
      error: false,
      closedByServer: true,
    };
    apply(root, state);
    each(root, '[data-prereg-closed]', function (element) {
      // El aviso puede traer la clase utilitaria `hidden`; hay que retirarla
      // además del atributo para que se vea de verdad tras el 410.
      if (element.classList && typeof element.classList.remove === 'function') {
        element.classList.remove('hidden');
      }
      setHidden(element, false);
    });
    return state;
  }

  /** Carga la config sin lanzar: cualquier fallo se convierte en `unknown`. */
  function loadConfig(configUrl, fetchImpl) {
    var fetcher =
      typeof fetchImpl === 'function'
        ? fetchImpl
        : typeof global.fetch === 'function'
          ? global.fetch.bind(global)
          : null;
    if (!fetcher) return Promise.resolve(unknownState(true));

    return Promise.resolve(fetcher(configUrl, { cache: 'no-store' }))
      .then(function (response) {
        if (!response || response.ok !== true) return unknownState(true);
        return Promise.resolve(response.json())
          .then(function (config) {
            var state = resolveConfig(config);
            // Un 200 con forma inesperada tampoco es un estado conocido.
            if (!state.known) state.error = true;
            return state;
          })
          .catch(function () {
            return unknownState(true);
          });
      })
      .catch(function () {
        return unknownState(true);
      });
  }

  // Reintentos ante fallos puntuales de red o de la API: sin ellos la página
  // se quedaba en el estado neutro aunque la config estuviera disponible.
  var RETRY_DELAYS = [900, 2500];

  function wait(ms) {
    return new Promise(function (resolve) {
      if (ms > 0 && typeof setTimeout === 'function') setTimeout(resolve, ms);
      else resolve();
    });
  }

  function init(root, configUrl, fetchImpl, retryDelays) {
    var delays = Array.isArray(retryDelays) ? retryDelays : RETRY_DELAYS;
    function attempt(index) {
      return loadConfig(configUrl, fetchImpl).then(function (state) {
        if (state.error && index < delays.length) {
          return wait(delays[index]).then(function () {
            return attempt(index + 1);
          });
        }
        return apply(root, state);
      });
    }
    return attempt(0);
  }

  global.AgoraPhase = {
    PHASE: PHASE,
    STORE_LINKS: STORE_LINKS,
    configure: configure,
    unknownState: unknownState,
    resolveConfig: resolveConfig,
    submitOutcome: submitOutcome,
    apply: apply,
    applyClosed: applyClosed,
    storeStatusText: storeStatusText,
    loadConfig: loadConfig,
    init: init,
  };
})(typeof window !== 'undefined' ? window : this);
