---
title: Making FactoryBot.lint verbose
date: 2021-02-10 22:49
---

Here's a quick blog post about a specific thing (making `FactoryBot.lint` more verbose) but actually, secretly, about a more genearl thing (taking advantage of Ruby's flexibility to bend the universe to your will).
Let's start with the specific thing and then come back around to the general thing.

If you use [Rails](https://rubyonrails.org/), there's a good chance you use [FactoryBot](https://github.com/thoughtbot/factory_bot/) to help you write your tests.
The library enables you to define "factories" for the models in your system with sensible default values.

FactoryBot has a [built-in linter](https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md#linting-factories), which you can run as part of your CI build.
It will try to identify any factory definitions which are faulty.

At work, we run this as a [Circle CI job](https://circleci.com/docs/2.0/jobs-steps/#jobs-overview).
It almost always passes, but every now and then it catches something, so we keep it around.

Recently, it started failing occasionally, but not because of anything wrong with our factories.
Instead, it was failing because it was just... slow.
Circle CI is happy to run things like this for you, but it gets antsy when something is running for a while and printing no output.
Is it stuck?
Is it going to run forever?
If something is running for 10 minutes with no output, Circle CI [just kills it](https://support.circleci.com/hc/en-us/articles/360045268074-Build-Fails-with-Too-long-with-no-output-exceeded-10m0s-context-deadline-exceeded-?utm_medium=SEM&utm_source=gnb&utm_campaign=SEM-gb-DSA-Eng-uscan&utm_content=&utm_term=dynamicSearch-&gclid=Cj0KCQiApY6BBhCsARIsAOI_Gja3DfGPaxFGFypRwlqsMIQ4jZgkIGh8YHte9mgEPcesmv9ncXlv4p4aAu8vEALw_wcB).

Our factory linter apparently takes ten minutes now, we learned.

So, what to do about that?

Per that support article, one option is to just bump up the timeout.
That's easy enough.
We could tell Circle CI to wait 15 minutes.
In a year or two, maybe we'll need to bump it up again, assuming such pedestrian concerns continue to dog us then, while we drive around in our flying cars.

Another option would be to just stop running it.
It's useful-ish but not essential.
That's easy enough.

Another option would be to configure the linter to print verbose output while it's running.
If we could do that, then we'd get multiple benefits: first of all, Circle CI would be satisfied that it is not stuck, and that it is making progress, and that it might eventually finish, even if it takes more than ten minutes; but also, having some output might be interesting and useful, no?
Hmm.
I pulled up the FactoryBot docs and saw an option `verbose: true`, but it didn't seem to be what I wanted:

> Verbose linting will include full backtraces for each error, which can be helpful for debugging

I want it to print output even when there are no errors.
I didn't see anything like that.

Imagine a ruby file with this stuff in it:

```ruby
require 'factory_bot'

class Dog
  attr_accessor :name

  def save!
    sleep 4
    true
  end
end

class Band
  attr_accessor :name

  def save!
    sleep 4
    true
  end
end

FactoryBot.define do
  factory :dog, class: Dog do
    name { 'Oiva' }
  end

  factory :band, class: Band do
    name { 'Bear Vs. Shark' }
    albums { 2 }
  end
end

factories = FactoryBot.factories
FactoryBot.lint(factories)
```

There's actually a bug in our `Band` factory: it references an attribute called `albums` which does not exist in our model code.
The linter will catch this.

Looking at that last line, it looks like we just pass in the list of factories, and then presumably it will loop over that list and check them one-by-one.

Looping over things is a really common thing in Ruby.
Anything that you can loop over is considered ["enumerable"](https://ruby-doc.org/core-3.0.0/Enumerable.html).
Arrays are enumerable.
Hashes are enumerable.
When you query a database and get back some number of rows, those are enumerable.

A list of factories is enumerable.
Hmm.

Let's try writing our own enumerable class, to wrap our list of factories.
We'll call it `ChattyList`.
It'll be a list, but when you loop over it, it'll chatter away about each item as they go by.

In general, if you're calling a method and passing in one enumerable thing, it would also be fine to pass in some other enumerable thing.
It's just going to call `each` on it, or `reduce`, or something like that from the `Enumerable` module.

```ruby
class ChattyList
  include Enumerable

  def initialize(items, before_message:, after_message:, logger:)
    @items = items
    @before_message = before_message
    @after_message = after_message
    @logger = logger
  end

  def each
    @items.each do |item|
      @logger.info @before_message.call(item)
      yield item
      @logger.info @after_message.call(item)
    end
  end
end

factories = ChattyList.new(
  FactoryBot.factories,
  logger: Logger.new($stdout),
  before_message: -> (factory) { "Linting #{factory.name}" },
  after_message: -> (factory) { "Linted #{factory.name}" },
)

FactoryBot.lint(factories)
```

When I run the script, the output looks like this:

```
I, [2021-02-10T22:43:03.676359 #57462]  INFO -- : Linting dog
I, [2021-02-10T22:43:07.678616 #57462]  INFO -- : Linted dog
I, [2021-02-10T22:43:07.678712 #57462]  INFO -- : Linting band
I, [2021-02-10T22:43:07.679373 #57462]  INFO -- : Linted band
Traceback (most recent call last):
        2: from app.rb:59:in `<main>'
        1: from /Users/max.jacobson/.gem/ruby/2.6.6/gems/factory_bot-6.1.0/lib/factory_bot.rb:70:in `lint'
/Users/max.jacobson/.gem/ruby/2.6.6/gems/factory_bot-6.1.0/lib/factory_bot/linter.rb:13:in `lint!': The following factories are invalid: (FactoryBot::InvalidFactoryError)

* band - undefined method `albums=' for #<Band:0x00007ff7b9022890 @name="Bear Vs. Shark"> (NoMethodError)
```

Nice!
As the linter chugs thru the factories, it prints out its progress.
With this, Circle CI will see that progress is happening and won't decide to kill the job.
This option wasn't offered by the library, but that doesn't have to stop us.
Isn't that fun?

By the way: that might be a good option to add to FactoryBot!
Feel free, if you're reading this, to take that idea.
