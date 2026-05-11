/* =========================================
   script.js — zisdev Portfolio Scripts
   ========================================= */

// ─── Mobile Menu Toggle ───────────────────
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', !isHidden);
    menuToggle.textContent = isHidden ? 'close' : 'menu';
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuToggle.textContent = 'menu';
    });
  });
}

// ─── Active Nav Link on Scroll ───────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header nav a');

function updateActiveNav() {
  let currentId = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary');
    link.classList.add('text-on-surface-variant', 'font-medium');
    const href = link.getAttribute('href');
    if (href === `#${currentId}` || (currentId === '' && href === '#')) {
      link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary');
      link.classList.remove('text-on-surface-variant', 'font-medium');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ─── Contact Form Handler ─────────────────
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Mengirim...';
    btn.disabled = true;

    // Simulate sending (replace with real fetch/API call)
    setTimeout(() => {
      btn.textContent = '✓ Pesan Terkirim!';
      btn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
      contactForm.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });
}

// ─── Project Arrow Buttons (scroll hint) ─────
const projPrev = document.getElementById('proj-prev');
const projNext = document.getElementById('proj-next');
const projectsSection = document.getElementById('projects');

if (projPrev && projNext && projectsSection) {
  projNext.addEventListener('click', () => {
    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  projPrev.addEventListener('click', () => {
    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// ─── Scroll-reveal Animation ─────────────────
const revealElements = document.querySelectorAll('.glass-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
