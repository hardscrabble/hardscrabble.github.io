---
title: integrating vim with the mac clipboard
date: 2016-07-30 18:25 EDT
---

Using terminal text editors has a lot of advantages, but for a while the biggest disadvantage I've felt as a vim user is that it's kind of hard to interact with the system clipboard.
I'm aware that there's a concept called "registers" which are something like multiple clipboards that you can copy and paste from, and one of them is the system clipboard, and the others are all virtual, or something like this, but I haven't taken the time to really learn how those work yet.

If I want to copy a helpful code snippet from Stack Overflow into vim and I copy it to the mac clipboard, and then press "command + v" to paste it into vim, the indentation gets totally screwed up.
This is becuse vim is trying to help.
It doesn't know that I just pasted, it thinks that I was suddenly just typing *super super fast* and each newline character I "typed" caused it to helpfully auto-indent the appropriate amount.
When I actually am typing, this is helpful.
But when I'm pasting, it's kind of annoying.

![Pasting into vim doesn't work well]({{ site.baseurl }}img/2016-07-30-vim-bad-paste.png)

(You can see in this example that not only is the indentation screwed up, but also there is an extra `end` which [vim-endwise](https://github.com/tpope/vim-endwise) helpfully tried to auto-insert)

The workaround I've used for a while is to always run `:set paste` before I paste, and then `:set nopaste` afterward.
This mode doesn't auto-indent.
It also breaks a number of my other vim configurations, such as `jk` being an alias for the escape key.

Pretty annoying.

Copying text out of vim is even more difficult.
I can use my mouse to highlight the text I want to copy it and then press "command + c" to copy it, but this is pretty awful, too, because it's very easy to accidentally copy things like line numbers (which are just text in the terminal, and your mouse doesn't know to avoid it) or to even copy text from multiple files which you happen to have open side by side in split buffers, such that the code is totally broken when you paste it out again.

![Copying from vim split buffer doesn't work well]({{ site.baseurl }}img/2016-07-30-vim-split-buffer.png)

My workaround for this is even worse! I generally close my splits, turn off line numbers (`:set nonumber`) and sometimes make my font smaller so I can fit the whole lines on my screen and select the text and copy it.
When I do this, I generally pick up a bunch of trailing whitespace that wasn't there in the source code.
It totally stinks.

Sometimes I will just open the file in [Atom](https://atom.io) so I can copy text in a sane way.

Other times I will run `:! cat % | pbcopy` to "shell out" to a bash command and copy the entire contents of the file to the clipboard.[^1]


[^1]: The `!` means to run a bash command; the `%` will expand to refer to the file name; `pbcopy` is a mac thing for piping data to your clipboard.

OK.
So obviously that sucks, right?
That's just some context for how I've been doing things.
I meant to look into a better technique and never got to it.

The other day at work I saw my coworker Will very seamlessly copy some text out of vim and paste it into Slack.

Scandalized, I asked him how he had done that.
He told me he's using [neovim](https://neovim.io) and it's probably something neovim does.

I made a note to look into it.
I'm open to the idea of using neovim instead of regular vim -- I think it's cool that you can [run a terminal inside vim](https://neovim.io/doc/user/nvim_terminal_emulator.html), which makes me wonder if I even need tmux...

One of the first things I found in my research was [a noevim issue from April 2014](https://github.com/neovim/neovim/issues/583) about how some vim configuration was working in vim but not neovim

> ... the follwing works perfectly fine with mainline vim, "y" and "p" work with X clipboard:
>
>     set clipboard=unnamedplus
>
> but not for neovim.
>
> I've tried setting it to:
>
>     set clipboard=unnamed
>
> still works in vim, but not neovim.

Hm. Wait. Does this mean vim already supports clipboard integration this whole time and no one told me!?

Indeed, yes, and this is why I'm writing this blog post to tell you.
I feel like there's a good chance you already knew.

So yep, I [added](https://github.com/maxjacobson/dotfiles/commit/0d4bd62bef49c4607e6e4349f16ae24a3be5949b) that second config option to my .vimrc and now it works great:

* I can yank text from vim and then "command + v" it into other apps.
* I can copy text from Stack Overflow and then "p" it into vim -- no weird indentation behavior or anything

I may yet switch to neovim[^2] or learn about registers, but for now I don't yet need to, and for that I celebrate.

[^2]: Note that neovim did fix that issue and [it does work now](https://neovim.io/doc/user/provider.html#provider-clipboard).
