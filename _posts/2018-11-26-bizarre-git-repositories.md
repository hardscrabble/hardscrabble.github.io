---
title: I've started initializing git repositories in the weirdest places
date: 2018-11-26 00:57 EST
---

Earlier tonight I caught myself doing this:

```shell
cd ~/Downloads
git init
git commit --allow-empty --message ':sunrise:'
```

Then adding this to a `README.md` file:

```
This is my downloads folder
```

Then adding this to a `.gitignore` file:

```
*
!.gitignore
!README.md
```

And then running:

```shell
git add -A
git commit -m 'Add a repository for my downloads folder'
```

And while it felt extraordinarily natural, I laughed imagining a stranger observing this little ritual and wondering what the hell I was doing.

So what the hell was I doing?

I'll start with the particulars of what it was and then dig into the why.

## What?

1. I initialized a new [git] repository in my downloads folder
1. I added a [sunrise commit]
1. I added a README file explaining the purpose of the repository
1. I added a gitignore file which tells git to ignore _everything_, except for itself and the README
1. I committed those two files

[git]: https://en.wikipedia.org/wiki/Git
[sunrise commit]: /2018/sunrise-commits

## Why?

I don't plan to have any code in this repository.
I don't plan to push this repository anywhere.
I might not ever change that README to say anything else, or commit any other files.
What's the point?

I'm going to say some things which are willfully naive and I want you to come with me on this little journey:
what does it mean for a folder to be the downloads folder?
I suppose it means that one downloads files there.
I suppose most browsers will put files there when you use the browser to download them.
I suppose other applications, like Slack, might do the same.
I suppose as the owner of the downloads folder, it's my responsibility to tend the folder, perhaps to periodically delete the files there?
Or maybe I don't care and I'll just let them pile up?

You know this and I know this, but we weren't born with this knowledge.
We scraped together this knowledge through years of trial and error.
We're unlikely to forget these things.
We know how to use computers, especially our own ones.

But our computers have so many directories on them and it can be challenging to organize them all in a way that makes sense.
And it can be hard to remember the decisions we made about how to organize them when we made those decisions a few years in the past.

For a few years, I've been making little repositories like this one all over my computers.
The READMEs will include little notes to self about:

- what is the purpose of this folder?
- how do I use it?
- where should I put things?
- what's the thinking behind those decisions?

The git log helps me remember how long I've been following whatever system I'm currently following (or neglecting to follow), which I'm not _very_ proud to admit is something I find interesting.

I've been doing this specifically for most of the top-level directories in my Dropbox (things like `src` and `writing` and `Documents`) and frankly I enjoy very much stumbling on things like this:

```shell
cd ~/Dropbox (Personal)/Documents
git show
```

And seeing:

```
commit eeb9f6b2e24179a7995b4e6b52995270e8cec759
Author: Max Jacobson <max@hardscrabble.net>
Date:   Sun Aug 28 23:38:13 2016 -0400

    init with readme

diff --git a/README.md b/README.md
new file mode 100644
index 0000000..edb6eed
--- /dev/null
+++ b/README.md
@@ -0,0 +1,7 @@
+# Documents
+
+I copied this stuff over from my ~/Documents on my macbook pro
+
+wtf is all this shit?
+
+I'd like to find a proper home for it in my dropbox...
```

And, uh:
I haven't!

Feel free to be like me.
