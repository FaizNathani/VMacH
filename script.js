// ===========================
// VMacH — Interactions
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Fade-in on scroll (Intersection Observer) ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  fadeEls.forEach(el => observer.observe(el));

  /* ---------- Timeline progress animation ---------- */
  const timeline = document.querySelector('.timeline');
  const progress = document.querySelector('.timeline-progress');

  if (timeline && progress) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progress.classList.add('active');
          timelineObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });

    timelineObserver.observe(timeline);
  }

  /* ---------- Contact form (no backend) ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();

      status.textContent = `Thanks${name ? `, ${name}` : ''} — your message is ready to send. Connect a form service to receive it.`;
      form.reset();

      setTimeout(() => { status.textContent = ''; }, 6000);
    });
  }

  /* ---------- Sticky nav shadow on scroll ---------- */
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 12) {
      nav.style.boxShadow = '0 4px 24px rgba(18,18,18,0.05)';
    } else {
      nav.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
  }, { passive: true });

});