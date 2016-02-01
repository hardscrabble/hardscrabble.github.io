---
title: reading Human JavaScript as a Rails developer who writes SOME CoffeeScript
date: 2014-07-08 23:07
---

I'm reading [Human JavaScript][] for free online, right now, and I'm going to take some notes. Yes, this is one of those blog posts that no one reads, but is helpful for the author to write. I'm sorry.

[Human JavaScript]: http://read.humanjavascript.com/

### Why am I reading this book?

I sorely want to get better at JavaScript. I feel like I know the language pretty well and I know jQuery pretty well but that's it but I don't know any of the JavaScript application frameworks and I feel like I should.

Being a Ruby on Rails developer writing CoffeeScript that gets packaged up by the asset pipeline into one big file feels kind of like being on a sidewalk looking thru a trendy restaurant window at couples on Valentine's Day. I'm feeling that pang of leftouttedness specifically for the sheer organization that applications written for Node.js or Ember.js seem to have access to. It seems like they're living in the future with their small modules or whatever I don't even know.

I've made a plan. I'm going to learn Backbone.js and then maybe Ember.js. Hopefully I'll be able to bring some of what I learn to my Rails work.

After bookmarking several other possible resources I saw this blog post via twitter: [No more rockstars -- The business case for writing JavaScript as a team](https://blog.andyet.com/2014/06/09/no-more-rockstars). It tells a really amazing story about a product which was developed by one person and then needed to be rewritten as a team, who really struggled because the code was really complicated and only one person understood it. So they told him he wasn't allowed to work on it anymore, but he could help everyone else. It's like a feel good movie, right? It's like School of Rock. Jack Black is surrounded by these talented kids and he brings out the best of them and learns the value of teaching and his ego is sublimated and flowers bloom, or in this case, Human JavaScript bloomed.

Reading that post made me feel like I was in good hands and I could learn from these people. Feeling like I'm in good hands is really essential for me to learn anything.

### Things I learned from [the introduction](http://read.humanjavascript.com/ch01-introduction.html):

* Web apps are apps
* The browser is an operating system
* It's lame to make your user refresh to see new stuff
* There is a "trap of tightly coupling your application to [a] particular client" which I didn't even know I was in but totally am
* Ideally, I'd be able to jump into a JavaScript app and be able to contribute, because I know JavaScript pretty well[^worry]; but I totally don't feel like I can do that because I don't know any frameworks. I'm glad that the book acknowledges this should be a goal

[^worry]: I worry that I'll be humbled by these statements as I continue down this path. I'm already pretty embarrassed by my two posts about learning ember ([one](http://www.hardscrabble.net/2013/learning-ember-js-day-one/), [two](http://www.hardscrabble.net/2013/learning-ember-day-two/)) which led nowhere, and this has the potential to be much the same.

This criterium is interesting to me:

> It should be flexible enough to really be able to build anything you want without sending a bunch of unused code to the browser.

This is one of my discomforts with the Rails asset pipeline approach to front end code; everything goes, every time, and runs on every page even if it's not needed, and sometimes even when it's not needed, causing bugs.


### Things I learned from [chapter 2: The Big Decision](http://read.humanjavascript.com/ch02-the-big-decision.html):

OK so maybe I was wrong that I might be able to bring this back to my Rails work. This page has an amazing code sample, which shows how minimalist a server's HTML response can be when the client is responsibile for rendering the entire UI. I'm pretty intimidated now because this is so different from what I'm used to.

But I'm convinced that this is a powerful way of thinking about application design because it feels tidy, which I value very much.

I've used and been very impressed by [Talky.io](http://talky.io), &Yet's video conferencing web app, and I can only assume it's built in a similar way, so I went and viewed source.... and YEP it's pretty goofy. There's no `<body>` tag.[^source]

[^source]: Make sure to "View Source" and not "Inspect Element". Viewing source shows you the HTML returned by the server, inspecting element shows you the current state of the document which *does* have a body, and was rendered by the client-side JavaScript.

### Things I learned from [chapter 3: Code For Humans](http://read.humanjavascript.com/ch03-code-for-humans.html):

I should probably be using a linter[^linter]. It looks like [even CoffeeScript](http://www.coffeelint.org/) has linters. I don't think I like the idea of having it as a pre-commit hook. Maybe. I kind of think it should be part of a test suite -- maybe all of your unit tests pass, but your build fails because you left a `debugger` in a coffee file.

[^linter]: A code-analyzing tool that warns you about code mistakes or poor style

I'm glad that Joreteg (the author of the book I'm annotating, whose name I've somehow neglected to mention so far) gives a plug for [Airbnb's JavaScript style guide](https://github.com/airbnb/javascript) as it's a helpful reference I've stumbled on in the past and [endorsed in these pages](http://www.hardscrabble.net/2013/javascript-resources/). I should probably re-read that.

### Things I learned from [chapter 4: Organizing Your Code](http://read.humanjavascript.com/ch04-organizing-your-code.html):

This passage is a helpful summary of everything that's to come:

> Essentially, you'll populate a set of models and collections of these models in memory in the browser. These will store all the application state for your app. These models should be completely oblivious to how they're used; they merely store state and broadcast their changes. Then you will have views that listen for changes in the models and update the DOM. This core principle of separating your views and your application state is vital when building large apps.

Here's what I do now with Rails apps: If I have a thing, or a set of things, which I want to show to someone, I render what they look like *right now* and give that to the browser; the browser doesn't have a model of that thing or set of things, it has the representation of that thing. I may update the representation of that thing, but I have to find it with a jQuery CSS selector, and remember that changing the HTML structure of a page can break that selector.

This chapter also goes into more detail about modules, and using a tool called [browserify](https://github.com/substack/node-browserify) to allow use of this module system outside of Node.js, where it's a native feature, and bringing all that to the browser. I find this pretty appealing because I've written JS code that does really mundane things when I could have instead imported some module. I've searched [browserify rails](https://www.google.com/search?q=browserify-rails) and found a bunch of results and I want to make a priority of exploring this.

### Things I learned from [chapter 5: Eventification](http://read.humanjavascript.com/ch05-eventification.html)

This chapter introduces some advanced JavaScript code (I think it's the first time `prototype` is brought up). I don't understand everything that happens in this first example, but the event part makes sense, and events are the focus of this chapter so I'm going to focus on that.

The first part being confusing enables the simplicity of the second part.

### Things I learned from [chapter 6: Models](http://read.humanjavascript.com/ch06-models.html)

This chapter gives some code examples that don't look too far off of the kind of jQuery code I write. And:

> If you continue this same approach, you're in deep doo doo

Lol great

The previous chapter recommended writing your own event emitter to see how simple it is. This chapter doesn't say to write your own model code but I want to try writing some JavaScript instead of just taking notes, so I'm doing kind of a combo of both:

```javascript
var object = {
  attributes: {},
  callbacks: {},
  get: function(attr) {
    return this.attributes[attr];
  },
  set: function(attr, value) {
    this.attributes[attr] = value;
    this.emit("changed:"+attr);
  },
  on: function(eventName, callback) {
    if(!this.callbacks[eventName]) {
      this.callbacks[eventName] = [];
    }
    this.callbacks[eventName].push(callback);
  },
  emit: function(eventName) {
    var _this = this;
    if(this.callbacks[eventName]) {
      this.callbacks[eventName].forEach(function(callback) {
        callback.apply(_this);
      });
    }
  }
};

object.set("name", "Max Jacobson");
object.set("age", 25);

object.on("changed:name", function() {
  console.log("My new name is: "+this.get("name"));
});

object.set("name", "MJ");
object.set("name", "Maxwell");
```

Here's how I'd write the same in CoffeeScript:

```coffee
object =
  attributes: {}
  callbacks: {}
  get: (attr) ->
    @attributes[attr]
  set: (attr, value) ->
    @attributes[attr] = value
    @emit "changed:#{attr}"
  on: (eventName, callback) ->
    @callbacks[eventName] ?= []
    @callbacks[eventName].push callback
  emit: (eventName) ->
    if @callbacks[eventName]?
      @callbacks[eventName].forEach (callback) =>
        callback.apply @

object.set "name", "Max Jacobson"
object.set "age", 25

object.on "changed:name", ->
  console.log "My new name is: #{ @get("name") }"

object.set "name", "MJ"
object.set "name", "Maxwell"
```

I still like CoffeeScript but I'm going to try to use it less. Actually that last line of the `emit` method looks *weird* with the `@` like that. I actually ran both of these thru JSHint and CoffeeLint respectively and it helped me catch some missing semicolons :+1:.

Joreteg takes a moment to discuss the separation of responsibilities between the server and the client with regard to the data you're persisting on the server. I'm not sure the knot is untied completely. The example given is a delete button. Not every user has permission to delete, so we may show or hide the button based on who is logged in. But because the DOM is malleable, you have to assume that any user can see that button if they really want to, for example by inspecting element with their browser dev tools and changing properties of existing buttons. So it really *can't* be the client's job to secure that, it has to be the server's job. But I guess it goes beyond that, and it actually shouldn't be the responsibility of the client.

This chapter is really long.

I mentioned above that I feel like I pretty much know JavaScript but honestly that's not that accurate at all. What was I thinking? What I meant is that I know the syntax pretty well. But truth be told I probably only know the syntax pretty well of old-ass JavaScript, not all this new stuff. For example, he's going into an EcmaScript 5 feature, that objects have `get` and `set` operators. I never saw that before. And they're up to EcmaScript 6 now, right?

A lot of the stuff in this chapter seems kind of magical, and I kind of like that JavaScript doesn't normally seem magical. Actually, that's not true: a lot of my interactions with jQuery seem magical to me. Like, the way it's possible to chain several jQuery methods and it keeps returning the thing so you can keep operating on it. The object feels like more than `{}` with a bunch of properties, it feels like it really *models* a thing, in that case an element or group of elements on a web page. The models that Joreteg describes here seem like they could genuinely model something like a "user", because you're not just setting and getting properties. Or rather, you are, but it's *reacting* and *behaving* based on that stuff. It's not a dumb box you put things in.

### Things I learned from [chapter 7: Views](http://read.humanjavascript.com/ch07-views.html)

I'm vaguely aware that what Rails calls a "View" isn't necessarily what everyone else calls a view, and I'm ready to confront that now. I can see that the following chapter is about "templates", and I think that what I think of as views (erb or haml files, which describe a chunk of HTML with dynamically evaluated bits of code interpolated in them) are actually templates. So what's a view?

I groused above about my discomfort with sending all of the JavaScript to the browser on every request and then running it on every request. Shortly after writing that, I realized Human JavaScript hadn't promised anything about sending excess code. But now I can see that it does, in this chapter. talk about *running* excess code. On top of that, it's not as bad that it sends the entire application because it will only send it one time, on initial load, and then the user's interactions with the application won't need to request the application again, because it's a "single page application" and only requests exactly what it needs.

So before I continue reading and learn about the Human JavaScript solution to the problem of running excess code, I want to jot down an example of what I'm talking about. Let's say our homepage has this HTML:

(Writing pure HTML without HAML or Rails' help was surprisingly difficult just then and I'm not sure this is correct, but I'm on a train so I can't really look things up right now.

```html
<!-- index.html -->
<h1>Subscribe to our mailing list</h1>
<form action="/subscribe" method="POST" id="subscribe">
  <input id="email" type="text" placeholder="youremail@example.com" />
  <input type="submit" />
</form>
```

We want to validate that the user input looks like an email address so we write a little jQuery:

```coffee
# home.js.coffee
$(document).on 'ready', ->
  $('form#subscribe').on 'submit', (event) ->
    if not $(this).find('#email').val().match /\w+\@\w+\.\w+/
      event.preventDefault()
      alert "According to my terrible regular expression, that is not a valid email!"
      false
```

This code has two event handlers in it -- the first will run when the document is ready, on every page this is included on. It attaches the second event handler to a form with id "subscribe" -- or it tries to. Maybe it doesn't find one, in which case I guess it does nothing. It doesn't throw an exception if it doesn't find the form, it just quietly continues through the code. Let's say you have a mature Rails app with dozens of files like these. On every page load, it's looking for a bunch of stuff that may or may not exist. Browsers are pretty fast, so it's kind of OK, but it's a ton of work that isn't necessary. It's also a potential source of bugs, because what if there's a form with id of 'subscribe' on multiple pages which are totally different? Now you can't submit that one either?

What are your alternatives?

### add some conditions to each file, for example:

```coffee
# home.js.coffee
$ ->
  if $('form#subscribe').length
    # all of your code that should only run on a page which has this form, potentially a lot of code
```

So the code is still evaluated, but if there is a lot of code, you can minimize the excess work.

### `javascript_include_tag`

Instead of having one massive manifest file in `application.js`, which packages all of our JavaScripts into one big file on every page, include the JavaScripts in the view that it's relevant to.

```haml
/ form.html.haml
%h1 Subscribe to our mailing list
%form{:action => '/subscribe', :method => 'POST'}#subscribe
  %input{:type => 'text', :placeholder => 'youremail@example.com'}#email
  %input{:type => 'submit'}
= javascript_include_tag 'home'
```

This last approach has some pros and cons. Including that script tag on just the relevant page means that it will only run on that page, but it also means that page will ned to request two different JavaScript assets, instead of the one big one it probably already has cached.

The approach that I *think* Joreteg is espousing is sending all of your JavaScript in one big file, but somehow only attaching the form's event handler on this page anyway, by being kind of clever somehow. OK now I'm going to read on.

Unfortunately this chapter assumes a lot of knowledge of Backbone views and their limitations. I'm a little lost. Earlier he recommended reading the Backbone documentation for a great introduction to Backbone, and I didn't. I think I need to go read at least the sectino on views before I proceed with this chapter.

OK so the view is the object that orchestrates what the user sees. It binds model attributes to the page elements and renders templates. It can be responsible for just one instance of a model, or a whole collection. If there's one view object for one instance of a model, you can take advantage of the events we covered earlier, and wait for that thing to emit a "change" event and re-render that part of the page or do whatever you want.

### Things I learned from [chapter 8: Templating](http://read.humanjavascript.com/ch08-templating.html)

This is a brief chapter discussing 'templatizer', a library created by the author. It sounds pretty clever. It enables you to use the 'jade' templating language (reminds me of haml in its minimalism, and is actually much more minimalist) without your client needing to know anything about jade. It converts your templates to functions which can be called in the browser.

I cloned [his sample app](https://github.com/HenrikJoreteg/humanjs-sample-app) and started it, and clicked around. The server log did something interesting:

```
[hardscrabble] [humanjs-sample-app] [master branch]
⇥ npm start

> ampersand-sample@0.0.0 start /Users/maxjacobson/src/humanjs-sample-app
> node server.js

dev environment detected
Ampersand Sample is running at: http://localhost:3000 Yep. That's pretty awesome.
Setting up watch
COMPILING
Started livereload on 35729
Watching /Users/maxjacobson/src/humanjs-sample-app/public/css/**/*.styl
```

And then...

```
[hardscrabble] [humanjs-sample-app] [master branch]
⇥ git status
On branch master
Your branch is up-to-date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   client/templates.js
```

What? I didn't modify `client/templates.js`! Just running the app and clicking around regenerates this file, which I guess gets committed and deployed. I'm not even sure what changed. Maybe when I installed the dependencies, I got a newer version of the "templatizer" tool, which compiles the file in a slightly different way.

### Things I learned from [chapter 9: clientside routing](http://read.humanjavascript.com/ch09-clientside-routing.html):

No matter what URL you request, the server does the same thing. Then the browser takes over. Kinda makes sense!

I always forget how fast browsers are. I feel like there should be some kind of flicker as the browser puts together the page you requested. Maybe it just doesn't show anything until it's ready to show everything, so it's not much different.

### Things I learned from [chapter 10: launch sequence](http://read.humanjavascript.com/ch10-launch-sequence.html):

So I guess Backbone isn't that different from Rails. You define your routes and pair them with actions (well, functions) to run, and those actions fetch some data and render a view. The main difference is that it happens on the client side. And, it seems, that organizing it all has fewer conventions? But this book provides some suggestions.

### Things I learned from [chapter 11: testing and QA](http://read.humanjavascript.com/ch11-testing-and-QA.html):

I'm glad this chapter acknowledges that it's hard to test JavaScript code and I really like the solution they've come up with, which leans a bit toward human-operated QA without entirely giving up the dream of automatic testing.

### Things I learned from [chapter 12: settings and configs](http://read.humanjavascript.com/ch12-settings-and-configs.html):

Rails has a solution for dealing with potentially-sensitive configuration files, and I'm not too surprised to see a similar one here.

### Things I learned from [chapter 13: caveats](http://read.humanjavascript.com/ch13-caveats.html):

There are commom mistakes that people make when starting with JavaScript and Backbone. I think these explanations make sense but when I actually try building some with Backbone, I look forward to making these exact mistakes anyway :smile:.

Also that I'm kind of breezing thru these last few chapters because I see the end is in sight and I'm excited to try making something.

### Things I learned from [chapter 14: conclusion](http://read.humanjavascript.com/ch14-conclusion.html):

I like that this book was short and sweet.

I like that he asked for feedback, because [I already gave some](https://twitter.com/maxjacobson/status/485427898472759297).

I don't feel totally prepared to build a front end app but I have a TON more context now. I think I know the next steps for me, which is to read the backbone docs and make something, coming back to reference this when I feel lost.

Maybe I'll make a website for my rubygem [film snob](https://github.com/maxjacobson/film_snob/)[^snob]. I think I'll stick with Ruby for the server, for now, but I'll try to keep it REALLY minimal. I made [this](https://gist.github.com/maxjacobson/9244b99019d4fad3832f) single file sinatra application to demo film snob to my sister, but maybe I'll redo it as a backbone app and put it on Heroku and link it from the README? Sounds like a plan :+1:.

[^snob]: Which I really need to write about because it's been a thrill and a hoot to make, largely because some randos helped contribute to it.
