---
title: tree, but respecting your gitignore
date: 2019-10-30 22:41 EDT
---

Whenever I'm setting up a new computer, there's a bunch of CLI programs I tend to install.
Things like:

* git
* jq
* tree

I actually have [a list of them][list] in my dotfiles.
Honestly, there aren't that many.

[list]: https://github.com/maxjacobson/dotfiles/blob/master/expected_bins

One that I like is: [tree][tree].

[tree]: https://en.wikipedia.org/wiki/Tree_(command)

It's good.
It prints out the files in a visual way that is pretty easy to look at.

The only problem with it is that it doesn't respect the `.gitignore` file.
That means that it will list all of the files, even the ones I don't actually care about, like logs or temporary files.

Honestly, that's fair.
The tree program [predates] git by at least a decade.

[predates]: http://mama.indstate.edu/users/ice/tree/changes.html

After git became the thing that everyone uses there came a new generation of tools that are git-aware.
I'm thinking of things like [rg], the [grep] alternative.
It came of age in a git world, and by default it respects your `.gitignore`.
That's nice!

[grep]: https://en.wikipedia.org/wiki/Grep
[rg]: https://github.com/BurntSushi/ripgrep

Should I wait for someone to make a second generation tree, written in Rust?
Should _I_ make a second generation tree, written in Rust?

Well, I could.
But I don't really have to.
As of 1.8.0, tree has this kind of magic, unintuitively named option `--fromfile`.
Let's see how it works:

Let's say you have this file, `animals.txt`:

```
animals/dogs/chihuahua.txt
animals/dogs/terrier.txt
animals/amphibians/frogs.txt
```

And then you run:

```
$ tree --fromfile animals.txt
```

It will print:

```
animals.txt
└── animals
    ├── amphibians
    │   └── frogs.txt
    └── dogs
        ├── chihuahua.txt
        └── terrier.txt

3 directories, 3 files
```

Look at that!
It's printing out a lovely tree based on some arbitrary input.
Those files don't even exist, I just made them up and wrote them in a list.

In this context, the flag name "from file" kind of makes sense.
Instead of loading the list of files from the actual file system, it loads the list of files from a file.
But you don't actually need to write your list to a file at all.
Instead, you can just pipe the list into the tree command, like so:

```
$ echo "animals/dogs/chihuahua.txt
animals/dogs/terrier.txt
animals/amphibians/frogs.txt" | tree --fromfile
```

And that works just the same.
Hmm.
Even though there's no file.
Hmm.

Now that we can print a tree from some arbitrary input, we can think of it as a building block.
If we can gather a list of the files that we want to print, we can now ask tree to print them as a tree, and it will.

So now the problem we need to solve is: how do we gather the list of files in a directory, while respecting the `.gitignore`?

The simplest thing to do is:

```
$ git ls-files
```

This will ask git to print out all of the files which it is tracking all in a big long list.
That's not bad.
Let's take it for a spin:

```
$ git ls-files | tree --fromfile
```

It works pretty well!

Here's the one problem: what about new files, which _will_ be tracked by git but just haven't been committed yet?

Here's another problem: what if you're not in a git repository?
I mean, I usually am, but not always.

So here's what I'm doing: using yet another tool.
We've been talking about tree, which seems to lack a second generation alternative.
Let's turn our attention to [find], which appears to date back to the 70s.
find is very good.
It finds and lists files.
It has options for doing things like filtering them.
Not bad.
Let's try combining that with `tree --fromfile`:

[find]: https://en.wikipedia.org/wiki/Find_(Unix)

```
$ find . -type f -name "*ruby*" | tree --fromfile
```

In the source code for this blog, that prints out:

```
.
└── .
    ├── _posts
    │   ├── 2014-06-23-whoa-rubys-alias-is-weirder-than-i-realized.md
    │   ├── 2014-10-19-ruby-build-chruby-and-yosemite.md
    │   ├── 2015-03-29-ruby-keyword-arguments-arent-obvious.md
    │   ├── 2015-06-02-gemfiles-are-ruby-files.md
    │   ├── 2015-11-09-how-to-tell-ruby-how-to-compare-numbers-to-your-object.md
    │   ├── 2015-12-14-how-to-make-a-progress-bar-in-ruby.md
    │   └── 2017-07-02-there-are-no-rules-in-ruby.md
    └── talks
        └── there-are-no-rules-in-ruby
            └── slides
                └── assets
                    └── ruby.svg

6 directories, 8 files
```

So now we can use tree to find the structure of our repositories, filtered down to just certain files.

That filtered down to files with "ruby" in the filename.

What if we want to filter down to files where "ruby" is in the _text_ of the file?
Perhaps like so:

```
$ rg --files-with-matches ruby | tree --fromfile
```

This is actually super useful.
You might wonder something like "what are all of the places in my large code base that reference this class/module that I want to change?"
You could find that out, and see it visually, like so:

```
$ rg --files-with-matches "Url2png" --type ruby | tree --fromfile
```

And see:

```
.
└── app
    ├── facades
    │   └── template.rb
    ├── models
    │   ├── layout.rb
    │   └── site.rb
    └── services
        └── url2png.rb

4 directories, 4 files
```

Now I feel more confident that it won't be too painful to touch that.

But, let's get back to find.
Given that find is so old, it has no idea about git.
But, similar to rg, there's a git-aware modern version with a two letter name: [fd].

[fd]: https://github.com/sharkdp/fd

Coincidentally, but not surprisingly, both rg and fd are written in Rust.

With fd, we can find the list of files, and it will:

1. respect the `.gitignore`
2. include files that are not yet tracked by git

You just run it like this:

```
$ fd --type f --hidden --exclude .git
```

Some notes:

* We use `--type f` so that it will print out files (by default it will also print out a line for each directory, which I personally do not care about)
* We use `--hidden` so that it will include dotfiles
* We use `--exclude .git` so that it will not print out the contents of the hidden directory that git uses to keep track of all of its data.

So, bringing it all together, a tree that respects your `.gitignore`:

```
$ fd --type f --hidden --exclude .git | tree --fromfile
```

Done!

Well, almost done.
I am very happy with this behavior, but it's obviously a chore to invoke.
I'm not going to type all that out all the time.
I already forgot the various flags.
So what to do?

To be honest, I'm not sure what's best.
What I've done is this: in my login shell configuration, I've defined a function

```shell
treeeee() {
  fd --type f --hidden --exclude .git | tree --fromfile
}
```

And so now, sometimes, I'll type treeeee (I type treee and then hit tab because I can't remember how many es there are).
Not my best-named thing, but hey, what can you do.
