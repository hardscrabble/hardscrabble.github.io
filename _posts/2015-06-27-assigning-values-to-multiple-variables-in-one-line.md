---
title: assigning values to multiple variables in one line
date: 2015-06-27 15:43
---

Why would you write this:

```ruby
a = 1
b = 1
```

When you could write:

```ruby
a = b = 1
```

A few reasons:

1. Maybe you don't know about this syntax
1. Maybe you don't mind writing out two lines
1. Maybe you're concerned about having two references to the same data, as
   explained [in this StackOverflow][so] post

[so]: http://stackoverflow.com/a/2929722

I recently saw code that looked like this, which was disabling some loggers:

```ruby
Something.logger = OtherThing.logger = nil
```

And I was kind of confused and amazed. I know about this multiple assigning
syntax, but this looked kind of different. In the earlier example, we were
assigning a value to a simple local variable, but in this case we were calling a
setter method instead.

Something like:

```ruby
class Dog
  attr_reader :name, :family

  def initialize(name)
    @name = name
  end

  def family=(family_name)
    @family = family_name
  end
end

milo = Dog.new("Milo")
lola = Dog.new("Lola")

milo.family = lola.family = "The Jacobsons"
p [milo, lola]
# [#<Dog:0x007faf6115b158 @name="Milo", @family="The Jacobsons">, #<Dog:0x007faf6115b108 @name="Lola", @family="The Jacobsons">]
```

This works because Ruby gives you this syntactic sugar when you write a
`something=` method, it lets you put a space before the `=` when calling the
method. And that applies in this context too. Kind of neat.
