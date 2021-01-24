---
title: A little trick that makes using ripgrep in visual studio code nicer
date: 2021-01-24 17:23
---

Hello friends, happy new year.
I'm writing now to share a quick tech tip.

One of my most-used command line utilities is `rg` aka [ripgrep], which I use to search thru a codebase and print out results.
Using it looks like this:

[ripgrep]: https://github.com/BurntSushi/ripgrep/

```
$ rg 'class User\b' activemodel
activemodel/lib/active_model/secure_password.rb
42:      #   class User < ActiveRecord::Base
111:        #   class User < ActiveRecord::Base

activemodel/lib/active_model/serialization.rb
97:    #   class User

activemodel/lib/active_model/attribute_methods.rb
8:  #   class User < ActiveRecord::Base

activemodel/test/models/user.rb
3:class User

activemodel/test/cases/serialization_test.rb
7:  class User
```

(Thank you to [rails/rails] for being my model repo for this blog post).

[rails/rails]: https://github.com/rails/rails

This output is nice:

* Very readable
* When it prints in your terminal, it uses color to show you which part of the line matched your search
* It's clear which matches go with which files, even when some files have multiple matches

We can contrast with the similar grep invocation:

```
$ grep --line-number --color=always --recursive 'class User\b' activemodel
activemodel/test/cases/serialization_test.rb:7:  class User
activemodel/test/models/user.rb:3:class User
activemodel/lib/active_model/serialization.rb:97:    #   class User
activemodel/lib/active_model/attribute_methods.rb:8:  #   class User < ActiveRecord::Base
activemodel/lib/active_model/secure_password.rb:42:      #   class User < ActiveRecord::Base
activemodel/lib/active_model/secure_password.rb:111:        #   class User < ActiveRecord::Base
```

A few UX things of note:

1. you need to tell it to search recursively in the directory
2. you need to opt in to color
3. you need to opt in to line numbers
4. the output is very compact which makes it well-suited for scripting but less pleasant for a human to scan through

Additionally: grep is not git-aware, so it will look at every file, even if it is listed in your `.gitignore`.

So, anyway, I tend to prefer using ripgrep.

My workflow is generally confined to a terminal, with vim and tmux being the key players.
But not always.
Sometimes I pop open Visual Studio Code, if I'm doing something which will benefit from using the mouse a lot.

VS Code has a nice feature where you can run a terminal right inside the app, under your editor.
Of course, VS Code has a nice code search feature built right in, but my muscle memory has me always opening a terminal and using ripgrep to search for something.

This is where things get interesting.
VS Code _also_ has a nice feature where you can ⌘-click in the terminal on a file path, and it will open that file path in a VS Code tab.
That pairs really well with ripgrep: often I'm searching the repo because I want to open up those files and make some tweaks.
If that file path is formatted with the line number, like `path/to/file.rb:45`, then ⌘-clicking on it will open the file _and jump to that line_.
If it looks like `path/to/file.rb:45:17`, it jumps to the line _and_ column.

That's very nice.
But, sadly, does not work well with the default ripgrep output format, which has the line number on a separate line from the file path.

Now, ripgrep has a whole bunch of options for customizing its behavior and output.
By using these options, I can make it print output in a format that works well with VS Code's ⌘-click feature:

```
$ rg --no-heading --column 'class User\b' activemodel
activemodel/lib/active_model/secure_password.rb:42:11:      #   class User < ActiveRecord::Base
activemodel/lib/active_model/secure_password.rb:111:13:        #   class User < ActiveRecord::Base
activemodel/lib/active_model/attribute_methods.rb:8:7:  #   class User < ActiveRecord::Base
activemodel/lib/active_model/serialization.rb:97:9:    #   class User
activemodel/test/models/user.rb:3:1:class User
activemodel/test/cases/serialization_test.rb:7:3:  class User
```

I decided that I would like rg to behave like this when I invoke it inside of a VS Code terminal, but otherwise print output in its normal way.
I did not want to have to remember to use those flags.
I've learned that when a solution depends on me remembering to do something, it's not going to be a successful solution.

I added this to my shell intialization:

```shell
if [[ "$TERM_PROGRAM" == 'vscode' ]]; then
  alias 'rg'='rg --smart-case --hidden --no-heading --column'
else
  alias 'rg'='rg --smart-case --hidden'
fi
```

Now I can use `rg` anywhere I want, and it behaves how I want.
Nice.

It's still pretty compact and not that human-scannable.
I think I'd like it even better if the output looked like this:

```
activemodel/lib/active_model/secure_password.rb:42:11
#   class User < ActiveRecord::Base

activemodel/lib/active_model/secure_password.rb:111:13
#   class User < ActiveRecord::Base

activemodel/lib/active_model/attribute_methods.rb:8:7
#   class User < ActiveRecord::Base

activemodel/lib/active_model/serialization.rb:97:9
#   class User

activemodel/test/models/user.rb:3:1
class User

activemodel/test/cases/serialization_test.rb:7:3
class User
```

But I couldn't figure out how to make it do that.
Life is full of compromises.
