(function() {
  var puts;

  puts = function(putter) {
    return console.log(putter);
  };

  $(function() {
    var $posts, $searcher, tasks;

    $searcher = $("#searcher");
    if ($searcher.val() !== void 0) {
      $posts = $(".post");
      setInterval(function() {
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
    tasks = {
      total: 0,
      complete: 0
    };
    $("li").each(function(i) {
      var denominator, done_frac, match, numerator, percentage;

      done_frac = /\– (\d+)\/(\d+)$/i;
      match = $(this).text().match(done_frac);
      if (match) {
        numerator = parseInt(match[1], 10);
        denominator = parseInt(match[2], 10);
        tasks.total += denominator;
        tasks.complete += numerator;
        percentage = "" + (Math.floor((numerator / denominator) * 100)) + "%";
        $(this).append(" – " + percentage);
        if (percentage === "100%") {
          return $(this).addClass("strikeout");
        }
      }
    });
    if (tasks.total !== 0) {
      return $("<p><strong>" + (Math.floor((tasks.complete / tasks.total) * 100)) + "% of total prework complete</strong></p>").insertBefore("#post h2:first");
    }
  });

}).call(this);
