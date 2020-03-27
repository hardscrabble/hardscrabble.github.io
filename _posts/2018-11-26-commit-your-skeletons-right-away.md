---
title: Commit your skeletons right away
date: 2018-11-26 00:31
---

I was just writing a post about [habits around starting new git repositories][sunrise] and there was one additional thought that isn't quite related but which I also want to say and so now I'm really blogging tonight and coming back to you with a second post.

Please commit your skeletons right away.

Imagine you're making a new rails app, and you use the `rails` command to generate a skeleton for your new application:

```
rails new the_facebook
cd the_facebook
```

```
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        .gitignore
        .ruby-version
        Gemfile
        Gemfile.lock
        README.md
        Rakefile
        app/
        bin/
        config.ru
        config/
        db/
        lib/
        log/
        package.json
        public/
        storage/
        test/
        tmp/
        vendor/

nothing added to commit but untracked files present (use "git add" to track)
```

This command will generate a whole bunch of files.
It will also initialize a new git repository.
But it doesn't commit those new files for you.

I urge you:
please commit them right away (after your [sunrise commit][sunrise]).

Why?
Because these files were all generated for you by a computer, and the computer deserves credit.
_Kind of._
Really, it's because you're about to make a bunch of changes to those files and you're also about to forget which of those lines you wrote and which of those lines the computer wrote.
You're going to be maintaining this code base for the rest of your life.
I mean, maybe.
It's really helpful to look at `git blame` and figure out who wrote which lines and why and in my opinion it can actually be helpful to have that context all the way down to the very beginning.

[sunrise]: /2018/sunrise-commits

The same is true of `cargo new` for rust people and `jekyll new` for blogger people.
The `ember new` command is a welcome exception:
it commits its skeleton and throws in some cute ASCII art for free.

If you already didn't do this with your repository, rest assured that it doesn't really matter, it's just kind of nice.
