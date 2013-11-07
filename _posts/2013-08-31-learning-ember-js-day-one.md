---
layout: post
title: "learning ember.js: day one"
date: 2013-08-31 21:09
comments: false
categories: javascript programming learning ember
---

## the realization

OK I want to learn [ember.js](http://emberjs.com/).

Ember has been in development for years and the 1.0 version is meant to be released this weekend. There have been [eight][] release candidates. They're ready.

[eight]: http://emberjs.com/blog/2013/08/29/ember-1-0-rc8.html

But... *am I?* This release feels like an exciting and right time to dig in. I've looked at it before and it hasn't clicked. But, having just finished my semester at The Flatiron School, I should have time to make it click. And I must keep learning!

## rooting around in the mud

Ember provides a starter kit which demonstrates a basic usage. It's a static HTML page that includes all the necessary JavaScript libraries (jQuery, Handlebars, and Ember) and then an `app.js` file for us to do our work in. It starts off looking like this:


{% highlight javascript %}
App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});
{% endhighlight %}

ember starter kit app.js

When you open `index.html` in your browser, you can see those three colors have shown up in a bulleted list. The relevant part of that file looks like this:

{% highlight html %}
{% raw %}
<script type="text/x-handlebars" data-template-name="index">
  <ul>
  {{#each item in model}}
    <li>{{item}}</li>
  {{/each}}
  </ul>
</script>
{% endraw %}
{% endhighlight %}

template for displaying colors

Cool. I can kinda see how the data shows up here.

## making it mine

I just rewrote that `app.js` as `app.coffee` because I'm that guy:

{% highlight coffeescript %}
App = Ember.Application.create()

App.Router.map ->
  # put your routes here

App.IndexRoute = Ember.Route.extend
  model: ->
    ['red', 'yellow', 'blue', 'green']
{% endhighlight %}

coffeescript rewrite (i added a color too)

And now I'm running `coffee -cw js/app.coffee` [^cw] and it is compiling it for me and the site still displays that nice list. Rails auto-compiles coffeescript for you so this is kind of an extra hassle of a step but that is the life we lead.

[^cw]: the "c" flag means "compile" and the "w" flag means "watch" so together those will watch for new changes and re-compile

## next steps

My next step as always is to google around and open 175 tabs and then feel overwhelmed and drink some tea and relax for a while.

Did I read this: <http://net.tutsplus.com/tutorials/javascript-ajax/getting-into-ember-js-part-2/>? Yes I did and it did not hit that sweet spot.

I closed all my tabs. I want to just play around. I decided to ditch that array of colors and try using slightly richer data. Here's what I came up with:

{% highlight coffeescript %}
App = Ember.Application.create()

App.Router.map ->
  # put your routes here

App.IndexRoute = Ember.Route.extend
  model: ->
    firstName: "Max"
    lastName: "Jacobson"
    posts: 
      [
        title: "Finished School"
        date:  "2013-08-23"
        body: "Wow that was fun!"
      ,
        title: "Starting school"
        date:  "2013-06-03"
        body: "Can't wait to start school!"
      ]
{% endhighlight %}

app.coffee

and

{% highlight html %}
{% raw %}
<script type="text/x-handlebars" data-template-name="index">
  <h2>
    {{model.firstName}} {{model.lastName}}&rsquo;s Blog
  </h2>
  {{#each post in model.posts}}
    <h2>{{post.title}}</h2>
    <p>{{post.date}}</p>
    <p>{{post.body}}</p>
  {{/each}}
  </ul>
</script>
{% endraw %}
{% endhighlight %}

part of index.html

And that takes that data from the CoffeeScript and puts it on the page. Which took a lot of trial and error actually.

Making that and writing this post was like a cup of coffee. My brain is now attenuated to learn it better tomorrow, to receive knowledge, perhaps via a lengthy article or book I'll find and read. More posts to come as I dig deeper.

Here's what I described in this post: <http://codepen.io/maxjacobson/pen/uckIL>

