---
title: reverse polish notation
date: 2015-03-17 02:30
---

Earlier tonight Carlos tweeted this:

<blockquote class="twitter-tweet" lang="en"><p>I may have just ‘test driven’ my first official Ruby problem (cc: <a href="https://twitter.com/maxjacobson">@maxjacobson</a>).&#10;&#10;Kind of a cool experience. 👍 😎&#10;&#10;<a href="https://t.co/vIza7c0J3I">https://t.co/vIza7c0J3I</a></p>&mdash; Carlos Lazo (@CarlosPlusPlus) <a href="https://twitter.com/CarlosPlusPlus/status/577669474960195584">March 17, 2015</a></blockquote>

Nowhere in there does he specifically ask me to provide my take on that problem,
but I did anyway. I don't know why.

The problem is, I think, to write a [reverse polish notation][1] calculator in
Ruby. Carlos used TDD to drive his solution. I looked at it and thought it was
cool, and then I wanted to do the same thing, and I made a video, because I am a
ham.

[1]: http://en.wikipedia.org/wiki/Reverse_Polish_notation

Here it is:

<iframe width="459" height="344" src="http://www.youtube.com/embed/H6xcnqlf53g?feature=oembed" frameborder="0" allowfullscreen></iframe>

It is very long. There are a few moments where I removed sound to take away
coughs. I might have missed some. I probably did!

You'll hear every thought that passes through my mind as I arrive at a solution,
which I pushed here: <https://github.com/maxjacobson/calculator>. A lot of it is
me struggling to understand the very premise of the notation, which confused me
perhaps too much?

Using tests helped me get this working because when it wasn't working, I wasn't
sure which part wasn't working, and I was able to add more tests to describe the
parts, until I knew which parts were behaving how I expected and which weren't.
That's really helpful. Accomplishing that meant extracting some of the
responsibilities into a separate, small, testable class, which I think is a good
example of lettings tests drive the design of your code. Ultimately the
implementation of that class is kind of awkward and not great, but it's also
really contained and could be easily rewritten because there are tests to catch
mistakes in the refactoring.

:leaves:
