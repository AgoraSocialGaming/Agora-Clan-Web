import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => readFile(resolve(root, relativePath), 'utf8');
const IOS_URL = 'https://apps.apple.com/app/id6790832454';
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.agoraclan.app';

async function loadPhaseRuntime() {
  const source = await read('public/assets/public-phase.js');
  const sandbox = { window: {}, Promise, URL, console };
  runInNewContext(source, sandbox);
  assert.ok(sandbox.window.AgoraPhase, 'public-phase.js must expose window.AgoraPhase');
  return sandbox.window.AgoraPhase;
}

function element(attributes = {}) {
  const values = new Map(Object.entries(attributes));
  return {
    hidden: false,
    textContent: '',
    getAttribute: (name) => (values.has(name) ? values.get(name) : null),
    setAttribute: (name, value) => values.set(name, String(value)),
    removeAttribute: (name) => values.delete(name),
    has: (name) => values.has(name),
    attr: (name) => (values.has(name) ? values.get(name) : null),
  };
}

function documentWith(elements) {
  return {
    documentElement: element(),
    querySelectorAll(selector) {
      const name = selector.slice(1, -1);
      return elements.filter((node) => node.has(name));
    },
  };
}

function fixture() {
  const blocks = {
    live: element({ 'data-phase': 'live' }),
    preregister: element({ 'data-phase': 'preregister' }),
    upcoming: element({ 'data-phase': 'upcoming' }),
    unknown: element({ 'data-phase': 'unknown' }),
  };
  const ios = element({ 'data-store-link': 'ios' });
  const android = element({ 'data-store-link': 'android' });
  const pendingIos = element({ 'data-store-pending': 'ios' });
  const pendingAndroid = element({ 'data-store-pending': 'android' });
  const cta = element({ 'data-app-cta': '' });
  const status = element({ 'data-phase-status': '' });
  const storeStatus = element({ 'data-store-status': '' });
  const closedNote = element({ 'data-prereg-closed': '' });
  closedNote.classList = { removed: [], remove(name) { this.removed.push(name); } };
  const nodes = [
    ...Object.values(blocks),
    ios,
    android,
    pendingIos,
    pendingAndroid,
    cta,
    status,
    storeStatus,
    closedNote,
  ];
  return {
    blocks,
    ios,
    android,
    pendingIos,
    pendingAndroid,
    cta,
    status,
    storeStatus,
    closedNote,
    document: documentWith(nodes),
  };
}

function configureStores(phase) {
  phase.configure({ storeLinks: { ios: IOS_URL, android: ANDROID_URL } });
}

function publicConfig(overrides = {}) {
  return {
    signup_enabled: true,
    invite_required: false,
    preregistration_open: false,
    ios_public_available: true,
    android_public_available: true,
    ...overrides,
  };
}

function assertStores(state, ios, android) {
  // `vm` devuelve objetos de otro realm: comparar los booleanos uno a uno.
  assert.equal(state.stores.ios, ios);
  assert.equal(state.stores.android, android);
}

test('live access wins and closes the founder offer at public launch', async () => {
  const phase = await loadPhaseRuntime();

  const state = phase.resolveConfig(publicConfig({ preregistration_open: true }));

  assert.equal(state.phase, 'live');
  assert.equal(state.live, true);
  assert.equal(state.registrationOpen, true);
  assert.equal(state.founderOpen, false);
  assertStores(state, true, true);
  assert.equal(state.anyStore, true);
});

