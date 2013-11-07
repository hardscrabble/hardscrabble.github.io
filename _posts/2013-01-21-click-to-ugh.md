---
layout: post
title: click to ugh
date: 2013-01-21 3:37 PM
category: the internet
tags:
- youre doing it wrong
- html
- the av club
---

It's time for [You're Doing it Wrong](http://www.maxjacobson.net/tag/youre-doing-it-wrong), my sometimes series where I complain about blogs whose HTML or CSS bugs me!

Today's offending blog is The AV Club, which I generally really like and read all the time. Here's an example post: [Jonathan Coulton says Glee ripped off his cover of "Baby God Back"](http://www.avclub.com/articles/jonathan-coulton-says-glee-ripped-off-his-cover-of,91305/).

How the heck did they come up with this embed code for a YouTube video:

{% highlight html %}
<embed width="425" height="344" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" src="http://www.youtube.com/v/Yww4BLjReEk%26hl=en%26fs=1%26rel=0">
{% endhighlight %}

Had they copied the embed code from beneath the YouTube video, they would have gotten this:

{% highlight html %}
<iframe width="560" height="315" src="http://www.youtube.com/embed/Yww4BLjReEk" frameborder="0" allowfullscreen></iframe>
{% endhighlight %}

I don't know where The AV Club got their embed code, but exhibit A for it's outdatedness is the macromedia reference. Try going to that page. Because Macromedia doesn't exist anymore, you'll be redirected to Flash's new owner, Adobe. This post is from three days ago; Adobe acquired Macromedia seven years ago.

Also: every video they embed is given the dimensions 425x344, without regard to the video's aspect ratio. YouTube's provided embed code is dimensions-aware and doesn't introduce unnecessary letterboxing.

So why do I care? The videos still play and it's pretty much fine I guess. But it screws up [ClickToPlugin][].

ClickToPlugin is an awesome Safari Extension that blocks plugins like Flash from running until you click on them. It *also*, when it can, replaces embedded media with a vanilla HTML5 video player. When I typically encounter a YouTube or Vimeo video embedded on a blog, I don't see their custom Flash player, I see this:

[![](http://d.pr/i/tq6n+)](http://d.pr/i/tq6n)

This example is from an AbsolutePunk.net post, [Beyoncé Performs Star Spangled Banner [Video]](http://www.absolutepunk.net/showthread.php?t=3019022). It behaves much like a regular, Flash YouTube embed -- it doesn't play until you click the triangle although you have preferences like autoplay or auto-preload -- it uses Safari's implementation of the HTML5 video player. Among the benefits: YouTube hasn't yet figured out how to include ads in the HTML5 videos, it feels faster, and on youtube.com, videos don't autoplay so I can open six tabs of Taylor Swift videos without causing a terrible cacophany.

But when I visit that AV Club article, I see this:

[![](http://d.pr/i/Tcpb+)](http://d.pr/i/Tcpb)

Which is fine, I guess. It's what I signed up for, using this extension. But c'mon, don't overthink things and get all fancy, stuff'll get broken.

(AbsolutePunk is doing something custom too. Its code looks like this:

{% highlight html %}
<div align="center"><object width="472" height="389" bgcolor="#f7f7f7"><param name="movie" value="http://www.youtube.com/v/Z-DSFrGnQrk&amp;fs=1"></param><param name="allowFullScreen" value="true"></param><param name="wmode" value="transparent"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/Z-DSFrGnQrk&amp;fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="472" height="389" bgcolor="#f7f7f7" wmode="transparent"></embed></object></div>
{% endhighlight %}

I don't really understand that either, but I don't need to, because it behaves the way I expect it to. It looks like all AbsolutePunk video embeds use the same aspect ratio (472x389) but at least it works with ClickToPlugin.)

[ClickToPlugin]: http://hoyois.github.com/safariextensions/clicktoplugin/

On [Layabout](http://layabout.maxjacobson.net), my web app which is embedding videos all day every day, I see this:

[![](http://d.pr/i/XcJU+)](http://d.pr/i/XcJU)

Look at that aspect ratio -- no black bars! And this is all without manually copying and pasting the embed code from YouTube (or Vimeo in that case). These sites support oEmbed, a protocol for taking a URL and supplying an embed code that works.

Unfortunatley it's not as well-documented as it could be. [Vimeo's oEmbed API](https://developer.vimeo.com/apis/oembed) is better in that regard and supports the most important feature: `maxwidth`. I suspect this is at the root of the hardcoded aspect ratios; designers don't want videos bursting out of their layouts. Vimeo's page is very useful and clear. YouTube, as far as I can tell, has only provided [one brief blog post](http://apiblog.youtube.com/2009/10/oembed-support.html) on the subject.

Maybe that's the problem?

