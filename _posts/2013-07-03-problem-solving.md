---
title: all the thoughts that went through my head while trying to pass the first test in the test suite of a warm up exercise this morning before coffee and then again this evening after painkillers
date: 2013-07-03 3:52 AM
category: coding
from: fis-octopress
---

Recently at school we've been doing code exercises to warm up in the morning. We're given contained problems to solve with code. Problems that would be possible to solve without code but tedious or prohibitively time-consuming. Sometimes we move on to lecture before I can solve one and it haunts me all day.

Here's this morning's:

> ### Palindrome Product
>
> A palindromic number reads the same both ways.
>
> The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 x 99.
>
> Write a program that can detect palindrome products in a given range.

The specifics of what this means were ostensibly made more clear by a provided test-suite.

I've done a problem like this before at a coding meetup and I remembered how I'd wrestled with it for minutes and got it working and then seen someone else's impossibly elegant solution and felt inspired.

Mine was probably something like this:

{% highlight ruby %}
def is_palindrome?(num)
  digits = num.to_s.split("")
  i = 0
  while i < digits.length
    if digits[i] != digits[-i-1]
      return false
    end
    i += 1
  end
  return true
end
{% endhighlight %}
ugh

And hers was something like this:

{% highlight ruby %}
def is_palindrome?(num)
  num.to_s == num.to_s.reverse
end
{% endhighlight %}

And I was just like *oh*.

So this morning I had a moment of thinking I already knew the hard part of this problem, and then I looked at the tests. Here's the first one:

{% highlight ruby %}
test 'largest_palindrome_from_single_digit_factors' do
  palindromes = Palindromes.new(max_factor: 9)
  palindromes.generate
  largest = palindromes.largest
  assert_equal 9, largest.value
  assert [[[3, 3], [1, 9]], [[1, 9], [3, 3]]].include? largest.factors
end
{% endhighlight %}

first test

Oh there's a lot more going on there.

*But that's fine*, I think, *I'll make a `Palindromes` class, give it a few methods, that's fine, let's do it.* So I started with something like this:

{% highlight ruby %}
class Palindromes
  def initialize(options)
    max = options[:max_factor]
    # then I decided the range would begin at 1 mainly because it has to start somewhere and the test's assertion seemed to suggest 1
    min = 1
    @range = min..max

    # At this point I sort of paused to think about what to do next and Kristen noticed I stopped typing and said something about how I should host a show called "Max Factor" and I laughed.
  end

  # this felt as good a place as any to write that ace method I had in my back pocket
  def is_palindrome?(num)
    num.to_s == num.to_s.reverse
  end

  # then I was like uhh I guess I need a generate method
  # what does that even mean though
  def generate
    @range.each do |num1|
      @range.each do |num2|
        # what if I like... iterate over the range twice nested like this
        # this looks too ugly to be right but I think maybe...
        if is_palindrome?(num1 * num2)
          [num1, num2] # I know I have to do something with this array
          num1 * num2  # And also their product maybe?
          # but what
        end
      end
    end
  end
end
{% endhighlight %}

first draft

At this point something about the test bubbled to the surface of my mind.

{% highlight ruby %}
largest = palindromes.largest
assert_equal 9, largest.value
{% endhighlight %}

wait what?

Wait, *what the what* is the `largest` method returning that it has a `value` method?

Damnit Jeff do we have to create another class?

OK fine I *guess* palindrome factors are a sufficiently interesting thing that they should be their own class. I kind of reached a point in the `generate` method where I had some data I didn't know what to do with, and that makes some sense as a place to put it, so I started rewriting... and ran out of time.

I'm going to finish it now, I have to. It's very late. I used to stay up this late. Jeez.

{% highlight ruby %}
class PalindromeFactors
  attr_accessor :value, :factors
  def initialize(num1, num2)
    @value = num1 * num2
    @factors = [num1, num2]
  end
  # that should maybe be enough for now?
  # the value will be a palindrome
end

class Palindromes
  def initialize(options)
    max = options[:max_factor]
    min = 1
    @range = min..max
    # so let's keep track of the factors whose product is a palindrome
    @palindrome_factors = []
  end

  def is_palindrome?(num)
    num.to_s == num.to_s.reverse
  end

  def generate
    @range.each do |num1|
      @range.each do |num2|
        if is_palindrome?(num1 * num2)
          # create the new object and shovel it into the array
          @palindrome_factors << PalindromeFactors.new(num1, num2)
        end
      end
    end
  end

  def largest
    @palindrome_factors.sort_by{ |pf| pf.value }.last
  end

