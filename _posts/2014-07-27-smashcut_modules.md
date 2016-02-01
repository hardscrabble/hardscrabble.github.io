---
title: composing a Parslet parser from modules and making code climate happy
date: 2014-07-27 18:39
---

I'm making very slow and intermittent progress on [smashcut](http://github.com/maxjacobson/smashcut), my Fountain screenplay parser written in Ruby. At this rate I'll have a usable version in a few years or so :smile:. I'm going to talk about it a little bit here and then talk about how a small refactor boosted my Code Climate GPA for the project from 1.9 to 3.56.

(For those who don't know: [Code Climate][] is a very neat website which analyzes your code and points out improvement areas. They [provide free analysis][] to open source projects like smashcut and paid analysis of private projects. They also maintain a cool blog about code design and techniques at <http://blog.codeclimate.com/>.)

[Code Climate]: https://codeclimate.com/
[provide free analysis]: https://codeclimate.com/github/signup

Today on a train ride I reorganized the smashcut codebase a bit. The heart of the project is a file called `fountain_parser.rb` which describes the [grammar][] of a Fountain screenplay as a list of rules. The syntax for defining a rule uses a DSL provided by [Parslet][], a great Ruby gem for exactly this purpose. Here's the code example from their [get started][] page:

[grammar]: http://en.wikipedia.org/wiki/Parsing_expression_grammar
[Parslet]: http://kschiess.github.io/parslet/
[get started]: http://kschiess.github.io/parslet/get-started.html

```ruby
require 'parslet'

class Mini < Parslet::Parser
  rule(:integer) { match('[0-9]').repeat(1) }
  root(:integer)
end

Mini.new.parse("132432")  # => "132432"@0
```

This is a very simple grammar with only one rule in addition to the required root (which names the rule that is expected to come first). If you were to define a grammar for something more complex, like a screenplay or even a programming language, you could expect there to be many, many more rules for defining specific, small things like operator characters and return charactersand then also abstract things like a character's monologue or a program's function.

At some point, your parser class will get quite long. I think this is kind of to be expected and not necessarily a bad thing. But it sure hurts your Code Climate GPA, which drops at the sight of long and complex classes. It also balks at code outside of methods, which is I think unfairly punishing to projects using DSL-style libraries.

It took some figuring out, but it is possible to compose your parser from modules. That example above could be rewritten like this:

```ruby
require 'parslet'

module NumberRules
  include Parslet
  rule(:integer) { match('[0-9]').repeat(1) }
end

class Mini < Parslet::Parser
  include NumberRules
  root(:integer)
end

Mini.new.parse("132432")  # => "132432"@0
```

This is pretty nice when you have more than a few rules, and Code Climate rewarded me with a coveted A grade: <https://codeclimate.com/github/maxjacobson/smashcut/compare/0cd1d78b...c2668c0e>... well, for some of the classes anyway.

**EDIT 2015-01-08**: Hrmph, that link is dead now. Suffice it to say that the
changes from [this pull request][] improved the GPA from 1.9 to 3.56.

[this pull request]: https://github.com/maxjacobson/smashcut/pull/26
