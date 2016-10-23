---
title: 'when your disk fills up, who are you?'
date: 2014-09-06 20:19
---

I got into technology in large part because I was drawn to the Mac community. I started reading blogs about apps and productivity. That occupied a lot of my mind during college in particular, when I was struggling with procrastination and wanted to find some silver bullet app to save me.

During that time I heard of a neat app called [DaisyDisk](http://www.daisydiskapp.com/) which analyzes your Mac's disk and breaks down exactly where your data is on your computer. It can help you remember about huge files you totally can delete or games you don't play anymore and can easily re-download if you want to again. I had a 2006 MacBook with an 80 GB hard drive ([the cool black one](http://en.wikipedia.org/wiki/MacBook#mediaviewer/File:MacBook.jpg)) that I needed to constantly bail files out of. DaisyDisk's colorful, powerful interface was a life saver and, for me, a benchmark for how cool an app could be.

It was updated fairly recently and [seems](http://www.macstories.net/reviews/daisydisk-3/) to still be great. I just re-downloaded and ran it on my 128 GB MacBook Air:

![my daisydisk results](/img/2014-09-06-daisydisk.png)

Fast-forward to a few months ago, and I'm at work as a web developer and my coworker comments that the disk on one of our production Linux servers is nearly full, and we need to find something to delete. I knew DaisyDisk wouldn't work in the command line but didn't know what to suggest. He remembered something called [ncdu](http://dev.yorhel.nl/ncdu) and ran it and I had immediate, rippling acid flashbacks to DaisyDisk! ncdu is a tool that runs totally in the command line with a nice interface and accomplishes the same goals and supports the same workflow:

1. start the app
1. wait while it analyzes your disk
1. see your top-level directories sorted by how much disk space they use
1. let you drill down and see the same for all sub-directories
1. let you delete culpable files right from its interface

Here's what it looks like:

![my ncdu results](/img/2014-09-06-ncdu.png)

Kind of the same!!

It would have been hopelessly intimidating and weird to me a few years ago but for the me that I am today (someone who sometimes uses Linux) I can't help but find it much cooler.

ncdu can be installed on a Mac via [homebrew](http://brew.sh/) with `brew install ncdu` or on Linux with `sudo apt-get install ncdu`.
