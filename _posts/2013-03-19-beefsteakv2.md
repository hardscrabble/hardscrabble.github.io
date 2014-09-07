---
title: "beefsteak v2"
date: 2013-03-19 05:45 AM
category: coding
tags: beefsteak, haml, devblog
---

This version of [beefsteak](http://github.com/maxjacobson/beefsteak) is brought to you by Justin Timberlake.

I put his new album on repeat eleven or twelve hours ago and starting working.

I realized people might be looking at my GitHub and realized I was embarrassed of the way this blog worked. In the few months from the last update, I learned a lot. I hope I'll be embarrassed of this in a few months.

Heck I already kind of am.[^shame]

[^shame]: or will be in the morning, anyway

The first several posts I wrote for this blog were, naturally, about this blog and the process of building it and excitement of discovery. A lot of it is really dumb but I'm leaving it.

So here's what's new:

* syntax highlighting for code blocks, using my fav colorscheme, cobalt
* switched from erb to haml -- now writing far less HTML by hand
* appending `.md` to posts or pages takes you to a text file instead of embedding within a page, which displayed poorly (missing underscores for some reason)
* some (goofy?) animations on page loads. It picks randomly from a list
* oh, and when you click to see a footnote, the right one will wiggle. see? [^wiggle]
* much better config file; in case anyone besides me uses this system, it should be relatively easy for them to plug in their info and start blogging

[^wiggle]: and now I've just made it so the return button makes the source from within the blog wiggle, too. I want to learn to write my own CSS3 animations. Right now I'm leaning heavily on [Dan Eden](http://daneden.me/animate).
