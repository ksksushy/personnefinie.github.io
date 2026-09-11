// === Year in footer ===
document.getElementById('year').textContent = new Date().getFullYear();

// === Custom cursor ===
const cursorDot = document.getElementById('cursorDot');
window.addEventListener('mousemove', (e) => {
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .work-item, .about-step, .service-card').forEach(el=>{
  el.addEventListener('mouseenter', ()=>{
    cursorDot.style.width = '36px';
    cursorDot.style.height = '36px';
    cursorDot.style.background = 'rgba(194,42,42,0.25)';
  });
  el.addEventListener('mouseleave', ()=>{
    cursorDot.style.width = '16px';
    cursorDot.style.height = '16px';
    cursorDot.style.background = 'transparent';
  });
});

// === Scroll progress bar ===
const progressBar = document.getElementById('progressBar');
function updateProgress(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (scrollTop / docHeight) * 100;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress);
updateProgress();

// === Nav background on scroll ===
const nav = document.getElementById('nav');
function updateNav(){
  if(window.scrollY > 40){
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateNav);
updateNav();

// === Reveal on scroll (IntersectionObserver) ===
const revealEls = document.querySelectorAll('.reveal-up');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el, i)=>{
  el.style.transitionDelay = (i % 6) * 0.08 + 's';
  observer.observe(el);
});

// === Hero parallax on scroll ===
const heroLines = document.querySelectorAll('.hero-title .line');
const orb1 = document.querySelector('.orb1');
const orb2 = document.querySelector('.orb2');
window.addEventListener('scroll', ()=>{
  const scrolled = window.scrollY;
  heroLines.forEach(line=>{
    const speed = parseFloat(line.dataset.speed || 0.3);
    line.style.transform = `translateY(${scrolled * speed * 0.3}px)`;
    line.style.opacity = Math.max(1 - scrolled / 600, 0);
  });
  if(orb1) orb1.style.transform = `translateY(${scrolled * 0.15}px)`;
  if(orb2) orb2.style.transform = `translateY(${scrolled * -0.1}px)`;
});

// === Smooth anchor scroll (fallback) ===
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior:'smooth', block:'start' });
    }
  });
});

// === Contact form (demo — no backend yet) ===
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Отправлено ✓';
    btn.style.background = '#4a9b6e';
    setTimeout(()=>{
      btn.textContent = originalText;
      btn.style.background = '';
      form.reset();
    }, 2500);
  });
}
