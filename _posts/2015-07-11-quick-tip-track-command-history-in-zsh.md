---
title: "Quick tip: track command history in zsh"
date: 2015-07-11 18:29 EDT
---

I switched from bash to zsh a few months ago and it's been mostly sweet. I
noticed that it wasn't tracking my command history, so I did a little googling
and got it working by adding these commands to my `~/.zshrc`:

{% highlight text %}
export HISTFILE=~/.zsh_history
export SAVEHIST=1000
{% endhighlight %}

I picked 1000 kind of randomly; a bigger number would probably be fine or nice.

