---
title: Fun method names in Ruby
layout: post
date: 2016-06-08 01:43

---

One thing I like about Ruby is that you can use a little punctuation in your method names, which can help you write expressions that read like nice sentences:

```ruby
delete_user user unless user.special?
```

Kind of fun.

I knew a guy who liked to use these question mark methods in conjunction with the ternary operator to write code that reads like a panicked friend:

```ruby
user.special?? protect(user) : delete(user)
```

The double question mark always makes me smile, which makes me wonder...
Can I just define a method with double question marks right in the method signature?
Like this:

```ruby
class User
  def special??
    name == 'Max'
  end
end
```

Turns out: nope.
That's a syntax error.
Not valid Ruby code.

Well...
OK.
But this is Ruby, so there's not just one way to do a thing.
There's another way to define a method...
Let's try this:


```ruby
class User
  def initialize(name)
    @name = name
  end

  define_method("special??") do
    @name == 'Max'
  end

  define_method("multi
                line
                method
                name??") do
    puts "sure, why not?"
  end

  define_method("!?") do
    "‼"
  end
end

user = User.new("Max")
user.public_send("special??") #=> true
user.public_send("!?") #=> "‼"
user.public_methods(false) #=> [:"special??", :"multi\n                line\n                method\n                name??", :"!?"]
```

Haha that works!

OK it's not as satisfying calling the methods with `public_send`, but as far as I know, it's the only syntactically-correct way to call these methods.
