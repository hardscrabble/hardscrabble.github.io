---
title: how to tell ruby how to compare numbers to your object with coerce
date: 2015-11-09 00:50 EST
---

Let's say you have some object that represents some numeric idea:

```ruby
class CupsOfCoffeePerDay
  include Comparable

  MY_LIMIT = 3

  def initialize(num)
    @num = num
  end

  def <=>(other)
    num <=> other
  end

  def risky?(threshold: MY_LIMIT)
    self > threshold
  end
end

CupsOfCoffeePerDay.new(4).risky? #=> true
CupsOfCoffeePerDay.new(4) > 5 #=> false
```

This object takes in a number and wraps it, and then extends it with some domain-specific logic.
Specifically, it represents the idea that there is a threshold to how many cups of coffee an individual can have per day before it becomes **risky**.

It's neat that we're able to compare our custom ruby object to a plain number.
All we had to do was `include Comparable` and then implement the `<=>` method (also known as "the spaceship operator") to define *how* we'd like our object to compare to numbers.
We'd like to expose the internal `num` value, and use that when comparing.

The neat thing is that we get all the comparing methods for free.

We're not quite done yet, though.
Watch what happens when we try to do this:

```ruby
CupsOfCoffeePerDay.new(4) > CupsOfCoffeePerDay.new(5)
```

I get this error when I run the program:

```
app.rb:27:in `>': comparison of CupsOfCoffeePerDay with CupsOfCoffeePerDay failed (ArgumentError)
        from app.rb:27:in `<main>'
```

What's happening here?

1. we create two objects
2. we ask one object if it's greater than the second object
3. our implementation refers to the wrapped number value (`num`, which is just a `Fixnum`) and asks *it* if it's greater than this second object
4. the fixnum complains that it doesn't know how to compare itself to some ranom object

And, fair enough. From the point of view of the number, it has no idea what cups of coffee per day even means.

We could change our implementation to accomodate this use-case:

```ruby
class CupsOfCoffeePerDay
  include Comparable

  MY_LIMIT = 3

  def initialize(num)
    @num = num
  end

  def <=>(other)
    if other.is_a?(CupsOfCoffeePerDay)
      num <=> other.num
    else
      num <=> other
    end
  end

  def risky?(threshold: MY_LIMIT)
    self > threshold
  end

  protected

  attr_reader :num
end
```

Note that we had to add those last few lines to make it easier to access the `num` from outside an instance of `CupsOfCoffeePerDay`.

This is not bad.

That attribute is marked as `protected` because so far we can only imagine it being necessary to be used by other instances of `CupsOfCoffeePerDay`, for the sake of comparison.

(I remember having a long and horrified conversation with a coworker when neither of us could come up with a scenario where you would use `protected` over `private`, but it turns out that this is precisely the situation where you would.)

But look what happens when you try this:

```ruby
4 > CupsOfCoffeePerDay.new(5)
```

Or this:


```ruby
[
  CupsOfCoffeePerDay.new(4),
  3,
  CupsOfCoffeePerDay.new(1)
].sort
```


When I try these, I get errors like this:

```
app.rb:32:in `>': comparison of Fixnum with CupsOfCoffeePerDay failed (ArgumentError)
        from app.rb:32:in `<main>'
```

Is there anything we can do to avoid these errors?
I think one, strong argument is that we shouldn't try to.
Rather, we should audit our system and make sure that we never mix-and-match our types.
If we can do that, that's probably for the best.

Except... this is Ruby, and Ruby always has another trick up its sleeve.

Check it:

```ruby
class CupsOfCoffeePerDay
  include Comparable

  MY_LIMIT = 3

  def initialize(num)
    @num = num
  end

  def <=>(other)
    if other.is_a?(CupsOfCoffeePerDay)
      num <=> other.num
    else
      num <=> other
    end
  end

  def risky?(threshold: MY_LIMIT)
    self > threshold
  end

  def coerce(other)
    [CupsOfCoffeePerDay.new(other), self]
  end

  protected

  attr_reader :num
end
```

There's not a ton of documentation about this.
I only found it by luck.
I was looking to understand how Ruby numbers does its comparisons, and I opened up [pry][] (with [pry-doc][] installed), and started exploring:

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

But like, this is so cool: this is the implementation of the greater than method in numbers in Ruby, and it's totally discoverable if you open pry and ask it to `show-source`.

I don't really know C, but if I squint, I can tell that this is doing something kind of reasonable.
It seems to be checking the type of the second value (the one you're comparing the current value to) and doing something different based on the type.
The final branch of logic is when the type is unknown.
Bingo. Our CupsOfCoffeePerDay type is definitely unknown.
In that case, it calls `rb_num_coerce_relop`.
Unfortunately, when I asked pry to `show-source rb_num_coerce_relop` it didn't know how.

Thankfully, it printed the filename this source code can be found in, so I went to [the ruby source code][] and searched for a file called `numeric.c`. Within that, I searched for the rb_num_coerce_relop function.
It takes in the two objects (the CupsOfCoffeePerDay and the number) and the operator (`>`).
Its source looks like this:

[the ruby source code]: https://github.com/ruby/ruby

```
VALUE
rb_num_coerce_relop(VALUE x, VALUE y, ID func)
{
    VALUE c, x0 = x, y0 = y;

    if (!do_coerce(&x, &y, FALSE) ||
	NIL_P(c = rb_funcall(x, func, 1, y))) {
	rb_cmperr(x0, y0);
	return Qnil;		/* not reached */
    }
    return c;
}
```

What does that do?
It looks like it coerces the two types to be the same type, and then calls the `>` function on the first one, passing the second one.
(Again: squinting).

So `do_coerce` is where the interesting part happens.
I'll just [link to it][] because it's pretty long.
But the cool thing in it is that it checks if the first object implements a `coerce` method, and if it does, it does something different.
So then it becomes a game of figuring out how to write a `coerce` method and finding out, via stack overflow (of course), that you can add this magic `coerce` method, and it will take in the second object, and it's expected to return an array of compatible types, with the second object's value first, and the first object's value second.

[link to it]: https://github.com/ruby/ruby/blob/f3cafab56a353db969f5e39923bd15712a204c36/numeric.c#L274-L309

So.
Now that we know about coerce, our objects can be really simple, but they can still be compared bidirectionally.
