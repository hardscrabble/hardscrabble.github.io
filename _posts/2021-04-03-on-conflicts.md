---
title: On conflicts
date: 2021-04-03 17:47
category: programming
---

Usually when git tells me that my feature branch has a conflict, it makes sense to me.
Occasionally though, I'll have a conflict, and I'll look at and think...
"Huh? Why is that even a conflict?"

I think it makes sense to me now though.
Let's talk about it.

## An example conflict

Let's look at a classic example of a git conflict.

Let's say on the `main` branch, there's a file that looks like this:

```ruby
class Dog
  def speak
    puts "woof"
  end
end
```

Then let's say I check out a feature branch `my-feature`, and I change that file to look like this:

```ruby
class Dog
  def speak
    puts "ruff"
  end
end
```

So far, so good.

_However_, unbeknownst to me, my colleague _also_ checked out a feature branch and changed the file like so:


```ruby
class Dog
  def speak
    puts "bark"
  end
end
```

And then merged that in.

The commit history looks a bit like this:

```
* dog.rb is introduced     -- commit A, on branch main
| \
|  * I update dog.rb       -- commit B, on branch my-feature
* colleague updates dog.rb -- commit C, on branch main
```

I have a merge conflict on my branch now!
But why exactly and what is a conflict?

## Why we have conflicts, and what they are

Derrick Stolee recently published a very good blog post on the GitHub blog called [Commits are snapshots, not diffs][1] which I would encourage you to read.
It seeks to clear up that common misconception by going into a lot of the weeds of how git organizes its information.

[1]: https://github.blog/2020-12-17-commits-are-snapshots-not-diffs/

In our example, we have three commits, which means we have three snapshots of the repository at three points in time.

The problem, then, is: how do you combine two snapshots?

Commits are snapshots, not diffs.
That just means that git is _not_ storing diffs on your file system.
However, each commit does know which commit came before it (its parent), and git does know how to generate a diff by comparing two snapshots.

In that example, commit B's parent is commit A.
Commit C's parent is _also_ commit A.

So what happens if, while on the `my-feature` branch, we run `git rebase main`, to keep our feature branch up-to-date with what our colleagues are doing?

1. git figures out which are the new commits that aren't yet on `main` (just commit B)
1. git figures out what is the latest commit on `main` (commit C)
1. git resets to how things are as of the commit C snapshot
1. git goes through the new commits, one by one. For each one, git generates a diff between it and its parent, and then attempts to apply that diff to the current workspace. As soon as there's a conflict, it halts.

In this simple example, there's only one new commit, and its diff with its parent looks like this:

```
$ git diff A..B
```

```patch
diff --git a/dog.rb b/dog.rb
index 825e50b..079f1c1 100644
--- a/dog.rb
+++ b/dog.rb
@@ -1,5 +1,5 @@
 class Dog
   def speak
-    puts "woof"
+    puts "ruff"
   end
 end
 ```

When git attempts to apply this diff, it needs to do a handful of things:

1. locate the file
1. locate the old lines that need to change
1. replace them with the new lines

This is a deceptively difficult task.
Let's review the information that is available in the diff:

1. the old filename (`--- a/dog.rb` means it used to be named `dog.rb`)
1. the new filename (`+++ b/dog.rb` means it's still named `dog.rb`)
1. the line numbers represented in the diff.
   We can interpret `@@ -1,5 +1,5 @@` as: "in the old version of the file, this diff starts at line 1 and covers 5 lines and in the new version of the file, ... same!"
1. the lines that were removed (the ones starting with `-`)
1. the lines that were added (the ones starting with `+`)
1. some contextual lines before and after

That certainly _sounds like_ a lot of information, but consider a scenario.
Let's say someone added a one line comment on the `main` branch.
Our diff thinks it applies to lines 1-5, but now it applies to lines 2-6.

The line numbers, then, are not enough to locate the lines that need updating.

Interesting, right?

Ok then, so we can imagine that it scans through the file looking for the line to be removed (`puts "woof"`), and replaces it with the line to be added (`puts "ruff"`), whatever line it is on now.

This gives us our first hint of what a merge conflict actually is.
If we want to change `puts "woof"` to `puts "ruff"`, but it no longer even _says_ `puts "woof"`, **how exactly are we supposed to do that?**
The diff cannot be applied.

Fair enough, right?

It isn't that simple, though.
We can imagine a scenario where that same line shows up several times in the same file, but only one of them should be updated.
So how does git figure out which ones to update?

Look: perhaps it's too late in the blog post to disclose this, but I'm just guessing and speculating about how any of this works.
But here's what I think.
I think it looks at those _unchanged_ contextual lines before and after the changed lines.

By default, git-diff produces diffs with three lines of context on either side of a change.
With that, git can locate which is the relevant change.
Don't _just_ look for the line to change, but also make sure it appears in the expected context.

This points to another kind of conflict, which I hinted at the beginning of this post.
This is a conflict which can feel unnecessary, but when I think about how git applies diffs in this way, it makes more sense.

## A more interesting example

Let's say on the `main` branch, there's a file that looks like this:

```ruby
def calculate(a, b, c)
  a + b + c
end
```

Then let's say I check out a feature branch `my-feature`, and I change that file to look like this:

```ruby
def calculate(a, b, c)
  a + b * c
end
```

So far, so good.

_However_, unbeknownst to me, my colleague _also_ checked out a feature branch and changed the file like so:


```ruby
def calculate(a, b, c)
  # Tells us how many lollipops there are
  a + b + c
end
```

And then merged that in.

The commit history looks a bit like this:

```
* calculate.rb is introduced     -- commit A, on branch main
| \
|  * I update calculate.rb       -- commit B, on branch my-feature
* colleague updates calculate.rb -- commit C, on branch main
```

We updated different lines, so there shouldn't be a conflict, right?

Wrong!
There is a conflict.

And it kind of makes sense now, doesn't it?
When git is applying the diff, it relies on those context lines to figure out where in the file to make the change.
If the context lines in the diff no longer exactly line up, git cannot be 100% sure it's doing the right thing, and so it raises a flag.

And I suppose all I can say is... fair enough!
