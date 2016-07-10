---
title: erb and indendation
date: 2012-12-02 7:53 PM
from: beefsteak
tags:
- from the archives
---

Earlier while sleeping on the plane I had an idea for a method that I want to write.

I use erb, not haml, because haml is confusing, and erb looks like HTML which isn't really confusing anymore.

What I do is I have a `layout.erb` file which is the template for the entire site. All the pages look the same because they all use the same template. The only three things that change are the title, subtitle, and yield.

So whenever you try to go to a page, the code runs and figures out what the HTML should be, which I typically put into a String variable called `the_html`. Then, depending on what you're doing, I set the title and subtitle in two global variables, `@title` and `@subtitle`. These will fill out the `<h1>` and `<h2>` header tags.

Then the last thing I do in the code is run `erb the_html` which sends the freshly-tossed-together html into the "yield" aka the body of the page.

Here I'll just share what my template looks like right now:
```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <title><%= @title.downcase %> - <%= @subtitle.downcase %></title>
  <link href="/css/style.css" rel="stylesheet" />
  <link rel="alternate" type="application/atom+xml" href="/feed.xml" />
  <meta name="author" content="<%= get_author_name %>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="HandheldFriendly" content="true" />
</head>
<body>
<div id="container">
<h1 id="title"><a href ="/"><%= @title.downcase %></a></h1>
<h1 id="author">by <%= get_author_name.downcase %></h1>
<h2 class="instapaper_title"><%= @subtitle.downcase %></h2>
<%= yield %>
<hr />
<form action="/search" id="searchbox">
  <input type="text" name="q" placeholder="Search..."> <input type="submit" value="search">
</form>
<p><small>This blog running on an as-yet-untitled and unfinished blogging engine created by <a href="http://maxjacobson.net">Max Jacobson</a> on the morning of December 1, 2012. It uses Ruby, Sinatra, and Heroku.</small></p>
<p><a href="/feed.xml">RSS Feed</a></p>
</div>
</body>
</html>
```

And I'm pretty happy with this! I have **no** idea if I'm doing things in any kind of best-practice way but it makes sense to me and I can do a couple things with it and I'm pretty happy.

But the one thing I'm kind of not happy with is the problem of indendation. When I'm assembling `the_html`, it's all going into one String. Here's a typical chunk of code:

```ruby
if post_info[:tags_array].length > 0
  the_html << "<p>Tags:</p>\n"
  the_html << "<ul id=\"the-tags\">\n"
  post_info[:tags_array].each do |tag|
    the_html << "  <li><a href=\"/tag/#{tag}\">#{tag}</a></li>\n"
  end
  the_html << "</ul>\n"
end
```

See how I'm manually inserting spaces and new lines (`\n`)? I feel like this is not how it's meant to be.

So the idea i had earlier today is to not bother with new lines or spaces at all, just throw it all into one flat string, and then pass it through a method at the end for, essentially, "prettifying" it and indenting it properly, and then running erb on that. I don't know if I want to bite off that problem to solve just yet but I'm starting to want to. But I'm *sure* there's an easier way to be doing this.