test('an explicit open flag is the only way to render founder preregistration', async () => {
  const phase = await loadPhaseRuntime();

  const open = phase.resolveConfig(
    publicConfig({ signup_enabled: false, preregistration_open: true }),
  );
  assert.equal(open.phase, 'preregister');
  assert.equal(open.registrationOpen, false);
  assert.equal(open.founderOpen, true);
  // Sin acceso público normal no se publica ninguna tienda, aunque sus flags
  // lleguen a true: primero se exige el acceso.
  assertStores(open, false, false);
  assert.equal(open.anyStore, false);

  const missing = phase.resolveConfig({
    signup_enabled: false,
    invite_required: false,
    ios_public_available: true,
    android_public_available: true,
  });
  assert.equal(missing.phase, 'unknown');
  assert.equal(missing.known, false);
  assert.equal(missing.founderOpen, false);
  assertStores(missing, false, false);

  const closed = phase.resolveConfig(
    publicConfig({ signup_enabled: false, preregistration_open: false }),
  );
  assert.equal(closed.phase, 'upcoming');
  assert.equal(closed.founderOpen, false);
  assertStores(closed, false, false);

  // Frontera del fundador: la apertura pública manda, aunque el backend
  // todavía no haya retirado `preregistration_open`.
  const launched = phase.resolveConfig(
    publicConfig({ signup_enabled: true, preregistration_open: true }),
  );
  assert.equal(launched.phase, 'live');
  assert.equal(launched.founderOpen, false);
});

test('invite-only access keeps the invitation path instead of claiming live', async () => {
  const phase = await loadPhaseRuntime();

  const state = phase.resolveConfig(
    publicConfig({ signup_enabled: true, invite_required: true, preregistration_open: true }),
  );

  assert.equal(state.phase, 'preregister');
  assert.equal(state.live, false);
  assert.equal(state.registrationOpen, false);
  assert.equal(state.inviteRequired, true);
  assert.equal(state.founderOpen, true);
  assertStores(state, false, false);
  assert.equal(state.anyStore, false);
});

test('missing or malformed config fails safely with no founder or store claim', async () => {
  const phase = await loadPhaseRuntime();

  for (const config of [null, undefined, [], 'live', 42, {}]) {
    const state = phase.resolveConfig(config);
    assert.equal(state.phase, 'unknown');
    assert.equal(state.live, false);
    assert.equal(state.registrationOpen, false);
    assert.equal(state.founderOpen, false);
    assert.equal(state.known, false);
    assertStores(state, false, false);
    assert.equal(state.anyStore, false);
  }
});

test('cutoff 410 closes the form while other errors stay actionable', async () => {
  const phase = await loadPhaseRuntime();

  const ok = phase.submitOutcome(200, { status: 'ok' });
  assert.equal(ok.kind, 'ok');
  assert.equal(ok.detail, '');
  assert.equal(
    phase.submitOutcome(410, { detail: 'preregistration_closed' }).kind,
    'closed',
  );
  assert.equal(
    phase.submitOutcome(410, { detail: 'preregistration_unavailable' }).kind,
    'error',
  );
  assert.equal(
    phase.submitOutcome(403, { detail: 'invite_required. Beta cerrada' }).kind,
    'invite_required',
  );
  assert.equal(
    phase.submitOutcome(410, { detail: 'invite_code_expired' }).kind,
    'invite_code',
  );
  assert.equal(phase.submitOutcome(409, { detail: 'username_already_taken' }).kind, 'conflict');
  assert.equal(phase.submitOutcome(422, { detail: [] }).kind, 'validation');
  assert.equal(phase.submitOutcome(500, {}).kind, 'error');
});

