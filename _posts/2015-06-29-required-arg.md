---
title: required keyword arguments in Ruby 2.0.0
date: 2015-06-29 22:56
category: programming
---

TLDR: I made a gem, [required_arg](https://github.com/maxjacobson/required_arg)
which offers a workflow for requiring keyword arguments in Ruby 2.0.0, which
doesn't support them on the language level.

In March, we [looked at][1] Ruby keyword arguments, and noted a curious tension.

[1]: /2015/ruby-keyword-arguments-arent-obvious/

Sometimes you want to use keyword arguments, and you don't want to come up with
a default value for that keyword. You kind of want to require the keyword. You
can in Ruby 2.1+, but Ruby 2.0.0 is in the awkward position of *having* keyword
arguments but not being able to require them.

Here's what you can do in Ruby 2.1:

```ruby
class Dog
  def initialize(name:)
    @name = name
  end
end

Dog.new(name: "Milo") #=> #<Dog:0x007fc404df9f10 @name="Milo">
Dog.new #=> an exception is raised: ArgumentError: missing keyword: name
```

That's great! You don't need to write any additional code, and Ruby will enforce
that your method is called with the keyword arguments you require. This gives
you flexibility to design interfaces which take advantage of the flexibility and
clarity of keyword arguments, but still establish some expectations for how the
method will be called.

Here's what happens when you do the same in Ruby 2.0.0:

```ruby
class Dog
  def initialize(name:)
    @name = name
  end
end
# dog.rb:2: syntax error, unexpected ')'
# dog.rb:5: syntax error, unexpected keyword_end, expecting end-of-input
```

Syntax error!

Here's what I suggest doing now:

1. Upgrade to a newer version of Ruby
1. If you can't, try this:

```ruby
# gem install required_arg
require "required_arg"

class Dog
  def initialize(name: RequiredArg.new(:name))
    @name = name
  end
end
Dog.new(name: "Milo") #=> #<Dog:0x007fc404df9f10 @name="Milo">
Dog.new #=> an exception is raised: missing keyword: name (ArgumentError)
```

Close enough!

If your app is stuck on Ruby 2.0.0 or you're making a library which supports
Ruby 2.0.0, maybe you'll find this useful. Let me know if you do.

Here's the entire source for the gem:

```ruby
class RequiredArg
  def initialize(name = nil)
    msg = name.nil? ? "missing keyword" : "missing keyword: #{name}"
    raise ArgumentError, msg
  end
end
```

Pretty simple, and kind of fun. It's just a little cherry bomb class. The moment
you instantiate it, it blows up. Make it the default value for a keyword
argument, and the moment you forget a keyword argument, the default will be used
and the expression will be evaluated for the first time. It's cool that the
default values are lazily evaluated because it allows for things like this.

Check out the gem: <https://github.com/maxjacobson/required_arg>
