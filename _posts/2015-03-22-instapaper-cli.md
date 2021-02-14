---
title: managing your Instapaper bookmarks from the command line
date: 2015-03-22 17:05
category: personal computing
---

I've previously [written about extracting a gem from a web app called
Layabout][film], but I neglected to mention that I later open sourced Layabout
as well:

[film]: /2014/refactoring-old-code/

<blockquote class="twitter-tweet" lang="en"><p><a href="https://t.co/YVAZkNE3cc">https://t.co/YVAZkNE3cc</a></p>&mdash; layabout (@layaboutapp) <a href="https://twitter.com/layaboutapp/status/544164277561856000">December 14, 2014</a></blockquote>

Today I have the opportunity to write about it, because I finished a kind of
fun new feature: a command line interface for efficiently managing your
bookmarks. Using it requires cloning the codebase and requesting API
credentials, so it's not a super accessible tool, but for power users it might
be worth it. Here's a quick demo:

![bin/rake explore demo](/img/2015-03-22-explore.gif)

Here's the code for the CLI as of this moment: <https://github.com/maxjacobson/layabout/blob/255eed15be2e55de804083bfdcf8651538af7bb0/lib/tasks/explore.rake>

(I like linking to the code as of a certain commit, because who knows, maybe
I'll rename the file later, and then [the link to the file on master
branch][master] won't actually work?)

[master]: https://github.com/maxjacobson/layabout/blob/master/lib/tasks/explore.rake

I think it's kind of interesting code. Each action is an object that describes
its help text, the commands it can handle, and how it can handle them.
