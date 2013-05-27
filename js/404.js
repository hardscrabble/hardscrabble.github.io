(function() {
  $(function() {
    var current_url, pattern;

    pattern = /\d{4}\-\d{2}\-\d{2}\-([a-z\-])$/i;
    current_url = document.URL;
    return console.log(current_url.match(pattern));
  });

}).call(this);
