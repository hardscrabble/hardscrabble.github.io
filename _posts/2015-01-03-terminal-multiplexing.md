---
title: terminal multiplexing with tmux
date: 2015-01-03 22:04
category: programming
---

<iframe src="//player.vimeo.com/video/104250309?byline=0&amp;portrait=0" width="686" height="429" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

I made this video a few months back with my friend [Alex Au][]. It's a crash
course in how to use [tmux][]. We made another, shorter, video about *why* you
might want to use tmux as well:

[Alex Au]: https://github.com/surrealdetective
[tmux]: https://en.wikipedia.org/wiki/Tmux

<iframe src="//player.vimeo.com/video/104250007?byline=0&amp;portrait=0" width="686" height="429" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

If you find yourself with more than a couple of terminal tabs or windows open
all the time, I think you should consider using tmux instead. In the last few
months I feel like I've hit a sweet groove with my terminal use, where I pretty
much never have more than one tab or window open. Instead, I have one tmux
session per project, and several virtual tabs ("windows" in tmux parlance) per
project. The thing I learned most recently that makes this really fly is the
keyboard shortcut for switching from one tmux session to another without ever
leaving tmux. I only ever really leave tmux to navigate to a different directory
and start a new tmux session.

Here's what that looks like:

[![tmux flow](/img/2015-01-03-tmux.gif)](/img/2015-01-03-tmux.gif)

(I gotta look back into those failing tests in film snob...)

The keyboard shortcut that takes you to the session switcher is `ctrl+b s` (s
for switch). For me, it's super useful. Hopefully you'll find it useful, too.