test('each store link requires public registration plus its own strict true flag', async () => {
  const phase = await loadPhaseRuntime();
  const view = fixture();
  configureStores(phase);

  // Ambas cerradas: el acceso puede estar abierto, pero no se anuncia tienda.
  phase.apply(
    view.document,
    phase.resolveConfig(
      publicConfig({ ios_public_available: false, android_public_available: false }),
    ),
  );
  assert.equal(view.blocks.live.hidden, false);
  assert.equal(view.ios.hidden, true);
  assert.equal(view.ios.attr('href'), null);
  assert.equal(view.android.hidden, true);
  assert.equal(view.android.attr('href'), null);
  assert.equal(view.pendingIos.hidden, false);
  assert.equal(view.pendingAndroid.hidden, false);
  assert.equal(view.cta.textContent, 'Entrar');
  assert.match(view.storeStatus.textContent, /El acceso ya está abierto/);
  assert.match(view.storeStatus.textContent, /aparecerán aquí/);

  // Solo iOS publicada: Android sigue pendiente.
  phase.apply(
    view.document,
    phase.resolveConfig(
      publicConfig({ ios_public_available: true, android_public_available: false }),
    ),
  );
  assert.equal(view.ios.hidden, false);
  assert.equal(view.ios.attr('href'), IOS_URL);
  assert.equal(view.android.hidden, true);
  assert.equal(view.android.attr('href'), null);
  assert.equal(view.pendingIos.hidden, true);
  assert.equal(view.pendingAndroid.hidden, false);
  assert.equal(view.cta.textContent, 'Descargar');
  assert.match(view.storeStatus.textContent, /Ágora ya está en App Store/);
  assert.match(view.storeStatus.textContent, /Google Play llegará pronto/);

  // Solo Android publicada: iOS sigue pendiente.
  phase.apply(
    view.document,
    phase.resolveConfig(
      publicConfig({ ios_public_available: false, android_public_available: true }),
    ),
  );
  assert.equal(view.android.hidden, false);
  assert.equal(view.android.attr('href'), ANDROID_URL);
  assert.equal(view.ios.hidden, true);
  assert.equal(view.ios.attr('href'), null);
  assert.equal(view.pendingAndroid.hidden, true);
  assert.equal(view.pendingIos.hidden, false);
  assert.equal(view.cta.textContent, 'Descargar');
  assert.match(view.storeStatus.textContent, /Ágora ya está en Google Play/);
  assert.match(view.storeStatus.textContent, /App Store llegará pronto/);

  // Ambas publicadas.
  phase.apply(view.document, phase.resolveConfig(publicConfig()));
  assert.equal(view.ios.hidden, false);
  assert.equal(view.android.hidden, false);
  assert.equal(view.pendingIos.hidden, true);
  assert.equal(view.pendingAndroid.hidden, true);
  assert.equal(view.cta.textContent, 'Descargar');
  assert.match(view.storeStatus.textContent, /App Store y Google Play/);
});

test('missing, false or non-boolean store flags fail closed per platform', async () => {
  const phase = await loadPhaseRuntime();

  for (const value of [undefined, false, 'true', 1, null, {}, []]) {
    const state = phase.resolveConfig(
      publicConfig({ ios_public_available: value, android_public_available: value }),
    );
    assert.equal(state.phase, 'live');
    assert.equal(state.known, true);
    assertStores(state, false, false);
    assert.equal(state.anyStore, false);
  }

  const missing = phase.resolveConfig({
    signup_enabled: true,
    invite_required: false,
    preregistration_open: false,
  });
  assert.equal(missing.phase, 'live');
  assertStores(missing, false, false);
});

test('without public access the store flags cannot open any link', async () => {
  const phase = await loadPhaseRuntime();
  const view = fixture();
  configureStores(phase);

  for (const config of [
    publicConfig({ signup_enabled: false, preregistration_open: true }),
    publicConfig({ signup_enabled: true, invite_required: true, preregistration_open: true }),
  ]) {
    const state = phase.resolveConfig(config);
    assert.equal(state.registrationOpen, false);
    assertStores(state, false, false);
    assert.equal(state.anyStore, false);

    phase.apply(view.document, state);
    assert.equal(view.blocks.live.hidden, true);
    assert.equal(view.ios.hidden, true);
    assert.equal(view.ios.attr('href'), null);
    assert.equal(view.android.hidden, true);
    assert.equal(view.android.attr('href'), null);
    assert.equal(view.pendingIos.hidden, false);
    assert.equal(view.pendingAndroid.hidden, false);
    assert.equal(view.cta.textContent, 'Entrar antes');
  }
});

