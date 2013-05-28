puts = (putter) -> console.log putter
$ ->
  # check progress
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

