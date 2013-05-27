(function() {
  $(function() {
    var current_url, match, pattern;

    current_url = document.URL;
    pattern = /(\d{4})\-\d{2}\-\d{2}\-([a-z\-]+)$/i;
    if (current_url.match(pattern)) {
      match = current_url.match(pattern);
      return window.location.replace("http://maxjacobson.github.io/" + match[1] + "/" + match[2] + "/");
    }
  });

}).call(this);
