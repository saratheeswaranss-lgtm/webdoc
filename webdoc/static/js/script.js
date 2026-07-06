document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------------
  // Footer year
  // -------------------------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -------------------------------------------------------------------
  // Mobile menu toggle
  // -------------------------------------------------------------------
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // -------------------------------------------------------------------
  // Nav popup panels (Services / Contact Us) — tap-to-toggle on touch,
  // hover already handled in CSS for pointer devices.
  // -------------------------------------------------------------------
  document.querySelectorAll('.pill-nav__item[data-popup]').forEach((item) => {
    const link = item.querySelector('a');
    link.addEventListener('click', (e) => {
      if (window.matchMedia('(hover: none)').matches) {
        e.preventDefault();
        const wasOpen = item.classList.contains('is-open');
        document.querySelectorAll('.pill-nav__item.is-open').forEach((el) => el.classList.remove('is-open'));
        if (!wasOpen) item.classList.add('is-open');
      }
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.pill-nav__item')) {
      document.querySelectorAll('.pill-nav__item.is-open').forEach((el) => el.classList.remove('is-open'));
    }
  });

  // -------------------------------------------------------------------
  // Scroll reveal
  // -------------------------------------------------------------------
  const revealEls = document.querySelectorAll('.reveal');
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // -------------------------------------------------------------------
  // Hero glow follows cursor slightly (desktop only, subtle)
  // -------------------------------------------------------------------
  const hero = document.querySelector('.hero');
  if (hero && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty('--mx', `${x * 24}px`);
      hero.style.setProperty('--my', `${y * 24}px`);
      hero.querySelectorAll('.hero__glow').forEach((glow, i) => {
        const factor = i === 0 ? 1 : -1;
        glow.style.transform = `translate(${x * 20 * factor}px, ${y * 20 * factor}px)`;
      });
    });
  }

  // -------------------------------------------------------------------
  // Service card popups (click/tap to expand, click × or outside to close)
  // -------------------------------------------------------------------
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card) => {
    const open = () => {
      serviceCards.forEach((c) => c.classList.remove('is-open'));
      card.classList.add('is-open');
    };
    const close = () => card.classList.remove('is-open');

    card.addEventListener('click', (e) => {
      if (e.target.closest('.service-card__close')) {
        close();
        return;
      }
      if (e.target.closest('.service-card__link')) return; // let the link work
      if (card.classList.contains('is-open')) return;
      open();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.contains('is-open') ? close() : open();
      }
      if (e.key === 'Escape') close();
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.service-card')) {
      serviceCards.forEach((c) => c.classList.remove('is-open'));
    }
  });

  // -------------------------------------------------------------------
  // Client card subtle tilt on hover (desktop only)
  // -------------------------------------------------------------------
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
});
