---
title: "useful tool: storm"
date: 2015-01-01 20:37
---

I've been sort of passively looking out for something like this for a while.
Here's the problem: there are a lot of remote servers I may want to SSH into at
any given time, and I am not going to remember all of their usernames or IP
addresses. Not gonna happen.

I've been dealing with this by creating custom aliases. So I put something like
this in my `~/.bash_profile`:

{% highlight bash %}
alias 'eug'='ssh pair@some.ip.address'
{% endhighlight %}

Then, whenever I want to connect to Eugene's server so we can pair program, I
just type `eug` and hit enter, and I'm there. Not bad! It even tab-completes.

Not great either. It's hard to keep track of them. I can type `alias` at any
time to list all of the defined aliases, and that's pretty sweet, but it
includes several things, not just ssh aliases. I've kind of wanted a tool that
was more tailored to this job.

Sooo, enter storm. I found it [via one thing well][], a sweet blog for nerdy
stuff like this.

[storm]: https://github.com/emre/storm
[via one thing well]: http://onethingwell.org/post/84512968138/storm

Storm lets you define aliases to remote servers like this:

{% highlight bash %}
storm add eug pair@some.ip.address
{% endhighlight %}

Once you do that, you just type `ssh eug` to connect. It has some other helpful
subcommands like `storm list` to tell you all of your aliases even `storm web`
to spin up a nice local web server to provide a web interface for managing your
aliases...

Hey, wait a second. Somehow it's hooking into the normal main `ssh` command!

After some poking around, I found that it's saving the information in
`~/.ssh/config` as a plain text configuration file that looks like this:

{% highlight text %}
Host eug
    hostname some.ip.address
    user pair
    port 22
{% endhighlight %}

And that I could've been using a similarly-structured file all along, and didn't
really need storm at all!

Hot dog.

Well, I'm going to use it anyway because it has a sweet interface and I'm kind
of just grateful to have learned something from it? I'm guilt-tripping myself
into using it.