test('applying a phase only reveals that phase and clears stale store links', async () => {
  const phase = await loadPhaseRuntime();
  const view = fixture();

  configureStores(phase);

  phase.apply(
    view.document,
    phase.resolveConfig(publicConfig({ signup_enabled: false, preregistration_open: true })),
  );
  assert.equal(view.blocks.preregister.hidden, false);
  assert.equal(view.blocks.upcoming.hidden, true);
  assert.equal(view.blocks.live.hidden, true);
  assert.equal(view.blocks.unknown.hidden, true);
  assert.equal(view.ios.hidden, true);
  assert.equal(view.ios.attr('href'), null);
  assert.equal(view.pendingIos.hidden, false);
  assert.equal(view.cta.textContent, 'Entrar antes');
  assert.equal(view.document.documentElement.attr('data-agora-phase'), 'preregister');

  phase.apply(view.document, phase.resolveConfig(publicConfig()));
  assert.equal(view.blocks.live.hidden, false);
  assert.equal(view.blocks.preregister.hidden, true);
  assert.equal(view.ios.hidden, false);
  assert.equal(view.ios.attr('href'), IOS_URL);
  assert.equal(view.android.attr('href'), ANDROID_URL);
  assert.equal(view.pendingIos.hidden, true);
  assert.equal(view.pendingAndroid.hidden, true);
  assert.equal(view.cta.textContent, 'Descargar');

  phase.apply(
    view.document,
    phase.resolveConfig(publicConfig({ signup_enabled: false, preregistration_open: false })),
  );
  assert.equal(view.blocks.upcoming.hidden, false);
  assert.equal(view.blocks.live.hidden, true);
  assert.equal(view.ios.hidden, true);
  assert.equal(view.ios.attr('href'), null);
  assert.equal(view.pendingIos.hidden, false);
  assert.equal(view.cta.textContent, 'Entrar antes');

  view.storeStatus.textContent = '';
  phase.apply(view.document, phase.unknownState(true));
  assert.equal(view.blocks.unknown.hidden, false);
  assert.equal(view.blocks.upcoming.hidden, true);
  assert.equal(view.ios.hidden, true);
  // Sin config se siguen viendo los botones «Próximamente», sin enlaces activos.
  assert.equal(view.pendingIos.hidden, false);
  assert.equal(view.pendingAndroid.hidden, false);
  assert.match(view.status.textContent, /Ágora llega a iOS y Android/);
  assert.equal(view.cta.textContent, 'Entrar antes');
  // `unknown` no reescribe la copia de tienda: no afirma disponibilidad.
  assert.equal(view.storeStatus.textContent, '');
});

test('a live config never fabricates store URLs if the canonical links are absent', async () => {
  const phase = await loadPhaseRuntime();
  const view = fixture();

  phase.apply(view.document, phase.resolveConfig(publicConfig()));

  assert.equal(view.blocks.live.hidden, false);
  assert.equal(view.ios.hidden, true);
  assert.equal(view.ios.attr('href'), null);
  assert.equal(view.android.hidden, true);
  assert.equal(view.android.attr('href'), null);
  // Sin URL canónica se mantiene visible «Próximamente» y el CTA no promete
  // una descarga que no existe.
  assert.equal(view.pendingIos.hidden, false);
  assert.equal(view.pendingAndroid.hidden, false);
  assert.equal(view.cta.textContent, 'Entrar');
  assert.match(view.storeStatus.textContent, /aparecerán aquí/);
});

test('a server-side cutoff closes the form and announces the transition', async () => {
  const phase = await loadPhaseRuntime();
  const view = fixture();

  phase.applyClosed(view.document);

  assert.equal(view.blocks.preregister.hidden, true);
  assert.equal(view.blocks.upcoming.hidden, false);
  assert.equal(view.closedNote.hidden, false);
  assert.deepEqual(view.closedNote.classList.removed, ['hidden']);
  assert.equal(view.ios.hidden, true);
  assert.equal(view.pendingIos.hidden, false);
  assert.equal(view.document.documentElement.attr('data-agora-phase'), 'upcoming');
});

