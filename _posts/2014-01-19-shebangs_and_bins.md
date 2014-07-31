---
title: shebangs and bins
date: 2014-01-19 14:36
---

I had a thought the other night as I was falling asleep: I guess I could create my own shebang? I asked Siri to remind me later and fell asleep.

OK what's a shebang? I'm going to try to explain my understanding of it step by step, forgive me if this is obvious or boring.

So let's say you write a ruby program that looks like this:

{% highlight ruby %}
# hello.rb
puts "hello world"
{% endhighlight %}

And you run it from the command line by writing `ruby hello.rb` and hitting enter.

Or maybe write basically the same thing in python like this:

{% highlight python %}
# hello.py
print "hello world"
{% endhighlight %}

And run it from the command line by writing `python hello.py` and hitting enter.

And the same thing in CoffeeScript

{% highlight coffeescript %}
# hello.coffee
console.log "hello world"
{% endhighlight %}

And run it by writing `coffee hello.coffee` and hitting enter.

Three different files are interpreted as three different programming languages by three different intrepreters. We indicate which language it is written in and should be interpreted as in two ways in those examples:

1. which command we invoked (`ruby`, `python`, and `coffee`)
1. the file extension (`rb`, `py`, `coffee`)

The file extension isn't really necessary. See:

{% highlight ruby %}
# hello.sandwich
puts "hello world"
{% endhighlight %}

? This file can be run with `ruby hello.sandwich` and it works totally fine. Probably continue to use conventional file extensions because they signal to your text editors and friends what type of file they are. But I think it's kind of helpful to know that they're not totally necessary or magical.

OK so what if you want to call this program without specifying the interpreter every single time? This is where shebangs come in:

{% highlight ruby %}
#!/usr/bin/env ruby
# hello.sandwich
puts "hello world"
{% endhighlight %}

Now this is a file with a nonsense file extension but something new: the first line (the shebang) indicates which program is meant to interpret this file. Interestingly, it's not a direct path to that binary file on your file system (which in the case of Ruby programmers who use [rvm](http://rvm.io) to switch between Ruby versions, is often changing -- mine is currently at `/Users/maxjacobson/.rvm/rubies/ruby-2.1.0-p0/bin/ruby` but only because I'm checking out the newly released Ruby 2.1.0), but instead consults your environment and says "hey, I'm looking for something called ruby, who wants to handle this one?"

How do you call this file if you don't specify the interpreter? Basically you just provide a path to the file, like this: `./hello.sandwich`. You'll probably get this error: `bash: ./hello.sandwich: Permission denied`. I'm sure there are very good security reasons for this but it's kind of annoying honestly. You need to run `chmod +x hello.sandwich` which transforms the script from a generic text file to an "executable" file. If you do that, now you can run `./hello.sandwich` and your program will run thru the ruby interpreter.

What is the `./` part? It's kind of ugly, and it's the next thing we want to get rid of. It's a path to the file. The same way you might run `cd ..` to change directories up a directory, you can run `cd .` to remain in your current directory. I know programming has irrevocably ruined my sense of humor because I now find it funny that you can run `cd ././././././.` to remain where you are. So `./hello.sancwich` is a path to a file in the current directory.

Let's actually rename the file to have *no* file extension (`mv hello.sandwich sandwich`) and run it again `./sandwich`. Still works. It's totally possible to run this file without the `./`, but we need to put it somewhere special. We need to put it on our `$PATH`, which is a list of all of the places on your computer you keep these executable files. To see your `$PATH` you can run `echo $PATH` and you'll see them spat out all colon separated. You can move your file to one of those directories or create a new directory, probably located at `~/bin` or `~/Dropbox/bin` ([via](http://www.leancrew.com/all-this/2013/05/dropboxbin/)), and add it to your `$PATH`.

`$PATH` is a global variable in your command line environment and it can be edited like this: `export PATH="whatever"` but probably don't do that because it will totally overwrite the variable in your current terminal session and you won't have access to any of the executables you depend on and you won't be able to do anything. The common way to append a directory to your `$PATH` is like this: `export PATH=~/bin:$PATH`, which sets the variable to `~/bin`, a colon, and then everything that used to be in the variable. Perfect. If you want this directory to *always* be accessible, not just in the current terminal session, you should add that line of code to your `~/.bashrc` or `~/.bash_profile` file[^1] and it will be included in every new terminal session.

So, if your `sandwich` file is in a directory that's on your `$PATH`, and it has the shebang that specifies its interpreter, you can now run simply `sandwich` from *anywhere* on your computer and it will call that program. It's kind of amazing how it does it, right? You write the word sandwich, hit enter, and it looks thru a list of directories for a file with that name; when it finds one, it checks its permissions, then looks at the first line to figure out how to interpret the file; that line points to an environment-checking program and passes in the argument "ruby"[^2], which finds the correct ruby interpreter, and then calls it, evaluating the remainder of the program.

[^1]: Unfortunately still don't have a really solid understanding of the difference between those.

[^2]: `env` is available to use from the command line as well: try running `env ruby -v`

OK so that's awesome. But what if I want to write this program:

{% highlight ruby %}
#!/usr/bin/env sandwich
# grilled_cheese
make_sandwich(
  ingredients: [
    "rye",
    "american cheese",
    "some sprinkles of gorgonzola",
    "maybe some sweet chili sauce",
    "butter"
    ],
  directions: [
    "get ingredients",
    "assemble a sandwich",
    "melt a little butter in a pan",
    "put the sandwich in the pan",
    "apply some downward pressure",
    "flip",
    "apply some downward pressure",
    "enjoy"
  ]
)
{% endhighlight %}

OK so I put "sandwich" in my shebang instead of a real programming language. What. Haha.

Let's make the `grilled_cheese` file executable and put it in our bin, and then run `grilled_cheese`. We want to confirm that it's looking up and finding the sandwich program and running it. When we see "hello world" again, we know it is. But it's not making a sandwich! But then, how can it? Our code isn't even being evaluated; if it were, we would probably have an error because the `make_sandwich` method is not availabe in the Ruby Standard Library (unfortunately).

Let's edit our sandwich program to get a sense of what it knows about our grilled cheese program.

{% highlight ruby %}
#!/usr/bin/env ruby
# sandwich
puts ARGV.inspect
{% endhighlight %}

Now when I run `grilled_cheese`, instead of seeing "hello world" I see `["/Users/maxjacobson/bin/grilled_cheese"]`. Ahaa! Just because we invoke the sandwich program from the grilled cheese program doesn't mean we will automatically evaluate the grilled cheese code. We just pass the filename as an argument, much like when we run `ruby hello.rb`. It's a lot like if we ran `sandwich grilled_cheese`.

OK so knowing that, maybe our sandwich file should look something like this:

{% highlight ruby %}
#!/usr/bin/env ruby
# sandwich

def make_sandwich(options)
  options[:ingredients].each do |ingredient|
    print "Finding #{ingredient}..."
    sleep 1
    print " done!\n"
  end
  options[:directions].each do |step|
    print "Doing #{step}..."
    sleep 1
    print " done!\n"
  end
end

eval File.read(ARGV.first)
{% endhighlight %}

So, this defines our missing method, takes in the file as an argument, reads the file as a string, and then evaluates the file with `eval`. OK so the only thing I know about eval is that you probably should never use it because it's dangerous af. But maybe this is the kind of context where it makes sense?

* * *

I'm sure there are actually practical reasons to use custom-written programs in the shebangs of other custom-written programs and if you think of any please let me know.
