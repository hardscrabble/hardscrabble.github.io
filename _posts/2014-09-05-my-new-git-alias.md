---
title: my newest git alias is git
date: 2014-09-06 19:35
category: programming
---

Adding aliases makes git a lot more pleasant to use. For example, I am too busy to write `git status` to find out the current status of my project so I did this:

`git config --global alias.st status`

and now I just write `git st`.[^global]

[^global]: btw: when you do that, it gets saved in a dotfile in your home directory called `~/.gitconfig`. If you open that file you'll see your name and email address too if you set that up (if not, check out [GitHub's page on that](https://help.github.com/articles/set-up-git))

I have a few other git aliases that I find helpful. They're on my dotfiles repo here: <https://github.com/maxjacobson/dotfiles/blob/master/.gitconfig>

I want to share my newest one because it's kind of weird and fun. It solves a problem that others *might* have, but I apparently totally do: I often write `git `, don't hit enter, and then go do something else. Then I come back and I write `git st` and hit enter, and I see this output:

```
⇥ git git st
git: 'git' is not a git command. See 'git --help'.

Did you mean one of these?
        hist
        init
```

I see this probably every day.[^hist]

[^hist]: you might see different output, but `hist` is another of my aliases and it's close enough to `git` that git thinks I meant it.

I wanted a new alias that just kind of ignores the extraneous `git`. Most git aliases don't behave that way. At first I tried aliasing `git` to nothing at all, but it didn't let me. I landed on this:

`git config --global alias.git "! git"`

The exclamation mark character means this alias doesn't refer to another git command; instead, I want to run an arbitrary bash command... which, in this case, happens to be git itself. Luckily, the git aliasing system doesn't simply run the quoted bash command, but it passes the rest of the arguments along, so `git git st` now behaves the same as `git st`, not simply `git`.

I'm pretty happy with this. I have a nagging worry that it's too weird to not have some unwanted side effects, and if I discover any I'll update this post.
