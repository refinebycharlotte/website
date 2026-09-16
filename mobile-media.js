(() => {
  const feed = document.querySelector('.sk-instagram-feed');
  function loadInstagram() {
    if (!feed || feed.dataset.requested) return;
    feed.dataset.requested = 'true';
    const script = document.createElement('script');
    script.src = 'https://widgets.sociablekit.com/instagram-feed/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }
  if (feed && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); loadInstagram(); }
    }, {rootMargin: '500px'});
    observer.observe(feed);
  } else if (feed) loadInstagram();
  const video = document.querySelector('.results-video video');
  if (!video) return;
  let visible = false;
  function updateVideo() {
    if (visible && !document.hidden) video.play().catch(() => {});
    else video.pause();
  }
  if ('IntersectionObserver' in window) {
    video.autoplay = false;
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting; updateVideo();
    }, {threshold: 0.15});
    observer.observe(video);
    document.addEventListener('visibilitychange', updateVideo);
  }
})();
