---
title: Sad Blocks
date: 2017-07-06 23:10
---

I wish Ruby knew when you wrote a sad block.

What is a sad block?

It's something I just made up.

Consider this code:

```ruby
Candle.all.each do |candle|
  puts candle.inspect
end
```

Let's say you run it, and you see no output.
What do you conclude?
Probably that there aren't any candles.

Well, maybe.
Or maybe Candle is implemented like this:

```ruby
# candle.rb
class DatabaseResult
  def each; end
end

class Candle
  def self.all
    DatabaseResult.new
  end
end
```

Look, that would be weird, but it's possible, and Ruby doesn't do anything to help you out here, and I feel like it should.

What's happening?
You're calling the instance method `#each` of the `DatabaseResult` class.
And it's just not doing anything at all and doesn't even know you gave it a block.
Cool.

Brief digression time.

That method has an "arity" of zero.
How do I know that?

```shell
$ irb
>> require "./candle"
=> true
>> DatabaseResult.instance_method(:each).arity
=> 0
```

Also by looking at it.

What does it mean?
It means that the method takes zero arguments.

But when we count the arity, we're not considering blocks, because blocks are a special, weird kind of argument, where you can provide it or not and it's kind of outside of the method signature.
You can have methods that takes a block and uses it, and its arity will still be zero:

```ruby
# candle2.rb
class DatabaseResult
  def initialize(values)
    @values = values
  end

  def each
    @values.each do |value|
      yield(value)
    end
  end
end

class Candle
  def self.all
    DatabaseResult.new([
      new("Geranium"),
      new("Lavender"),
    ])
  end

  def initialize(scent)
    @scent = scent
  end
end

Candle.all.each do |candle|
  puts candle.inspect
end
```

```shell
$ irb
>> require "./candle2"
=> true
>> DatabaseResult.instance_method(:each).arity
=> 0
```

Even though we use the block we're given, the arity is still zero.

What about that other syntax where you explicitly put the block in the method signature, does that make it count toward the arity?

```ruby
def each(&block)
  @values.each do |value|
    block.call(value)
  end
end
```

I'll tell you: it doesn't.
Even though it sort of feels like it should.

These versions of the method really require you to pass them a block, which you just have to know.
If you forget to pass a block, you get a nasty error:

```ruby
# candle4.rb
# ...
def each(&block)
  @values.each do |value|
    block.call(value)
  end
end
# ...

Candle.all.each
```

```shell
candle4.rb:9:in `block in each': undefined method `call' for nil:NilClass (NoMethodError)
        from candle4.rb:8:in `each'
        from candle4.rb:8:in `each'
        from candle4.rb:27:in `<main>'
```

Or in this version, an even better error:

```ruby
# candle5.rb
# ...
def each
  @values.each do |value|
    yield value
  end
end
# ...

Candle.all.each
```

```shell
candle5.rb:9:in `block in each': no block given (yield) (LocalJumpError)
        from candle5.rb:8:in `each'
        from candle5.rb:8:in `each'
        from candle5.rb:27:in `<main>'
```

No block given.
Local jump error.
Sure.
That's Ruby trying to be helpful and I appreciate that.

Ruby helps you (by raising a helpful error) when you don't provide a block, but you were supposed to.
But it doesn't help you when you _do_ provide a block, and you weren't supposed to.

Ruby's like, yeah, sure, just provide a block wherever you want, this is a free country.

If you wanted to change this behavior in your code, and get helpful errors when your blocks are unexpectedly not invoked, you could do something like this:

```ruby
class SadBlock
  def initialize(&block)
    @block = block
    @called = false
  end

  def verify
    raise 'hell' unless @called
  end

  def to_proc
    ->(*args) {
      @called = true
      @block.call(*args)
    }
  end
end

sad_block = SadBlock.new do |candle|
  puts candle.inspect
end

Candle.all.each(&sad_block)
sad_block.verify
```

I don't think you should do this, but you could, and I kind of wish Ruby just did it automatically.

I know it's an impractical request, because there are valid use-cases where you might pass a block to a method, and the method just assigns it to an instance variable without calling it, but it promises to call it later.
But maybe Ruby could detect that somehow.
I'm just thinking out loud here.

I've seen tests where assertions lived in blocks, and the blocks were never being called, so they weren't actually asserting anything.

I've seen configuration being done via a DSL in a block, except the block wasn't being called, so the defaults were being used.

I guess what I'm saying is it's a little weird to me that blocks aren't treated like ordinary arguments.
If they were, you'd get an `ArgumentError` if you forgot to provide it or if you provided it and it wasn't expected.

That's what I want.