end
{% endhighlight %}

second draft

Up until this point, running the tests hasn't felt worth doing, because I didn't even have the methods it's trying to call. But now I do. *And maybe it'll even pass.*

It doesn't make them pass.

Before I knew about proper test-driven development, I did a sort of shake-and-bake version where I manually tested things, and my favorite tool for that is [CodeRunner](http://krillapps.com/coderunner/) which lets me just run little bits of code and see what happens. Kind of like irb/pry but with a GUI. So I copy my code into there without the tests and add this:


{% highlight ruby %}
palindromes = Palindromes.new(max_factor: 9)
palindromes.generate
largest = palindromes.largest
puts palindromes.inspect
{% endhighlight %}

poking at it

And this is what it printed:

{% highlight ruby %}
#<Palindromes:0x007f902a10a100 @range=1..9, @palindrome_factors=[#<PalindromeFactors:0x007f902a10a010 @value=1, @factors=[1, 1]>, #<PalindromeFactors:0x007f902a109f48 @value=2, @factors=[1, 2]>, #<PalindromeFactors:0x007f902a109e80 @value=3, @factors=[1, 3]>, #<PalindromeFactors:0x007f902a109db8 @value=4, @factors=[1, 4]>, #<PalindromeFactors:0x007f902a109cf0 @value=5, @factors=[1, 5]>, #<PalindromeFactors:0x007f902a109c28 @value=6, @factors=[1, 6]>, #<PalindromeFactors:0x007f902a109b60 @value=7, @factors=[1, 7]>, #<PalindromeFactors:0x007f902a109a98 @value=8, @factors=[1, 8]>, #<PalindromeFactors:0x007f902a1099d0 @value=9, @factors=[1, 9]>, #<PalindromeFactors:0x007f902a109908 @value=2, @factors=[2, 1]>, #<PalindromeFactors:0x007f902a109840 @value=4, @factors=[2, 2]>, #<PalindromeFactors:0x007f902a109778 @value=6, @factors=[2, 3]>, #<PalindromeFactors:0x007f902a1096b0 @value=8, @factors=[2, 4]>, #<PalindromeFactors:0x007f902a109390 @value=3, @factors=[3, 1]>, #<PalindromeFactors:0x007f902a1092c8 @value=6, @factors=[3, 2]>, #<PalindromeFactors:0x007f902a109200 @value=9, @factors=[3, 3]>, #<PalindromeFactors:0x007f902a04c100 @value=4, @factors=[4, 1]>, #<PalindromeFactors:0x007f902a04be08 @value=8, @factors=[4, 2]>, #<PalindromeFactors:0x007f902a04b098 @value=5, @factors=[5, 1]>, #<PalindromeFactors:0x007f902a04a210 @value=6, @factors=[6, 1]>, #<PalindromeFactors:0x007f902a0494a0 @value=7, @factors=[7, 1]>, #<PalindromeFactors:0x007f902a048708 @value=8, @factors=[8, 1]>, #<PalindromeFactors:0x007f902a112cb0 @value=9, @factors=[9, 1]>]>
{% endhighlight %}

whoa nelly

I'm *always* surprised by the dumbest things, but that seems really long to me. That's not even *every* permutation of `1..9`, it's just the ones whose product is a palindrome.

Even though it surprised me, I still don't really see why it's wrong. So I take a look at the first assertion and try to test it

{% highlight ruby %}
# the assertion:
# largest = palindromes.largest
# assert_equal 9, largest.value
puts largest.value
{% endhighlight %}

testing first assertion

And it printed: `9`. Hey! That probably passed! Shouldn't it turn like half green or something?

OK fun's over let's look at the next test.
{% highlight ruby %}
palindromes = Palindromes.new(max_factor: 9)
palindromes.generate
largest = palindromes.largest
# assert [[[3, 3], [1, 9]], [[1, 9], [3, 3]]].include? largest.factors
puts largest.factors.inspect
{% endhighlight %}

testing second assertion

And it printed: `[9, 1]`.

For a moment my nose flares because I think this is a bad test and it's not my fault. Of course it's not my fault my `largest` method returns the two digits in one order and the test is expecting them in the other order! The way multiplication works, the order doesn't matter! It should just include `[9,1]` in that list so my answer will be right! I want to just edit my answer into to the list of acceptable answers.

I want to be clear that at the time of the writing of this sentence I still don't *really* know what's wrong with it but I kind of have a hunch. I'm noticing there are actually way more brackets in that array than I was mentally doing anything with. It's not an array of arrays, it's an array of arrays of arrays! But why? I'm going to just look at it for a moment here:

{% highlight ruby %}
[
  [
    [3, 3],
    [1, 9]
  ],
  [
    [1, 9],
    [3, 3]
  ]
]
{% endhighlight %}

what's the deal with arrays

So maybe the order of nine and one matters later, but it's *not* why I failed this test.

The test asserts that this array includes the largest palindrome's factors. The largest value is nine -- I got that part! -- but there are two in-range pairs of numbers that multiply to form nine, and I'm not currently doing anything to group those together. The test is accounting for those two sets of pairs to be grouped in either order, but it wants *both*. Okay. Now I know.

I made some changes that felt right. I didn't really *think* a lot so much as I just vibed out to the new A Great Big Pile Of Leaves album (which has played through maybe three times in full as I write this post) and typed stuff.

{% highlight ruby %}
class PalindromeFactors
  attr_accessor :value, :factors
  def initialize(num1, num2)
    @value = num1 * num2
    # let's wrap our factors array in an envelope array in case there are multiple ways to arrive at this palindrome
    @factors = [[num1, num2]]
  end

  # and make a method to allow these objects to be updated post hoc
  def add_factor(num1, num2)
    @factors << [num1, num2]
  end

end

class Palindromes
  def initialize(options)
    max = options[:max_factor]
    min = 1
    @range = min..max
    # so let's keep track of the factors whose product is a palindrome
    @palindrome_factors = []
  end

  def is_palindrome?(num)
    num.to_s == num.to_s.reverse
  end

  def generate
    @range.each do |num1|
      @range.each do |num2|
        # let's stash this product in a variable because we'll be using it a few times
        product = num1 * num2
        if is_palindrome?(product)
          # let's check if we've already found this palindrome
          already_found = @palindrome_factors.find{ |pf| pf.value == product }
          if already_found
            already_found.add_factor(num1, num2)
          else
            @palindrome_factors << PalindromeFactors.new(num1, num2)
          end
        end
      end
    end
  end

  def largest
    @palindrome_factors.sort_by{ |pf| pf.value }.last
  end

end
{% endhighlight %}

third draft

Allow me to be absolutely clear: this still does not pass the tests but I'm starting to feel a momentum and a full glass of milk happiness in my head because mysteries are unraveling before me.

When I go back to CodeRunner, where I used to see merely `[9, 1]` I now see: `[[1, 9], [3, 3], [9, 1]]` and I know what to do.

I change lines 10-13 of the previous example to:

{% highlight ruby %}
def add_factor(num1, num2)
  @factors << [num1, num2] unless @factors.include? [num2, num1]
end
{% endhighlight %}

aha

and run the tests and it passes and I should be weeping happily right now.

After passing the first test it only takes about 30 seconds to get the rest to pass. [Here's my final solution on gist](https://gist.github.com/maxjacobson/5916168). It's out of the scope of this post.

* * *

Later in the day, Carlos remarked that he sometimes leaves his body while doing yoga. I asked if the same is true for programming but I think I already knew how I felt about that.

I find problems like this very satisfying in that same disassociative, mind-clearing way. When I first start, my mind is moving too fast and I make too many assumptions and just start doing things and that's probably fine because that's how I find out what shape it is. I'm reminded of this Steven King quote on writing from *On Writing* ([via](http://www.jmreep.com/juvenilia/?p=315)):

>Stories are found things, like fossils in the ground. . . . Stories aren’t souvenir tee-shirts or GameBoys. Stories are relics, part of an undiscovered pre-existing world. The writer’s job is to use the tools in his or her toolbox to get as much of each one out of the ground intact as possible. Sometimes the fossil you uncover is small; a seashell. Sometimes it’s enormous, a Tyrannosaurus Rex with all those gigantic ribs and grinning teeth. Either way, short story or thousand-page whopper of a novel, the techniques of excavation remain basically the same.
>
>No matter how good you are, no matter how much experience you have, it’s probably impossible to get the entire fossil out of the ground without a few breaks and losses. To get even most of it, the shovel must give way to more delicate tools: airhose, palm-pick, perhaps even a toothbrush.

*Right??* What a beautiful, humble reframing of what makes great creative work: no, you're not some genius coming up with profound, original ideas; you're just digging, and gently, and hoping that if you just keep trying stuff, you'll find something.
