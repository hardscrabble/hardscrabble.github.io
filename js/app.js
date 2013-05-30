(function() {
  var puts;

  puts = function(putter) {
    return console.log(putter);
  };

  $(function() {
    var tasks;

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
          return $(this).find("a").addClass("strikeout");
        }
      }
    });
    if (tasks.total !== 0) {
      return $("<p><strong>" + (Math.floor((tasks.complete / tasks.total) * 100)) + "% of total prework complete</strong></p>").insertBefore("#post h2:first");
    }
  });

}).call(this);