test('network and config failures resolve to unknown without founder or store claims', async () => {
  const phase = await loadPhaseRuntime();
  const rejecting = () => Promise.reject(new Error('offline'));

  const offline = await phase.loadConfig('https://example.test/config', rejecting);
  assert.equal(offline.phase, 'unknown');
  assert.equal(offline.error, true);
  assert.equal(offline.founderOpen, false);
  assertStores(offline, false, false);
  assert.equal(offline.anyStore, false);

  const badStatus = await phase.loadConfig('https://example.test/config', () =>
    Promise.resolve({ ok: false, json: () => Promise.resolve({}) }),
  );
  assert.equal(badStatus.phase, 'unknown');
  assert.equal(badStatus.error, true);
  assertStores(badStatus, false, false);

  const brokenJson = await phase.loadConfig('https://example.test/config', () =>
    Promise.resolve({ ok: true, json: () => Promise.reject(new Error('invalid json')) }),
  );
  assert.equal(brokenJson.phase, 'unknown');
  assert.equal(brokenJson.error, true);
  assertStores(brokenJson, false, false);

  const ok = await phase.loadConfig('https://example.test/config', () =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          signup_enabled: false,
          invite_required: false,
          preregistration_open: true,
          ios_public_available: true,
          android_public_available: true,
        }),
    }),
  );
  assert.equal(ok.phase, 'preregister');
  assert.equal(ok.founderOpen, true);
  assertStores(ok, false, false);

  const liveWithoutFlags = await phase.loadConfig('https://example.test/config', () =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          signup_enabled: true,
          invite_required: false,
          preregistration_open: false,
        }),
    }),
  );
  assert.equal(liveWithoutFlags.phase, 'live');
  assertStores(liveWithoutFlags, false, false);

  const liveWithFlags = await phase.loadConfig('https://example.test/config', () =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          signup_enabled: true,
          invite_required: false,
          preregistration_open: false,
          ios_public_available: true,
          android_public_available: true,
        }),
    }),
  );
  assert.equal(liveWithFlags.phase, 'live');
  assertStores(liveWithFlags, true, true);

  const malformedOk = await phase.loadConfig('https://example.test/config', () =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({ unexpected: true }) }),
  );
  assert.equal(malformedOk.phase, 'unknown');
  assert.equal(malformedOk.error, true);
  assert.equal(malformedOk.founderOpen, false);
  assertStores(malformedOk, false, false);
});

