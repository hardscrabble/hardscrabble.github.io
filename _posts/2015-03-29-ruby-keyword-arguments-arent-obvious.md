---
title: ruby keyword arguments aren't obvious
date: 2015-03-29 05:13
---

Since Ruby 2.0, methods can be defined with keyword arguments instead of the
traditional ordinal arguments. I really like them. But they're not obvious. I
find myself thinking, maybe too often, "wait, how the hell do these work?"

This post is a stream of consciousness exploration through the things about
keyword arguments that confuse or confused me or people I know. Wading through
this post might help you emerge with a firmer understanding of how to use them.
I hope it makes sense if you read it. Please let me know. I want to write about
a thing I find confusing in a way that honors that confusion but is also clear
and readable, which maybe isn't a thing I can do.

Let's start with an example of keyword arguments working as-advertised:

{% highlight ruby %}
def email(from:, to:, subject:, body:)
  "From: #{from}\nTo: #{to}\nSubject: #{subject}\n\n#{body}"
end
{% endhighlight %}

That's a kind of strange method that takes a few required keyword arguments and
makes a string from them. I like using keyword arguments here because now you
can call the method however you like, as long as you provide all of the
keywords; the order doesn't matter, and it's clear which one is which.

So, for example, here's a perfectly valid way to call that method (note the
order has changed):

{% highlight ruby %}
email(
  subject: "Thanks!",
  from: "Max",
  to: "Susan",
  body: "The soup was great!"
)
{% endhighlight %}

We're able to use required keyword arguments in Ruby 2.1 and forward. What if
your app is using Ruby 2.0.0? You'd still like to reap the clarity benefits of
keyword arguments, but now you must provide a default value for every keyword.
What default makes sense for an email? I'm not sure. I guess you can do this?

{% highlight ruby %}
def email(from: nil, to: nil, subject: nil, body: nil)
  raise ArgumentError if [from, to, subject, body].any?(&:nil?)
  "From: #{from}\nTo: #{to}\nSubject: #{subject}\n\n#{body}"
end
{% endhighlight %}

Which kind of simulates the behavior of Ruby 2.1 required keyword arguments.
But it's not great, because sometimes nil is actually a value that you want to
be providing. So maybe you do something heavier, like this?

{% highlight ruby %}
class AbsentArgument
end

def email(from: AbsentArgument.new, to: AbsentArgument.new, subject: AbsentArgument.new, body: AbsentArgument.new)
  raise ArgumentError if [from, to, subject, body].any? { |arg| arg.is_a?(AbsentArgument) }
  "From: #{from}\nTo: #{to}\nSubject: #{subject}\n\n#{body}"
end
{% endhighlight %}

Which is kind of clunky-looking but maybe more explicit?

Let's be happy required keyword arguments are an official thing now and not
worry about that and just hope we can all always use Ruby 2.1 or newer.

Keyword arguments kind of look like hashes. Are they hashes? I don't know. You
can use hashes with them:

{% highlight ruby %}
arguments = {
  from: "Max",
  to: "Beth",
  subject: "Thanks!",
  body: "Your soup was great!"
}
email(**arguments)
{% endhighlight %}

That works. That `**` coerces the hash into keyword arguments, kind of like the
`*` coerces an array into ordinal arguments:

{% highlight ruby %}
def sum(a_number, another_number)
  a_number + another_number
end

nums = [1, 1]
sum(*nums)
{% endhighlight %}

Except, the `**` isn't actually necessary, this works fine too:

{% highlight ruby %}
arguments = {
  from: "Max",
  to: "Beth",
  subject: "Thanks!",
  body: "Your soup was great!"
}
email(arguments)
{% endhighlight %}

So I guess they don't do anything there?

OK so when you are calling a method you can use a pre-existing hash for the
keyword arguments. What about when you're defining a method? This probably
won't work but I just don't know because it doesn't feel obvious. Let's try.

Here's our new example method, which works fine:

{% highlight ruby %}
def stir_fry(ingredients: [], heat: 100)
  heat.times do
    ingredients = ingredients.shuffle
  end
  ingredients
end

stir_fry(ingredients: ['broccoli', 'peppers', 'tofu'], heat: 45)
{% endhighlight %}

So let's try to define the method again, but this time let's use a hash.

