---
title: chainable shell functions
date: 2017-02-06 22:21 EST
---

I learned a neat shell script refactoring strategy yesterday that I'd like to share.
First some background:

I used to use a rubygem to help me write this blog.
When I wanted to create a new post called "chainable shell functions" I would have run:

```
bin/poole draft "chainable shell functions"
```

And it would create a file called `_drafts/chainable-shell-functions.md` with some metadata in the first few lines.

Yesterday I got the urge to try replacing that rubygem with a custom shell script which does exactly the same thing.

I am an enthusiastic novice shell scripter.

I'm vaguely aware there are different dialects of shell scripting and that I'm probably using the wrong one.

Really I'm not expert in this stuff.

But while writing this one I learned something interesting that I'm going to share with you now.

Here is the first draft (annotated with comments for your convenience):

```bash
#!/usr/bin/env bash

# fail fast if any expression fails
set -e

# read all of the arguments into a string
title="$*"

# OK don't worry about this gnarly line, I'm going to break it down
slug=$(
  echo "$title" | sed "s/ /-/g" | tr -dc '[:alnum:]-' | tr '[:upper:]' '[:lower:]'
)

# the file we're going to create
filename="./_drafts/$slug.md"

# create the folder if it doesn't already exist
mkdir -p _drafts

# stop if the file already exists -- I don't want to overwrite an in-progress draft
if [[ -e "$filename" ]]; then
  echo "$filename already exists"
  exit 1
fi

# create the draft by piping a string into a file
echo "---
title: $title
date: $(date '+%Y-%m-%d')
---

Alright, this is where your post goes." > $filename

# Print a successful message
echo "Created $filename"
```

OK did you read that?
Great.

So you saw that line I promised I would break down?
The idea with that line is that I want to take the input, which is the _title_ of the post, and figure out what is an appropriate filename for the post.
I'm figuring that out by applying a series of transformations to the title:

* `echo "$title"`
  * just repeats the title, directing the output into a "pipe", which the next command will read
* `sed "s/ /-/g"`
  * `sed` is a "stream editor"; it reads in a stream of data and prints out a stream of data
  * here we're using regular expressions to "s" or _substitute_ all occurences of ` ` (space) with `-` (hyphen)
  * we want hyphens because they make for nicer looking URLs than spaces, which get escaped to `%20`.
  * the `g` at the end means "global"; without it, we would only subsitute the first space
* `tr -dc '[:alnum:]-'`
  * `tr` is short for "translate"
  * `-d` means "delete"
  * `-c` means "complementary"
  * this command means "delete all the characters that complement this set of characters"
  * in other words, "delete all the characters that aren't alphanumeric or a hyphen"
* `tr '[:upper:]' '[:lower:]'`
  * "translate" again!
  * this time we're translating all of the upper-case letters to lower-case letters
* Finally, we stop piping the output to the next command, and we're done, so the result is saved in that local variable.

OK so that's a lot going on in one line, and because of the compact nature of these commands, it's not super readable.

In other languages, when I have a lot going on in one function, I want to split out smaller, well-named functions.
Can I do the same thing here?

At first I wasn't sure.
I knew it was possible to write functions that received arguments by checking `$1`, `$2`, etc in the function,
but I wasn't sure how to make them "return" values...

After a little googling I learned: **you can just write a shell function that calls commands that read from a pipe, and pipe things to that function**.

Let me show you what I mean.

Here's the second (and, frankly, final) draft:

```bash
#!/usr/bin/env bash

set -e

function dashify() {
  sed "s/ /-/g"
}

function removeSpecialChars() {
  tr -dc '[:alnum:]-'
}

function downcase() {
  tr '[:upper:]' '[:lower:]'
}

title="$*"
slug=$(
  echo "$title" | dashify | removeSpecialChars | downcase
)
filename="./_drafts/$slug.md"
mkdir -p _drafts

if [[ -e "$filename" ]]; then
  echo "$filename already exists"
  exit 1
fi

echo "---
title: $title
date: $(date '+%Y-%m-%d')
---

Alright, this is where your post goes." > $filename

echo "Created $filename"
```

Look at that!
