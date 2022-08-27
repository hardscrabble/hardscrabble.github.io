---
title: designing your own extendible command line utility
date: 2015-06-10 00:36
category: programming
---

I [like][] that you or I can write command line utilities in any language, name
it `git-butterfly`, or whatever you want, and then run it as though it were an
official part of the git tool, as `git butterfly`.

[like]: /2015/improved-commit-squashing/

It feels a lot like magic, but it's actually not that complicated a thing to do.
If you don't believe me, watch this video or skip after it to the code, and make
your own extendible utility, `pig`.

{% include vimeo.html id="130172467" %}

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
