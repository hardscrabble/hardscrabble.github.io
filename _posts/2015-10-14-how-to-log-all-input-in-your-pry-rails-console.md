---
title: how to log all input in your pry rails console
date: 2015-10-14 00:15
category: programming
---

Many Rubyists use and love the [pry][] gem for adding breakpoints to their
programs and inspecting objects. Super useful. Some others use the [pry-rails][]
gem to use the pry REPL in place of irb for the rails console.

[pry]: https://github.com/pry/pry
[pry-rails]: https://github.com/rweng/pry-rails

Let's say you want to log all of the activity that occurs in your rails console.
This could be a nice security thing. Maybe you're just nostalgic for old times.

Pry has something called an "[input object][]", which you can override in your
configuration. The object's responsibility is to feed ruby code to Pry, line by
line. By default, it uses the [Readline module][]. I don't know a *ton* about
readline, but I gather that it's wrapping some standard unix program, which
means it sort of *feels* natural. For example, you can input Control+l and it
will clear the screen; `gets.chomp` doesn't do that kind of thing.

[input object]: https://github.com/pry/pry/wiki/Customization-and-configuration#Config_input
[Readline module]: http://ruby-doc.org/stdlib-2.1.1/libdoc/readline/rdoc/Readline.html

So, Readline is great. We want to use it. We just kind of want to wrap it. SO
let's see what that looks like.

First: where do we actually put our configuration?

You can put a `.pryrc` file in the root of your project. You can even put Ruby
code in that file. I think that's the official way to do it. But I don't know...
it doesn't get syntax highlighting because it doesn't have a `.rb` file
extension... I put my configuration in a Rails initializer named
`config/initializers/pry.rb`, and that works fine too.

```ruby
class LoggingReadline
  delegate :completion_proc, :completion_proc=, to: Readline

  def readline(prompt)
    Readline.readline(prompt).tap do |user_input|
      logger.info(user_input)
    end
  end

  private

  def logger
    @logger ||= Logger.new('log/console.log')
  end
end

Pry.config.input = LoggingReadline.new
```

The important thing for custom input objects is that they implement the
`readline` method. The method takes in a string that holds the current user
prompt, and it is expected to return a string that holds the next line of Ruby
code for Pry to evaluate.

If pry is a REPL (read evaluate print loop), the custom input object assumes the
responsibility of the first letter, and thats' it.

It doesn't strictly need to ask the user for input. It could just return some
nonsense.

But, this one does. We can summarize what it does as: *ask the dev for a line of
input, but first log it to a file before returning it to pry for EPL-ing.*

There's one line that's kind of strange:

```ruby
delegate :completion_proc, :completion_proc=, to: Readline
```

What's that about?

Well, I've learned, it's just kind of a necessary thing to make sure your custom
input object seamlessly behaves like the default pry input behavior. Let me
explain.

`Readline`, by default, has some strategy for tab completing when you start to
write something, and then press tab. That strategy is a proc object. The default
one has something to do with irb I guess?

```
$ irb
>> Readline.completion_proc
=> #<Proc:0xb9964ce0@/home/max/.rubies/2.2.3/lib/ruby/2.2.0/irb/completion.rb:37>
```

But! When starting pry, it has a different completion proc!

```
$ pry
[1] pry(main)> Readline.completion_proc
=> #<Proc:0xb8a0c25c@/home/max/.gem/ruby/2.2.3/gems/pry-0.10.2/lib/pry/repl.rb:177>
```

But when you provide a custom input object, pry doesn't replace the completion
proc on readline because you seem not to even be using it, so why bother? But
in this case we totally are using it, we're just wrapping it.

At first, I thought this was a bug with Pry, and I opened an issue to complain
about it, but while writing this blog post I realized that it's kind of not a
bug, and this delegation approach is probably fine.
