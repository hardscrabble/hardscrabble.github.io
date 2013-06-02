(function() {
  var puts;

  puts = function(putter) {
    return console.log(putter);
  };

  $(function() {
    var tasks, total_percentage;

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
        return $(this).append($("<br/>")).append($("<div class='progress " + (percentage !== "100%" ? 'progress-striped active' : void 0) + "'><div class='bar' style='width: " + percentage + ";'></div></div>"));
      }
    });
    if (tasks.total !== 0) {
      total_percentage = "" + (Math.floor((tasks.complete / tasks.total) * 100)) + "%";
      $("<p><strong>" + total_percentage + " of total prework complete</strong></p>").insertBefore("#post h2:first");
      $("<div class='progress " + (total_percentage !== '100%' ? 'progress-striped active' : void 0) + "'><div class='bar' style='width: " + total_percentage + ";'></div></div>").insertBefore("#post h2:first");
      return document.title = "" + total_percentage + " - " + document.title;
    }
  });

}).call(this);
