(function() {
  var puts;

  puts = function(putter) {
    return console.log(putter);
  };

  $(function() {
    var $posts, $searcher;

    $searcher = $("#searcher");
    if ($searcher.val() !== void 0) {
      $posts = $(".post");
      return setInterval(function() {
        var q;

        puts("searching again...");
        q = new RegExp($searcher.val(), "i");
        return $posts.each(function() {
          if ($(this).find(".content").text().match(q) || $(this).find(".title").text().match(q) || $(this).find(".date").text().match(q)) {
            return $(this).fadeIn("fast");
          } else {
            return $(this).fadeOut("fast");
          }
        });
      }, 1000);
    }
  });

}).call(this);
