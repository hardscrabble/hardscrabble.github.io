$ ->
  # grab the sidenotes divs
  $sidenotes_container = $(".sidenotes")

  # grab the sidenotes list
  $sidenotes = $sidenotes_container.find "ol"

  # iterate over the footnotes at the bottom of the post
  # and work some magic on them
  $(".footnotes li").each (index, item) ->
    # wrap the footnote in a jQuery object
    $footnote = $(item)

    # move the footnote from the bottom to the right
    $footnote.remove().appendTo $sidenotes

    # remove the little arrow that links back to the source
    $footnote.find(".reversefootnote").remove()

    # find the source link from within the body of the post
    $source = $(".footnote").eq(index)

    # grab the previous sidenote, if there is one
    $previous_sidenote = $footnote.prev()
    $previous_sidenote = if $previous_sidenote.length then $previous_sidenote else undefined

    # let's set the vertical position of the current sidenote
    # if the previous one is kind of long, we need to push this one down
    # if not, it should be aligned with the source link
    $footnote.offset ->
      aligned_top = $source.offset().top
      if $previous_sidenote? and $previous_sidenote.offset().top + $previous_sidenote.height() >= aligned_top
        top: $previous_sidenote.offset().top + $previous_sidenote.height() + 5
      else
        top: aligned_top

