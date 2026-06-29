const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const themeToggle = document.querySelector('.theme-toggle');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const counters = document.querySelectorAll('.counter');
const navbar = document.querySelector('.navbar-container');

const updateThemeIcon = () => {
  const icon = themeToggle.querySelector('i');
  const isDark = document.body.classList.contains('dark-theme');
  icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
};

navToggle?.addEventListener('click', () => {
  navList.classList.toggle('open');
  navToggle.classList.toggle('open');
});

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  updateThemeIcon();
});

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navList.classList.remove('open');
  });
});

const updateScrollState = () => {
  if (window.scrollY > 180) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }

  navbar?.classList.toggle('shadow', window.scrollY > 10);
};

window.addEventListener('scroll', updateScrollState);

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const currentYear = document.getElementById('year');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const revealCounters = () => {
  const section = document.querySelector('.stats-grid');
  if (!section || counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, observerRef) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        counters.forEach((counter) => {
          const target = Number(counter.dataset.target) || 0;
          let current = 0;
          const increment = Math.max(1, Math.floor(target / 120));

          const update = () => {
            current += increment;
            if (current >= target) {
              counter.textContent = String(target);
            } else {
              counter.textContent = String(current);
              window.requestAnimationFrame(update);
            }
          };

          update();
        });

        observerRef.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(section);
};

window.addEventListener('DOMContentLoaded', revealCounters);
