---
title: Sunrise commits
date: 2018-11-26 00:16 EST
---

I've picked up the habit from some people I've worked with that whenever I create a new repository, I make an initial empty commit that has the commit message `:sunrise:` and no changes in it.
I thought it might be helpful to jot down some context on why I do that, or at least why I think I do that.

## Starting new repositories

When you initialize a new git repository, it doesn't yet have any commits in it.
Let's say you create a new repository:

```
mkdir my-great-repository
cd my-great-repository
git init
```

And then ask git to tell you about it:

```
git status
```

It will print out:

```
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

And if you ask git to tell you about the commits:

```
git log
```

It won't be able to:

```
fatal: your current branch 'master' does not have any commits yet
```

Let's try to make a commit and see what happens:

```
git commit --message "some commit"
```

It didn't let us:

```
On branch master

Initial commit

nothing to commit
```

We tried to make a commit, but we hadn't staged any changes to be included in the commit, and so git was like ...
no.
Which is kind of fair, since ordinarily the point of making a commit is to introduce a change to the code base.
But the first commit is kind of special:
what does it even mean to make a change to nothing?

I encourage you not to spend too long pondering that question.

There are basically two ways out of this:

1. Actually add some files and commit them
1. Tell git that you don't mind having an empty commit, and make an empty commit

## The first way: having the first commit include some files

The first way is probably what most people do, since it's pretty straight-forward:

```
echo "Hello" > README.md
git add README.md
git commit --message "some commit"
```

The last command will output:

```
[master (root-commit) e52641c] some commit
```

Notice the part that says `(root-commit)`, which is how you know that it's the first commit.

This is basically fine.

Running `git log` works how you might suspect:
it shows that there's one commit.

Running `git show` works just fine:
it prints out the details of the latest commit, including the changes.

It gets a little more complicated if you want to use `git diff`.
Let's say you want to construct a `git diff` command which will display the changes you introduced in your first commit.
What would that look like?

```
git diff ??? e52641c
```

Bizarrely, there is a way to do this, and it looks like this:

```
git diff 4b825dc642cb6eb9a060e54bf8d69288fbee4904 e52641c
```

What is that first sha?
Basically don't worry about it.
It's a constant [in libgit2], although apparently it might change if git changes the algorithm it uses to generate hashes.

[in libgit2]: https://github.com/libgit2/libgit2/blob/e6cdd17c846648aa8e1e025fa1988475886a551e/tests/stash/save.c#L404

## The second way: making a sunrise commit

The other thing that you could've done was make a sunrise commit:

```
git commit --allow-empty --message ":sunrise:"
```

What's going on here?

This time, git lets us make a commit even though we haven't staged any change, because we specifically passed the `--allow-empty` flag to the commit command.

The commit message is short and sweet and paints a picture that fills your heart with hope.

That's it.

## Some advantages to making a sunrise commit:

1. You can make a new repository on GitHub and push your sunrise commit to your default branch, and then immediately check out a feature branch and start working on sketching out the initial project structure, and open a PR to introduce that.
1. If you want to make a new branch that has a totally empty tree, you can checkout your sunrise commit and then branch off from there.
   There are [other ways] to do that but they melt my brain a little more.
1. All of the meaningful commits in your repository will have a parent, making them easily diffed.
1. You feel the simple pleasure of following the recommendation from a blog post.
1. Probably some other reason that I'm forgetting (feel free to tell me).

[other ways]: https://github.com/tj/git-extras/blob/a815bb0fbdd9bf346ae614d8d41542ddb7099499/bin/git-fresh-branch

## A handy alias

If you find yourself following this pattern, you may want to add this handy alias:

```
git config --global alias.sunrise "commit --allow-empty --message ':sunrise:'"
```

That way, you can run simply `git sunrise` after you initialize a new repository.

Note: this will render as the sunrise emoji on GitHub.
You can feel free to use the actual emoji.
I don't because emoji don't render properly in terminal emulators on Linux, at least in my experience.

## Shout out

I'm pretty sure I picked up this habit from [Devon Blandin].

[Devon Blandin]: https://github.com/dblandin
