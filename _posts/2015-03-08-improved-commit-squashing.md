---
title: git fib, a helpful little script for git commit squashers
date: 2015-03-08 12:19
---

Sometimes I squash git commits. Generally I do this when I'm making a pull
request which takes some time, and it accumulates a lot of commits, many of
which were just kind of trying things out. The sum of all the commits adds up to
one valuable addition, but each one is kind of garbage. Here's a good post from
Thoughtbot: [Git Interactive Rebase, Squash, Amend and Other Ways of Rewriting
History][tb].

[tb]:https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history

Here's what it generally looks like when I do it:

[![squashing a commit]({{baseurl}}/img/2015-03-08-squash.gif)]({{baseurl}}/img/2015-03-08-squash.gif)

And this works pretty well for me.

Usually.

Sometimes I do a really big squash, where 35 commits become one, which brings me
to one behavioral detail of squashes that I've always found counter-intuitive:
**squashes always go up**. When you're in that interactive list of commits, and
you're telling each commit what to do, it's relative to the previous
chronological commit. When you tell a commit to squash, you're telling it to
squash itself into the previous commit. When you tell this to the 34 newest
commits, you're making your very first commit absorb all of the changes. That's
probably fine, but imagine if those commits took place over the course of 3
days, or 3 weeks. Each commit has a timestamp of when the work was done, and
your big, squashed commit has a timestamp of... 3 weeks ago.

That sort of feels wrong to me. When the pull request is merged, the commit will
sink down in the commit log below all the work that came before it.

Sooo sometimes I find myself taking things into my own hands to fix that. How?
Well, it's kind of weird. Changing the last commit's message is pretty easy: `git
commit --amend`; changing the last commit's author is pretty easy too: `git
commit --amend --author="Kimmy Schmidt <kimmy.schmidt@example.com>"`.
But changing the last commit's timestamp is kind of tricky. As far as I know,
it's not built in to git itself, so it takes a few commands to achieve. Here's
what I've been doing:

* squash all the commits
* use my mouse to copy and paste the last commit message to the clipboard
* uncommit the last commit (`git reset HEAD~1`)
* re-stage all the changes (`git add -A`)
* make a fresh commit, pasting in the old commit message (and probably having to
  fix some formatting issues because pasting into vim never works)
* sometimes I'll amend the last commit's author to give someone else credit if
  they did the lion's share of the work, because this strategy automatically
  uses my git name and email even if the commit we're trying to time shift was
  created by someone else

Here's what I do now:

* `git fib`

Here's a gif (ignore the part when I got stuck in a dquote confusion please):

[![git fibbing a commit]({{baseurl}}/img/2015-03-08-fib.gif)]({{baseurl}}/img/2015-03-08-fib.gif)

Get it here: <https://github.com/maxjacobson/git-fib>

I learned with [git-sleep](https://github.com/maxjacobson/git-sleep-gem) that
scripts whose filename begins with `git-` can be referenced without the hyphen,
making git a nicely extensible tool. I still think that's so cool.

I'm pretty proud of this because it's a kind of gnarly shell script and it works
a lot better than I expected.

Some things I might do:

* rename it to something that makes more sense
* put it on homebrew so it's easier to install
* suppress more of the git output (not sure, maybe it's nice to have it?)

:leaves:
