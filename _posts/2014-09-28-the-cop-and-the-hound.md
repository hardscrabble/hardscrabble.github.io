---
title: the cop and the hound
layout: post
date: 2014-09-28 17:05
---

As a rails developer I keep hearing about Thoughtbot's cool projects. A fairly recent one is [Hound](https://houndci.com/), a tool that comments on your GitHub pull requests and points out code style violations. I think consistent style is a nice ideal to strive for, so I want something like this.

Setting up Hound is easy, but it only reviews the code that is added in a pull request, not the existing code base. Which, in theory, is fine. Except, if you're the kind of obsessive compulsive who wants a style guide, it's probably not.

So I managed to make Hound review the full code base but it took some tricky git branching and pull requesting. So I made a screeny[^screeny] to share:

[^screeny]: I call them screenies because the app I use to make screenies is called [Screeny](http://screenyapp.com/)

<iframe src="//player.vimeo.com/video/107315271" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/107315271">Setting up Hound CI to comment on my full code base</a> from <a href="http://vimeo.com/maxjacobson">Max Jacobson</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

I didn't want this video to be too long, so I stopped when I managed to get the full codebase analyzed. But here's my plan to continue:

1. I'll need to learn how to configure Hound to more accurately reflect my tastes. Under the hood it uses [rubocop](https://github.com/bbatsov/rubocop), pre-configured with Thoughtbot's style rules. I'll add my own configuration and push again, which will hopefully refresh the comments.
2. Then I'll fix all the code style violations and keep pushing them up until all of the comments go away. Then I'll merge the second pull request. At that point my first pull request will (hopefully) have a diff that shows exactly what I want: new configuration and style fixes.
3. I'll squash that branch to have just one commit and merge it.
4. Then I'll merge that pull request into master and be nicely set up for a future of consistent style.

## 1. configuring rubucop

These are [the default "cops" for rubocop](https://github.com/bbatsov/rubocop/blob/master/config/enabled.yml). If I were starting fresh with rubocop (and not using Hound), I would start with this configuration file and start disabling specific cops. In fact, this is exactly what Hound does. [Their tweaks are available](https://github.com/thoughtbot/hound/blob/master/config/style_guides/ruby.yml) because Hound is open source.

Here's what I came up with: <https://github.com/maxjacobson/film_snob/blob/hound-it-up/.rubocop.yml> (if that link is dead, it's probably because I merged the PR and deleted the branch, in which case the file can be access [here](https://github.com/maxjacobson/film_snob/blob/master/.rubocop.yml)).

Maybe I'll change it over time but it seems good right now.

## 2. fixing all the violations

Done: <https://github.com/maxjacobson/film_snob/pull/46>

Being consistent feels good :smile:.

It's actually not that hard to use rubocop directly without Hound. I also added rubocop to my Travis CI configuration, so even if I didn't have Hound, pull requests would consider style guide violations, because the build would fail. There's no commenting, which decreases the visibility. But it's OK because Hound double-comments if you push the same problem twice, so maybe the comments aren't that great? It's also *much* more strict. If you have an 81 character line, it's a complete no go, the build fails, you can't merge that.

I'll try that.

