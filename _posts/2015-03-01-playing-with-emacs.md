---
title: playing with emacs for the first time
date: 2015-03-01 18:15
category: personal computing
---

Today I'm playing with emacs. There has been a confluence of events which have led me to this moment:

1. First, the other night I bumped into Harry Schwartz at a programming meetup, and he gave me [a sticker][] from his meetup group, [New York Emacs][]. I put it in my wallet.
2. Second, yesterday I bumped into [Andrew Leung](https://github.com/a-leung), and somehow we got to talking about Emacs. He's been using it for many, many years. I gave him the sticker from my wallet because I thought he would have more use for it than I would.
3. Today I'm kind of bored.

[a sticker]: http://harryrschwartz.com/2015/02/18/emacsnyc-stickers.html
[New York Emacs]: http://emacsnyc.org/

To my non-surprise, the version of Emacs which came installed on my Mac is a few major versions behind. To my surprise, the version of emacs on Homebrew is also a bit old. Neither version has syntax highlighting for Ruby, which was provided by default in the newest version. Installing the newer version wasn't that bad. I downloaded the code from [their ftp server](http://ftp.gnu.org/gnu/emacs/) (emacs-24.4.tar.gz), unarchived it, and followed the instructions in the `INSTALL` file. Then, sweet, ruby files were colorful. That makes a huge difference for me.

I really don't know what I'm doing, but I feel like I should learn more about emacs if I'm going to recommend people learn Vim, which I generally use and recommend, so today I took a little while to play with it and I've learned enough to do the super basic things. Here's everything I know how to do:

* `emacs .` from the command line to open emacs in a file browser
* arrow keys and return to browse and open files
* `C-x C-s` to save
* `C-x C-f <enter>` to return to the file browser from a file
* `C-a` to go to the beginning of a line
* `C-e` to go to the end of a line
* `C-n` to go to the next line
* `C-p` to go to the previous line
* `C-_` to undo a change
* `C-s` to search within a file
* `C-x C-c` to quit (it prompts you to save any unsaved changes at this point)

(Note:

something like `C-x` can be read as **"press the control key, and then press the x key while still holding down the control key"**

something like `C-x C-f` can be read as **"press the control key, and then press the x key while still holding down the control key; then keep holding down the control key, and press the f key, and then feel free to go get a coffee, you're done"**)

And that's it. Things I'd like to learn:

* More commands to navigate the text within a file (deleting lines, copying, cutting, pasting)
* How to do some simple configuration (I want line numbers)
* How to more efficiently open files (I want a fuzzy file opener like [ctrlp.vim](https://github.com/kien/ctrlp.vim))

That's really all that's blocking me from actually using it to do work. I'm using it to write this post, and I'm totally surviving.

If I were to go down the rabbit hole, I'd probably want to learn the whole Emacs Lisp thing. Richard Stallman, the creator of Emacs, [says][] this:

> The most powerful programming language is Lisp. If you don't know Lisp (or its variant, Scheme), you don't know what it means for a programming language to be powerful and elegant. Once you learn Lisp, you will understand what is lacking in most other languages.

[says]: https://stallman.org/stallman-computing.html

It's hard to read that and not get some programming FOMO.

I attended [this talk](https://www.youtube.com/watch?v=2z-YBsd5snY) from Harry called "An Introduction to Emacs Lisp", which I may need to rewatch.
