// =====================
// ELEMENTS
// =====================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');
const progressBar = document.querySelector('.progress-bar');
const phoneItem = document.getElementById('copy-phone');
const phoneText = document.getElementById('phone-text');

// =====================
// NAV ACTIVE ON SCROLL (THROTTLED)
// =====================
let lastScrollUpdate = 0;
function updateActiveNav() {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');

    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// =====================
// SCROLL PROGRESS BAR
// =====================
function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  progressBar.style.width = progress + '%';
}

// Throttle scroll events
function throttledScroll() {
  const now = Date.now();
  if (now - lastScrollUpdate > 100) {
    updateActiveNav();
    updateProgressBar();
    lastScrollUpdate = now;
  }
}

// =====================
// COPY PHONE
// =====================
function setupCopyPhone() {
  const phoneItem = document.getElementById('copy-phone');
  const phoneText = document.getElementById('phone-text');
  const toast = document.getElementById('copy-toast');

  if (!phoneItem) return;

  phoneItem.addEventListener('click', () => {
    navigator.clipboard.writeText(phoneText.textContent);

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 1500);
  });
}

// =====================
// FADE-IN OBSERVER
// =====================
function setupFadeIn() {
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
}

// =====================
// INIT
// =====================
function init() {
  setupCopyPhone();
  setupFadeIn();

  window.addEventListener('scroll', throttledScroll, { passive: true });
}

init();