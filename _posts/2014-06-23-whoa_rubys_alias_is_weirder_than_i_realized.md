---
title: whoa, ruby's alias is weirder than I realized
date: 2014-06-23 08:01

---

Just saw some ruby code using the `alias` method, and did a quick and routine google to find some examples of how it works, especially as compared to the `alias_method` method.

[This blog post](http://andreacfm.com/2012/11/29/ruby-alias-vs-alias-method/) and some others recommend to use `alias_method` over `alias` and I'm going to agree, but for different reason: calling `alias` looks weird to me.

This looks perfectly normal to me:

{% highlight ruby %}
class Whatever
  def whatever
    "whatever"
  end

  alias_method :something, :whatever
end

Whatever.new.whatever #=> "whatever"
Whatever.new.something #=> "whatever"
{% endhighlight %}

`alias_method` is a method that takes two arguments and they're separated by commas. Under the hood I don't know what it's doing but that's never stopped me from calling a method, and I know how to call a method.

This looks goofy to me:

{% highlight ruby %}
class Whatever
  def whatever
    "whatever"
  end
  alias :something :whatever
end
Whatever.new.whatever #=> "whatever"
Whatever.new.something #=> "whatever"
{% endhighlight %}

What even is that? It looks like we're calling a method, but the arguments aren't comma-separated... it feels weird.

I guess this probably isn't a great reason to prefer one programming technique over another, but for me it's harder to understand and therefore remember, and what I really like about Ruby is that it's simple -- almost everything is an object or a method, which follow some set of learnable rules.

`alias_method` is a method; `alias` is a [keyword][], like `def` or `class` and it can be even syntactically weirder:

[keyword]: http://ruby-doc.org/docs/keywords/1.9/files/keywords_rb.html#M000007

{% highlight ruby %}
class LowfatKefir
  def probiotic?
    true
  end
  alias tasty? probiotic?
end
LowfatKefir.new.tasty? #=> true
{% endhighlight %}

Not only do you not need to comma-separate the "arguments" to `alias`, but they don't have to be symbols either which feels like another violation of my understanding of how this language works, which is that we use symbols when we want to reference methods without invoking them, because referencing the method always invokes it.
