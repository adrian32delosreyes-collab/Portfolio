// navbar.js
(function () {
  const navbar = document.getElementById('site-navbar');
  let lastScrollY = window.scrollY || 0;
  let ticking = false;
  let isHoverTop = false;

  function onScroll() {
    const currentY = window.scrollY || 0;

    // hide when scrolling down past 100, show when scrolling up
    if (currentY > lastScrollY && currentY > 100) {
      navbar.classList.remove('navbar-show');
      navbar.classList.add('navbar-hide');
    } else {
      navbar.classList.remove('navbar-hide');
      navbar.classList.add('navbar-show');
    }

    // color change when scrolled
    if (currentY > 10) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }

    lastScrollY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // reveal when mouse near top
  window.addEventListener('mousemove', (e) => {
    if (e.clientY < 40) {
      isHoverTop = true;
      navbar.classList.remove('navbar-hide');
      navbar.classList.add('navbar-show');
    } else {
      isHoverTop = false;
    }
  });

  // Smooth scroll for links to local anchors/pages (if same page)
  document.addEventListener('click', (e) => {
    const t = e.target.closest('a');
    if (!t) return;
    const href = t.getAttribute('href') || '';
    // If linking to the same html file with hash, smooth scroll:
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  });
})();
