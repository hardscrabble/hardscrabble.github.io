---
---

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
      # $(this).find("a").addClass "strikeout" if percentage is "100%"
      $(this).append($("<br/>")).append($("<div class='progress #{'progress-striped active' if percentage isnt "100%"}'><div class='bar' style='width: #{percentage};'></div></div>"))
  if tasks.total isnt 0
    total_percentage = "#{Math.floor((tasks.complete/tasks.total)*100)}%"
    $("<p><strong>#{total_percentage} of total prework complete</strong></p>").insertBefore "#post h2:first"
    $("<div class='progress #{'progress-striped active' if total_percentage isnt '100%'}'><div class='bar' style='width: #{total_percentage};'></div></div>").insertBefore "#post h2:first"
    document.title = "#{total_percentage} - #{document.title}"
  $("h1,h2,h3,h4").on "click", ->
    clicked_id = $(this).attr "id"
    if clicked_id isnt undefined
      window.location.replace '#' + clicked_id
    else
      window.location.replace ''

