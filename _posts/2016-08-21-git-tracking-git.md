---
title: Using git to track git
date: 2016-08-21 18:42
category: programming
---

I made a screencast to share a fun idea I had while exploring a bit how git works.

You may know that when you use git to track a project, it creates a hidden `.git` directory with some files in it.
But what actually goes on in there?
And when do the contents of those files change?

Here's the idea: I know a tool for tracking the changes to a directory over time, and that tool is git itself!

So in this screencast you can see me try and do that -- I initialized a git repository, which created a `.git` folder, and then I initialized *another* git repository within that `.git` directory.

<iframe src="https://player.vimeo.com/video/179684267?title=0&byline=0&portrait=0" width="640" height="486" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

I still don't have a really great understanding of how git represents the data, although I've read Mary Rose Cook's very good essay about this topic [Git From The Inside Out][1], which does contain those answers (I read it a while ago and forgot the details).

[1]: https://codewords.recurse.com/issues/two/git-from-the-inside-out

But I feel like I learned a few things thru this little experiment, specifically about *when* they change.
