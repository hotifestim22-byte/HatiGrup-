document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Windows grid drawn onto the blueprint building ---------- */
  const windowsGroup = document.querySelector('.bp-windows');
  if (windowsGroup) {
    const cols = 4, rows = 8;
    const x0 = 105, y0 = 130, cellW = 30, cellH = 30, winW = 14, winH = 14;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x0 + c * cellW);
        rect.setAttribute('y', y0 + r * cellH);
        rect.setAttribute('width', winW);
        rect.setAttribute('height', winH);
        rect.setAttribute('stroke-width', '0.8');
        windowsGroup.appendChild(rect);
      }
    }
  }

  /* ---------- Animated stat counters (trigger once, on scroll into view) ---------- */
  const statNums = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString('sq-AL');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && statNums.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => io.observe(el));
  } else {
    statNums.forEach(animateCount);
  }

});