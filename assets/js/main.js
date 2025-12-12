// main.js
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Education timeline in-view animations + line growth ---------- */
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineLine = document.getElementById('timeline-line');

  if (timelineItems.length && timelineLine) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add('in-view');
        }
      });
    }, { threshold: 0.3 });

    timelineItems.forEach(it => obs.observe(it));

    // Grow timeline line as page scrolls across timeline container
    const timelineContainer = document.querySelector('.timeline-container');
    function updateLine() {
      if (!timelineContainer) return;
      const rect = timelineContainer.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = rect.height + vh;
      const visibleTop = Math.min(Math.max(vh - rect.top, 0), total);
      const progress = Math.max(0, Math.min(1, visibleTop / total));
      const min = 0.10, max = 1;
      const h = (min + (max - min) * progress) * 100;
      timelineLine.style.height = h + '%';
    }
    updateLine();
    window.addEventListener('scroll', updateLine, { passive: true });
    window.addEventListener('resize', updateLine);
  }

  /* ---------- Footer Work with Me button navigation ---------- */
  const footerLinks = document.querySelectorAll('.work-with-me');
  footerLinks.forEach(el => {
    el.addEventListener('click', (e) => {
      // default navigation works; no extra JS needed
    });
  });

  /* ---------- Accessibility: trap focus into modal if open ---------- */
  document.addEventListener('focus', (event) => {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (!modalOverlay) return;
    if (!modalOverlay.contains(event.target)) {
      const first = modalOverlay.querySelector('.modal-content');
      first && first.focus();
    }
  }, true);

  /* ---------- Scroll to About Me section ---------- */
  const heroAboutBtn = document.getElementById("hero-about");
  heroAboutBtn && heroAboutBtn.addEventListener("click", function () {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  });

});
