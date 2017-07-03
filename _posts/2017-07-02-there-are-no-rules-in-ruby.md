---
title: there are no rules in ruby
date: 2017-07-02 22:28 EDT
---

I recently learned about a feature of the Ruby programming language that has shaken me to my very core.

Consider this code:

```ruby
# dog.rb
class Dog
  attr_reader :name

  def initialize(name)
    @name = name or raise ArgumentError
  end
end

def get_dog
  Dog.new("Milo")
end

thing = get_dog
if Dog === thing
  puts thing.name + " is a dog"
end
```

What happens when you run this code?
Feel free to try.

But I'll tell you.

```shell
$ ruby dog.rb
Milo is a dog
```

This code seems pretty resilient to unexpected runtime errors.

Looking at the code, it seems pretty reasonable to believe:

> when we have an instance of Dog, we will be able to send it the message `name` and get back a String

Up is up.
The sky is blue.
We're living in a society.

Well, ok, but we can't actually assume that the value will be a String, because it doesn't check that.
If we change our definition of `get_dog`, things blow up:

```ruby
def get_dog
  Dog.new(["Milo"])
end
```

```shell
$ ruby dog.rb
dog.rb:15:in `<main>': no implicit conversion of String into Array (TypeError)
```

But, OK, at least that error message is pretty good.
This is user error.
When we write `thing.name + " is a dog"`, we're expressing some amount of faith in ourselves that we expect a String, because values of other types don't necessarily respond to a `+` method.
This is a leap of faith that we're all willing to make when we use Ruby.
Other languages eliminate the need to make that leap of faith by checking types when you compile your code, but Ruby doesn't do that.

And that's fine.

So maybe our expectation should be:

> when we have an instance of Dog, we will be able to send it the message `name` and get back a truthy value

And we'll just remember to provide Strings.
Maybe we'll write a comment indicating the expected type of the parameter.

Well, what if `get_dog` looked like this:

```ruby
def get_dog
  dog = Dog.new("Milo")
  def dog.name
    nil
  end
  dog
end
```

Maybe it just casually redefined the `name` method for that instance.
Then your program crashes like this:

```shell
$ ruby dog.rb
dog.rb:19:in `<main>': undefined method `+' for nil:NilClass (NoMethodError)
```

Which...
OK, who's going to write code like that?
Not me and no one I work with, for sure!

But where does that leave our statement of beliefs?

> when we have an instance of Dog, we will be able to send it the message `name`

We can't even say "and get back a value" because what if the override raises an error?

Perhaps you see where this is going...

Well, what if `get_dog` looked like this?

```ruby
def get_dog
  dog = Dog.new("Milo")
  dog.instance_eval('undef :name')
  dog
end
```

```shell
$ ruby dog.rb
dog.rb:17:in `<main>': undefined method `name' for #<Dog:0x007fecc104a870 @name="Milo"> (NoMethodError)
```

Which, again, lol.
You can just remove methods if you want to?
Sure.
No one is going to write this.
I know.

(By the way, hat tip to [Agis on Stack Overflow](https://stackoverflow.com/a/27095187) for sharing this trick.
I figured it was possible but didn't know how.)

OK so what can we say for sure?

How about this:

> when we have an instance of Dog, it will have an instance variable `@name` defined

Wow that's sad!
How do we even check that?
Maybe like this:

```ruby
thing = get_dog
if Dog === thing
  puts thing.instance_variable_defined?("@name").inspect
  puts thing.instance_variable_get("@name").inspect
end
```

```shell
$ ruby dog.rb
true
"Milo"
```

OK great, have we reached the bottom?

No, because **there are no rules in Ruby**.

We can probably break this in many ways.
Here's one:

```ruby
def get_dog
  dog = Dog.new("Milo")
  dog.remove_instance_variable("@name")
  dog
end
```

IMO this one is a bit pedestrian.
Yeah, fine, you can just remove instance variables on random objects if you want to.
Of course.
My spirit is already broken, this isn't meaningfully worse.

So let's just try to say something that we don't have to take back right away:

> when we have an instance of Dog, the code in the `initialize` method must have run

Right?
That has to be true.
We're living in a society, remember?

Nope:

```ruby
def get_dog
  Dog.allocate
end
```

That results in this output:

```shell
$ ruby dog.rb
false
nil
```

What the hell is this?

This is the thing I mentioned at the beginning that I learned recently.
When we create new objects in Ruby, we usually use the `new` class method.
Notably, we don't call the `initialize` instance method ourselves, although that's what we are responsible for defining.
Ruby handles calling that method for us.
But before Ruby can call an instance method, it needs an instance, and that's where `allocate` comes in.
It just makes an instance of the class.

And you're allowed to use it in your Ruby code, if you want to.

(Hat tip to [John Crepezzi](http://seejohncode.com/2012/03/16/ruby-class-allocate/) whose blog post explains this really well)

If you do, you get back a normal instance of your class in every way, except that the `initialize` method hasn't run.

You can even call your own initialize method if you want to:

```ruby
def get_dog
  dog = Dog.allocate
  dog.send(:initialize, "Milo")
  dog
end
```

We have to use `send` because `initialize` is private.
Well, unless we change that:

```ruby
class Dog
  attr_reader :name

  public def initialize(name)
    @name = name or raise ArgumentError
  end
end

def get_dog
  dog = Dog.allocate
  dog.initialize("Milo")
  dog
end
```

Sooooo where does that leave us?

> when we have an instance of Dog, it's a good dog

Basically: 🤷‍♂️.

That's the bottom.
That's as far as I know how to go.
Maybe there's more.
Please don't tell me.

<hr class='fancy' />

I want to emphasize: this is not a criticism of Ruby.
I'm only faux-alarmed.
Ruby is a springy ball of dough.
It's whatever you want it to be.
All of these features are sharp knives you can use or abuse.

As I've been learning another language which feels much less pliant, I've started to notice things about Ruby that never occurred to me before.
When I write Rust, I take some pleasure and comfort from the rigid rules.
It's more possible to use words like "guarantee" and "safety" in Rust-land.

But Ruby keeps you on your toes.
