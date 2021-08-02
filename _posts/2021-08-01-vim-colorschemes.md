---
title: Learning to love vim colorschemes
date: 2021-08-01 21:17
category: programming
---

Up until a few months ago, I was living in the dark.

I've been using vim as my main editor for most of my career.
It has a built-in feature for setting a colorscheme, and it comes with a handful of color schemes with intriguing names like elflord, delek, and darkblue.

All you have to do is a add a line like this to your `~/.vimrc` to set a colorscheme on boot:

```vimscript
colorscheme darkblue
```

I never used it.
I tried it out occasionally, but none of them looked that good.

When I wanted to customize the colors in my editor, I'd do it indirectly, by configuring the color schemes for my terminal app.
Doing that affects the colors of all programs you run, not just vim, and it seemed good enough for me.

It was a "you get what you get and you don't get upset" situation.

I kind of thought that was the best I could hope for.
And, unfortunately, it was never great.
Often it wasn't even readable; Vim didn't necessarily know which of the terminal's 16 colors made sense for which contexts, and it might choose to render dark grey text on a black background, because it didn't really know better.

## delta

Here's what changed: I came across [delta], a new-ish project which bills itself as "A viewer for git and diff output", and it just [looks so good](https://github.com/dandavison/delta#comparisons-with-other-tools) that it made me realize I need to raise my expectations a bit.

I configured git to use delta when displaying diffs (I use `git show` and `git diff` all the time), and I configured it to display them in a way that looks a lot like how the same diff would look on GitHub.
That means a nice shade of green when highlighting new lines, a nice shade of red when highlighting removed lines, and _actual syntax highlighting_ on all of the lines.
That last bit is still quite cool to me, months later.

[delta]: https://github.com/dandavison/delta

## True color

But wait a second?
How does delta look so good?
I thought terminal programs were constrained to only have access to the 16 colors provided by your terminal theme?

Welp, turns out that's not true.
Modern terminal apps support True Color, which basically means they support whatever colors you want.
For years, I used the Terminal app that comes with Macs because it seemed fine, and I didn't understand why people preferred [iTerm2](https://iterm2.com/).
Now I get it.
Per [this indispensable reference](https://github.com/termstandard/colors), Terminal.app does not support True Color, whereas iTerm2 does.

## bat

Before I heard of delta, I'd heard of [bat](https://github.com/sharkdp/bat), which bills itself as "A cat(1) clone with wings."
It's a lot like cat (you can use it to look at the contents of a file), but it will syntax highlight the output.

Delta is actually building on top of bat, and it also looks great.

Go ahead and install both delta and bat if you want to follow along with me here as I talk you through all the color-related changes I've made in my dotfiles recently.

## Getting a custom color scheme

Both bat and delta come with some number of syntax themes built-in, which might be good enough for you.
But my heart yearns for smyck.

[Smyck] is not a standard color scheme, but it's one that I happen to really like.
It's got a chill pastel vibe.
The icy blue, mustardy yellow, and salmon pink all set me at ease.
These steps should work for other themes too, but I'm going to take this opportunity to evangelize Smyck.

[Smyck]: https://github.com/hukl/Smyck-Color-Scheme/

Here's the one-time setup to get Smyck assets in place:

1. Clone [the smyck repo](https://github.com/hukl/Smyck-Color-Scheme/), which contains the color scheme in a handful of formats
2. Double click `Smyck.itermcolors` to load the [iTerm2](https://iterm2.com/) color scheme
3. Copy the `smyck.vim` file into `~/.vim/colors`, which is where vim will look later on when we run `colorscheme smyck`
4. Copy the `Smyck.tmTheme` file into `~/.config/bat/themes` and run `bat cache --build` -- this will make the theme available to bat _and_ delta

## Configuring vim to use smyck

In my `~/.vimrc`:

```vimscript
if $COLORTERM == 'truecolor'
  set termguicolors
  let &t_8f = "\<Esc>[38;2;%lu;%lu;%lum"
  let &t_8b = "\<Esc>[48;2;%lu;%lu;%lum"
  colorscheme smyck
endif
```

The conditional is there because this configuration only works in terminals that support true color.
I'm definitely sold on iTerm2 now, but I don't want everything to look wacky if I did try and use vim in Terminal.app.

Those funky `&t_8f` and `&t_8b` things are there for tmux compatibility.
I have no idea what they mean.
I copied them from the internet.

## Configuring git to use delta and smyck

In my `~/.gitconfig`:

```text
[core]
  pager = delta --syntax-theme Smyck
[interactive]
  diffFilter = delta --line-numbers --color-only --syntax-theme Smyck
[delta]
  features = unobtrusive-line-numbers
[delta "unobtrusive-line-numbers"]
  line-numbers = true
```

You'll note that I abandoned the GitHub theme and went all-in on Smyck.

## Configuring tmux to enable true color and smyck-friendly colors

In my `~/.tmux.conf`:

```text
set -g default-terminal 'screen-256color'
set -g status-bg '#96D9F1'
set -g status-fg '#282828'
```

Here I'm just manually specifying some of the Smyck colors so that tmux's status bar at the bottom blends in.

## Configuring bat to use smyck

In my `~/.config/bat/config`:

```text
--theme="Smyck"
```

This tells [bat] to use the Smyck theme by default, without me needing to specify it every time.

[bat]: https://github.com/sharkdp/bat

## Configuring my muscle memory to use bat

In my `~/.zshrc`:

```shell
alias 'cat'='bat'
```

## The end result

As I tweeted recently, the end result feels like a pretty luxe experience:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Having the same syntax highlighting in vim, cat, and git is so luxe <a href="https://t.co/NPOXLEFjAV">pic.twitter.com/NPOXLEFjAV</a></p>&mdash; Max Jacobson (@maxjacobson) <a href="https://twitter.com/maxjacobson/status/1367185043211374598?ref_src=twsrc%5Etfw">March 3, 2021</a></blockquote>

Everything is Smyck.

I used to think the vim colorschemes command wasn't very good, and that I was better off on my own.
But I've matured.
Come join me.
