---
title: going open source
date: 2012-12-02 8:58 PM
tags:
- from the archives
---

Just for fun I'm sharing [the source code for this blog in full on github](https://github.com/maxjacobson/beefsteak). I don't know if anyone else will or should use this but maybe they'll want to and I won't stop them.

It's surprisingly easy having two remote destinations for this code (heroku, where my blog is hosted, and now github where the source code is hosted). I make changes, commit them, push to one, then push to the other. Easy peasy.

If someone else wants to use it, they'll have to delete my stuff and replace it with their stuff. I'm not giving them a blank slate. Because I'm not sure how to maintain two separate versions like that. But they'll figure it out, I think.

I guess I've been planning to do this, because I've refrained from hardcoding my information (name, blog title, etc) into the code. Instead it's in a separate `config.rb` file (which you can [see on github](https://github.com/maxjacobson/beefsteak/blob/master/config.rb)).

I'm cold on this balcony in San Diego. I am proud that I made this in like two days. I will keep working on it. A small part of me just got a tingling urge to hurl my laptop down into the parking lot like it's my punk rock guitar.

I'm worried that it will be a whole hassle if I ever want to change the address of this blog. I already kinda feel limited by "devblog".

Right now my Top Level website, <http://maxjacobson.net> is mostly just a front for my Pinboard public links. maybe I'll merge that idea into this one and put the whole thing at that address. I glanced over [the Pinboard gem](https://rubygems.org/gems/pinboard) and I could probably whip something up myself instead of using the [linkroll widget](http://pinboard.in/resources/linkroll). That would give me some more flexibility to display multimedia stuff, [Layabout](http://layabout.maxjacobson.net)-style and do some more color-coding without having to use jquery like I'm currently doing to emphasize posts with the `max_jacobson` tag.

I'm just daydreaming here.
