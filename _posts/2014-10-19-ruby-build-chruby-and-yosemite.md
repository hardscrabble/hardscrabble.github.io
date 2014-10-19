---
title: ruby-build, chruby, and yosemite
layout: post
date: 2014-10-19 12:05

---

A few months ago I stopped using [rvm](http://rvm.io/) to install and manage my ruby installations on my computers. I don't have a great reason, other than reading that [Steve Klabnik uses something else](http://blog.steveklabnik.com/posts/2012-12-13-getting-started-with-chruby) and I felt like trying it one day.

What I use now:

## [ruby-build](https://github.com/sstephenson/ruby-build)

This is how I install rubies:

* `brew install ruby-build` -- get ruby-build
* `mkdir ~/.rubies` -- this is where rubies and gems will go
* `ruby-build --definitions` -- shows you a list of all the available rubies. When new ones come out, you should be able to just `brew update` and `brew upgrade ruby-build` to get access to those new definitions
* `ruby-build 2.1.3 ~/.rubies/2.1.3` -- first argument is the name of the definition from the previous step, and the second argument is where to install all the code
* watch it install

## [chruby](https://github.com/postmodern/chruby)

This is how I switch between versions of ruby.

### setup

The instructions [in the readme](https://github.com/postmodern/chruby#install) are good. The gist is that you install a script and then `source` it from your `~/.bashrc` so it will be included in your shell sessions. This exposes a `chruby` bash function, which you can thereafter reference from the shell to switch between rubies (eg `chruby 2.1.2`) or even later in your `~/.bashrc`, to choose a ruby immediately upon starting a shell session. This will look in the `~/.rubies` folder by default, which is why I install my rubies there.

## Yosemite...

So this all stopped working on my laptop yesterday when I upgraded to Mac OS X 10.10 (Yosemite). I couldn't run `bundle install` without getting [a nasty error](http://stackoverflow.com/questions/25492787/ruby-bundle-symbol-not-found-sslv2-client-method-loaderror), and I became convinced that I needed to rebuild all of my rubies. So I thought "OK, I know how to do that" and ran `rm -rf ~/.rubies` and set about following those steps under "ruby-build" above.

It didn't work, so I went to sleep.

Long story short, this fix worked: <https://github.com/sstephenson/rbenv/issues/610#issuecomment-58804829>

Where before you would have run `ruby-build 2.1.3 ~/.rubies/2.1.3`, now (until ruby-build makes a fix) you can run `CC=clang ruby-build 2.1.3 ~/.rubies/2.1.3`.

I don't know if rvm had this problem. I wouldn't be surprised if they did, and it was fixed quickly. But like. It's kind of cool to use smaller tools sometimes.

