/* ===== MENU MOBILE ===== */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.classList.toggle('open', isOpen);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('open');
    }
  });
}

/* ===== HEADER: escurece ao rolar ===== */
const header = document.getElementById('header');

if (header) {
  const onScroll = () => {
    if (window.scrollY > 80) {
      header.style.background = 'rgba(5,5,5,.96)';
      header.style.boxShadow = '0 4px 32px rgba(0,0,0,.45)';
    } else {
      header.style.background = 'rgba(5,5,5,.72)';
      header.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => sectionObserver.observe(sec));
}

/* ===== REVEAL AO ROLAR ===== */
const reveals = document.querySelectorAll('.reveal');

if (reveals.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  reveals.forEach(el => revealObserver.observe(el));
}

/* ===== HIGHLIGHT DIA ATUAL NOS HORÁRIOS ===== */
const dayMap = {
  0: null,          // domingo
  1: 'segunda',     // segunda
  2: 'terca',       // terça–sexta
  3: 'terca',
  4: 'terca',
  5: 'terca',
  6: 'sabado'       // sábado
};

const today = dayMap[new Date().getDay()];

if (today) {
  const hourItems = document.querySelectorAll('.hours li');
  hourItems.forEach(li => {
    const key = li.dataset.day;
    if (key === today) {
      li.classList.add('today');
    }
  });
}

/* ===== LIGHTBOX DA GALERIA ===== */
const galleryImgs = document.querySelectorAll('.gallery-grid img');

if (galleryImgs.length) {
  // Cria o lightbox
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Visualizar foto');
  lb.innerHTML = `
    <button class="lb-close" aria-label="Fechar">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
    <button class="lb-prev" aria-label="Foto anterior">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
    </button>
    <div class="lb-img-wrap">
      <img class="lb-img" src="" alt="" />
    </div>
    <button class="lb-next" aria-label="Próxima foto">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
    </button>
    <p class="lb-caption"></p>
  `;
  document.body.appendChild(lb);

  const lbImg     = lb.querySelector('.lb-img');
  const lbCaption = lb.querySelector('.lb-caption');
  const lbClose   = lb.querySelector('.lb-close');
  const lbPrev    = lb.querySelector('.lb-prev');
  const lbNext    = lb.querySelector('.lb-next');

  let currentIndex = 0;
  const imgs = Array.from(galleryImgs);

  const openLightbox = (index) => {
    currentIndex = index;
    const img = imgs[index];
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = img.alt;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };

  const closeLightbox = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    imgs[currentIndex].focus();
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = imgs[currentIndex].src;
      lbImg.alt = imgs[currentIndex].alt;
      lbCaption.textContent = imgs[currentIndex].alt;
      lbImg.style.opacity = '1';
    }, 160);
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % imgs.length;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = imgs[currentIndex].src;
      lbImg.alt = imgs[currentIndex].alt;
      lbCaption.textContent = imgs[currentIndex].alt;
      lbImg.style.opacity = '1';
    }, 160);
  };

  imgs.forEach((img, i) => {
    img.style.cursor = 'pointer';
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `Ver foto: ${img.alt}`);
    img.addEventListener('click', () => openLightbox(i));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   showPrev();
    if (e.key === 'ArrowRight')  showNext();
  });
}

/* ===== SHIMMER NO BOTÃO AGENDAR (hero) ===== */
// Já é CSS-only via animação no .btn-shimmer
