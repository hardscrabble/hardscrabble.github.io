---
title: designing your own extendible command line utility
date: 2015-06-10 00:36 EDT
---

I [like][] that you or I can write command line utilities in any language, name
it `git-butterfly`, or whatever you want, and then run it as though it were an
official part of the git tool, as `git butterfly`.

[like]: http://www.hardscrabble.net/2015/improved-commit-squashing/

It feels a lot like magic, but it's actually not that complicated a thing to do.
If you don't believe me, watch this video or skip after it to the code, and make
your own extendible utility, `pig`.

<iframe src="https://player.vimeo.com/video/130172467?color=c9ff23&title=0&byline=0&portrait=0" width="500" height="322" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="https://vimeo.com/130172467">designing your own extendible command line utility</a> from <a href="https://vimeo.com/maxjacobson">Max Jacobson</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

If you want your own pig command line utility, copy this code to an executable
file on your `$PATH` called `pig`. Then, try running `pig`. Try running
`pig oink`.

```sh
#!/usr/bin/env sh

subcommand=$1
bin="pig-$subcommand"
paths="${PATH//:/$'\n'}"

if [[ -z $subcommand ]]; then
  echo "Gimme a subcommand"
  exit 1
fi

for path in $paths; do
  pathToBin="$path/$bin"
  if [ -f $pathToBin ]; then
    $pathToBin
    exit 0
  fi
done

echo "$bin is not a pig command"
exit 1
```
