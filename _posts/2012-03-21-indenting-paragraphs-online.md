---
title: 'The easiest way to indent paragraphs online, not that you necessarily should'
date: 2012-03-21 12:00 AM
from: jacobsonian I think
tags:
- from the archives
---

Today I read DC Pierson's recent essay [Writing About 2Pac In Los Angeles, A Place It Turns Out He Isn't From](http://dcpierson.tumblr.com/post/19605918654/) and even though I liked reading it a lot, the main thing I've been thinking about since has nothing to do with hip-hop or Los Angeles or writing. It's this: why did he indent his paragraphs?

If this essay were printed in a book, I wouldn't have blinked. That's normal. But indented paragraphs online are somewhat unusual. Maybe the key to it is this line from the essay:


> I wonder if Hampton will read what I end up writing and make fun of me, the way I imagine most comics will when they discover that I write earnest-ish prose stuff, in particular, douchey prose stuff about writing about music.

My feeling is this: prose needs not be indented, but earnest-ish prose stuff does. Or that's how it feels anyway. In the past I've written short stories, put them on a blog, and felt like they looked wrong. _That's not a blog!_ I'd think. _It's a heart-breaking story, it should be indented!_

And, maybe. More on that later.

First, let's delve into the nitty gritty of formatting for the web. Let's look at the beginning of one of Pierson's paragraphs, in HTML, to see how he accomplished indentation:

```html
<p class="body1"><span>            </span>Then I moved[...]</p>
```

Basically, he inserted a bunch of spaces at the beginning of each paragraph. I think a lot of people do it this way. I don't know if this is "wrong" so much as... I think there's a better way. I'm no expert but here's my take on the best way to format indented paragraphs online.

Basically, just add this code anywhere in your post:

```html
<style>p+p { text-indent: 2em; margin-top: -1em; }</style>
```

The `text-indent: 2em` part will indent the first line of each non-first paragraph by two ems. An em is basically whatever size the text is. 2em seemed right to me. [Popcorn Fiction](http://www.mulhollandbooks.com/popcornfiction/) uses 3em. You can adjust that figure or replace it with 25px or whatever you want.

I just learned that `p+p` trick today. In the past I've just used `p` for paragraph, but this way the style will only apply to paragraphs that directly follow another paragraph. That's good because indentations are usually omitted in the first paragraph. If you'd like the style to apply to _every_ paragraph, replace `p+p` with just `p`.

The `margin-top: -1em` part will decrease the spacing between paragraphs a little. Now that paragraphs are being indented, we don't need spacing to identify a new paragraph as much.

This will affect the whole page, not just your post, so be careful. If you put this in a Tumblr post, for example, you'll find that every post on your homepage is now affected. To avoid this, put the code "after the jump" with the Read More button code, `<!-- more -->`.

The advantage is that you don't need to worry about HTML or anything. Just write your thing then put the one line of CSS in there, and it'll look good.

(If you'd like to see what this looks like, check out this old [short story of mine](http://blog.maxjacobson.net/story/the-roxy-maneuver/). This had no indentation yesterday but I just added it all with one line of code.)

If you're not comfortable with HTML, I'd recommend writing in [Markdown](http://en.wikipedia.org/wiki/Markdown) using something like [Mou](http://mouapp.com) (Mac), [Dillinger](http://dillinger.io/) (web), or [MarkdownPad](http://markdownpad.com/) (Windows) to preview or generate clean HTML for you. For this blog I write everything in Markdown and almost never see the HTML.

Both Tumblr and Calepin allow you to write in Markdown without ever seeing HTML. Check the [Tumblr Preferences](https://www.tumblr.com/preferences) to flip that switch. Highly recommended.

* * *

So it's possible to do it and pretty painless to implement. But I'll ask this question next: **why bother?** Don't indented paragraphs look a little weird on the web? A little out of place? I think so. The web has so trained my perception of this that I sort of wonder why books have indented paragraphs now. Hmm. If paragraphs were spaced out, books would be longer. I wonder by how much.

Here's some quick math:

* My copy of _A Feast for Crows_ is 976 pages
* There are 34 lines per page
* There are an average of 7.8 paragraphs per page (from a random sampling of ten pages)
* There are approximately 7,612.8 paragraphs in the book (976 pages * 7.8 paragraphs per page)
* That's an additional 7,612.8 new lines to the book if we spaced out the paragraphs with one extra line worth of spacing
* That's an approximate additional 223.9 pages (7,612.8 lines / 34 lines per page)

So that's a significant amount of paper. Foregoing indentations would save some pages but I don't think it would nearly balance out. Indentations are much more compact than spacing.

Okay, so indentations are greener, but that's not something we really have to worry about on the web. Maybe it looks better or is easier to read. I don't know. I only like it when writers take the care to format their work in the way that best expresses themselves. So go for it if you want.

On June 4th, 2011, someone named TigerCrane [asked the internet](http://ask.metafilter.com/187546/Why-dont-we-indent-paragraphs-any-more) "When and why did we stop indenting paragraphs?"

I particularly [like this](http://ask.metafilter.com/187546/Why-dont-we-indent-paragraphs-any-more#2700234) response by Sys Rq:

> I haven't seen a not-indented paragraph in a while, outside of situations like this online one where it's basically impossible.
>
> Where are you seeing them?

There are some other great theories there as well.

* * *

Let's take a look at some publications.

| Publication         | Indents on screens | Indents in print |
| :-------------------| :----------------- | : -------------- |
| Most blogs          | No                 | N/A              |
| Most magazines      | I don't know       | Yes              |
| The New York Times  | No                 | Yes              |
| The New Yorker      | No                 | Yes              |
| [Popcorn Fiction][] | Yes                | N/A              |
| Kindle eBooks       | Yes (by default)   | N/A              |
| Apple iBooks        | Yes (by default)   | N/A              |
| Instapaper          | No                 | N/A              |

[Popcorn Fiction]: http://www.mulhollandbooks.com/popcornfiction/

I find it very curious that the eBooks are styled like print books when they don't need to be. I suspect it's a matter of familiarity and comfort.

There's one, possibly dire consequence of replacing indentations with spacing in long form writing. These pieces are broken up into units of discourse. The novel is made up of two parts, maybe, and those parts are made up of chapters, and those chapters are made up of sections, which are made up of paragraphs, which are made up of sentences, which are made up of words.

If a writer chooses to use spacing to separate paragraphs, how does she separate sections? I'm talking about those parts where the action stops, there's a rare space between paragraphs, and then action resumes. Maybe it's a good moment to walk the dog. If all paragraphs are spaced out, that break won't stand out.

I solve that problem with horizontal rules now. I think it works okay. It looks a little something like this in Markdown:

    # The Book

    ## Chapter one

    Some stuff.

    * * *

    Some more stuff.

    ## Chapter two

    The thrilling conclusion. What a short book.

And you can style the `<hr />` (horizontal rule) to look however you want, including being invisible. Here's what mine looks like on this site:

* * *

So anyway I generally avoid indenting text online. I think the urge is mostly to do with wanting to put on book airs. But I'm not writing a book, even if I'm writing a novel. I'm writing a web page.
