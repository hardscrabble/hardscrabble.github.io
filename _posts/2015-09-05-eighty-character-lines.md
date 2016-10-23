---
title: eighty character lines
date: 2015-09-05 23:29 EDT
---

Last month we talked about [RuboCop][cop], which analyzes your Ruby code and
nitpicks it. One of its most difficult to follow suggestions is to keep your
lines of code no longer than 80 characters.

[cop]: /2015/rubocop

The creator of rubocop, bbatsov, explained his perspective [on his
blog][batsov]:

[batsov]: http://batsov.com/articles/2013/06/26/the-elements-of-style-in-ruby-number-1-maximum-line-length/

> We should definitely have a limit – that’s beyond any doubt. It’s common
> knowledge that humans read much faster vertically, than horizontally. Try to
> read the source code of something with 200-character lines and you’ll come to
> acknowledge that.

I'm totally on board with the short lines train. For me, it only gets tricky
when dealing with nested stuff (examples to follow) which add a lot of space to
the left of the first character of code. For example:

```ruby
module MyGreatGem
  module SomeOtherNamespace
    module OmgAnotherNamespace
      module LolYeahOneMore
        class SomethingGreat
          class SomethingOk
            class MyGreatClass
              def initialize
                puts "OMG I only have 64 characters to express something on " \
                     "this line! And now it's more like 'these lines' haha"
              end
            end
          end
        end
      end
    end
  end
end
```

Often strings are the first thing to get chopped up, as in that example.

The only approach I thought of to deal with that is to organize my code
differently to not use many nested namespaces. That's probably not the worst
idea, honestly, but I'm writing this post to share an interesting style I
observed in the wild (read: on github) that takes a whole nother approach:

```ruby
# Excerpted from:
# https://github.com/net-ssh/net-sftp/blob/ebf5d5380cc533b69b308baa2e396e4a18abc900/lib/net/sftp/operations/dir.rb
module Net; module SFTP; module Operations
  class Dir
    attr_reader :sftp

    def initialize(sftp)
      @sftp = sftp
    end
  end
end; end; end
```

Huh! That's a style I hadn't seen before. RuboCop has many complaints about it,
and I don't totally love the style, but it's a very novel and neat way to do it,
and it certainly frees up columns to spend on your code if you're planning to
stick to an 80 character limit.

One possible alternative is to define your namespaced class using this
shorthand:

```ruby
class Net::SFTP::Operations::Dir
  attr_reader :sftp

  def initialize(sftp)
    @sftp = sftp
  end
end
```

If you do that, you get 2 extra characters on each line. Sweet!

One problem: it sort of doesn't work, at least not in the same way.

If you just look at that example, and imagine that you're the Ruby interpreter
trying to figure out what this code means, how are you supposed to know whether
`Net`, `SFTP`, and `Operations` are supposed to be classes or modules? You have
to *already know* by them being previously defined. If they haven't been defined
yet, you are well within your right to raise a `RuntimeException` to complain
that this constant hasn't been defined yet, rather than try to guess.

Both of the earlier longhand examples were explicitly explaining what the type
of each namespace constant is. That pattern works whether you're defining the
module or class in that moment, or "opening" a previously defined module or
class to add something new to it. This shorthand, while optimal for line length,
only works when opening previously defined constants.

One downside of this approach is that, by relying on all of the namespaces being
predefined, it becomes harder to test this class in isolation (it's probably
possible to do it through [some gnarly stubbing][stubbing] but, harder). You're
also introducing some requirements about the order in which the files from your
code need to be loaded, which feels kind of fragile.

[stubbing]: /2015/stubbing-constants/

One *possible* upside comes to mind. When you follow the typical pattern of
writing out all the namespace modules and classes, you introduce some room for
error: what if in one file you write `class Operations` by mistake (instead of
`module Operations`)? You'll get an error. That's not too bad, honestly.

I think 80 is usually enough but if you're doing too many contortions to stay
in that box, try like 90 or 100, you're still a good person.
