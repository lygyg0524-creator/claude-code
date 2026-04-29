/* ===========================
   Matrix Canvas
   =========================== */
const canvas = document.getElementById('matrix-canvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', () => {
    resizeCanvas();
    columns = Math.floor(canvas.width / fontSize);
    drops   = Array(columns).fill(1);
});

const chars  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>/\\|{}[]';
const fontSize = 13;
let columns  = Math.floor(canvas.width / fontSize);
let drops    = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(8, 13, 20, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
        const intensity = Math.random();
        if (intensity > 0.7) {
            ctx.fillStyle = '#00d4ff';
        } else {
            ctx.fillStyle = 'rgba(0, 212, 255, 0.4)';
        }

        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    });
}

setInterval(drawMatrix, 55);

/* ===========================
   Typing Effect
   =========================== */
const typingEl = document.getElementById('typing-text');
const finalText = '웹 취약점 분석가';
let charIndex = 0;

function typeWriter() {
    if (charIndex < finalText.length) {
        typingEl.textContent = finalText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 115);
    }
}

typeWriter();

/* ===========================
   Hamburger Menu
   =========================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

/* ===========================
   Smooth Scroll
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('open');
    });
});

/* ===========================
   Active Nav on Scroll
   =========================== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top    = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id     = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < bottom) {
            navAnchors.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
});

/* ===========================
   Project Card Click
   =========================== */
document.querySelectorAll('.project-card[data-href]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', e => {
        if (e.target.closest('.project-links')) return;
        window.location.href = card.dataset.href;
    });
});

/* ===========================
   Scroll Fade-in
   =========================== */
const fadeTargets = document.querySelectorAll(
    '.skill-card, .timeline-item, .intro-card, .contact-card, .project-card, .competency-box, .about-grid'
);

fadeTargets.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeTargets.forEach(el => observer.observe(el));
