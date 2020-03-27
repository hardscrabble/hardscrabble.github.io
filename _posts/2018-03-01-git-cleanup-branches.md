---
title: git cleanup-branches
date: 2018-03-01 21:40
---

Do you clean up your git branches as you go or are you, like I am, a lazy hoarder?

```console
$ git branch | wc -l
150
```

Look at all those things I did that I don't care about anymore.

Yesterday I googled a little to try and find some magic incantation that would just clean up my branches for me.
There are some, but I find that they're either too conservative or too liberal for me.
By "too conservative" I mean that they try to only delete branches that have been merged, except that they're not actually very accurate, because they aren't aware of GitHub's "Squash and Merge" or "Rebase and Merge", which I use pretty much exclusively.
By "too liberal" I mean that some people recommend just literally deleting all of your branches.

I want to have control over the situation.

I can just run `git branch -D branch-name-goes-here` over and over, one-by-one, for all of my branches, but that would take _several minutes_, which I definitely technically have, but don't want to spend that way, even while curled up with a podcast.

What I really kind of want is some kind of interactive process that gives me total control but doesn't take that long to do.
So I made a little shell script, which looks like this to use:

![gif demonstrating git cleanup-branches which lets you interactively delete branches](/img/2018-03-01-cleanup-branches.gif)

As you may notice, it takes some loose inspiration from git's [interactive rebase][ir].

[ir]: https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history

It does something like this:

1. get your list of branches
1. open your default editor (whatever you have the `$EDITOR` global variable set to) (vim for me)
1. wait for you to mark which branches should be deleted
1. delete the ones you marked

git [lets] you plug in little scripts by just naming them `git-whatever-you-want` and putting that script on your `$PATH` and I think it's fun to take advantage of that.

[lets]: /2015/extendible-tools/

Here's [the latest version of the script][script] as of this writing:

```bash
#!/usr/bin/env bash

set -euo pipefail

file="/tmp/git-cleanup-branches-$(uuidgen)"

function removeCurrentBranch {
  sed -E '/\*/d'
}

function leftTrim {
  sed -E 's/\*?[[:space:]]+//'
}


all_branches=$(git branch | removeCurrentBranch | leftTrim)

# write branches to file
for branch in $all_branches; do
  echo "keep $branch" >> $file
done

# write instructions to file
echo "

# All of your branches are listed above
# (except for the current branch, which you can't delete)
# change keep to d to delete the branch
# all other lines are ignored" >> $file

# prompt user to edit file
$EDITOR "$file"

# check each line of the file
cat $file | while read -r line; do

  # if the line starts with "d "
  if echo $line | grep --extended-regexp "^d " > /dev/null; then
    # delete the branch
    branch=$(echo $line | sed -E 's/^d //')

    git branch -D $branch
  fi
done

# clean up
rm $file
```

[script]: https://github.com/maxjacobson/dotfiles/blob/6d1124eca7d3b097ac244c1d14d607fea1c3dd2a/bin/git-cleanup-branches

It follows the "chainable shell function" pattern I've [written about before][chain].

[chain]: /2017/chainable-shell-functions/

It uses `set -o pipefail`, my favorite recent discovery in shell scripting, which makes sure that each command succeeds, not just each expression.
I should probably do a separate blog post about that with more detail.

Yeah, I guess that's pretty much it.
Have fun shell scripting out there.
