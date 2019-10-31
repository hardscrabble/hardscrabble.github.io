---
title: another cookie crumb
date: 2015-02-21 01:53
---

In [Wednesday's post about building Firefox from source the other day][0], I
mentioned one thing I really liked about the experience of first looking at this
code base: it kept dropping little hints about what I might need to do next in a
way that was actually insightful and helpful. For example, after running their
script which installs dependencies, there was some helpful output pointing me to
where I could get the code base.

[0]: /2015/building-firefox/

Today I checked in with the project and pulled the change from the last few
days. There has been a flurry of activity, none of which means much of anything
to me as an outside observer.

I was curious if I would be able to run `./mach build`, and if it would take as
long on the second run. Instead I got this interesting output:

```
0:00.35 /usr/bin/make -f client.mk -s
0:01.33
0:01.33 The CLOBBER file has been updated, indicating that an incremental
0:01.33 build since your last build will probably not work. A full/clobber
0:01.33 build is required.
0:01.33
0:01.33 The reason for the clobber is:
0:01.33
0:01.33  Bug 1119335 - (DOMString or sequence<DOMString> or ConstrainDOMStringParameters)
0:01.33  needs binding flush (Bug 1103153).
0:01.33
0:01.33 Clobbering can be performed automatically. However, we didn't
0:01.33 automatically clobber this time because:
0:01.33
0:01.33   Automatic clobbering is not enabled
0:01.33   (add "mk_add_options AUTOCLOBBER=1" to your mozconfig).
0:01.33
0:01.33 The easiest and fastest way to clobber is to run:
0:01.33
0:01.33  $ mach clobber
0:01.33
0:01.33 If you know this clobber doesn't apply to you or you're feeling lucky
0:01.33 -- Well, are ya? -- you can ignore this clobber requirement by
0:01.33 running:
0:01.33
0:01.33  $ touch /Users/maxjacobson/src/gecko-dev/obj-x86_64-apple-darwin14.3.0/CLOBBER
0:01.33 make: *** [/Users/maxjacobson/src/gecko-dev/obj-x86_64-apple-darwin14.3.0/CLOBBER] Error 1
0:01.36 78 compiler warnings present.
```

That's super interesting! Things I learned from this:

* There's something called "The CLOBBER file" which is some kind of place to
  leave little messages about why someone else will need to do a full build
  after pulling in a change
* Sometimes it's possible for mach to do an "incremental build", which I assume
  wouldn't take very long
* There's a tool for clobbering, which I guess clears away stuff from earlier
  builds, requiring `mach build` to do a full, non-incremental build
* Mozilla people make nerdy movie references

I took a look at The CLOBBER file by using my fuzzy file opener to look for a
file called CLOBBER and found it, in the root-level of the project. It contains
more details about how to use it:

```
# To trigger a clobber replace ALL of the textual description below,
# giving a bug number and a one line description of why a clobber is
# required. Modifying this file will make configure check that a
# clobber has been performed before the build can continue.
#
# MERGE NOTE: When merging two branches that require a CLOBBER, you should
#             merge both CLOBBER descriptions, to ensure that users on
#             both branches correctly see the clobber warning.
#
#                  O   <-- Users coming from both parents need to Clobber
#               /     \
#          O               O
#          |               |
#          O <-- Clobber   O  <-- Clobber
#
# Note: The description below will be part of the error message shown to users.
#
# Modifying this file will now automatically clobber the buildbot machines \o/
#

# Are you updating CLOBBER because you think it's needed for your WebIDL
# changes to stick? As of bug 928195, this shouldn't be necessary! Please
# don't change CLOBBER for WebIDL changes any more.

Bug 1119335 - (DOMString or sequence<DOMString> or ConstrainDOMStringParameters)
needs binding flush (Bug 1103153).
```

It's probably gratuitous to just copy this whole thing in here, especially when
the last few lines are designed to change, but it's pretty interesting, and I
have a weird superstition about linking to files on GitHub, for example, because
what if that file gets moved and my link goes dead?

This file is like a cache. As long as it stays the same, you can keep building.
As soon as it changes, you need to clobber before you can build. It seems like a
clever solution to me (I especially like the detail about combining clobber
notes so when two people insist on a clobber, they each get the benefit of the
other's). You just need to remember when to expire the cache, which leaves a
little cookie crumb for the next developer to work on the project.
