puts = (putter) -> console.log putter
$ ->
  # empower search on /archive
  $searcher = $("#searcher")
  if $searcher.val() isnt undefined
    $posts = $(".post")
    setInterval(
      ->
        puts "searching again..."
        q = new RegExp $searcher.val(), "i"
        $posts.each ->
          if $(this).find(".content").text().match(q) or $(this).find(".title").text().match(q) or $(this).find(".date").text().match(q)
            $(this).fadeIn "fast"
          else
            $(this).fadeOut "fast"
      1000
      )

  # if a list item is marked done, strike it out
  tasks =
    total: 0
    complete: 0
  $("li").each (i) ->
    done_frac = /\– (\d+)\/(\d+)$/i
    match = $(this).text().match done_frac
    if match
      numerator = parseInt match[1], 10
      denominator = parseInt match[2], 10
      tasks.total += denominator
      tasks.complete += numerator
      percentage = "#{Math.floor((numerator/denominator)*100)}%"
      $(this).append " – #{percentage}"
      $(this).addClass "strikeout" if percentage is "100%"
  if tasks.total isnt 0
    $("<p><strong>#{Math.floor((tasks.complete/tasks.total)*100)}% of total prework complete</strong></p>").insertBefore "#post h2:first"

