---
title: heredocs in ruby
date: 2021-02-03 00:28
---


I've recently been writing a lot of heredocs in Ruby.
We have to talk about it.

## what is the deal with heredocs?

It's one of the ways to make a string.
It looks like this:

```ruby
def help
  <<TEXT
Help.
I need somebody
TEXT
end

help # => "Help.\nI need somebody\n"
```

The idea is that you have some all caps label on the first line (`TEXT` in that example), and then Ruby will look at the next line as the start of the string, and keep going until it sees that label again, and then the string is over.

It's pretty similar to just using quotation marks like usual:

```ruby
def help
  "Help.
I need somebody
"
end

help # => "Help.\nI need somebody\n"
```

One nice thing about the heredoc syntax is that you can use quotation marks in the middle of the string, and you don't need to worry that you're accidentally going to close the string.

That's a pretty standard one, but there are a bunch of variations on the theme.

For example, this one is more common in my experience:

```ruby
def help
  <<-TEXT
Help.
I need somebody
  TEXT
end

help # => "Help.\nI need somebody\n"
```

It looks a little nicer to indent the closing `TEXT` at the same level as the starting one, but that's not allowed with standard heredocs.
If you want to do that, you need to start the heredoc with `<<-` instead of `<<`.

It would look _even_ nicer if you could indent the text of the string itself.
Unfortunately, if you do that, it affects the actual value of the string:

```ruby
def help
  <<-TEXT
    Help.
    I need somebody
  TEXT
end

help # => "    Help.\n    I need somebody\n"
```

No worries -- they thought of that.
You can use the "squiggly heredoc" syntax, which lets you write it like that without actually affecting the value of the string:

```ruby
def help
  <<~TEXT
    Help.
    I need somebody
  TEXT
end

help # => "Help.\nI need somebody\n"
```

Most of the time, you should use a squiggly heredoc.

There is one last variation, which I've never seen in production code, but which I'll share for completeness's sake.
This is the single-quote heredoc:

```ruby
def help
  <<~'TEXT'
    Help.
    I need #{somebody}
  TEXT
end

help # => "Help.\nI need \#{somebody}\n"
```

When you put single quotes around `TEXT` -- our heredoc delimiter in these examples -- Ruby will treat the string like a single-quoted string rather than a double-quoted string.
You know how in Ruby, if you want to use interpolation, you need to use double quotes?

```ruby
"#{1 + 1}" # => "2"
'#{1 + 1}' # => "\#{1 + 1}"
```

Well, someday you'll want to create a heredoc which behaves like a single quoted string (I don't know why, to be honest) and you'll be glad that you can.

## why have I been writing so many heredocs recently?

At work, we use [Rubocop](https://rubocop.org/) to format our code.
One of its rules, [Layout/LineLength](https://docs.rubocop.org/rubocop/1.3/cops_layout.html#layoutlinelength), checks that your lines aren't longer than 120 characters.
I think it's a pretty good rule, and I'm gradually updating the existing code to follow it.

For the most part, it's pretty straight-forward.
Maybe you have a line that looks like:

```ruby
foo(:a, :b, :c)
```

And you change it to

```ruby
foo(
  :a,
  :b,
  :c,
)
```

Great, now it's growing vertically instead of horizontally.

But what about lines that look like:

```ruby
Rails.logger.info "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
```

What do you do with that?

Let's throw a heredoc on it:

```ruby
Rails.logger.info <<~MSG.chomp
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
MSG
```

It's still quite long, but the Rubocop rule has a loophole: heredocs are fine.
You can disable this loophole via configuration, but I don't want to, I like it.
As a reader, I know that when I'm looking at a heredoc, the whole thing is a string; even if part of it's off screen, I'm not missing much, it's just more string.

If we wanted to disable the loophole, we might write that as:

```ruby
Rails.logger.info <<~MSG.squish
  Lorem ipsum dolor sit amet,
  consectetur adipiscing elit,
  sed do eiusmod tempor incididunt
  ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis
  nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea
  commodo consequat. Duis aute
  irure dolor in reprehenderit in
  voluptate velit esse cillum dolore
  eu fugiat nulla pariatur. Excepteur
  sint occaecat cupidatat non proident,
  sunt in culpa qui officia deserunt
  mollit anim id est laborum.
MSG
```

That uses the `String#squish` method in Rails, which squishes a multi-line string onto one line.
Is that better?
That's between you and your God.
I can go either way.

## One unexpected benefit of using heredocs

Imagine this code:

```ruby
def my_great_query
  "select count(*) from users"
end

my_great_query # => "select count(*) from users"
```

When you're editing that code in your text editor, your editor is using syntax highlighting to help you.
Maybe it's turning all of the keywords orange, or all of the method names blue.
This can help your eyes to scan thru the code, and can help alert you to syntax errors.
But that string on the second line is just a string, and it looks like all of the other string literals.
Your editor does not know that it is a fragment of SQL, and that it can apply its SQL syntax highlighting to the contents of that string.
How could it know that?

Well, imagine if you wrote it like this instead:

```ruby
def my_great_query
  <<~SQL.chomp
    select count(*) from users
  SQL
end

my_great_query # => "select count(*) from users"
```

Now your editor has a context clue it can use, and perhaps it will elect to apply SQL highlighting to that string.
VS Code, for one, does.
I only use VS Code [sometimes](/2021/ripgrep-in-vscode/), but it's things like this that give me a little pop of delight and make me want to make it more of a habit.

## some of the quirks of using heredocs

One thing that really must be said before putting a bow on this blog post is that heredocs are kind of ... weird.
Like, what if you want to call a method on a heredoc, like to reverse it?
It kind of feels like you should put that `.reverse` all the way at the end, like you would for a normal string:

```ruby
# this is invalid
def help
  <<-TEXT
    Help.
    I need somebody
  TEXT.reverse
end

help
```

Why is this invalid?
Well, remember what I said at the beginning of this blog post

> Ruby will look at the next line as the start of the string, and keep going until it sees that label again, and then the string is over

(Yes I'm quoting this blog post in this blog post.
I'm pretty sure that's allowed.)

I could have been more clear there but I didn't want to be so clear that it was confusing: the string ends when Ruby sees a line that has that label **and nothing else**.
If it sees `TEXT.reverse`, that does _not_ satisfy that rule.

So you need to write it like:

```ruby
def help
  <<-TEXT.reverse
    Help.
    I need somebody
  TEXT
end

help # => "\nydobemos deen I    \n.pleH    "
```

One last quirk, via my colleague Ian.
What if you want to start two heredocs on the same line?
You probably shouldn't, but it is possible:

```ruby
def help
  [<<~TEXT, <<~SQL]
    Help.
    I need somebody.
  TEXT
    select * from lyrics
  SQL
end

help # => ["Help.\nI need somebody.\n", "select * from lyrics\n"]
```

Whoa.
