---
title: Introducing myself to the command line
date: 2012-02-26 12:00 AM
tags:
- from the archives
---

I never really understood how to use the command line. I kind of got it in principle but not in practice.

So I taught myself the basics by reading [this mini- book on Learn Code The Hard Way](http://cli.learncodethehardway.org/). It's awesome. The book is an alpha release and may have some errors but I didn't spot any. Would I, though?

Here are my thoughts and notes I jotted down while learning this. It's fairly stream of conscious and certainly less accurate or helpful than the aforelinked mini-book. If you'd like to learn it along with me, maybe this could possibly be useful to you. It's a little different on a Windows computer, but if you're on a Mac or Linux computer, this should all work for you too.

* * *

I wonder how much stuff I'm gonna have to memorize.

I'm in the terminal! I'm in Terminal!

I'm learning bash. Apparently my nerd friends will tell me to learn zsh instead. I wonder if my actual nerd friends would.

Ok I think I get the whole `cd` and `..` thing. If you're in a directory you can `cd` into any subdirectory or `cd ..` to go back one. From the downloads directory I can `cd ../documents` to get to the documents folder. That goes up one and then back down into another.

I wonder if up and down are the right words to use there. In the Finder I think of it more as left and right, in the column view.

So far basically all I'm doing is making folders and moving through them. Loving it.

Whoa, I just deleted john! john was a directory I made. `rmdir john` is deadly.

At this point, the guide is saying if I want to I can take a break and come back tomorrow. It thinks I'm weak. I can do this.

I like that I can [do](http://cli.learncodethehardway.org/book/cli-crash-coursech8.html) `mkdir -p i/like/icecream` and it'll make *all three* of those folders from scratch.

I wonder if I `rmdir i`, if it'll remove all the subfolders too. Ohh cool, it won't let me. That's nice.

It's kind of weird that when I `rmdir something`, it doesn't go to the trash, it's just *gone*.

`pushd` and `popd` are kind of baking my noodle (as [Corey likes to say](#deadlinktooldpodcastinterviewiwthcorey). Is this like the popping and locking of the programming world? Maybe I should take a break.

OK so you're in a directory. You `pushd to/a/folder` and now you're there, but you sort of bookmarked where you were. If you want to go back there you `popd`. If you push somewhere, then push somewhere else, then `pushd` over and over you can cycle back and forth between them. If you `popd` over and over you can go back through the stack (from most recent to least recent I think?) of your `pushd`s.

I love `putting things in code brackets` it's really easy in Markdown/Calepin. I might be misusing it.

Ahh and the stack isn't hidden! That's what's printed/returned when you `pushd`. I think I'm wrapping my head around this. Not sure if I've explained it well or anything, though.

I'm up to chapter nine. I just made an empty text file by writing `touch iamcool.txt`. Hey, [your words](http://cli.learncodethehardway.org/book/cli-crash-coursech9.html#x15-460009).

I just wrote `touch butts.mp3` and it made a song called Butts that I'm gonna be sending out to radio stations first thing tomorrow.

Ok so if I want to make a copy of iamcool.txt called awesome.txt it's as easy as writing `cp iamcool.txt awesome.txt`! Okay! (In fact I am getting tired).

I'm slowly piecing together that `-r` does... well, something. I don't know. If I `mkdir afolder`, I can then `cp -r afolder ~/Desktop` to make a copy of that folder on my desktop. But to copy awesome.txt to my desktop I just write `cp awesome.txt ~/Desktop`. So that `-r` I guess makes it work for a directory.

Hmm so now I'm moving files. But it sounds like renaming to me. `mv awesome.txt lame.txt` will basically rename it from awesome to lame. I suppose it's moving the data from one file to a new one? Like, when you die your soul leaves your body and enters a baby just as it's being born? If you believe in a very literal, specific form of reincarnation?

I know how to open a file in vim, and I even know how to do some basic vim commands, but I have no idea how to save a file and exit vim.

Ok I took a break. It's two days later from when I started this. I'm happy that I still remember the commands I've learned this far.

I don't know how to delete files but I can sort of do it by renaming one file into something else that exists, and it basically disappears I think.

I can also move a file from one folder into another folder with this. `mv hello.txt afolder/hello.txt` moves that file into the folder (though it doesn't create the folder). So it's moving *and* renaming.

Hmm.

Okay so now I'm using the `less` command to view the contents of text files. it seems to work just fine. I press `q` to exit. If it's a long document I can page through it with `w` (up) or `space` (down), one page-worth at a time. Got it.

I can read markdown files in the terminal pretty nicely. I'm gonna navigated to my Calepin folder and open up this draft file. `cd ../Dropbox/Apps/Calepin`, `ls`, `less cli.md` wow there it is! Ha! This is fun.

I just whipped up [a background image](http://cl.ly/2q1b430A3t1a1q1y0U1V) for my terminal. I wish it could tile and not just stretch. Looks good as long as I don't resize the window.

Now I'm `cat`ting things. That just sort of displays the contents of the text file in a slightly different way than `less`. *So* exciting.

Oh thank goodness `rm` exists. I didn't like that other way of deleting files.

OK so I can `rm hello.txt` to delete it but I can't use `rm` to delete a folder (that's what `rmdir` is for). Oh wait, I can, I just have to do some weird business. `rm -rf folder` works. *Yoosh* how do I remember that? Wait a moment. `rm -rf` can delete folder even if they have stuff in them. That one ups `rmdir`. This is "recursive deleting".

I like this possibly self-delusional quote [from the mini-book](http://cli.learncodethehardway.org/book/cli-crash-coursech15.html):

> Now we get to the cool part of the command line: redirection.

I kinda knew about the `|` but not the `<` or `>`.

Oh! [This](http://www.secretgeometry.com/apps/cathode/) is fun.

I just had a breakthrough wherein I learned how to save and close from vim, so I've just been playing in that for a little while. It's `:wq`! So simple!

Ok, wildcard matching... ya yah.

Ex, `ls *.txt` will list only the text files. that's handy. This command surprised me: `cat *.txt > bigfile.txt` took all of the txt files and combined them into one new one, which it also created. Then `rm *.txt` removed all of the txt files. That's vicious.

Ok so this is a fun thing. I just realized I can open *tabs* in the Terminal! So I'm gonna write this post in one tab and learn things in another. Whoa. Although the switch-tab shortcut is kind of unwieldy (command-shift-] or [). I can learn it.

So I can run a command like `grep hello *.txt` and it'll find the string "hello" in all the txt files and then return a list of all of the lines from all of the txt files that have that string in them. Useful. And if I want, I can pipe that to `less` and it'll be the same thing, but easier to flip through (with space and w).

I thought I was done when I reached the section on `man`, which looks up the manual for any given command, but there's a whole nother section. Great. I can handle some more knowledge.

I'm up to chapter 21. *Weeks* have elapsed. I'm not sure exactly what I just did and I can only hope it wasn't bad. one of the thrills of using the command line is that I can completely destroy my whole computer at any point by writing the wrong thing.

In [this chapter](http://cli.learncodethehardway.org/book/cli-crash-coursech21.html#x30-9700021) I "looked at my environment" and then set a variable and then printed out the variable. But where is this variable? In my environment? I feel like I don't want it to be there anymore but don't know how to get it out. Environmentalism! (I actually `echo`'d it, not print. For what it's worth.)

Now it wants me to research online "how you change your PATH for your computer" and do it all in the terminal. I think I'm just gonna skip this one.

Ah! Chapter 22 to the rescue. `unset` will flush that variable. Cool. I'm so relieved. I wonder if I can `unset` something important. That would be very unpsetting.

"You have completed the crash course. At this point you should be a barely capable shell user." -- Nice. I feel that way. It feels pretty great.

The conclusion links to [this](http://www.gnu.org/software/bash/manual/bashref.html) official bash reference. Also [this cheat sheet](http://cli.learncodethehardway.org/bash_cheat_sheet.pdf). Maybe I'll tackle those next.
