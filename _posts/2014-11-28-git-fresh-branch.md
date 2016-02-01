---
title: git fresh branch
layout: post
date: 2014-11-28 04:11
---

Tonight while clicking around the web I discovered
[tj/git-extras](https://github.com/tj/git-extras), a set of useful git tools
maintained by TJ Holowaychuk[^tj]. Once installed, your `git` command is
overloaded with a bunch of new, useful commands.

[^tj]: Formerly 'visionmedia' on GitHub

It's easy to install, but it does add quite a lot of stuff, and I was worried
for a moment that it would clobber some existing aliases of my own. One, [git squash][squash],
comes dangerously close to my beloved [git squasher][squasher], but doesn't
actually conflict.

[squash]:https://github.com/tj/git-extras/blob/master/bin/git-squash
[squasher]:https://github.com/maxjacobson/dotfiles/blob/f40c96fd883912f37f1451a2a41cb8c32c2c963f/.gitconfig#L16

If you are worried about it, you can safely pick and choose which extras you
want by saving [individual scripts][] and just making sure they're all on your
PATH and executable.

[individual scripts]: https://github.com/tj/git-extras/tree/master/bin

The readme explains their purposes nicely, but I want to emphasize one in
particular: `git fresh-branch <branch name>` which does stuff I didn't know was
possible.

Let's say you're maintaining an open source library that has existed long enough
to accumulate many commits and files. Let's say you want to create [a github
page](https://pages.github.com/) for that library to explain what it's all about
and how to use it. The way github pages works, you should create a new branch in
the same repo with the branch name `gh-pages`, and on that branch you keep a set
of assets that will become a static website. But when you create a new branch,
it will have all of the code from your open source library, and an entire
history of commmits. I can imagine doing something like this:

```
# create a new branch
git checkout -b gh-pages
# delete all of the existing files
git ls-files | xargs rm
# stage those deletes
git add -A
# commit the change
git commit -m 'BURN IT DOWN'

# create the first version of the site
echo 'hello! use my gem!' > index.html
git add index.html
git commit -m 'gh-pages init'
git push origin gh-pages
```

And then I'd wait for GitHub to do its magic and expect to see my great page
online in a few minutes.

It's kind of awkward having a 'BURN IT DOWN' commit, but I didn't know there was
an alternative. With git extras, that could look more like this:

```
# create a new branch WITH NO HISTORY AT ALL
# NOT ONE COMMIT
git fresh-branch gh-pages

# create the first version of the site
echo 'hello! use my gem!' > index.html
git add index.html
git commit -m 'gh-pages init'
git push origin gh-pages
```

How the heck does it work? We can look at the fresh-branch script [online][],
but I'll include the latest version here for reference:

[online]: https://github.com/tj/git-extras/blob/master/bin/git-fresh-branch

```bash
#!/bin/sh

branch=$1

test -z $branch && echo "branch required." 1>&2 && exit 1

git symbolic-ref HEAD refs/heads/$branch
rm .git/index
git clean -fdx
```

I guess a lot of the work is being done by [symbolic-ref][].

[symbolic-ref]: http://git-scm.com/docs/git-symbolic-ref

While researching this post, I noticed that git-extras also offers a
[gh-pages](https://github.com/tj/git-extras/blob/master/bin/git-gh-pages) script
that is even more tailored to the use case from my example. Of course! :leaves:

* * *

**edit**: I probably should have slept on this post and actually explored more
how it's working under the hood. But I did not.

