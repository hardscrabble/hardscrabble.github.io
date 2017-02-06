---
title: When to use defined? to memoize in Ruby
date: 2017-02-05 19:08 EST
---

Here's a quick Ruby thing.

## traditional memoization in Ruby

Let's say you have an object whose responsibility is to give a haircut to a dog.

(I may have recently been [reading about this])

[reading about this]: https://thehairpin.com/this-dog-instagram-is-good-525e421c05ac#.2andaxs68

```ruby
class DogStylist
  def initialize(dog_id)
    @dog_id = dog_id
  end

  def perform
    if dog
      dog.sedate
      dog.groom
      dog.instagram
    end
  end

  private

  def dog
    Dog.find(@dog_id)
  end
end
```

This is kind of fine, but it has one problem:
each time you reference `dog`, you're calling the `dog` method,
so you're querying the database over and over,
when you really only _need_ to do so once.

Better to write it like this:

```ruby
class DogStylist
  def initialize(dog_id)
    @dog_id = dog_id
  end

  def perform
    if dog
      dog.sedate
      dog.groom
      dog.instagram
    end
  end

  private

  def dog
    @dog ||= Dog.find(@dog_id)
  end
end
```

Now, you're still calling the `dog` method over and over, but now it's "memoizing" the result of the database query.

Here's a more verbose version of the `dog` method that does the same thing:

```ruby
def dog
  @dog = @dog || Dog.find(@dog_id)
end
```

You can see that `||=` is a syntactical shorthand similar to `+=`, where these two expressions are equivalent:

```ruby
count = count + 1
count += 1
```

Here's an even more verbose version of the `dog` method that does the same thing:

```ruby
def dog
  if @dog
    @dog
  else
    @dog = Dog.find(@dog_id)
  end
end
```

The goal here is to avoid evaluating the database query more than once.
The first time the method is called, the `@dog` instance variable is not defined.
In Ruby, it's safe to reference an instance variable that isn't defined.
It will return `nil`.
And `nil` is falsey, so the database query will be evaluated, and its result assigned to the instance variable.

This is where things get interesting.

Ponder this question:
does this memoization strategy guarantee that the database query will only be executed once, no matter how many times the `dog` method is called?

It doesn't.

Why?

I'll tell you.

What if there is no dog with that ID? `Dog.find(4000)` returns either a dog, or `nil`.
And, like we said earlier, `nil` is falsey.
So hypothetically, if our `perform` method looked like this:

```ruby
def perform
  dog
  dog
  dog
  dog
  dog
end
```

... then we would execute the database query _five times_, even though we made an effort to prevent that.

This is actually totally fine, because our `perform` method _isn't_ written like that.
That was just a hypothetical.
Our `perform` method only calls the `dog` method more than once if it's truthy, so there's no problem here.

## memoization using `defined?`

Let's consider another example, where things aren't as hunky-dory.
Hold please while I contrive one.

OK, I've got it.

Let's say we only want to groom a dog when he or she is unkempt.
When she logs into our web site, we want to pepper some subtle calls to action throughout the page encouraging her to book an appointment.
We'll need a method to check if she is unkempt, and we're going to call it a few times.
It looks like this:

```ruby
class Dog
  HAIRS_THRESHOLD = 3_000_000

  def unkempt?
    Hair.count_for(self) > HAIRS_THRESHOLD
  end
end
```

That's right: we've got a table in our database for all of the hairs on all of our dogs.

You can imagine this `unkempt?` method might be kind of "expensive", which is to say "slow".

Let's try adding some memoization to this method:

```ruby
def unkempt?
  @unkempt ||= Hair.count_for(self) > HAIRS_THRESHOLD
end
```

Here are our goal is to prevent doing the expensive database query (`Hair.count_for(self)`) more than once.

Ponder this question: does our memoization strategy accomplish this goal?

Answer: it does not.

I hear you screaming, "What!?".
I know.
Let me show you.

You can try running this Ruby script yourself:

```ruby
$count = 0
class Hair
  def self.count_for(dog)
    $count += 1
    puts "called #{$count} times"
    2_000_000
  end
end

class Dog
  HAIRS_THRESHOLD = 3_000_000

  def unkempt?
    @unkempt ||= Hair.count_for(self) > HAIRS_THRESHOLD
  end
end

dog = Dog.new
puts "Is the dog unkempt? #{dog.unkempt?}"
puts "Is the dog unkempt? #{dog.unkempt?}"
```

It outputs the following:

```
called 1 times
Is the dog unkempt? false
called 2 times
Is the dog unkempt? false
```

In this script, I have a fake implementation of the `Hair` class.
It's meant to demonstrate that the `count_for` method is being called more than once, even though we specifically tried for it not to.

So what's going on here?

Well, in a way, everything is working as it's supposed to.
The first time we call the `unkempt?` method, the `@unkempt` instance variable is not defined, which means it returns `nil`, which is falsey.
When the instance variable is falsey, we evaluate the expression and assign its result, `false`, to the intance variable.
The second time we call the `unkempt?` method, the `@unkempt` instance variable _is_ defined, and its value is `false`, which is _also_ falsey (which you have to admit is only fair).
So, again, because the instance variable is falsey, we evaluate the expression and assign its result, `false`, to the instance variable.

So what to do?
Here's another way to write this:

```ruby
def unkempt?
  if defined?(@unkempt)
    @unkempt
  else
    @unkempt = Hair.count_for(self) > HAIRS_THRESHOLD
  end
end
```

This approach uses Ruby's built-in `defined?` keyword to check whether the instance variable is defined at all, rather than checking if its value is truthy.
This is more resilient to the possibility that your value may be falsey.

I wish there were a more succinct way to write this, because I think it's generally how you actually want your code to behave when you use `||=`.

Alright, take care.
