(function () {
  var LANGS = ['tr', 'en', 'de', 'es', 'pt'];
  function pick() {
    var fromUrl = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(fromUrl) >= 0) return fromUrl;
    var nav = (navigator.languages || [navigator.language || 'en']);
    for (var i = 0; i < nav.length; i++) {
      var code = String(nav[i]).slice(0, 2).toLowerCase();
      if (LANGS.indexOf(code) >= 0) return code;
    }
    return 'en';
  }
  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('nav.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-set') === lang ? 'true' : 'false');
    });
    var title = document.querySelector('[data-lang="' + lang + '"] h1');
    if (title) document.title = title.textContent + ' · MomentBook';
  }
  document.querySelectorAll('nav.langs button').forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-set')); });
  });
  apply(pick());
})();
