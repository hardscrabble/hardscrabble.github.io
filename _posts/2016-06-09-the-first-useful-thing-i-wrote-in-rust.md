---
title: the first useful thing I wrote in Rust
layout: post
date: 2016-06-09 01:27

---

I've been interested in the [Rust programming language][1] for a while, but it wasn't until this week that I wrote something in it which I found useful.

[1]: https://www.rust-lang.org

Let's rewind.
I like to have a random, nice emoji in my shell prompt.
It's just to add a little flair to the proceedings, some color.
The emoji don't [mean anything](http://maximomussini.com/posts/bash-git-prompt/), they're just for fun.

My shell prompt is [set like this][2]:

[2]: https://github.com/maxjacobson/dotfiles/blob/c3ca325eb27173046bb504327f7a30613416c5f8/.zsh-customizations/terrorhawk.zsh-theme#L23

```shell
PROMPT="%F{grey}%C%f \$(random_nice_emoji) \$(git_prompt) "
```

`random_nice_emoji` is a command line program on my PATH.
`git_prompt` is a shell function.
The `\$(...)` syntax means that the program or function should be called each time the prompt is drawn, not just once when you first open your terminal.

I could have written `random_nice_emoji` as a shell function if I could figure out how to use shell arays, but I could not.

Instead I wrote it as a simple ruby script:

```ruby
#!/usr/bin/env ruby

print %w(
  🐖
  😅
  🌸
  🐙
  🎑
  🖌
  ☕
  📊
  🐋
  🌈
  ✨
).sample
```

And my prompt looks like this:

![my prompt, where each line includes a random fun emoji](/img/2016-06-09-prompt.png)

But over time I noticed that it was kind of..... slow.
And I started to wonder if maybe my fun affectation was worth it.
Some benchmarking suggests that this program takes about a tenth of a second to run.
That's not a lot, really.
But we can do better.

Maybe the shell function would be much faster, but yea, still don't know how to use shell arrays.

So let's try writing this little script as a Rust program -- Rust is supposed to be fast!

To make a new command line program in Rust, you can [use Cargo](http://doc.crates.io/#lets-get-started) to scaffold the project:

```shell
cargo new random_nice_emoji --bin
```

The `--bin` part means that it will be a command line program.
Without it, I think the idea is that you're making a package which will be used in an application.

That command crates a directory called `random_nice_emoji`, and within that there is a file `src/main.rs` which is where you put your code which should run when the command line program is invoked.

Here's what I came up with (I'm really new to Rust so this isn't necessarily good code):

```rust
extern crate rand;
use rand::distributions::{IndependentSample, Range};

fn main() {
    // cool, friendly emoji that look fine against a black terminal background
    let list = vec!["🐖", "😅", "🌸", "🐙", "🎑", "🖌", "☕", "📊", "🐋", "🌈",
                    "✨"];
    let between = Range::new(0, list.len());
    let mut rng = rand::thread_rng();
    let index = between.ind_sample(&mut rng);
    let emoji = list[index];
    print!("{}", emoji);
}
```

I couldn't find a super-simple `sample` method, so I did my best to adapt the example from [the docs for the rand crate](https://doc.rust-lang.org/rand/rand/index.html) to achieve that behavior.

You can install it yourself with `cargo install random_nice_emoji`.
Maybe I shouldn't have released it because it's not generally useful -- but it's very convenient for me so I can install it on multiple computers, for example.

And this one usually finishes in 0.006 seconds -- 16 times faster.
And it was maybe 5 times harder to write?
I'm hopeful that if I get better at Rust, that will go down.

If you're into Ruby and intrigured by Rust, I recommend checking out [this Helix project](http://blog.skylight.io/introducing-helix/) which makes it easy to embed Rust code in Ruby projects to ease performance hot spots.
I haven't used Helix yet, but that talk does a really great job of explaining the idea and was really inspiring to me.
