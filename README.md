# [hardscrabble.net](http://hardscrabble.net)

my personal site. powered by [jekyll](http://jekyllrb.com/) and hosted on [github pages](http://pages.github.com/)

## working on the site

(note to self)

* Run `bundle` to get the necessary gems.
* Run `bin/serve` to generate (and watch for changes then recompile)
* visit <http://localhost:1234>

## publishing a new post

* run `bin/new my great post` to create a draft file. Under the hood it's using [Mr. Poole](https://github.com/mmcclimon/mr_poole), a butler for Jekyll.
* run `bin/publish _drafts/my-great-post.md` to move that file into the `_posts` directory and add the current timestamp

## writing a guest post

I'm not actively seeking this out to happen, but I recently added a little logic to the layout that enables guest posts, so here's what that should look like. If you want to write one, fork the repo, write a post with YAML frontmatter that looks like the following, and submit a pull request:

```yaml
layout: post
title: my great blog post
author: my name
author_url: http://myblog.info
date: 1969-10-31
```

The `author_url` is optional. If it's filled in, your name in the byline will be a link to that URL.

