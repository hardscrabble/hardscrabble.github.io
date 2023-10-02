---
title: Multi-paragraph footnotes in Markdown
date: 2023-10-01 21:33
category: blogging
preview_image: img/preview/2023-10-01-footnotes.png
---

It can be challenging to write about Markdown in Markdown, but I'm going to try. The hard part is showing examples of the syntax without that syntax getting converted into HTML. For example, did you know that if you want to bold some text, you do it **like this**? Shit, that got bolded. Let me try again. You can do it \*\*like this\*\*. OK, great.

So what about footnotes? Adding a simple footnote is fairly straightforward: you put \[^1\] in the main flow of your prose to indicate that there is a footnote. Then you can add your footnote like this:

```
[^1]: My great footnote
```

Here's how that looks[^1].

[^1]: My great footnote

John Gruber, the inventor of Markdown, recently published [a recap of Apple's recent iPhone 15 event](https://daringfireball.net/2023/09/thoughts_and_observations_on_this_weeks_wonderlust_apple_event) which contained three footnotes. When I saw that one of them is three whole paragraphs, my eyes widened. _You can do that???_

If we look at the generated HTML, it looks like this:

```html
<li id="fn2-2023-09-15">
<p>On the eve...</p>

<blockquote>
  <p>Apple has also...</p>
</blockquote>

<p>Huawei’s geopolitical travails...</p>
</li>
```

Nothing magical going on at all. Just some normal-looking HTML.

But, I wondered, how the hell do you represent that in Markdown? When _I_ generate footnotes with Markdown, as soon as I finish the first paragraph, the footnote is _done_.

I happen to know that Daring Fireball has a trick, where you can append `.text` to any URL and see the Markdown source code for that article. So I took a look at [that article's source Markdown](https://daringfireball.net/2023/09/thoughts_and_observations_on_this_weeks_wonderlust_apple_event.text), and here's what I saw:

```html
<li id="fn2-2023-09-15">
<p>On the eve...</p>

<blockquote>
  <p>Apple has also...</p>
</blockquote>

<p>Huawei’s geopolitical travails...</p>
</li>
```

Yep: **the exact same thing**. He's _not_ using any special Markdown syntax to generate the footnotes, he's doing it manually by writing HTML. And that's fair enough; it's totally valid to include bits of HTML in your Markdown source.

But... does that mean that it's not possible to have multi-paragraph footnotes in HTML-free Markdown? Well... unfortunately, it's time that we start to get into some nuance (and a bit of drama).

I should note that I'm referring to "Markdown" as though Markdown is one thing. It's not. Gruber's [original version of Markdown](https://daringfireball.net/projects/markdown/) doesn't support footnotes at all (so it's not a surprise that his blog implements them without any non-HTML syntax). There are many, many different implementations of Markdown. The one that I tend to use is called [GitHub Flavored Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax), which is the version of Markdown used in GitHub text fields. It's also the version of Markdown that I use to build this blog. So that's the one I'll focus on today.

This diaspora of implementations can make it hard to find good information about what features you should expect to have access to. GitHub publishes a [spec for GitHub flavored Markdown](https://github.github.com/gfm/) but it doesn't describe their implementation of footnotes. Elsewhere, they publish a doc on "Basic writing and formatting syntax" and its  [section on footnotes](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes) includes these two examples:

```
Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].

[^1]: My reference.
[^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
  This is a second line.
```

Oh God, is that the best we can do? That seems to generate one paragraph, with `<br />` tags breaking it up into multiple lines. That's not really what I want.

But, clicking around, I found some reason for hope. The [2021 changelog post that introduced footnotes to GitHub](https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/) embeds a gif that, hooray, includes a multi-paragraph footnote example, which looks like this:

```
Some text.[^bignote]

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like
```

As the gif looped and this little miracle flashed on the screen momentarily before flickering away again, I did my best to see what was there, and eventually the carousel looped around enough times that I got it. So that's easy enough: you can add more paragraphs to your footnote as long as you indent them (with four spaces). Easy.[^2] And hopefully this will actually continue to work, even though it's barely documented.


[^2]: Just to show it off here, I'm doing another footnote, and this is the first paragraph of it.

    > and wow here's a blockquote and it's still in the same footnote

    And here's another paragraph that's still, magically, in the same footnote.

    The blank lines between the paragraphs can just be blank, they don't need to have four spaces in them for no reason, don't worry.

I did tease a little drama, but I'm actually not super invested in it. So, suffice it to say that Gruber is [occasionally a bit salty](https://blog.codinghorror.com/standard-markdown-is-now-common-markdown/) about the various takes on Markdown that exist.