test('built pages start neutral, hide founder preregistration, and keep store URLs out of HTML', async () => {
  const [index, descargar, referral, tournament, faq] = await Promise.all([
    read('dist/index.html'),
    read('dist/descargar.html'),
    read('dist/r.html'),
    read('dist/t.html'),
    read('dist/faq.html'),
  ]);

  for (const page of [index, descargar, referral, tournament]) {
    assert.match(page, /data-app-cta[^>]*>Entrar antes/);
    // Las URLs viajan en el módulo de datos para inyectarlas en runtime, pero
    // el marcado estático no debe exponer ningún enlace de tienda.
    const markup = page.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    assert.doesNotMatch(markup, /play\.google\.com/);
    assert.doesNotMatch(markup, /apps\.apple\.com/);
    // La copia estática no puede afirmar que ambas tiendas ya están abiertas.
    assert.doesNotMatch(page, /Ya (?:está|disponible) en App Store y Google Play/);
    assert.match(page, /data-store-status/);
  }

  assert.match(index, /<div data-phase="preregister" hidden>/);
  assert.match(index, /<div data-phase="unknown">/);
  assert.match(index, /<form[^>]*data-prereg/);
  assert.ok(
    index.indexOf('data-phase="preregister" hidden') < index.indexOf('data-prereg'),
    'the founder form must live inside the hidden preregister block',
  );
  assert.match(index, /Comprobando si el pre-registro o la descarga ya están disponibles/);

  // El aviso de cierre por 410 no puede llevar la clase `hidden`: applyClosed
  // retira el atributo, pero la clase seguiría ocultándolo en el navegador.
  const closedNotice = /<p class="([^"]*)" data-prereg-closed/.exec(index);
  assert.ok(closedNotice, 'the closed notice must be present');
  assert.doesNotMatch(closedNotice[1], /\bhidden\b/);

  // Un fallo de red no promete una reserva manual: solo reintento y el
  // contacto aprobado, que nunca se salta el corte.
  assert.doesNotMatch(index, /te reservamos la plaza/);
  assert.match(index, /support@agoraclan\.com/);

  // Los botones «Próximamente» se ven desde el primer pintado y están atados a
  // cada tienda; los enlaces reales llegan solo con la config y el flag.
  assert.match(descargar, /data-store-pending="ios"/);
  assert.match(descargar, /data-store-pending="android"/);
  assert.doesNotMatch(descargar, /data-store-pending="ios"[^>]*hidden/);
  assert.doesNotMatch(descargar, /data-store-pending="android"[^>]*hidden/);
  assert.match(descargar, /data-store-link="ios"[^>]*hidden/);
  assert.match(descargar, /data-store-link="android"[^>]*hidden/);
  assert.match(descargar, /Comprobando el estado del pre-registro y de las tiendas/);

  for (const page of [referral, tournament]) {
    assert.match(page, /data-store-link="ios"[^>]*hidden/);
    assert.match(page, /data-store-link="android"[^>]*hidden/);
    assert.match(page, /Comprobando la disponibilidad de la app/);
    // El fallback /r y /t conserva token/código, query y base path.
    assert.match(page, /const storageKey = isReferral \? 'agora_ref_code' : 'agora_tournament_token'/);
    assert.match(page, /const queryKey = isReferral \? 'ref' : 'token'/);
    assert.match(page, /new URLSearchParams\(window\.location\.search\)\.get\(queryKey\)/);
    assert.match(page, /pathValue \|\| queryValue/);
    assert.match(page, /encodeURIComponent\(value\)/);
  }

  // La copia pública ya no promete pre-registro ni «próximamente» estáticos.
  for (const page of [faq, descargar]) {
    assert.doesNotMatch(page, /Reservando tu plaza en el pre-registro te avisamos/);
    assert.doesNotMatch(page, /Próximamente en App Store y Google Play a la vez/);
    // Tampoco promete un lanzamiento coordinado que las tiendas no confirman.
    assert.doesNotMatch(page, /simultáne/i);
  }
  assert.doesNotMatch(descargar, /De aquí al día del lanzamiento/);

  // El schema estático no anuncia instalación mientras no haya lectura real.
  assert.doesNotMatch(index, /"installUrl"/);

  const script = /<script[^>]*src="([^"]*public-phase\.js)"/.exec(index);
  assert.ok(script, 'pages must load the shared phase runtime');
  assert.ok(script[1].endsWith('/assets/public-phase.js'), script[1]);
});

test('store URLs have a single source and the runtime publishes them only when ready', async () => {
  const [runtime, siteSource, schemaSource, base] = await Promise.all([
    read('public/assets/public-phase.js'),
    read('src/data/site.js'),
    read('src/lib/schema.js'),
    read('src/layouts/Base.astro'),
  ]);

  // La fuente única es site.js; el runtime no duplica las URLs.
  assert.ok(siteSource.includes(ANDROID_URL));
  assert.ok(siteSource.includes(IOS_URL));
  assert.ok(!runtime.includes(ANDROID_URL));
  assert.ok(!runtime.includes(IOS_URL));
  assert.match(runtime, /ready\[store\]/);
  assert.match(runtime, /ios_public_available === true/);
  assert.match(runtime, /android_public_available === true/);
  assert.match(runtime, /function configure\(options\)/);

  // El layout inyecta APP en el runtime antes de resolver la fase.
  assert.match(base, /import \{ APP, CONFIG_ENDPOINT \} from '\.\.\/data\/site\.js'/);
  assert.match(
    base,
    /runtime\.configure\(\{ storeLinks: \{ ios: APP\.ios, android: APP\.android \} \}\)/,
  );

  assert.match(siteSource, /stores: \{ ios: false, android: false \}/);
  assert.match(siteSource, /live:\s*false/);
  assert.match(siteSource, /https:\/\/api\.agoraclan\.com\/api\/v1\/config/);

  // Structured data must not advertise an install URL before the operator
  // confirms that store listing.
  assert.match(
    schemaSource,
    /APP\.live && APP\.stores\.android \? \{ installUrl: APP\.android \}/,
  );
});

