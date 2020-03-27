---
title: some helpful tmux aliases
date: 2015-08-01 19:59
---

tmux is [still][0] an essential tool in my development workflow. Today I'm
writing to share a few aliases/helper functions I've recently added to [my
dotfiles][1]. Those change all the time so I'm hesitant to link to the files
which the helper aliases and functions currently live in.

[0]: /2015/terminal-multiplexing/
[1]: https://github.com/maxjacobson/dotfiles

I added them in these commits, though: [`d06362c`][2] and [`c9d8695`][3].

[2]: https://github.com/maxjacobson/dotfiles/commit/4f6169f012030a831b579047e5f15ff17ec06716
[3]: https://github.com/maxjacobson/dotfiles/commit/c9d869555b7e8c14319ecf71fd5e8e5befc6e1b8

The implementation is mostly stolen from other people's dotfiles and is gnarly
to look at so I'll just share how I use them:

**EDIT February 8, 2016**: I totally changed the implementation: [`6d883df`][7]
because I would occasionally have a bug with the old helper functions. More
details in [this issue][8]

[7]: https://github.com/maxjacobson/dotfiles/commit/6d883df5989cedec149be1365a18b2ca1b76a958
[8]: https://github.com/tmux/tmux/issues/298#issuecomment-181614369

Here's how to use these aliases:

* * *

When I'm not in a tmux session, and I want to see the list of tmux sessions, I
used to run `tmux ls`. Now I run `tl`.

* * *

When I'm not in a tmux session and I'd like to start a new one, I used to run
`tmux new -s blog` (where `blog` is the name of the new session). Now I run `t`.

It auto-chooses a session name based on the current directory's name.

If there's already a session with the name of the current directory, it cleverly
attaches to that session instead of trying to start a new one with that name.

* * *

If I'm not in a tmux session and I'd like to attach to any existing tmux
session, and I don't particularly care which one because I'm planning to go into
the session switcher anyway (`C-b s`), I used to run `tmux a`. Now I run `ta`.