{% highlight ruby %}
arguments = {
  ingredients: [],
  heat: 100
}
def stir_fry(arguments)
  heat.times do
    ingredients = ingredients.shuffle
  end
  ingredients
end

stir_fry(ingredients: ['broccoli', 'peppers', 'tofu'], heat: 45)
{% endhighlight %}

Do you think it works? It doesn't work at all. I'm sorry.

Wait, so what even is the `**` thing? Let's review `*` again; I showed above
how to use it to coerce an array into ordinal arguments when calling a method,
but it can also be used in a method definition to indicate that a method takes
an arbitrary number of arguments:

{% highlight ruby %}
def sum(*numbers)
  total = 0
  numbers.each { |num| total += num }
  total
end

sum(1, 2, 3)
sum(*[1, 2, 3])
{% endhighlight %}

We can do something like that with `**` to indicate that we want to catch all
unrecognized keyword arguments into an object:

{% highlight ruby %}
def stir_fry(ingredients: [], heat: 100, **options)
  heat.times do
    ingredients = ingredients.shuffle
  end
  if (sauce = options[:sauce])
    ingredients.push(sauce)
  end
  ingredients
end

stir_fry(ingredients: ['broccoli', 'peppers', 'tofu'], sauce: "teriyaki", heat: 45)
{% endhighlight %}

In that example, sauce is an optional keyword that isn't defined in the method
definition. Normally if we provide sauce, and sauce wasn't specifically
expected, that will cause an error, so this is kind of a cool way to say: "I
don't care what keyword values you throw at me! I'll just make a hash out of
the ones I don't recognize". It doesn't even care that sauce came in the middle
of the expected keyword arguments. This is pretty similar to the convention in
ordinal method definitions where the last argument is called options and it has
a default value of an empty hash, but when you do that, the order really
matters:

{% highlight ruby %}
def ordinal_stir_fry(ingredients, heat, options = {})
  heat.times do
    ingredients = ingredients.shuffle
  end
  if (sauce = options[:sauce])
    ingredients.push(sauce)
  end
  ingredients
end

ordinal_stir_fry(["potato"], 5, sauce: 'Catsup') # This one works
ordinal_stir_fry(["shoe"], {sauce: 'Water'}, 5) # This one doesn't
{% endhighlight %}

What is even happening there? The curly braces become necessary to avoid a
syntax error, and then the method receives the wrong values in the wrong names.
But, looking at it, I think it's clear that something is a little bit off,
because the second parameter looks different from the third; it kind of feels
like the hash belongs at the end, because that's such a strong convention for
ordinally-defined Ruby methods.

The `**options` example is neat but again, it's not obvious. When looking at
it, you don't know which of the keyword arguments are specifically expected and
which ones will land in the greedy `**options` bucket. You have to reference
the method definition, just like with stinky ordinal methods.

Let's look at default values in some more detail. It seems clear; you can
provide a default value, which will be used when the method is called without
that keyword value provided. What happens when you provide nil?

{% highlight ruby %}
class Fish
  attr_reader :breed, :color

  def initialize(breed: "Koi", color: "Yellow")
    @breed = breed
    @color = color
  end
end

fish = Fish.new(color: nil)
fish.breed #=> "Koi"
fish.color #=> ????????
{% endhighlight %}

What do you *feel like* it should be? I guess it should be nil, because that's
the value you provided for that keyword, and yes that's right, it's nil. That
works for me, but I know it's not obvious because I found myself trying to
defend this behavior to a friend recently, who was sad that it didn't behave as
his intuition desired, that a nil value would be replaced by the default value.
To console him I attempted to write some code that would satisfyin his
expectations, and I came up with this:

{% highlight ruby %}
class AbsentArgument
end

class Fish
  attr_reader :breed, :color

  def initialize(breed: AbsentArgument.new, color: AbsentArgument.new)
    @breed = validate(breed, default: "Koi")
    @color = validate(color, default: "Yellow")
  end

  private

  def validate(value, default:)
    if value.is_a?(AbsentArgument) || value.nil?
      default
    else
      value
    end
  end
end


fish = Fish.new(color: nil)
fish.breed #=> "Koi"
fish.color #=> "Yellow"
{% endhighlight %}

So if you want that behavior you basically can't use Ruby keyword argument
default values, because default values don't work that way.