test('the /privacy.html alias reaches the approved policy and keeps query and hash', async () => {
  const html = await read('dist/privacy.html');
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(
    (match) => match[1],
  );
  const redirect = scripts.find((script) =>
    script.includes("new URL('assets/legal/privacy.html'"),
  );
  assert.ok(redirect, 'the .html alias must redirect to the published policy');

  const location = {
    href: 'https://agoraclan.com/privacy.html',
    search: '?source=store',
    hash: '#conservacion',
    replace(target) {
      this.redirect = target;
    },
  };
  runInNewContext(redirect, { location, URL });

  const target = new URL(location.redirect);
  assert.equal(target.origin, 'https://agoraclan.com');
  assert.equal(target.pathname, '/assets/legal/privacy.html');
  assert.equal(target.search, '?source=store');
  assert.equal(target.hash, '#conservacion');
});

test('the footer exposes the support page with the approved contact', async () => {
  const index = await read('dist/index.html');
  const footer = /<footer[\s\S]*?<\/footer>/.exec(index);
  assert.ok(footer, 'the built page must include the footer');

  // El pie publica el buzón de atención al público (decisión del propietario,
  // nov. 2026). Los documentos legales conservan su contacto propio.
  assert.match(footer[0], /href="\/soporte"/);
  assert.match(footer[0], /mailto:support@agoraclan\.com/);
  assert.doesNotMatch(footer[0], /agoragaming99@gmail\.com/);
});

test('support page publishes the approved contact and the account-deletion path', async () => {
  const support = await read('dist/soporte.html');

  assert.match(support, /agoragaming99@gmail\.com/);
  assert.match(support, /mailto:agoragaming99@gmail\.com/);
  assert.match(support, /assets\/legal\/account-deletion\.html/);
  assert.match(support, /Eliminar cuenta o datos/);
  assert.match(support, /\/privacy/);
});

test('privacy policy states the app and preregistration store year and month', async () => {
  const [privacy, deletion] = await Promise.all([
    read('dist/assets/legal/privacy.html'),
    read('dist/assets/legal/account-deletion.html'),
  ]);

  assert.match(privacy, /año y mes de nacimiento \(AAAA-MM\)/);
  assert.match(privacy, /Ricardo Ruiz Gracia/);
  assert.match(privacy, /agoragaming99@gmail\.com/);
  assert.match(
    privacy,
    /tanto el pre-registro como la app envían el año y mes de nacimiento \(AAAA-MM\) y el servidor lo almacena/i,
    'the policy must state that both the app and preregistration store year-month server-side',
  );
  assert.ok(
    !privacy.includes(
      'La fecha de nacimiento se utiliza para comprobar la edad en tu dispositivo.',
    ),
    'the old on-device-only claim must be corrected',
  );
  assert.match(deletion, /agoragaming99@gmail\.com/);
  assert.match(deletion, /privacy\.html/);
});

test('the built runtime module is served as a public asset', async () => {
  await access(resolve(root, 'dist/assets/public-phase.js'));
  const built = await read('dist/assets/public-phase.js');
  const source = await read('public/assets/public-phase.js');
  assert.equal(built, source);
});

test('init retries a failed config load before settling on unknown', async () => {
  const phase = await loadPhaseRuntime();
  let calls = 0;
  const flaky = () => {
    calls += 1;
    if (calls < 3) return Promise.reject(new Error('offline'));
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          signup_enabled: false,
          invite_required: false,
          preregistration_open: true,
          ios_public_available: true,
          android_public_available: true,
        }),
    });
  };
  const view = fixture();
  const state = await phase.init(view.document, 'https://example.test/config', flaky, [0, 0]);
  assert.equal(calls, 3);
  assert.equal(state.phase, 'preregister');
  assert.equal(view.blocks.preregister.hidden, false);
  assert.equal(view.ios.hidden, true);
  assert.equal(view.pendingIos.hidden, false);

  let attempts = 0;
  const down = () => {
    attempts += 1;
    return Promise.reject(new Error('offline'));
  };
  const failed = await phase.init(fixture().document, 'https://example.test/config', down, [0, 0]);
  assert.equal(attempts, 3);
  assert.equal(failed.phase, 'unknown');
  assertStores(failed, false, false);
});
