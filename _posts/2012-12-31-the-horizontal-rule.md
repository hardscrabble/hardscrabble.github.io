---
title: the horizontal rule
date: 2012-12-31 4:29 AM
category: the internet
tags:
- youre doing it wrong
- css
- html
- blogs
- instapaper
---

On a sexier and perhaps better blog, this post title would be a euphemism.

Instead, this post is a bit of a follow up to [an earlier post][], so this second entry might as well mark the beginning of a series.

[an earlier post]: http://www.maxjacobson.net/2012-03-21-indenting-paragraphs-online

***It's time for [You're doing it wrong][]!***, the yearly column where I criticize people's blog's CSS even though I'm not an authority on that subject![^1]

[^1]: I'm inspired in part by the dear, departed podcast [Hypercritical](http://5by5.tv/hypercritical), which good-naturedly criticized all kinds of stuff with the hopes that things might improve. I miss that show! [This drawing](http://davidgalletly.com/blog/2012/11/21/hypercritical-ends.html) is sweet as hell.

[You're doing it wrong]: http://www.maxjacobson.net/tag/youre-doing-it-wrong

Let's talk about lines.

There aren't that many HTML tags, and markdown only supports the small subset that are relevant to writers, so it makes sense to make use of them.

Here's how you make a horizontal rule in markdown: `* * *`[^2]. This becomes the following HTML:

```html
<hr>
```

[^2]: or `- - -` or `***` etc

Which typically comes across as a horizontal line, depending on the CSS, and typically is meant to mark a new section. On this blog, in a browser, at this time of writing, it looks like two thin lines on top of one another. The CSS I used for that looks like this:

```css
hr {
  padding: 0;
  border: none;
  border-top: medium double #333;
}
```

**Edit:** Actually, I've already changed it. The horizontal rules outside of the post body are still that, but the ones within post bodies are now stars as described below.

CSS is really flexible. You can even style an hr as an image. The blog post that I'm constantly googling for is [this one][] by Marek Prokop which gives a great introduction to the different ways you can style hrs. Heres [another](http://css-tricks.com/examples/hrs/), from which I more or less cribbed their last example.

[this one]: http://www.sovavsiti.cz/css/hr.html

Considering how good hrs are, I don't understand why bloggers like [Shawn Blanc][] and [Stephen Hackett][] (whom I generally like), don't use them.

[Shawn Blanc]: http://shawnblanc.net/2012/12/inbox-intentions/
[Stephen Hackett]: http://512pixels.net/2012/12/learning-curve/

They get the appeal of a nice separating line but instead of using an hr, which is easy to make with markdown, which I think they both use, they do this:

```html
<div align="center">* * *</div>
```

or:

```html
<p style="text-align:center">* * *</p>
```

Both commit the cardinal sin of embedding CSS in the middle of an HTML tag. You're not supposed to do that! Even if you don't want to use an hr, the correct move would be to [separate content and presentation][] by assigning a class and then selecting that class with the CSS, like so:

The HTML:

```html
<div class="separator">* * *</div>
```

The CSS:

```css
.separator {
  align: center;
}
```

[separate content and presentation]: http://en.wikipedia.org/wiki/Separation_of_presentation_and_content

I *assume* they do it this way with the hope that it will be more portable. These days, people often read blog posts in their RSS reader or read later app, far out of reach of their blog's CSS. In these contexts, the post is subject to the reader app's CSS, and a div with a class will be treated as unstyled text, but a div with inline CSS might still be styled.

Sometimes.

If I'm reading a post outside of a browser, it's probably in Reeder or Instapaper (links unnecessary, right?). In Reeder, the rat tactic works and the stars are centered and more or less convey what the authors want them to. In Instapaper, the CSS is totally overridden and [it's just a couple of asterisks][]. Same for Safari Reader, Readability, probably others.

[it's just a couple of asterisks]: http://d.pr/i/yP1Y

Had they used an hr, each individual reader would style it as they see fit, but they would understand what it is and work to convey your meaning.

Besides, it's not that [semantic][] is it?

Blanc's p tag is most egregious in this regard, because p means *paragraph*, which this is not. It may have been chosen because the blog's CSS properties for paragraphs *also* applied to separators, but that does not make this a paragraph.

[semantic]: http://stackoverflow.com/questions/1294493/what-does-semantically-correct-mean

### styling the hr with an image

Here's the rub: as flexible as CSS is, I have no idea how to style an hr so that it looks the way these guys seem to want it to look without embedding a small image at every hr, which introduces its own set of problems.

* According to [Prokop][], an image hr has visual bugs in IE and Opera, so he resorts to a bit of a hack, namely wrapping the hr in a div with some additional rules, which is a bit of a nonstarter for markdown users -- we need something that automatically expands from `* * *` and looks right.
* I've tried this in the past and it looked kind of lo-res and not great on a retina display

[Prokop]: http://www.sovavsiti.cz/css/hr.html

I think these problems are surmountable by:

1. just ignoring those browsers
2. researching hi-res images and how to do it right (on my to do list)

So what would that look like?

The HTML:

```html
<hr>
```

The CSS:

```css
hr {
  height: 13px;
  background: url(hr.png) no-repeat scroll center;
  border: 0;
}
```

The image could be anything but [here's one][] I just whipped up in pixelmator with a transparent background to play nice with various sites. Keep in mind: the height property corresponds to the image's height, so if you use a different image, adjust accordingly.

[here's one]: http://d.pr/i/AoSz

### Edit: styling the hr with pseudo-elements

**Edit 2:** I love writing posts like this because I end up learning a lot. I especially love realizing how little I understood it at the beginning. I've removed the image-based-stars and replaced them with something different, something better.

Now no images are required at all! I realized while loading the dishes that I had cited an example earlier that used the `:after` pseudo-element to insert a glyph into an hr, so why couldn't we do the same with Hackett and Blanc's beloved asterisks? We can! It looks like this:

The HTML:

```html
<hr>
```

The CSS:

```css
hr {
  padding: 0;
  margin: 0;
  border: none;
  text-align: center;
  color: black;
}
hr:after {
  content: "* * *";
  position: relative;
  top: -0.5em;
}
```

This is a thinly-modified take on Harry Robert's Glyph style from that [earlier link (example eight)](http://css-tricks.com/examples/hrs/).

Isn't that great! You can use a standard markdown (or HTML or anything) hr to make some centered asterisks show up automatically.

Of course I wanted to experiment and try inserting some other characters in there. This is my first experience with the `:after` CSS rule and unsurprisingly it's a can of worms. I attempted to replace `content: "* * *";` with `content: "✿";`, pasting the unicode black florette character directly into the CSS, and there were bonkers errors. The sass compiler just freaked out and killed the whole stylesheet. So, looking at [this terriffic HTML entity reference](http://www.danshort.com/HTMLentities/index.php?w=dingb), I went for the familiar-looking code decimal correspondent, `&#10047;`, wearing those comfy ampersand-semicolon mittens (etsy, get on that). That totally didn't work either so I ignored the third column and went googling. I came upon [this great stack overflow answer](http://stackoverflow.com/a/8595802) which set me straight.

Now my CSS looks like this (and I promise to walk away and stop changing it for a day or two):

```css
hr {
  padding: 0;
  margin: 0;
  border: none;
  text-align: center;
  color: black;
}
hr:after {
  content: "\273F\a0 \273F\a0 \273F";
  position: relative;
  top: -0.5em;
}
```

If you're like me you're like the fuck is that.

That's the third column I ignored, hex code! `\273F` corresponds to that black florette and `\a0 ` corresponds to a space. Isn't that terrifically fussy?? You must pull out the hex number and add a leading `\` as an escape to avoid errors.

Regarding using CSS to insert content into an hr, Chris Coyier [writes](http://css-tricks.com/simple-styles-for-horizontal-rules/):

> Note that in some of these examples, generated content is used (:before/:after). This isn't supposed to work, as far as I know, because <hr>s are no-content style elements (they have no closing tag). But as you can see, it does. If you are concerned about uber-long-term design fidelity, stay away from those.

To which I say: *kewl bruh whatever tho*.

Here's an hr with this style:

* * *

This opens you up to use actual stars (or any other unicode character) instead of asterisks! I call that an upgrade. And if you turn CSS off or Instapaper it, it degrades nicely to a plain old horizontal rule[^3], which isn't really so bad. It's good enough for [John Gruber][] anyway. His horizontal rule looks like three pale centered dots.

[^3]: Edit: or maybe not? Keep reading...

His CSS:

```css
hr {
  height: 1px;
  margin: 2em 1em 4em 0;
  text-align: center;
  border-color: #777;
  border-width: 0;
  border-style: dotted;
  }
```

[John Gruber]: http://daringfireball.net/2012/12/google_maps_iphone

I don't really understand how that becomes three pale dots but then I don't really understand CSS.

### Edit 3: I was wrong about instapaper

*Completely* wrong! I made some bad assumptions and now I'm really confused.

In the first draft of this post, I had this scattered throughout my paragraphs anywhere you see "hr" or "hrs" above:

```html
<code>&lt;hr /&gt;</code>
```

Which is what my markdown processor, Kramdown, generates when I write this:

    `<hr />`

It wraps it in the code tags *and* replaces the angle brackets with their HTML entities, with the goal to make sure it's not recognized as a horizontal rule, but as anonymous, quoted code. Despite these precautions, Instapaper rendered those as horizontal rules, [awkwardly breaking up paragraphs](http://d.pr/i/4wEm) instead of displaying the code's text inline.

That behavior may make sense in some contexts, but not really in this one. So I went through and removed the brackets, despite it looking kind of goofy without them. But this post was ostensibly about writing blog posts with things like Instapaper in mind, and I wanted it to be readable in there.

What's even more baffling is that hrs that *weren't* inline with paragraphs wouldn't display at all. Just regular plain old hrs. Not on Daring Fireball and not on here. For a parser that is so aggressive as to forcibly render hrs that don't want to be, it's bizarre that it ignores the ones with their hand raised.

So, I dunno. I'm pleased that I managed to find a CSS replacement for Blanc and Hackett's vibe, but now I'm not sure if they were doing it wrong at all. At least theirs show up.
