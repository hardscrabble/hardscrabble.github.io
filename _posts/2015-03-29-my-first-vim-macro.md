---
title: my first vim macro
date: 2015-03-29 02:40
---

The time has come for me to make a vim macro. Here's what it looks like in
action:

![vim macro demo](/img/2015-03-29-vim-macro.gif)

I made it because I am working on a post that will include a few ruby examples,
and I got frustrated typing out Liquid's verbose syntax for codeblocks (I wish
Jekyll supported GitHub-style fenced code blocks). It wasn't too hard to make
it because it's really simple. I don't know how to make a smarter one, for
example one that puts ruby as the default language, but let's you start typing
immediately to replace it with something else, and then hit tab to jump to the
middle (a behavior I've seen with snippets in Sublime Text for example).

Here's what it looks like, straight from my vimrc:

```vim
  {% raw %}
    nnoremap hii i```ruby<ESC>o```<ESC>O
  {% endraw %}
```

I'll translate to English:

When I'm in normal mode, and I type `hii`, act like I typed the following
stuff, which I would've done if I had typed it out manually:

* `i` to go into insert mode
* type out the first line's stuff
* `<ESC>o` to exit insert mode, create a newline, go to that new line, and go
  back to insert mode
* type out the second line's stuff
* `<ESC>O` to exit insert mode, create a newline above the second line, go to
  that new line, and go back to insert mode

It's not much and I'm not even sure I'm using the word macro right but it's
mine.

**Edit April 2015**: Turns out `hii` was a pretty bad choice, because it starts
with `h`, which I type all the time in normal mode. It's the left arrow!
Whenever I type `h` now, it doesn't immediately move left, it hangs a moment
while it waits to see if I really mean just `h`, or if I'm gonna continue and
write `hii`. So, I've changed it from `hii` to `<Leader>hii` and now I'm happy
again.

Note: the default Leader character is `\`.
