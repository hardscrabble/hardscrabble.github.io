---
title: how to run shell commands from ruby if you care about their output or if they failed
date: 2016-01-31 22:02 EST
---

Recently I made a new gem called [shell whisperer][1] which you might find
useful for when your ruby programs need to run shell commands.

[1]: https://rubygems.org/gems/shell_whisperer

Let's say you want to write a script which prints a summary of the current
directory. The desired output is:

{% highlight text %}
There are 213 files in this git repo.
Last commit: fixed a typo
{% endhighlight %}

There are two questions we need to ask the shell in order to print this output.

First question: how many files are there in this git repo?

First answer: we can ask git to list the files in the repo, and pipe the list to
the word counting command to get the answer:

{% highlight bash %}
git ls-files | wc -l
{% endhighlight %}

Second question: what is the last commit?

Second answer: we can ask git for the log, limited to the most recent commit,
and formatted to include just the first line:

{% highlight bash %}
git log -1 --pretty="%s"
{% endhighlight %}

So far so good, but how do we run these commands from Ruby?

The language provides two ways that I'm aware of:

{% highlight ruby %}
# backtick style
`git ls-files | wc -l`
{% endhighlight %}

Or:

{% highlight ruby %}
# system style
system 'git ls-files | wc -l'
{% endhighlight %}

What is the difference? I don't want to go into all of the nuances (see
[this SO post for that and more][2]) but I'll share how I think of the
difference:

1. if you use the backtick (`) style, the return value is whatever was output by
   the command -- but only STDOUT, not STDERR, so you'll miss error messages
1. if you use the system style, the output from the command will go to STDOUT,
   as if you had run `puts` and output some text, and the return value will
   signify whether the command failed or not

[2]: http://stackoverflow.com/a/18623297

So our program might look something like this:

{% highlight ruby %}
count = `git ls-files`.each_line.count
message = `git log -1 --pretty="%s"`.chomp
puts "There are #{count} files in this git repo."
puts "Last commit: #{message}"
{% endhighlight %}

And this is *okay*.

The issue becomes: well, what do you if you care that the command might fail?
The system style allowed for checking the return value to see whether it
succeeded or failed, but there's a reason we're not using the system style: we
care about capturing the output of the command. So with the backtick style, we
can capture the output, but (seemingly) we can't capture the successfulness.

Well, we can, it's just a little awkward:

{% highlight ruby %}
count = `git ls-files`.each_line.count
raise 'list failed somehow' unless $?.success?
message = `git log -1 --pretty="%s"`.chomp
raise 'message failed somehow' unless $?.success?
puts "There are #{count} files in this git repo."
puts "Last commit: #{message}"
{% endhighlight %}

Which, OK, kind of cool, but what if we want to know *why* it failed?

This is possible:

{% highlight ruby %}
count_or_failure_reason = `git ls-files 2>&1`.each_line.count
raise count_or_failure_reason unless $?.success?
message_or_failure_reason = `git log -1 --pretty="%s" 2>&1`.chomp
raise message_or_failure_reason unless $?.success?
puts "There are #{count_or_failure_reason} files in this git repo."
puts "Last commit: #{message_or_failure_reason}"
{% endhighlight %}

Let me attempt to explain this. The `2>&1` part means that we want the STDERR
stream to be directed to the STDOUT stream, so that we'll capture either one
(or both). This gives us access to the reason the command failed, if it failed,
but still gives us access to the output if it succeeds.

I found myself doing this in multiple places, so I decided to wrap this pattern
up in a tiny gem, which allows you to instead write your program like this:

{% highlight ruby %}
require 'shell_whisperer'
count = ShellWhisperer.run('git ls-files').each_line.count
message = ShellWhisperer.run('git log -1 --pretty="%s"').chomp
puts "There are #{count} files in this git repo."
puts "Last commit: #{message}"
{% endhighlight %}

If any of the commands fail, that error message will be re-raised as a
`ShellWhisperer::CommandFailed` exception, so you can handle that as you please.

The node.js community seems to be all about tiny modules, and I think that idea
is very cool, and I'm hoping to find more opportunities to do that with Ruby.
