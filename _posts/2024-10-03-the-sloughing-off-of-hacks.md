---
title: The sloughing off of hacks
date: 2024-10-03 14:17
category: programming
---

I was recently looking over a post of mine from a few years ago, [Learning to love vim colorschemes](/2021/vim-colorschemes/), which goes over how I managed to get my favorite color scheme, [Smyck](https://color.smyck.org/), to take effect in several contexts:

- as a [vim](https://www.vim.org/) colorscheme
- as a [bat](https://github.com/sharkdp/bat) / [delta](https://github.com/dandavison/delta/) theme
- as some accent colors in [tmux](https://github.com/tmux/tmux)

Honestly most of this has held up!
I still use and love Smyck, mostly in exactly the same ways.[^1]

[^1]: The main difference is that I've migrated from [iTerm 2](https://iterm2.com/) to [Alacritty](https://alacritty.org/). I had been using the [Smyck.itermcolors](https://github.com/hukl/Smyck-Color-Scheme/blob/master/Smyck.itermcolors) theme file to use the Smyck colorscheme in my shell sessions -- I want those sweet pastels to be used for my prompt and to color the output from the various command line programs I'm running. BUT the official Smyck repository doesn't offer any Alacritty theme. One kind soul has opened [a pull request](https://github.com/hukl/Smyck-Color-Scheme/pull/35) which might one day get merged. Before I saw that, I had already [adapted it myself](https://github.com/maxjacobson/dotfiles/blob/54241e45c145ad15f45b2e88d6fd25049162e7de/config/alacritty.toml#L4-L36). It's not too bad.

In order to get all that to work, I mentioned this:


> In my `~/.vimrc`:
> 
> ```vimscript
> if $COLORTERM == 'truecolor'
>   set termguicolors
>   let &t_8f = "\<Esc>[38;2;%lu;%lu;%lum"
>   let &t_8b = "\<Esc>[48;2;%lu;%lu;%lum"
>   colorscheme smyck
> endif
> ```
> 
> The conditional is there because this configuration only works in terminals that support true color.
> I'm definitely sold on iTerm2 now, but I don't want everything to look wacky if I did try and use vim in Terminal.app.
> 
> Those funky `&t_8f` and `&t_8b` things are there for tmux compatibility.
> I have no idea what they mean.
> I copied them from the internet.

It kind of bugs me having configuration that I don't actually understand what it's doing, so I tried to learn what it actually does.
I didn't quite figure it out.
So then I tried removing it, and simplifying that whole passage to simply:

```vimscript
set termguicolors
colorscheme smyck
```

Forget the hack! Forget the conditional!

And to my pleasant surprise, everything seems to work fine?

When writing software we often accumulate piles of weird hacks, and sometimes if you're lucky, they stop being necessary. Maybe tmux fixed something. Maybe vim did. I don't know. They have updates all the time which I dutifully install. Why shouldn't things get better?

There's this idea called [Chesterton's Fence](https://en.wikipedia.org/wiki/G._K._Chesterton#Chesterton's_fence) that people often invoke in the context of software. Here's a quote I'm copying from Wikipedia:

> In the matter of reforming things, as distinct from deforming them, there is one plain and simple principle; a principle which will probably be called a paradox. There exists in such a case a certain institution or law; let us say, for the sake of simplicity, a fence or gate erected across a road. The more modern type of reformer goes gaily up to it and says, "I don't see the use of this; let us clear it away." To which the more intelligent type of reformer will do well to answer: "If you don't see the use of it, I certainly won't let you clear it away. Go away and think. Then, when you can come back and tell me that you do see the use of it, I may allow you to destroy it."

This might as well have been written about my `&t_8f` and `&t_8b` and I might be the less intelligent type of reformer happily clearing it away. But hell, I put up the fence, and I'll live with the consequences.

I suspect many software teams are tolerating many such fences in their codebases. By all means, try to get to the bottom of the question. Make an effort. And then [let the mystery be](https://www.youtube.com/watch?v=nlaoR5m4L80).
