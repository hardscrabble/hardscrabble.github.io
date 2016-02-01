---
title: random emoji in prompt
date: 2013-06-13 7:05 PM
category: coding
tags:
- terminal
- bash
- emoji
---

So this is fun. Most of us at school have some symbol or emoji in our bash prompts. I've had a little piggie emoji for a few weeks which has served me fine but I'd like to introduce some... *chance* into my life. I want to have a random emoji in my prompt. Originally I wanted a new icon on a per-terminal-session basis but then I decided I wanted a new one *after every command*.

Here's a simple Ruby script to print a random emoji from a nice subset of positive ones (no murder weapons or pills or bills)[^encodingmakesmesad]:

[^encodingmakesmesad]: Note: I'm painfully aware that most of those emoji are probably not showing up for you in your browser right now. I don't understand what exactly emoji are or how they work enough to try to fix that. If you want to do this you will probably need to re-populate that line with your favorite picks.

{% gist 5779455 %}

I have this exact file saved in my home directory. It's a dotfile (hidden file) because for the most part I don't want to see it. Maybe there's a better place to put it.

In order to get the output of that script into my prompt, I need to udpate my `PS1` bash variable. In order to refresh it after every command I need to do this weird thing I've never done before (this goes in my bash profile):

{% gist 5779447 %}

The `PROMPT_COMMAND` variable can be assigned some shell script code to run before every drawing of the prompt. In this case, it's calling a function called `set_prompt`, which runs the Ruby program and interpolates its response into the `PS1` variable, so it's different each time.

In order for the Ruby script to be executable by other code, we need to adjust its permissions. If you don't do this, you get an error instead of a pig. You can run `chmod a+x ~/.emoji.rb`.

I'm happy. I'm gonna keep adding / removing / futzing with my emoji set. The code should work with any number of items in there, so I may go wild. The easiest way to get at them on a Mac is, from any text field, the **Edit** menu, then **Special Characters** (tip [via classmate Samantha Radocchia's blog](http://blog.samantharadocchia.com/post/52272246893/heres-how-customize-the-command-line-by-adding-emoji)).

If you try this and get it working, let me know on twitter at [@maxjacobson](http://twitter.com/maxjacobson) #sleaze

* * *

## EDIT on July 4

Actually this code totally sucks. It's not at all necessary to use `PROMPT_COMMAND`. You can change this:

```bash
function set_prompt {
  export PS1="[\@] [\W]\n$(~/.emoji.rb) "
}
export PROMPT_COMMAND=set_prompt
```

to:

```bash
export PS1="[\@] [\W]\n\$(~/.emoji.rb) "
```

The only breakthrough I had is that `\$(function_name)` runs the function over and over where `$(function_name)` only runs it once. No idea why.

This fixes the bug where the Terminal wasn't remembering my current working directory and auto-cd-ing into it when I open a new tab.

It should also be easier to drop this into your current prompt. Just add `\$(~/.emoji.rb)` wherever in your `PS1` you want it.
