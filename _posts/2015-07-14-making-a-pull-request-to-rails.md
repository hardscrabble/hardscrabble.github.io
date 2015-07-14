---
title: making a pull request to rails
date: 2015-07-14 01:47 EDT
---

Today I impulsively made [a pull request to Rails][pull], which feels kind of
like a milestone for me. It's about two years since I started using Rails at
the Flatiron School. It's also been about two years since the method I edited
was last edited. I feel like there may be a reason and it won't get merged, but
who knows? I feel sort of exposed.

[pull]: https://github.com/rails/rails/pull/20872

This post was helpful for me: [Eileen Codes | Getting Your Local Environment
Setup to Contribute to Rails][setup].

[setup]: http://www.eileencodes.com/posts/getting-your-local-environment-setup-to-contribute-to-rails

In order to make a proper contribution, I needed to know that my change didn't
break the existing tests, and so I needed to be able to run the tests.

I also wanted to be able to add tests and confirm that they pass. So I *really*
needed to be able to run the tests.

I had some trouble configuring my local environment, despite the post
explaining it well (...databases...), BUT the post mentions
[rails/rails-dev-box][devbox] which lets you skip a lot of the environment
configuration by using a preconfigured virtual machine, and that turned out to
be a god send of a casual aside for me and I'm writing this post largely to
promote the existence of that project because it's awesome.

[devbox]: https://github.com/rails/rails-dev-box

It uses [vagrant][] which is kind of magical... I had never used it before and
it totally blew my mind. It allowed me to have a tmux session with windows like
I'm used to, with the code open in vim in one tab using all the existing
configuration from my local Mac machine, and then another tab where my code
changes were immediately available for running the tests against in the Linux
virtual machine. It was super seamless and sweet.

[vagrant]: https://www.vagrantup.com/

[Here's a four minute long gif of what it looks like][longgif] -- I'm
refraining from embedding it so you don't need to download a 4mb image if you
don't want to, and so you can open it in a new tab to start at the beginning
easily if you want to.

[longgif]: {{ site.baseurl }}img/2015-07-14-rails.gif

I don't really love my solution and I should probably consider it further, but
I know the tests are passing, including the new one I added. I think being a
little sleep deprived lowered my inhibition tonight.