Oh, here's another thing. I thing I only realized this this month, that I had
been doing this:

{% highlight ruby %}
class Disease
  attr_reader :name

  def initialize(name: name)
    @name = name
  end
end

gout = Disease.new(name: "Gout")
gout.name #=> "Gout"
rando = Disease.new
gout.name #=> nil
{% endhighlight %}

This was fulfilling the behavior I guess I wanted: when I provide a name, it
should use that name; when I don't provide a name, the name should be nil. It
was working without error, and I'm not sure where I picked up the pattern of
writing keyword arguments this way, but it actually totally makes no sense! If
I wanted the default value to be nil, why not just write it like this?

{% highlight ruby %}
class Disease
  attr_reader :name

  def initialize(name: nil)
    @name = name
  end
end
{% endhighlight %}

What was even happening in that earlier example? Well, when I wasn't providing
a name value, it was calling the `name` method which was only available because
I had added the `attr_reader` for name, and that method was returning nil, so
nil was being assigned to the `@name` instance variable. I had no idea that's
what was happening, I just thought that I was writing the boilerplate necessary
to achieve that behavior. That feels kind of dangerous; maybe you don't realize
that your default values can call methods, and you're calling a method that
doesn't exist? For example:

{% highlight ruby %}
class Furniture
  attr_reader :color

  def initialize(kind: kind, color: color)
    @kind = kind
    @color = color
  end

  def description
    "#{@color} #{@kind}"
  end
end

couch = Furniture.new(kind: "Couch", color: "Grey")
couch.description #=> "Grey Couch"
{% endhighlight %}

You could have tests for this code and ship it to production and never realize
that a bug hides within it. As long as you always provide a `kind` keyword
value, you'll never face it and it will work properly, because it will never
attempt to call the `kind` method... which doesn't exist.

So, to make it blow up, simply omit the kind keyword value:

{% highlight ruby %}
Furniture.new(color: "Red")
# undefined local variable or method `kind' for #<Furniture:0x00000101110a38> (NameError)
{% endhighlight %}

Sinister!

Happily, I'm noticing now that Ruby 2.2.1 actually warns you when you write
code like this. 2.0.0 does not, which is where I've been happily making
this mistake for many months.

The warning:

{% highlight ruby %}
def candy(flavor: flavor)
end
# warning: circular argument reference - flavor
{% endhighlight %}

What about when you combine ordinal arguments with keyword arguments? You can.
Is it obvious how that should work? Not to me. Let's take a look.

{% highlight ruby %}
def stir_fry(servings = 1, zest, ingredients: [], **options)
  dish = (ingredients * servings)
  zest.times do
    dish = dish.shuffle
  end
  dish
end

stir_fry(8, ingredients: ["pepper", "seitan"], sauce: "fancy")
{% endhighlight %}

What the hell is happening there? Maybe it's clear. The first two arguments are
ordinal, and the first one has a default value. So Ruby compares the arguments
we provide when we call the method to the arguments in the method definition,
and sees that we provided what looks like one ordinal value, and a few keyword
values, so the one ordinal value must be `zest`, because `servings` has a
default value and `zest` does not (Ruby here is smarter than I realized).

It kind of feels like Ruby is going to let us make this method definition more
confusing, for example by moving the keyword arguments before the ordinal
arguments, but it actually won't let you. It will raise a syntax error:

{% highlight ruby %}
# syntax error:
def shenanigans(amp: 11, guitar)
end

# if it were a valid method definition, I guess you would call it like this:
shenanigans(amp: 5, "Fender")
# or, omitting the non-required parameter
shenanigans("Martin")
{% endhighlight %}

For me it wasn't obvious that this wouldn't be allowed, but I'm glad it's not,
because reading those method calls feels kind of backwards.

Similarly:

{% highlight ruby %}
# not a syntax error:
def shenanigans(amp, *outfits, **options)
end

shenanigans("Orange", "Leotard", "Leather Jacket", at: Time.now)

# but this is a syntax error:
def shenanigans(amp, style: "flamenco", *outfits, **options)
end
{% endhighlight %}

That one also fails because it tries to put some ordinal arguments (the
`*outfits` bit) after some keyword arguments.

Well, I think that's everything I can think of. Good luck out there.
