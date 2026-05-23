// ─────────────────────────────────────────────
// CUSTOM CURSOR
// ─────────────────────────────────────────────

const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursor) {
    cursor.style.left = mouseX - 4 + 'px';
    cursor.style.top = mouseY - 4 + 'px';
  }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  if (cursorRing) {
    cursorRing.style.left = ringX - 18 + 'px';
    cursorRing.style.top = ringY - 18 + 'px';
  }

  requestAnimationFrame(animateRing);
}
animateRing();

// hover efekat za cursor ring
document.querySelectorAll('a, button, .card, .figma-item, .banner-item')
  .forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursorRing) {
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
      }
    });

    el.addEventListener('mouseleave', () => {
      if (cursorRing) {
        cursorRing.style.width = '36px';
        cursorRing.style.height = '36px';
      }
    });
  });


// ─────────────────────────────────────────────
// MODALS
// ─────────────────────────────────────────────

function openModal(type) {
  const modal = document.getElementById('modal-' + type);
  if (!modal) return;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(type) {
  const modal = document.getElementById('modal-' + type);
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// klik van modala zatvara
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// ESC zatvara modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active')
      .forEach(m => m.classList.remove('active'));

    document.body.style.overflow = '';
  }
});


// ─────────────────────────────────────────────
// TOGGLE GALLERIES (FIGMA + BANERI)
// ─────────────────────────────────────────────

function toggleGallery(id) {
  const gallery = document.getElementById(id);
  if (!gallery) return;

  const isOpen = gallery.style.display === 'block';
  gallery.style.display = isOpen ? 'none' : 'block';
}


// ─────────────────────────────────────────────
// SLIDER (FIXED + CLEAN VERSION)
// ─────────────────────────────────────────────

document.querySelectorAll(".slider").forEach(slider => {
  let index = 0;

  const slides = slider.querySelectorAll(".slide");
  const dots = slider.querySelectorAll(".dot");
  const nextBtn = slider.querySelector(".next");
  const prevBtn = slider.querySelector(".prev");

  if (!slides.length) return;

  function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[i].classList.add("active");
    if (dots[i]) dots[i].classList.add("active");
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      showSlide(index);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      showSlide(index);
    });
  });

  showSlide(index);
});


// ─────────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────────

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card, .about-stats, .skills-list')
  .forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });