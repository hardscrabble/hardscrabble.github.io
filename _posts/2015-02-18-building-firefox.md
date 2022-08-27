---
title: building firefox for the first time
date: 2015-02-18 00:41
category: programming
---

recently I came across two blog posts:

* [Contributing to Chromium: an illustrated guide][1] by Chrome developer Monica Dinculescu
* [Firefox UI mentorship program][2] by Firefox developer Jared Wein

[1]: http://meowni.ca/posts/chromium-101/
[2]: https://msujaws.wordpress.com/2015/02/11/firefox-ui-mentorship-program/

They kind of tell similar stories. Both Firefox and Chromium[^1] are open
source and welcome contributions from the general public, but both of them are
probably developed primarily by the companies behind them. These posts are sort
of encouraging people to consider contributing back to the app they spend most
of their computer time in and hoping to make it sound more doable and less
terrifying.

[^1]: Chromium is basically Chrome, but open source.

I came away from the Chromium post with a lot of clear and friendly knowledge
about how I might make a contribution but actually more convinced that I'm not
qualified to do so, because I don't know any of the languages she mentioned in
the post and don't currently plan to learn them. If I did, I'd know exactly
where to start and how to proceed.

The firefox blog post was an offer to help mentor a select few through getting
up and running and making a first few contributions. I thought about it for a
few minutes while I read the blog post and filed it away in the back of my mind,
but I was too slow, and the offer has now closed. I thought maybe I could do it
because having a mentor helps a lot and, from the sounds of it, the front-end of
Firefox is built using the tools of the web, which I already kind of know and
work with. From the post:

> We will use JavaScript, CSS, and XUL (similar to HTML).

Sure.

Also, Firefox is my day-to-day browser, so selfishly I like the idea of
submitting something that would benefit me. I first got excited about the
internet in Firefox. I've occasionally switched to Chrome and Safari but I
always come back to Firefox. I don't know. And I kind of think it's having a
moment? Well just someone wrote one blog post about it recently:

<blockquote class="twitter-tweet" data-cards="hidden" lang="en"><p>One anecdote
of switching from Chrome to Firefox: <a
href="http://t.co/EBaMDDuyhR">http://t.co/EBaMDDuyhR</a> – Good! We need browser
diversity to keep the web healthy.</p>&mdash; DHH (@dhh) <a
href="https://twitter.com/dhh/status/566319232346890240">February 13,
2015</a></blockquote>

I like dhh's perspective there; sometimes I feel like a browser hipster and like
I'm the only web developer not using Chrome (I know I'm not) but I do think he's
right that it's important that any one company doesn't have too strong a hold on
how the internet works.

So tonight I took the first step and built Firefox locally. It was surprisingly
easy but also surprisingly time-consuming. If you want to do the same I
recommend following the [Simple Firefox build][3] instructions but I'm going to
share here anyway the steps I took.

[3]: https://developer.mozilla.org/en-US/docs/Simple_Firefox_build

* Visited that guide
* Followed that link to [Linux and MacOS build preparation][4] which recommended
  I paste the following into my terminal to install the prerequisite
  dependencies:

```
wget -q https://hg.mozilla.org/mozilla-central/raw-file/default/python/mozboot/bin/bootstrap.py && python bootstrap.py
```

* That [asked me][5] if I was interested in building Firefox for Desktop or
  Android. I answered Desktop, and it started doing stuff, and outputting what
  it was doing, and ultimately (actually this was pretty fast) it said it worked
  and made this suggestion:

```
Your system should be ready to build Firefox for Desktop! If you have not already,
obtain a copy of the source code by running:

    hg clone https://hg.mozilla.org/mozilla-central

Or, if you prefer Git:

    git clone https://git.mozilla.org/integration/gecko-dev.git
```

* So I ran the second command, because I prefer git (well, because I know git)
* And then I waited for like ten minutes? More? I don't know. I had never cloned
  a 7 gigabyte git repo before. It felt new and strange. The `.git` directory is
  nearly 6 gigabytes, suggesting the sheer history of the project weighs
  significantly more than the current state of it. The repository has 407088
  commits going back 17 years, 8 years before git existed.
* After the project finished cloning, I ran `cd gecko-dev` and no magical
  incantation appeared giving me the next bread crumb to follow, so I returned
  to the guide.
* It suggested using Firefox's `./mach` script to build and run the app. This
  felt kind of familiar, kind of like Ruby's `rake`. I tried running just
  `./mach` without any arguments and saw that it has a shitload of commands
  including `google`, so I ran `./mach google jake and amir` (because I was just
  watching Jake and Amir episodes before this flight of fancy overtook me) and
  it opened Firefox to <https://www.google.com/search?q=jake%20and%20amir>,
  which, alright, sure.
* I ran `./mach build` and watched it do a shitload of stuff to build Firefox
  from the source I'd downloaded. I don't have to estimate how long this took,
  because it output a running timestamp as it did everything. It took 37
  minutes and 56.85 seconds. I guess that's not bad? I hope I don't need to wait
  that long every time I make a change (if I even figure out how to make a
  change). And when it was finished, I saw this output:

```
37:56.85 We know it took a while, but your build finally finished successfully!
To take your build for a test drive, run: |mach run|
For more information on what to do now, see https://developer.mozilla.org/docs/Developer_Guide/So_You_Just_Built_Firefox
```

* I ran `./mach run` and *like lightning* a bluish moonish earth appears in my
  Mac's dock and Firefox Nightly opened.
* I visited [hardscrabble.net][7] just kind of vainly to see what my site looks
  like in my freshly baked browser
* I visited the URL from that last output (sidenote: I really love the trail of
  breadcrumbs this process has been) and found a kind of [hilariously brief][8]
  web page which mainly includes notes on how it should be succinct but also a
  tag indicating it needs more content?
* I followed the first listed interesting link about how to run Firefox's tests,
  and before I could overthink what's about to happen I ran `./mach
  xpcshell-test` and the most delightful thing happened, and I think it needs to
  be captured in a video:


{% include vimeo.html id="119925549" %}

[4]: https://developer.mozilla.org/en-US/docs/Simple_Firefox_build/Linux_and_MacOS_build_preparation
[5]: https://twitter.com/maxjacobson/status/567890227693494272
[6]: /2014/mac-upgrades/
[7]: /
[8]: https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/So_you_just_built_Firefox

I'm sorry this blog post became a bullet point list halfway through. That wasn't
really fair.

Probably in the morning I'll forget I ever wanted to contribute to Firefox but
hopefully not. I'm on the record now.
