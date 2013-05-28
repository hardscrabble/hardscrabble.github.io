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
  $("li").each (i) ->
    $(this).addClass "strikeout" if $(this).text().match /\– Done$/i
