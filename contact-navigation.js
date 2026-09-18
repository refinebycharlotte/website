// Keep consultation navigation stable while images and review widgets load.
(() => {
  const target = document.getElementById('contact');
  if (!target) return;
  let stop = () => {};
  function goToContact() {
    stop();
    let frame = 0;
    const controller = new AbortController();
    const options = {capture: true, passive: true, signal: controller.signal};
    function align() {
      frame = 0;
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      if (Math.abs(target.getBoundingClientRect().top - offset) > 2) {
        window.scrollTo({top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset), behavior: 'instant'});
      }
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(align); }
    const observer = new ResizeObserver(schedule);
    // Observe layout boxes above the contact section, including widget containers.
    observer.observe(document.body);
    document.querySelectorAll('header, main, main > *, #google-reviews > *').forEach(element => observer.observe(element));
    const timeout = setTimeout(() => stop(), 30000);
    stop = () => {
      observer.disconnect();
      controller.abort();
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
    // Never fight deliberate scrolling or form interaction.
    ['touchstart', 'wheel', 'pointerdown', 'keydown'].forEach(type => window.addEventListener(type, stop, options));
    window.addEventListener('pagehide', stop, {once: true, signal: controller.signal});
    schedule();
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || url.hash !== '#contact') return;
    event.preventDefault();
    if (location.hash !== '#contact') history.pushState(null, '', '#contact');
    goToContact();
  });
  window.addEventListener('hashchange', () => {
    if (location.hash === '#contact') goToContact(); else stop();
  });
  window.addEventListener('pageshow', () => {
    if (location.hash === '#contact') goToContact();
  });
  if (location.hash === '#contact') goToContact();
})();
