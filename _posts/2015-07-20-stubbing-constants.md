---
title: stubbing constants in ruby tests
date: 2015-07-20 23:38 EDT
---

Let's say you have some code that doesn't have tests and you want to add tests.
Because the code wasn't written with tests in mind, it might be hard to write
tests for it.

Last year, DHH wrote a blog post called [Test-induced design damage][tidd] which
argued that code "written with tests in mind" (quoting myself from the previous
paragraph, not his post) isn't necessarily better than code written with other
goals in mind, and can often be worse.

[tidd]: http://david.heinemeierhansson.com/2014/test-induced-design-damage.html

When I've attempted TDD, I've had times when I felt like it helped me write nice
code and times where I think I went too far like if you're rolling out some
dough to make a pie crust but you're watching TV and you end up spreading it out
until it covers the whole counter.

So this code you want to test. What makes it hard to test? Let's say it's a Ruby
class in a Rails app. In Rails apps, all the classes are available for all the
other classes to reference and depend on. Maybe it looks like this:

{% highlight ruby %}
class PieCrust
  def initialize(pounds_of_dough)
    @lbs = pounds_of_dough
    @ready = false
  end

  def prep
    RollingPin.new.roll_out(self)
    Oven.new.preheat
    Instagram.upload(self)
    @ready = true
  end

  def ready?
    @ready
  end
end
{% endhighlight %}

(This example is revealing more about my state of mind right now than anything)

But like, look at this thing. How do we write a test that covers all that? And
what if we want "fast tests"?

(Note: a lot of people really want their tests to run fast. For TDD enthusiasts,
this allows a tight feedback loop between when you write the failing test to
when you write the code which makes the test pass. They kind of expect to do
that over and over and over and don't want to wait for more than an instant. I
don't think they're wrong to want that although I am personally often OK with
waiting for longer than an instant.)

(Other people want their tests to run fast as a general principle, like they
want their cars to go fast or their legs to.)

Let's say there are a couple hundred classes in your app and a bunch of
initializers which run whenever your Rails application is loaded and none of
them are strictly necessary for you to feel confident that your `PieCrust` class
is behaving properly. All you want to know is that calling the `prep` method
rolls out the crust, preheats the oven, and uploads the pie crust to instagram.

You already know that all those things work as long as you call them properly
because you have unit tests for those classes demonstrating how to call them
properly. You can see that here they're being called properly, so you don't feel
the need to *actually* load the rolling pin code, or the oven code, or the
instagram code. And you *really* don't want to upload something to instagram
every time you run your tests.

What do you do?

There's the dependency injection approach, where you might refactor the earlier
code to look like:

{% highlight ruby %}
class PieCrust
  def initialize(pounds_of_dough, roller: RollingPin.new, heater: Oven.new, photo_sharing_service: Instagram)
    @lbs = pounds_of_dough
    @roller = roller
    @heater: heater
    @photo_sharing_service = photo_sharing_service
    @ready = false
  end

  def prep
    roller.roll_out(self)
    heater.preheat
    photo_sharing_service.upload(self)
    @ready = true
  end

  private

  attr_reader :roller, :heater, :photo_sharing_service

  def ready?
    @ready
  end
end
{% endhighlight %}

Which lets you leave your other application code the same -- it can interact
with PieCrust the same as it did before, as the default values are totally
sensible there. But you can now write a test like this:

{% highlight ruby %}
RSpec.describe PieCrust do
  describe '#prep, #ready' do
    it 'rolls the crust, preheats the oven, and uploads the photo' do
      roller = double
      heater = double
      photo_sharing_service = double

      pie_crust = PieCrust.new(10, roller: roller, heater: heater, photo_sharing_service: photo_sharing_service)
      expect(pie_crust).to_not be_ready

      expect(roller).to receive(:roll_out).with(pie_crust)
      expect(heater).to receive(:preheat)
      expect(photo_sharing_service).to receive(:upload).with(pie_crust)

      pie_crust.prep

      expect(pie_crust).to be_ready
    end
  end
end
{% endhighlight %}

I feel like this is OK but it feels like it prescribes and duplicates a lot of
the stuff that's going on in the application code, which doesn't feel ideal to
me but also feels kind of fine.

Is there any other way? There is. I learned this one from my brilliant coworker
[Máximo Mussini](http://github.com/elmassimo/). While looking through a gem he
made ([Journeyman][], a lightweight replacement to FactoryGirl), I discovered
some super interesting code, and without his blessing I extracted it out into
a gem which I may use to help me write tests in the future. That gem is called
[stub_constant][], and using it, I would revert that code to the first version,
avoiding the arguably awkward dependency injection.

[Journeyman]: https://github.com/ElMassimo/journeyman
[stub_constant]: https://github.com/maxjacobson/stub_constant

You might be assuming: OK, so if you don't inject the constants, you must load
the entire application environment, because you're going to be depending on
those dependencies. Or like, maybe you don't load the entire application
environment, but you must at least load the code which defines those 3
constants, right?

Nope! Doing that is usually really difficult, because once you load the files
which define those constants, those files are probably referencing other
constants, so you need to load the files which define *those* constants and now
you might as well just load the whole thing...

So... "Whaaaat?" You might say.

Here's what the constant-referencing isolation tests would look like:

{% highlight ruby %}
require "stub_constant"
StubConstant.klass(:Oven)
StubConstant.klass(:RollingPin)
StubConstant.module(:Instagram)

RSpec.describe PieCrust do
  describe '#prep, #ready?' do
    it 'rolls the crust, preheats the oven, and uploads the photo' do
      roller = double
      expect(RollingPin).to receive(:new).with_no_arguments.and_return(roller)

      heater = double
      expect(Oven).to receive(:new).with_no_arguments.and_return(heater)

      pie_crust = PieCrust.new
      expect(pie_crust).to_not be_ready

      expect(roller).to receive(:roll_out).with(pie_crust)
      expect(heater).to receive(:preheat)
      expect(Instagram).to receive(:upload).with(pie_crust)

      pie_crust.prep

      expect(pie_crust).to be_ready
    end
  end
end
{% endhighlight %}

Sooo it got even more prescriptive. How would you test this? I want to know.
