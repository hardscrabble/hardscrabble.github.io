---
layout: page
title: welcome
---

## blog

here's the latest 3 posts:

{% for post in site.posts limit:3 %}
  1. {{post.date | date_to_string}} -- [{{post.title}}]({{post.url}})
{% endfor %}

visit [/archive](/archive) for the complete list

## projects

[Recently][] I'm excited about making small projects

[Recently]: http://www.hardscrabble.net/2014/refactoring_old_code/

### film_snob

{% highlight ruby %}
require 'film_snob'
FilmSnob.new("https://www.youtube.com/watch?v=u8FKqN2aD0E").html
#=> "<iframe width=\"480\" height=\"270\" src=\"http://www.youtube.com/embed/8VfAtrrLhN4?feature=oembed\" frameborder=\"0\" allowfullscreen></iframe>"
{% endhighlight %}

In case you want to easily embed youtube (or a few other video hosting sites) videos in your app, like for example this one:

<iframe width="480" height="270" src="http://www.youtube.com/embed/u8FKqN2aD0E?feature=oembed" frameborder="0" allowfullscreen></iframe>

More info here: <https://github.com/maxjacobson/film_snob> or just run `gem install film_snob`.

### smashcut

This one is more work in progress. It's something I've wanted to do for way too long. It's a screenplay parser. I'll probably never finish it. But I want to! <https://github.com/maxjacobson/smashcut>

