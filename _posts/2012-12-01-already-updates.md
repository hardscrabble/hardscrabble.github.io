---
layout: post
title: "Already with the updates"
date: 2012-12-01 7:36 AM
category: coding
tags: devblog, ruby, sinatra, updates
---

**There are already updates** wow I am good.

Things I've added in the last small amount of time:

* a `config.rb` file for helper methods that get the blog title and subtitle
    * so nothing in the main app file, `web.rb` is hardcoded and theoretically someone else could use this
* permalinks based on the file name
* option to see the markdown source of any page with a little link at the bottom. (alternately just add the `.md` to any page)
* some *small* amount of style, mainly to do with displaying codeblocks
    * incidentally, I'm treating markdown source as "code"

Here's what the `tree` of my project directory looks like right now:

    [~/Dropbox/Sites/devblog] [maxjacobson] [07:41 AM]
    ϡ tree
    .
    ├── Gemfile
    ├── Gemfile.lock
    ├── Procfile
    ├── config.rb
    ├── posts
    │   ├── 2012-12-01-already-updates.md
    │   ├── 2012-12-01-gem-anxiety.md
    │   └── 2012-12-01-the-first-post.md
    ├── views
    │   ├── layout.erb
    │   └── style.scss
    └── web.rb

    2 directories, 10 files

Off topic, but: I learned how to customize my bash prompt earlier today and that's what it looks like.