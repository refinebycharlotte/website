(() => {
  const host = document.querySelector('.sk-ww-google-reviews');
  if (!host) return;
  let expanded = false;
  const timer = setInterval(() => {
    const root = host.shadowRoot;
    if (!root || !root.querySelector('.sk-review-card')) return;
    clearInterval(timer);
    const style = document.createElement('style');
    style.textContent = `
      .sk-masonry {display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:16px!important;height:auto!important;}
      .sk-masonry-item {position:relative!important;transform:none!important;width:auto!important;top:auto!important;left:auto!important;}
      .sk-masonry-item:has(.sk-badge) {grid-column:1/-1;}
      .sk-masonry-item[data-review-hidden] {display:none!important;}
      .sk-card__avatar,.sk-card__gallery,.sk-card__gallery-tile,.sk-review-card img {display:none!important;}
      .sk-review-card {height:100%;box-sizing:border-box;}
      @media(max-width:760px){.sk-masonry {grid-template-columns:1fr!important;}}
    `;
    root.appendChild(style);
    function update() {
      const limit = matchMedia('(max-width:760px)').matches ? 3 : 6;
      root.querySelectorAll('.sk-review-card').forEach((card, i) => {
        const item = card.closest('.sk-masonry-item');
        const hide = !expanded && i >= limit;
        if (item && item.hasAttribute('data-review-hidden') !== hide) item.toggleAttribute('data-review-hidden', hide);
      });
    }
    root.addEventListener('click', event => {
      if (!expanded && event.target.closest('.sk-load-more-btn')) {
        event.preventDefault();event.stopImmediatePropagation();
        expanded = true;update();
      }
    }, true);
    new MutationObserver(update).observe(root, {childList:true,subtree:true});
    window.addEventListener('resize', update);
    update();
  }, 250);
  setTimeout(() => clearInterval(timer), 30000);
})();
