---
title: how to re-draw the line you just printed in Ruby, like to make a progress bar
layout: post
date: 2015-12-14 22:53 EST

---

Here's something I learned recently. Let's say you have a program that is going
to take a long time, and you want to mark the progress over time. You can print
out some information like this:

```ruby
tasks = Array.new(1000)
tasks.each.with_index do |task, index|
  sleep rand(0..0.1) # (something slow)
  percentage = (index + 1) / tasks.count.to_f
  puts "#{(percentage * 100).round(1)}%"
end
```

Which looks kinda like this:

![progress bar before picture](/img/2015-12-14-progress-bar-before-picture.png)

Which is, let's say, serviceable, but not, let's say, beautiful. It stinks that
it printed out all those lines when it didn't really need to. I would rather it
had sort of animated while it went. But how is this done?

This is one of those questions that's itched at the back of my mind for a while
and which, when I finally googled it, was a bit disappointing. It's just another
unix escape character, like `\n` (which prints a new line). It's `\r`, which I
now think of as "the backspace to the beginning of the line" magic character.

Armed with this knowledge and some clunky math we can write something like this:

```ruby
begin
  tasks = Array.new(1000)
  tasks.each.with_index do |task, i|
    width = `tput cols`.to_i
    sleep rand(0..0.1) # (something slow)
    percentage = (i + 1) / tasks.count.to_f
    summary = "#{(percentage * 100).round(1)}% ".rjust("100.0% ".length)
    remaining_chars_for_progress_bar = width - summary.length - 2
    chunks = (percentage * remaining_chars_for_progress_bar).ceil
    spaces = remaining_chars_for_progress_bar - chunks
    bar = "\r#{summary}[#{ '#' * chunks }#{' ' * spaces}]"
    print bar
  end
rescue Interrupt
  system "say 'I was almost done, jeez'" if RUBY_PLATFORM.include?("darwin")
end
```

![progress bar after gif](/img/2015-12-14-progress-bar-after-gif.gif)

Probably you shouldn't use this -- there's a very nice gem called
[ruby-progressbar][] which will work across platforms and lets you customize
some things. But it's nice information to have, because now you can do things
like this:

[ruby-progressbar]: https://github.com/jfelchner/ruby-progressbar

![barnyard](/img/2015-12-14-progress-barn.gif)

I'll leave it as an exercise to the reader how to write this one.
