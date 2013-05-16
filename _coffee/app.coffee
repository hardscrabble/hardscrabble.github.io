puts = (putter) -> console.log putter
$ ->
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
