---
title: Ambiguous use of user-defined command
date: 2015-01-18 20:33
category: programming
---

I wish Vim plugin authors would stop exposing commands that start with E. Is
that a reasonable thing to feel? I do feel it.

I [use netrw][0] to browse files in vim, and I enter netrw by writing `:E`. I
do this all the time. `:E` is short for `:Explore`. I could type `:Ex`, `:Exp`,
  `:Expl`, `:Explo`, `:Explor` as well, but I type `:E`. This is what my
  fingers remember.

[0]: /2015/a-cleaner-file-browsing-interface-for-vim/

Sometimes I install a plugin, and that plugin exposes another command which
starts with `:E`, and suddenly I get this vim error message:

> Ambiguous use of user-defined command

What! I'm the user, and I didn't even define these commands! I just installed a
plugin. This is bull! Recently I installed [a plugin][1] which, very sensibly,
[exposes][2] a command called `:Errors`. Except, like, now I can't type `:E`
because that's ambiguous, I could just as easily mean either of those commands,
so vim does neither. Now I need to type `:Ex` to disambiguate. I could cry.

[1]: https://github.com/scrooloose/syntastic
[2]: https://github.com/scrooloose/syntastic/blob/2073cee050d3df2ed963d00ac433bb94218d66af/plugin/syntastic.vim#L179

So anyway, I was about to uninstall the plugin, but then I realized I can just
edit my local copy of it and comment out the line that exposes the `:Errors`
command, which I didn't particularly want to use anyway, and now I'm kind of
happy. I would prefer if I could un-register the command in my `.vimrc` (is it
possible?  I couldn't find how in my few minutes of searching), because this
solution is kind of fragile; next time I install the plugin on some other
computer, it won't include my fix.

**Edit April 2015**: I've sort of solved this problem by no longer typing `:E`,
and instead adding this line to my vimrc:

```vim
nmap <silent> <Leader>e :Explore<CR>
```

Which lets me type `,e` to jump right to netrw (`,` is my Leader character. By
default, the Leader character is `\`.)`
