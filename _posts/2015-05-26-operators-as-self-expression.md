---
title: operators as self expression
date: 2015-05-26 00:14
category: programming
---

**EDIT June**: I've followed-up this post: [order of operations][ooo]

[ooo]: /2015/order-of-operations/

**NOTE:** this post seems to have a ton of code samples, but it's pretty much
just the same one over and over with some small variations to play with an idea.

Suppose you were writing a program to help you write a novel, and you start out
with something like this:

```ruby
class Novel
  def initialize(title)
    @title = title
    @chapters = []
  end
end

class Chapter
  def initialize(text)
    @text = text
  end
end

moby_dick = Novel.new("Moby Dick")
first_chapter = Chapter.new("Call me Ishmael...")
```

After you write this, you pause, because how are you going to define the
interface for adding a new chapter to a novel?

Something like this works fine:

```ruby
class Novel
  def initialize(title)
    @title = title
    @chapters = []
  end

  def add_chapter(chapter)
    chapters << chapter
  end

  private

  attr_reader :chapters
end

class Chapter
  def initialize(text)
    @text = text
  end
end

moby_dick = Novel.new("Moby Dick")
moby_dick.add_chapter Chapter.new("Call me Ishmael...")
moby_dick #=> #<Novel:0x007fdabc81c1f0 @title="Moby Dick", @chapters=[#<Chapter:0x007fdabc81c178 @text="Call me Ishmael...">]>
```

Writing methods is good, and that method has a perfectly adequate name. But
some clever ducks will be dissatisfied by it, because they know there's a more
fun, or maybe a more expressive way:

```ruby
class Novel
  def initialize(title)
    @title = title
    @chapters = []
  end

  def <<(chapter)
    chapters << chapter
  end

  private

  attr_reader :chapters
end

class Chapter
  def initialize(text)
    @text = text
  end
end

moby_dick = Novel.new("Moby Dick")
moby_dick << Chapter.new("Call me Ishmael...")
moby_dick #=> #<Novel:0x007fdabc81c1f0 @title="Moby Dick", @chapters=[#<Chapter:0x007fdabc81c178 @text="Call me Ishmael...">]>
```

The `<<` "shovel" operator is familiar to most Ruby
programmers, and chapters are a natural thing to shovel into a novel, so it
feels kind of natural to use it here.

`<<` is the idiomatic operator to use, but sometimes I don't want to be
idiomatic, I want to be weird. Maybe I feel like this version suits me better:

```ruby
class Novel
  def initialize(title)
    @title = title
    @chapters = []
  end

  def <=(chapter)
    chapters << chapter
  end

  private

  attr_reader :chapters
end

class Chapter
  def initialize(text)
    @text = text
  end
end

moby_dick = Novel.new("Moby Dick")
moby_dick <= Chapter.new("Call me Ishmael...")
moby_dick #=> #<Novel:0x007fdabc81c1f0 @title="Moby Dick", @chapters=[#<Chapter:0x007fdabc81c178 @text="Call me Ishmael...">]>
```

For me, `<=` is a more visually stimulating, writerly operator.

I probably shouldn't do this. It's a totally weird interface! `<=` means "less
than or equal to", not append..!

In fact, I'm only allowed to even do that because `<=` is on a list of
acceptable operators[^thelist]. You can't just name your operator whatever. Let's try:

[^thelist]: [here's](http://stackoverflow.com/a/3331974) a stack overflow post about which operators are overloadable. It may not be up-to-date with Ruby 2, though, so overload at your own risk.

```ruby
class Novel
  def initialize(title)
    @title = title
    @chapters = []
  end

  def ✏️(chapter)
    chapters << chapter
  end

  private

  attr_reader :chapters
end

class Chapter
  def initialize(text)
    @text = text
  end
end

moby_dick = Novel.new("Moby Dick")
moby_dick ✏️ Chapter.new("Call me Ishmael...") #=> undefined method `✏️' for main:Object (NoMethodError)
```

It totally blows up. This works, though:

```ruby
moby_dick = Novel.new("Moby Dick")
moby_dick.✏️ Chapter.new("Call me Ishmael...")
moby_dick #=> #<Novel:0x007fdabc81c1f0 @title="Moby Dick", @chapters=[#<Chapter:0x007fdabc81c178 @text="Call me Ishmael...">]>
```

Surprisingly, this does too:

```ruby
moby_dick = Novel.new("Moby Dick")
moby_dick . ✏️ Chapter.new("Call me Ishmael...")
moby_dick #=> #<Novel:0x007fdabc81c1f0 @title="Moby Dick", @chapters=[#<Chapter:0x007fdabc81c178 @text="Call me Ishmael...">]>
```

There are **so many spaces** on that second line, but it totally works.

It sucks that the period is necessary for this to be syntactically valid. I
think. I don't know what the consequences would be of allowing programmers to
define arbitrary operators. Maybe they're vast?

