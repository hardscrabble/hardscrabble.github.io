---
title: order of operations
date: 2015-06-16 00:00 EDT
---

Last month, we [looked at](/2015/operators-as-self-expression/) Ruby operators,
and I complained about how I wish I could define my own operators. Today I'm
looking at them a little more, and thinking about how Ruby handles expressions
made up of multiple operations.

Let's say you have this Ruby code:

{% highlight ruby %}
sum = a + b + c
{% endhighlight %}

What are a, b, and c? They could be

1. variables containing numbers; that's what they kind of look like they want to
   be
2. invocations of methods which return numbers
3. variables or methods that contain/return absolutely anything else; let's not
   worry about this
4. maybe they're not even defined at all; let's not worry about this
   possibility either

Let's look at how option 1 plays out:

{% highlight ruby %}
a = 1
b = 1
c = 1
puts a + b + c
# 3
{% endhighlight %}

So far, so good.

Let's see how option 2 plays out:

{% highlight ruby %}
def a; 1; end
def b; 1; end
def c; 1; end
puts a + b + c
# 3
{% endhighlight %}

Sort of funky-looking, but also sort of straight-forward. Here's the question
though: if Ruby is calling those 3 methods to get those 3 values, what order are
they being called in? Let's find out:

{% highlight ruby %}
def a
  puts "a"
  1
end

def b
  puts "b"
  1
end

def c
  puts "c"
  1
end

puts a + b + c
# a
# b
# c
# 3
{% endhighlight %}

It kind of makes sense. It's just going from left to right, like English.

One cool thing about Ruby is that (almost) everything is an object, and even
core things like math operations are implemented as methods. This means the
above could be written like this:

{% highlight ruby %}
puts a.+(b).+(c)
# a
# b
# c
# 3
{% endhighlight %}

Or even more verbosely, like this:

{% highlight ruby %}
puts a.public_send(:+, b).public_send(:+, c)
# a
# b
# c
# 3
{% endhighlight %}

These renditions make it clear that this is a chained sequence of method calls.
Let's make it even more clear, by refining the plus method and adding some
logging:

{% highlight ruby %}
module MathLogger
  refine Fixnum do
    alias_method :original_plus, :+

    def +(other)
      original_plus(other).tap do |sum|
        puts "#{self} + #{other} = #{sum}"
      end
    end
  end
end

using MathLogger

def a
  puts "a"
  1
end

def b
  puts "b"
  1
end

def c
  puts "c"
  1
end

puts a.+(b).+(c)
# a
# b
# 1 + 1 = 2
# c
# 2 + 1 = 3
# 3
{% endhighlight %}

Now it's not as simple as "left to right". We start at the left and call the a
method. But the next method we call is b, not +. Before we can add two values,
we need to know what the values are, and Ruby will evaluate the expression in
parentheses (here it's calling a method, but it could be calling multiple
methods and they would all be evaluated before the + method is called).

* * *

### A brief digression about `defined?`

This rule doesn't apply to the defined? method, which ships with Ruby and
behaves like this:

{% highlight ruby %}
msg = "Hello"
defined?(msg) #=> "local-variable"
OMG           #=> NameError: uninitialized constant OMG
defined?(OMG) #=> nil
OMG = 4
defined?(OMG) #=> "constant"
{% endhighlight %}

The third line of this excerpt demonstrates that referencing an uninitialized
constant normally raises a name error, so it would be normal to expect the same
to happen on the fourth line, because we just saw that Ruby normally evaluates
the arguments to a method. Here it just totally doesn't, which feels kind of
weird and inconsistent. It might be helpful to think of `defined?` as a language
keyword and not a method. See also the [alias
method](/2014/whoa_rubys_alias_is_weirder_than_i_realized/).

* * *

Back to math. Remember [PEMDAS][pemdas]? When evaluating an arithmetic
expression, we're not supposed to just read from left to right, evaluating
operations as we go; we're supposed to prioritize some operations above others:

* **P**arentheses
* **E**xponents
* **M**ultiplication
* **D**ivision
* **A**ddition
* **S**ubtraction

[pemdas]: https://en.wikipedia.org/w/index.php?title=Pemdas&redirect=no

With this acronym memorized, children are able to evaluate complicated math
expressions.

Can Ruby? Let's see:

{% highlight ruby %}
4 + 3 * 5   #=> 19
{% endhighlight %}

Well... yeah! Seems right! But let's take a look into the order that methods are
being called:

{% highlight ruby %}
module MathLogger
  refine Fixnum do
    alias_method :original_plus, :+
    alias_method :original_times, :*

    def +(other)
      original_plus(other).tap do |sum|
        puts "#{self} + #{other} = #{sum}"
      end
    end

    def *(other)
      original_times(other).tap do |sum|
        puts "#{self} * #{other} = #{sum}"
      end
    end
  end
end


using MathLogger

def four
  puts 4
  4
end

def three
  puts 3
  3
end

def five
  puts 5
  5
end

puts four + three * five
# 4
# 3
# 5
# 3 * 5 = 15
# 4 + 15 = 19
# 19
{% endhighlight %}

*Interesting!* So, Ruby takes a look at four, takes a look at three, and then
*skips the addition*, then takes a look at five, and performs the
multiplication. Only then does it double back and perform the addition, inlining
the product of three and five.

That's great! And surely, if all of these operations are just methods, it will
behave the same when I change it to this?

{% highlight ruby %}
puts four.+(three).*(five)
# 4
# 3
# 4 + 3 = 7
# 5
# 7 * 5 = 35
# 35
{% endhighlight %}

Hm, nope. When we call the methods directly, the order of operations breaks.

I always thought it was just "syntactic sugar" that I could omit the dot when
calling the + method (and its siblings) but it's doing slightly more than just
inlining the dots: it's also, more or less, inlining the parentheses, so it
looks something like this:

{% highlight ruby %}
puts four.+(three.*(five))
{% endhighlight %}

How does it choose where to put the parentheses? It has [a precedence table][t]
which Ruby references when deciding which operations to evaluate before others.
This means that if I *were* able to define my own operators, I would need to be
able to insert them somewhere in this hierarchy, and this hierarchy would also
be cluttered with all the operators added by the gems included in my project.

[t]: http://stackoverflow.com/a/21060235

Naturally, my operator would be at the top of the list.
