// via http://youmightnotneedjquery.com/#ready
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function endsWithSlash(url) {
  var lastChar = url[url.length - 1];
  return lastChar == '/';
}

function withoutSlash(url) {
  return url.slice(0, -1);
}

ready(function() {
  if (document.querySelectorAll('.not-found').length) {
    var currentUrl = window.location.pathname;
    if (endsWithSlash(currentUrl)) {
      var suggestion = document.querySelectorAll('.not-found-suggestion')[0];
      var link = suggestion.querySelectorAll('.not-found-suggestion-url')[0];
      var newUrl = withoutSlash(currentUrl);

      link.setAttribute('href', newUrl);
      link.textContent = newUrl;

      suggestion.setAttribute('style', 'display: block');
    }
  }
});
