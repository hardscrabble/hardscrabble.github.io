---
title: how to tell ruby how to compare numbers to your object with coerce
date: 2015-11-09 00:50 EST
---

Let's say you have some object that represents some numeric idea:

```ruby
class CupsOfCoffeePerDay
  MY_LIMIT = 3

  def initialize(num)
    @num = num
  end

  def >(other)
    @num > other
  end

  def risky?(threshold: MY_LIMIT)
    self > threshold
  end
end

CupsOfCoffeePerDay.new(4).risky? #=> true
CupsOfCoffeePerDay.new(4) > 5 #=> false
```

This object takes in a number and wraps it, and then extends it with some
domain-specific logic. Because the object wraps a number, and kind of represents
a number, you might find yourself wanting to compare it to other numbers,
whether they're also wrapped or not.

The above code seems to accomplish that. Our object knows how to compare itself
to a number -- we only implemented the greater than method, but we could
do all the other comparisons using the same approach -- *but* it isn't as
flexible as it could be. Watch what happens when we try to do this:

```ruby
CupsOfCoffeePerDay.new(4) > CupsOfCoffeePerDay.new(5)
```

I get this error when I run the program:

```
/Users/max/src/hardscrabble.net/comparisons.rb:9:in `>': comparison of Fixnum with CupsOfCoffeePerDay failed (ArgumentError)
        from /Users/max/src/hardscrabble.net/comparisons.rb:9:in `>'
        from /Users/max/src/hardscrabble.net/comparisons.rb:23:in `<main>'
```

What's happening here?

1. we create two objects
2. we ask one object if it's greater than the second object
3. our implementation refers to the wrapped number object and asks *it* if it's
   greater than this second object
4. the number complains that it doesn't know how to compare itself to some rando

And, fair enough. From the point of view of the number, it has no idea what
cups of coffee per day even means, or which part of it is a number.

We could change our implementation to accomodate this use-case:

```ruby
class CupsOfCoffeePerDay
  MY_LIMIT = 3

  def initialize(num)
    @num = num
  end

  def >(other)
    if other.is_a?(CupsOfCoffeePerDay)
      @num > other.num
    else
      @num > other
    end
  end

  def risky?(threshold: MY_LIMIT)
    self > threshold
  end

  protected

  attr_reader :num
end
```

This is *kind of ok* but not really great. It required that we expose the num
attribute externally -- by putting the `attr_reader` after `protected`, it isn't
really public, it's just available for other CupsOfCoffeePerDay objects to call
-- but still, kind of sad that we had to do that, because the object is supposed
to represent an idea, and the more internals you expose, the farther you get
from that sort of pure idea and the more you just have some code. Worse still,
imagine writing that conditional in each of the operator methods... maybe you
can be clever and abstract the duplicated code to some private method, but like,
it's a lot of repretition.

Turns out Ruby has a nice way to let your custom objects reveal their inner
numbers, and it's called `coerce`:

```ruby
class CupsOfCoffeePerDay
  MY_LIMIT = 3

  def initialize(num)
    @num = num
  end

  def >(other)
    @num > other
  end

  def risky?(threshold: MY_LIMIT)
    self > threshold
  end

  def coerce(other)
    [other, @num]
  end
end
```

There's not a ton of documentation about this. I only found it by luck. I was
looking to understand how Ruby numbers does its comparisons, and I opened up
[pry][] (with [pry-doc][] installed), and started exploring:

[pry]: https://github.com/pry/pry
[pry-doc]: https://github.com/pry/pry-doc

```
$ gem install pry pry-doc
$ pry
> 4.pry
(4)> show-source >
From: numeric.c (C Method):
Owner: Fixnum
Visibility: public
Number of lines: 17

static VALUE
fix_gt(VALUE x, VALUE y)
{
    if (FIXNUM_P(y)) {
        if (FIX2LONG(x) > FIX2LONG(y)) return Qtrue;
        return Qfalse;
    }
    else if (RB_TYPE_P(y, T_BIGNUM)) {
        return FIX2INT(rb_big_cmp(rb_int2big(FIX2LONG(x)), y)) > 0 ? Qtrue : Qfalse;
    }
    else if (RB_TYPE_P(y, T_FLOAT)) {
        return rb_integer_float_cmp(x, y) == INT2FIX(1) ? Qtrue : Qfalse;
    }
    else {
        return rb_num_coerce_relop(x, y, '>');
    }
}
```

At this point, I thought *oh no! C!*

But like, this is so cool: this is the implementation of the greater than method
in numbers in Ruby, and it's totally discoverable if you open pry and ask it
to `show-source`.

I don't really know C, but if I squint, I can tell that this is doing something
kind of reasonable. It seems to be checking the type of the second value (the
one you're comparing the current value to) and doing something different based
on the type. The final branch of logic is when the type is unknown. Bingo. Our
CupsOfCoffeePerDay type is definitely unknown. In that case, it calls
`rb_num_coerce_relop`. Unfortunately, when I asked pry to
`show-source rb_num_coerce_relop` it didn't know how.

Thankfully, it printed the filename this source code can be found in, so I went
to [the ruby source code][] and searched for a file called `numeric.c`. Within
that, I searched for the rb_num_coerce_relop function. It takes in the two
objects (the CupsOfCoffeePerDay and the number) and the operator (`>`). Its
source looks like this:

[the ruby source code]: https://github.com/ruby/ruby

```

VALUE
rb_num_coerce_bin(VALUE x, VALUE y, ID func)
{
    do_coerce(&x, &y, TRUE);
    return rb_funcall(x, func, 1, y);
}
```

What does that do? It looks like it coerces the two types to be the same type,
and then calls the `>` function on the first one, passing the second one.
(Again: squinting).

So `do_coerce` is where the interesting part happens. I'll just [link to it][]
because it's pretty long. But the cool thing in it is that it checks if the
first object implements a `coerce` method, and if it does, it does something
different. So then it becomes a game of figuring out how to write a `coerce`
method and finding out, via stack overflow (of course), that you can add this
magic `coerce` method, and it will take in the second object, and it's expected
to return an array of compatible types, with the second object's value first,
and the first object's value second. So our implementation looks like:

[link to it]: https://github.com/ruby/ruby/blob/f3cafab56a353db969f5e39923bd15712a204c36/numeric.c#L274-L309

```ruby
def coerce(other)
  [other, @num]
end
```

One interesting thing to note is that if anything fails within your coerce
method, the exception will be silently swallowed by `do_coerce`, and then you'll
get the earlier error about not being able to compare the two objects. If our
implementation looked like:

```ruby
def coerce(other)
  raise 'hell'
end
```

You might expect hell to be raised as an exception -- but nope. You might think
that means the `coerce` method wasn't called. It was, it's just kind of unusual
territory. Thankfully, it's not completely silent: it emits a warning that your
exception will no longer be rescued in future versions of Ruby. I like that
change.

So. Now that we know about coerce, our operator methods can be really simple,
but they can still be used bidirectionally, and we can even feel OK about
abstracting them a bit. I kind of like this final implementation, which
includes all of the operators:

```ruby
require 'forwardable'

class CupsOfCoffeePerDay
  extend Forwardable

  def_delegators "@num", :>, :<, :>=, :<=, :==

  MY_LIMIT = 3

  def initialize(num)
    @num = num
  end

  def risky?(threshold: MY_LIMIT)
    self > threshold
  end

  def coerce(other)
    [other, @num]
  end
end
```
