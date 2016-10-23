---
title: vim will fix indentation mistakes
layout: post
date: 2014-09-07 18:58
---

Today I learned a neat vim trick (via the [Aaron Paterson Play by Play interview](http://beta.pluralsight.com/courses/play-by-play-aaron-patterson)):

![vim auto indent gif](/img/2014-09-07-vim-indentation.gif)

You can highlight some lines with visual mode and then press `=` and it will fix all of the indentation mistakes therein. If you're in normal mode, you can press `==` to fix just the line you're currently on.

Paterson cites this trick as an argument in favor of *not* indenting private methods an extra level, because vim doesn't do that. For example:

```ruby
# do this:
class Dog
  def bark
    barks.sample
  end

  private

  def barks
    ["woof", "yap", "ruff"]
  end
end

# NOT this:

class Cat
  def meow
    meows.sample
  end

  private

    def meows
      ["meow", "purr", "idk what else, cats are weird"]
    end
end
```

I generally do that extra indent but I might stop now :leaves:.

