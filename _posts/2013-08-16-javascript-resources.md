---
title: javascript resources
date: 2013-08-16 16:18
from: fis-octopress
category: coding
tags:
- javascript
- links
- learning
---

Here are some links to free, online resources I found helpful while learning JavaScript.

Start with some introductory materials. My favorite is [jQuery Fundamentals](http://jqfundamentals.com/). It's an awesome, brief book by Rebecca Murphey. It starts with the fundamentals of JavaScript and then covers the fundamentals of jQuery. It's really awesome. Murphey and some friends used to do a video podcast about jQuery called [yayQuery](http://vimeo.com/yayquery/videos) which is a cute as hell name. I haven't really watched any of those though. Focus on the book/site. Try to follow along in the built-in editor / sandbox environment.

Try to understand everything she covers in that guide because it's all ... fundamental ... haha.

Check out Airbnb's JavaScript style guide on github at [airbnb/javascript](https://github.com/airbnb/javascript). Beyond (interesting) style-related-stuff like how they recommend you indent your code, it's also super instructive for learning the language itself because it covers the conventions they recommend for pretty much every aspect of the language, so if there's something you haven't been exposed to yet, you'll find out and learn about the concept in a way that has been thought about carefully.

I liked this recommendation of theirs:

```javascript
// bad
var sidebar = $('.sidebar');

// good
var $sidebar = $('.sidebar');
```

because, *yeah*, totally, if you're caching a jQuery object why not prefix it with a dollar sign so you remember that's what it is? There's a lot of good stuff like that.

This is a funny video about jQuery: [Paul Irish : 10 Things I Learned from the jQuery Source](http://vimeo.com/12529436). I mean it's insightful too. It's just this guy reading the source code and explaining how jQuery works. It makes you feel like you could just read and understand the source code of any major library or framework.

The next thing to do is try making some static sites with jQuery and maybe put them on [GitHub Pages](https://help.github.com/articles/what-are-github-pages). Just create a repo and do your work on a branch called `gh-pages`. You can just delete your master branch. When you're ready to show off your work you can push it to GitHub and people can look at the actual site as well as the source code. It's really cool, [this](https://github.com/maxjacobson/js_calc) becomes [this](http://maxjacobson.github.io/js_calc/) just because of the branch name. Btw the location of the page is always `http://YOUR_GITHUB_USERNAME.github.io/REPO_NAME`.

Some things to make:

* a calculator
* a todo list
* a page that pulls in JSON data from some API and renders it on a page. maybe make a page where you can enter a github handle and it will fetch the JSON at, eg, `https://github.com/maxjacobson.json` and print some of the data to the page. Or any other API. Maybe one from a web app you made.

Maybe also install node. Just `brew install node` and then you have node. Now you can run JavaScript programs from your command line with just like `node whatever.js`. They don't even have to be web apps. Just little programs! Maybe [Project Euler problems](http://projecteuler.net/problems). Definitely solve some of those problems. Do as many as you can. I should do more of those. Damn. Just write some out in JavaScript. Use `console.log` wherever you would use `puts` in Ruby.

By this point in the blog post you should feel like you're pretty good at JavaScript. I feel like you are. Maybe take Rebecca Murphey's [JS Assessment](https://github.com/rmurphey/js-assessment) which is kind of like a less meditative version of Ruby Koans used in job interviews to assess your level of JavaScript knowledge. I found this super hard and educational. I got less than halfway through. I want to revisit this.

Take a detour into [CoffeeScript](http://coffeescript.org/) with me. The main reason I like JavaScript is CoffeeScript. I like it a lot. Install it with `sudo npm install -g coffee-script` (npm is "node package manager" and it's a lot like RubyGems. The main difference is that by default, without the `-g` flag, it doesn't install globally on your computer, it installs into the current directory in a subdirectory called "node_modules"). If the syntax appeals to you, try rewriting an earlier project or program from JavaScript to CoffeeScript. You can run it with `coffee whatever.coffee` or compile it into JavaScript by running `coffee -c whatever.coffee` which will create `whatever.js` for you.

CoffeeScript is kind of confusing at first but I really like it. It's like, why use this. It took me a while to figure out how to use CoffeeScript with jQuery but it's actually super simple, here's a basic example:

```coffee
$(document).ready ->
  $("#shout").on "click", ->
    alert "YO WHAT UP"
```

Which could be written even more compactly as:

```coffee
$ -> $("#shout").on "click", -> alert "YO WHAT UP"
```

Which is kind of ridiculous and unreadable but cool that [it's valid](http://codepen.io/maxjacobson/pen/oisJp)?

I guess all that's left is to keep going and start learning how to build complicated software in this cool language. I want to learn a JS framework next and can't figure out where to start. But that... is a tale for another blog post.
