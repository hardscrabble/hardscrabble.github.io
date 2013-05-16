---
layout: post
title: some new features here
date: 2012-12-13 21:07:00
category: coding
tags: devblog, tree, RSS
---

Things I've added to beefsteak tonight:

### more feeds

Like, for individual categories, tags, and search queries. Try clicking on a tag/cat or searching something, and you'll see a link to the feed at the bottom.

A fun one might be: <http://devblog.maxjacobson.net/tag/gush/feed> or <http://devblog.maxjacobson.net/search/confess/feed> if you like me at my gushiest or most confessional.

### pages

My about page is now at <http://devblog.maxjacobson.net/~about>. I made another one mostly to test what it looked like with two. It doesn't look great.

You can view the markdown source of pages the same as posts. Just add the `.md` suffix or click the link at the bottom. I don't know why I offer this. It doesn't work amazingly. In some posts with code, I see underscores disappear. It's weird.

### favicon and apple touch icon

I just threw in some all-black-errything squares for now. I figure if anyone else uses this they can replace with something they like.

* * *

Here's what the tree for this site looks like right now:

(notice the new pages directory, mostly)

    [~/Dropbox/Sites/devblog] [max] [08:23 PM]
     ϡ tree
    .
    ├── config.rb
    ├── Gemfile
    ├── Gemfile.lock
    ├── helpers.rb
    ├── pages
    │   ├── about.md
    │   └── projects.md
    ├── posts
    │   ├── 2011-03-12-un-americano.md
    │   ├── 2012-02-26-introducing-myself-to-the-command-line.md
    │   ├── 2012-08-26-favblogging.md
    │   ├── 2012-12-01-added-sorting.md
    │   ├── 2012-12-01-already-updates.md
    │   ├── 2012-12-01-categories-and-tags.md
    │   ├── 2012-12-01-gem-anxiety.md
    │   ├── 2012-12-01-sleep.md
    │   ├── 2012-12-01-sorting.md
    │   ├── 2012-12-01-the-first-post.md
    │   ├── 2012-12-02-erb-and-indendation.md
    │   ├── 2012-12-02-on-an-airplane.md
    │   ├── 2012-12-02-open-source.md
    │   ├── 2012-12-02-RSS-is-hard.md
    │   ├── 2012-12-02-search.md
    │   ├── 2012-12-04-seal-attack.md
    │   └── 2012-12-13-meetups.md
    ├── Procfile
    ├── public
    │   └── img
    │       ├── 2012-12-04-seal-1.jpg
    │       ├── 2012-12-04-seal-2.jpg
    │       ├── 2012-12-04-seal-3.jpg
    │       ├── apple-touch-icon.png
    │       └── favicon.ico
    ├── README.md
    ├── views
    │   ├── 404.erb
    │   ├── 500.erb
    │   ├── layout.erb
    │   └── style.scss
    └── web.rb

    5 directories, 35 files