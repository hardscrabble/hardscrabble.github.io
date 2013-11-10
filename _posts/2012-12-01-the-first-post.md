---
layout: post
title: testing this little devblog thing
date: 2012-12-01 6:20 AM
category: coding
from: beefsteak
tags:
- devblog
- markdown
- ruby
- sinatra
---

So it's like 6am and I guess I just made my first mini markdown blog engine.

I'm almost certainly too quick to congratulate myself. It has approximately zero features but it's succeeding at putting HTML on the screen and I call that a win.

This is pretty much the whole app:

{% highlight ruby %}
require 'sinatra'
require 'kramdown'

get '/' do
  @title = "devblog - max jacobson"
  the_html = String.new
  the_html << "<h1>#{@title}</h1>\n\n<hr />"
  posts = Dir.entries("posts")
  posts.each do |filename|
    if filename =~ /.md/
      the_text = File.read("posts/" + filename)
      the_html << Kramdown::Document.new(the_text).to_html + "<hr />"
    end
  end
  erb the_html
end

get '/css/style.css' do
  scss :style
end
{% endhighlight %}

It just checks all the files in a directory called "posts", checks all of the ones with the `.md` file extension, and then renders them all one after the other. That's it!

I wrote this in just a minute or two so I'll be sure to add more blog-like features to this. Maybe design it up a bit. That mention of sass is more or less for show.

I feel smart right now so I'm comfortable admitting that I'd love to use Jekyll but just can't figure out how the hell it works.

This is *not* one of those smartly static sites. It generates each page as you load it. Probably pretty fast, but still, not **smart**-smart.

