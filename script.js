// Mobile menu
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Smooth close menu on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Active section highlighting
const sections = document.querySelectorAll('main.section, section.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    if (!id) return;
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link?.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => observer.observe(sec));

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (light/dark) with persistence
const themeToggle = document.getElementById('themeToggle');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
  document.body.classList.add('light');
  themeToggle.textContent = '☀️';
}

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Contact form -> opens email client
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();

  // Basic validation
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  let valid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // reset errors
  ['err-name','err-email','err-message'].forEach(id => document.getElementById(id).textContent = '');

  if (!name.value.trim()) { document.getElementById('err-name').textContent = 'Please enter your name.'; valid = false; }
  if (!emailRegex.test(email.value)) { document.getElementById('err-email').textContent = 'Please enter a valid email.'; valid = false; }
  if (!message.value.trim()) { document.getElementById('err-message').textContent = 'Please enter a message.'; valid = false; }

  if (!valid) return;

  // Change to your email
  const to = 'youremail@example.com';
  const subject = encodeURIComponent(`Portfolio Contact from ${name.value}`);
  const body = encodeURIComponent(`${message.value}\n\nFrom: ${name.value} <${email.value}>`);
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  form.reset();
});
