---
title: using mobile web inspector
date: 2013-01-15 10:50 PM
category: coding
tags:
- jquery
- javascript
- safari
- ios
---

I've just figured out why infinite scrolling wasn't working on Layabout on my iPod Touch.

I'm using jQuery to detect when the user has reached the bottom of the page. There's no hardcoded event for that, so you have to do some math using the methods that are given. It goes something like this:

If the user is scrolling, check if the current window height plus the amount of stuff above it is greater than or equal to the total height of the document. This works on the desktop (in the browsers I tested anyway) and on the iPad, but not on my iPod Touch.

{% highlight javascript %}
$(window).scroll(function() {
  if($(window).scrollTop() + $(window).height() >= $(document).height()) {
    // ...
  }
});
{% endhighlight %}

On the web, a nice and easy way to figure out problems like these is to use the console and log some variables. So I found myself adding in some stuff like this:

{% highlight javascript %}
var scroll_top = $(window).scrollTop();
var window_height = $(window).height();
var document_height = $(document).height();
var current_position = scroll_top + window_height;
console.log("scroll top: " + scroll_top);
console.log("window height: " + window_height);
console.log("current position: " + current_position);
console.log("document height: " + document_height);
{% endhighlight %}

But it's not very easy to access the console on an iOS device, so these messages were getting logged to nowhere.

Long story short I followed [these instructions][] and managed to get access to the info I needed. Here's what the page logged at the bottom of a page:

[these instructions]: http://webdesign.tutsplus.com/tutorials/workflow-tutorials/quick-tip-using-web-inspector-to-debug-mobile-safari/

    scroll top: 41628
    window height: 1360
    current position: 42988
    document height: 43173

Huh! No wonder further pages weren't loading, we were never (by this logic) truly reaching the end of the page!

So, to fix it, I just changed the logic to add 200 pixels of wiggle room, so now it triggers when you get near the bottom of the page rather than hitting it exactly.

So it works and I'm happy. But before we wrap things up too tightly, let's try to figure out what's going on here.

Let's look at some numbers:

| thing                                                            | pixels amount   |
|:-----------------------------------------------------------------|:----------------|
| [5th gen iPod Touch screen height][]                             | 1136            |
| Window height as logged by Mobile Safari (`$(window).height()`)  | 1360            |
| The difference between those two                                 | 224             |

[5th gen iPod Touch screen height]: http://d.pr/i/VZr6

What's the deal with that? Maybe it's a points-and-pixels thing beyond my comprehension, but this feels kinda wrong to me. Is it possibly a bug in Mobile Safari? Why else would the window height be bigger than the total height of the screen? I expected the opposite; the window height should be less than the screen height, considering that the window doesn't include browser chrome like the navigation bar along the bottom and sometimes (at the top of pages) the title and address bar.

Let's revisit the numbers from the earlier log example:

(*Note: other than window height, these values would be different on a longer or shorter page*)

| thing                             | value |
|:----------------------------------|:------|
| scroll top                        | 41628 |
| window height                     | 1360  |
| current position                  | 42988 |
| document height                   | 43173 |
| difference between those last two | 185   |

So if I'm right that Mobile Safari is mis-reporting its height by 224 pixels, how come my earlier logic was falling short by 185 pixels? I think that difference (39 pixels) must be the height of the navigation toolbar?

Maybe!
