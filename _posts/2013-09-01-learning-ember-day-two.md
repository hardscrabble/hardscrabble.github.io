---
layout: post
title: "learning ember.js: day two"
date: 2013-09-01 23:59
comments: false
category: programming
tags:
- javascript
- learning
- ember
---

<blockquote class="twitter-tweet"><p>Ok I’m going to try <a href="https://twitter.com/steveklabnik">@steveklabnik</a></p>&mdash; Max Jacobson (@maxjacobson) <a href="https://twitter.com/maxjacobson/statuses/374223697340796928">September 1, 2013</a></blockquote>

OK. Back to work.

[Yesterday][] I stretched out my head and fell asleep. I was glad to see that while I was sleeping, the team made good and [released Ember 1.0][]

[Yesterday]: http://maxjacobson.github.io/blog/2013/learning-ember-js-day-one/
[released Ember 1.0]: http://emberjs.com/blog/2013/08/31/ember-1-0-released.html

I made some small progress since then.

At [Mendel's][] recommendation I changed the first line of my CoffeeScript program from:

{% highlight coffeescript %}
App = Ember.Application.create()
{% endhighlight %}

to

{% highlight coffeescript %}
window.App = Ember.Application.create()
{% endhighlight %}

[Mendel's]: http://mendelk.github.io/

which insists on `App` being a global variable, and avoids CoffeeScript's usually helpful behavior of prepending all variable declarations with `var`.

I added some additional routes. I decided I'm making a homepage/blog thing. Very much inspired by / half-following-along the 30 minute video blitz of an introduction Tom Dale gives on <http://emberjs.com/guides/>.

So now there is an about page and a posts page, and also an individual page for each post. The posts data is still hardcoded into the CoffeeScript, not fetched from some external API. That will come later.

It's cool to see the ways this is different from and similar to rails. It feels weird to have so few files. I'm sure there's a way to separate your code into many files but it isn't introduced in that video.

Here's another example, straight from the video, that surprised me. This is in my route for an individual blog post. It's like a `post#show` action in rails:

{% highlight coffeescript %}
App.PostRoute = Ember.Route.extend
  model: (params) ->
    posts.findBy 'id', params.post_id
{% endhighlight %}

This was working in the video but wasn't working for me. I logged the params object and saw that the post_id attribute, which is set by the URL (eg when visiting `/posts/3`, the params object would look like `{post_id: "3"}`), was showing up as a string, not a number. So I tried this:

{% highlight coffeescript %}
App.PostRoute = Ember.Route.extend
  model: (params) ->
    posts.findBy 'id', parseInt(params.post_id)
{% endhighlight %}


which totally worked.

Rails has a very similar pattern but its find method anticipates looking up records based on ids from params hashes, and doesn't care if the id is a string or integer.

Anyway I have barely scratched the surface of Ember so please forgive me if I'm missing something. Goodnight!

My progress as of today is here: [demo](http://maxjacobson.github.io/js_ember_day_two/) / [source](https://github.com/maxjacobson/js_ember_day_two)
