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
}
