---
title: refactoring very old code
layout: post
date: 2014-04-13 13:15
---

Before I went to Flatiron School last summer I cobbled together a web app called [Layabout](http://layabout.tv). This weekend, for the first time in a very long time, I worked up the nerve to look at the source code. You may have heard the phrase ["code smell"](http://blog.codinghorror.com/code-smells/) but I'm not sure it applies to this code. This code is like that ominous stink you'd almost rather ignore?

Hmm.

Layabout is an Instapaper client that focuses on the videos you've bookmarked. I was the only one who ever used it. I stopped using it in part beause it was buggy, and in part because I wanted to try out Pocket for a little while, which ended up being most of a year.

Inspired by John Resig's recent blog post ["Write Code Every Day"](http://ejohn.org/blog/write-code-every-day/) encouraging employed programmers to maintain side projects in a sustainable, I decided to revisit Layabout and see if anything I've learned in the year since I last edited it would come in handy. I also enjoy laughing at myself from the past.

The app had been running on Heroku unused for a year. When I logged in[^1] and tried to watch a video, it immediately crashed. I found the codebase locally and ran `heroku logs` to try to get some more information about the crash but it simply said it was a 500 error. Hmm.

[^1]: By giving my Instapaper credentials directly to the app, which I now know is kind of a no-no in the age of Oauth (though I've given my Instapaper credentials directly to some other apps like [Reeder][] and [Tweetbot][] so idk. Definitely a smell.

[Reeder]: http://reederapp.com/
[Tweetbot]: http://tapbots.com/software/tweetbot/

So I tried running the app locally[^2] and was surprised to find that it *worked even worse than it did on Heroku!* Online at least I could type my password in before it crashed, but locally no pages were rendering at all. Instead it was complaining about not being able to find the views. I googled the error message and learned that [some versions of Sinatra require you to explicitly tell it where your views are](http://stackoverflow.com/a/3836158/1154301). I had never had this error before, but I was having it now. I looked at my Gemfile and saw that in my list of dependencies, I didn't specify my desired version number for any of them. Code smell! You gotta lock that down, because things can change and break, especially when you don't edit your code for over a year.[^3]

[^2]: Which was totally possible because all of the API keys were hardcoded into the app. Smell!

[^3]: What's weird to me is that the version number seems to have regressed? The assumption that views are in a folder called views was introduced in 1.1, and I seem to have been taking advantage of that, but then it forgets to assume that? I don't know. Versions are hard.

After resolving that error I was able to reproduce the crash and see a much more verbose error message. You know how some YouTube videos have embedding disabled? I'm using a library, [ruby-oembed][], to fetch embed codes from video URLs, and it raises an exception when the video has embedding disabled. I used to think that meant my thing needed to crash but I've since learned about exception handling. Here's a before:



{% highlight ruby %}
def get_embed (vid_site, id)
  if vid_site == :youtube
    url = "http://www.youtube.com/watch?v=#{id}"
    return OEmbed::Providers::Youtube.get(url).html
  elsif vid_site == :vimeo
    url = "http://www.vimeo.com/#{id}"
    return OEmbed::Providers::Vimeo.get(url, maxwidth: "500", portrait: false, byline: false, title: false).html
  elsif vid_site == :hulu
    url = "http://www.hulu.com/watch/#{id}"
    return OEmbed::Providers::Hulu.get(url).html
  else
    return "<p>Failed to get embed code</p>"
  end
end
{% endhighlight %}

And after:

{% highlight ruby %}
def get_embed (vid_site, id)
  begin
    case vid_site
    when :youtube
      OEmbed::Providers::Youtube.get("http://www.youtube.com/watch?v=#{id}").html
    when :vimeo
      OEmbed::Providers::Vimeo.get("http://www.vimeo.com/#{id}", maxwidth: "500", portrait: false, byline: false, title: false).html
    when :hulu
      OEmbed::Providers::Hulu.get("http://www.hulu.com/watch/#{id}").html
    else
      "Unsupported site"
    end
  rescue Exception => e
    puts e.inspect
    "<p>Sorry, couldn't get the embed code for this one. Maybe it doesn't allow embedding? Or maybe it was deleted? Sorry.</p>"
  end
end
{% endhighlight %}

(I guess I didn't know about case statements or implicit return values then either.)

[ruby-oembed]: https://github.com/judofyr/ruby-oembed

It's still not that great honestly. I wish it were more object oriented. I wish there were tests. I wish I could open source it without exposing my Instapaper API keys. I know it's possible to scrub your history and I'm going to look into that, and then keep them in a separate file ignored by git; or maybe I'll look into getting new keys. But I'm glad to be revisiting this project because it's where I got excited about web development. One last before and after:

Layabout needs to ignore bookmarks that it doesn't know how to embed. It also needs clean URLs to reliably lookup their embed codes. Here's an old method which helped with this task:

{% highlight ruby %}

def grok_url (url)
  # TODO support hulu short urls
  if url =~ /youtube\.com\/embed\//
    id = url.match(/\/embed\/([A-Za-z0-9_-]+)/)[1].to_s
    site = :youtube
  elsif url =~ /youtube\.com/
    id = url.match(/v=([A-Za-z0-9_-]+)/)[1].to_s
    site = :youtube
  elsif url =~ /youtu\.be/
    id = url.match(/(http:\/\/youtu.be\/)([A-Za-z0-9\-_]+)/)[2].to_s
    site = :youtube
  elsif url =~ /vimeo\.com\/m\//
    id = url.match(/\/m\/(\d+)/)[1].to_s
    site = :vimeo
  elsif url =~ /vimeo\.com/
    id = url.match(/vimeo\.com\/([\d]+)/)[1].to_s
    site = :vimeo
  elsif url =~ /hulu\.com\/watch/
    id = url.match(/watch\/([\d]+)/)[1].to_s
    site = :hulu
  else
    return false, false, false
  end
  return true, site, id
end
{% endhighlight %}

I used it like this:

{% highlight ruby %}
video_links = Array.new
if folder_id == :readlater
  all_links = ip.bookmarks_list(:limit => 500)
else
  all_links = ip.bookmarks_list(:limit => 500, :folder_id => folder_id)
end
all_links.each do |link|
  if link["type"] == "bookmark" # filters out the first two irrelevant items
    is_video, vid_site, video_id = grok_url link["url"]
    if is_video == true
      link["video_id"] = video_id
      link["title"] = cleanup_title link["title"] # prob not necessary
      link["vid_site"] = vid_site
      link["description"] = make_clicky link["description"]
      video_links.push link
    end
  end
end
@videos = video_links
{% endhighlight %}

Honestly I think this is cool code even though it's not how I'd write it now, because this is what it looks like to make it work with limited knowledge. I didn't know about any fancy iterators. I legit didn't know about object oriented programming. I didn't know it's not necessary to check if a boolean `== true`, but it wasn't hurting anyone! Whenever I'm talking to beginners and see code that doesn't take advantage of less-than-obvious techniques, but works, I'm psyched.

Anyway this is what I changed it to yesterday:

{% highlight ruby %}
@videos = (if folder_id == :readlater
  ip.bookmarks_list(:limit => 500)
else
  ip.bookmarks_list(:limit => 500, :folder_id => folder_id)
end).map do |link|
  if link['type'] == 'bookmark' # filters out the first two irrelevant items
    snob = FilmSnob.new(link['url'])
    if snob.watchable?
      link.tap do |link|
        link['video_id'] = snob.id
        link['title'] = cleanup_title link['title']
        link['vid_site'] = snob.site
        link['description'] = make_clicky link['description']
      end
    end
  end
end.compact
{% endhighlight %}

I don't even necessarily think that's better, but it satisfies my learned allergy to local variables[^4] and makes me feel cool for using `map` and `tap`.

[^4]: except the `snob` variable which I'm not sure how to avoid; suggestions welcome!!

Ah, and what's `FilmSnob`? Let's revisit Resig's blog post:

> I decided to set a couple rules for myself:
>
> 1. I must write code every day. I can write docs, or blog posts, or other things but it must be in addition to the code that I write.
> 1. It must be useful code. No tweaking indentation, no code re-formatting, and if at all possible no refactoring. (All these things are permitted, but not as the exclusive work of the day.)
> 1. All code must be written before midnight.
> 1. The code must be Open Source and up on Github.

Because Layabout isn't currently open-sourceable, I extracted part of it into [a rubygem called film_snob][]. It's basically just that `grok_url` method, but made object-oriented, tested, and designed to be more extensible in case I ever want to support more than three video sites. [I hope][] to also extract the embedcode fetching from Layabout into film_snob, but without the ruby-oembed dependency.

[a rubygem called film_snob]: https://github.com/maxjacobson/film_snob
[I hope]: https://github.com/maxjacobson/film_snob/issues/1

