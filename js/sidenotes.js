(function() {
  $(function() {
    var $sidenotes, $sidenotes_container;
    $sidenotes_container = $(".sidenotes");
    $sidenotes = $sidenotes_container.find("ol");
    return $(".footnotes li").each(function(index, item) {
      var $footnote, $previous_sidenote, $source;
      $footnote = $(item);
      $footnote.remove().appendTo($sidenotes);
      $footnote.find(".reversefootnote").remove();
      $source = $(".footnote").eq(index);
      $previous_sidenote = $footnote.prev();
      $previous_sidenote = $previous_sidenote.length ? $previous_sidenote : void 0;
      return $footnote.offset(function() {
        var aligned_top;
        aligned_top = $source.offset().top;
        if (($previous_sidenote != null) && $previous_sidenote.offset().top + $previous_sidenote.height() >= aligned_top) {
          return {
            top: $previous_sidenote.offset().top + $previous_sidenote.height() + 5
          };
        } else {
          return {
            top: aligned_top
          };
        }
      });
    });
  });

}).call(this);
