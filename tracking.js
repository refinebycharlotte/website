// Preserve the existing production integration; never track local previews.
// Existing behaviour retained: no consent mechanism by owner choice.
if (['refinebycharlotte.co.uk', 'www.refinebycharlotte.co.uk'].includes(location.hostname)) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'AW-18320579867');
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=AW-18320579867';
  document.head.appendChild(tag);

  // Microsoft Advertising UET tag (Bing/Yahoo/AOL ads).
  (function (w, d, t, r, u) {
    var f, n, i;
    w[u] = w[u] || [], f = function () {
      var o = { ti: '187283776', enableAutoSpaTracking: true };
      o.q = w[u], w[u] = new UET(o), w[u].push('pageLoad');
    }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () {
      var s = this.readyState;
      s && s !== 'loaded' && s !== 'complete' || (f(), n.onload = n.onreadystatechange = null);
    }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i);
  })(window, document, 'script', 'https://bat.bing.net/bat.js', 'uetq');
}
