---
title: using method_missing with class methods in Ruby
date: 2015-07-08 01:42
---

Ruby's `method_missing` let's you write some weird code:

```ruby
class Poet
  def initialize
    @words = []
  end

  def method_missing(message, *args, &block)
    @words << message
    message.to_s.end_with?("?") ? sentence : self
  end

  private

  def sentence
    @words.join(" ")
  end
end

puts Poet.new.why.not.go.for.a.walk?
```

I've seen `method_missing` used to handle unexpected message on instances of a
class before, but never for class methods. But, like, why not?

```ruby
class LoudSpeaker
  def self.method_missing(message, *args, &block)
    if [:exclaim, :yodel, :howl, :sob, :beg].include?(message)
      puts args.first
    else
      # we don't want to handle this missing method, we want Ruby to raise the
      # NoMethodError it ought to
      super
    end
  end
end

LoudSpeaker.exclaim "helloooo!"
```

It's just methods, so go for it.
