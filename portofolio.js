// CURSOR
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
  setTimeout(() => {
    trail.style.left = mx - 18 + 'px';
    trail.style.top = my - 18 + 'px';
  }, 60);
});

// LANGUAGE
let currentLang = 'en';
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.lang-btn button:${lang === 'en' ? 'first' : 'last'}-child`).classList.add('active');
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val) el.innerHTML = val;
  });
}

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal, .timeline-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (entry.target.classList.contains('timeline-item') ? 0 : 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 80 + 'ms';
  observer.observe(el);
});

// STAGGER project cards
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = i * 100 + 'ms';
});

// NAV active link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
});

// PARALLAX hero glow on mouse
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelector('.hero-glow').style.transform = `translate(calc(-50% + ${x}px), calc(-60% + ${y}px))`;
});