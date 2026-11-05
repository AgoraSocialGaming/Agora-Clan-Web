import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Atropos from 'atropos';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(pointer: fine)').matches;

/* ── Scroll suave (Lenis) ──────────────────────────────────────────────── */
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // El menú móvil necesita parar el scroll suave mientras está abierto
  window.__lenis = lenis;
}

// Anclas internas con margen para la cabecera fija
document.querySelectorAll('a[href^="/#"], a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').split('#')[1];
    const target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -84 });
    else target.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
  });
});

/* ── Apariciones al entrar en pantalla ─────────────────────────────────── */
const reveal = () => {
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: reduced ? 0 : 0.85,
      delay: reduced ? 0 : parseFloat(el.dataset.revealDelay ?? '0'),
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  document.querySelectorAll('[data-reveal-group]').forEach((group) => {
    gsap.to(group.querySelectorAll('[data-reveal-item]'), {
      opacity: 1,
      y: 0,
      duration: reduced ? 0 : 0.8,
      stagger: reduced ? 0 : 0.09,
      ease: 'expo.out',
      scrollTrigger: { trigger: group, start: 'top 84%', once: true },
    });
  });
};

/* ── Contadores numéricos ──────────────────────────────────────────────── */
const counters = () => {
  document.querySelectorAll('[data-count-to]').forEach((el) => {
    const to = parseFloat(el.dataset.countTo);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: to,
      duration: reduced ? 0 : 1.6,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => {
        el.textContent = Math.round(obj.v).toLocaleString('es-ES');
      },
    });
  });
};

/* ── Inclinación 3D de los mockups (Atropos) ───────────────────────────
   Solo con puntero fino y sin reducción de movimiento.                   */
const tilt = () => {
  if (reduced || !fine) return;
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    const max = parseFloat(el.dataset.rotate ?? '8');
    Atropos({
      el,
      rotateXMax: max,
      rotateYMax: max,
      duration: 420,
      shadow: el.dataset.shadow === 'true',
      highlight: el.dataset.highlight !== 'false',
      activeOffset: 24,
    });
  });
};

/* ── Barra de progreso de lectura (se ve también en móvil) ─────────────── */
const progreso = () => {
  const barra = document.querySelector('[data-progress]');
  if (!barra) return;
  gsap.to(barra, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.25 },
  });
};

/* ── Parallax al hacer scroll ──────────────────────────────────────────
   Con scrub funciona igual con el dedo que con la rueda, así que en móvil
   por fin hay algo de profundidad.                                        */
const parallax = () => {
  if (reduced) return;
  const wide = window.matchMedia('(min-width: 1024px)').matches;
  document.querySelectorAll('[data-parallax]').forEach((el) => {
    // En los carruseles horizontales de móvil el parallax vertical no pinta nada
    if (!wide && el.closest('.u-rail')) return;
    const dist = parseFloat(el.dataset.parallax) || 40;
    gsap.fromTo(
      el,
      { y: dist },
      {
        y: -dist,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    );
  });
};

/* ── Flotación en bucle (mascotas y móviles del hero) ──────────────────── */
const flotar = () => {
  if (reduced) return;
  document.querySelectorAll('[data-float]').forEach((el, i) => {
    gsap.to(el, {
      y: -(parseFloat(el.dataset.float) || 10),
      duration: 2.6 + i * 0.35,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.2,
    });
  });
};

/* ── Mascotas: entran con un pequeño salto cuando aparece su sección ───── */
const pop = () => {
  document.querySelectorAll('[data-pop]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      duration: reduced ? 0 : 1.1,
      delay: reduced ? 0 : parseFloat(el.dataset.pop || '0.15'),
      ease: 'elastic.out(1, 0.62)',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
};

/* ── Líneas de bracket que se dibujan al hacer scroll ──────────────────── */
const draw = () => {
  document.querySelectorAll('[data-draw]').forEach((svg) => {
    const paths = svg.querySelectorAll('path, line, polyline');
    paths.forEach((p) => {
      const len = p.getTotalLength ? p.getTotalLength() : 400;
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = reduced ? '0' : `${len}`;
    });
    if (reduced) return;
    const scrub = svg.dataset.draw === 'scrub';
    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 1.4,
      stagger: 0.08,
      ease: 'power2.inOut',
      scrollTrigger: scrub
        ? { trigger: svg, start: 'top 85%', end: 'bottom 45%', scrub: 0.6 }
        : { trigger: svg, start: 'top 88%', once: true },
    });
  });
};

/* ── Foco de luz que sigue al puntero (hero) ───────────────────────────── */
const spotlight = () => {
  if (reduced || !fine) return;
  document.querySelectorAll('[data-spotlight]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
};

/* ── Arranque ──────────────────────────────────────────────────────────── */
const init = () => {
  window.__motionListo = true;
  document.documentElement.classList.remove('sin-motion');
  reveal();
  counters();
  tilt();
  progreso();
  parallax();
  flotar();
  pop();
  draw();
  spotlight();
  ScrollTrigger.refresh();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
