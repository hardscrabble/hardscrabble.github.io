---
title: An Alfred Workflow for adding the frontmost Firefox tab to OmniFocus with AppleScript
layout: post
date: 2014-07-13 20:33
---

Saw [a link](http://www.macstories.net/linked/tools-to-organize-browser-tabs-for-mac-users/) about using tools to take long-lasting tabs out of your browser and put them somewhere useful like Evernote or OmniFocus rather than let them tax your mind and memory. I wanted in.

Sadly, there was only support for Chrome and Safari, not Firefox, which I continue to stubbornly prefer. I assumed at first this was simply a reflection of Firefox not being particularly popular among Mac users[^stats] and resolved to patch the gap.

[^stats]: [Recently on the Accidental Tech Podcast](http://atp.fm/episodes/73) I was [surprised](https://twitter.com/maxjacobson/status/487583151577763843) to hear the hosts be super harsh to Firefox. [This tweet](https://twitter.com/gruber/status/487768231927504898) makes the argument that Firefox isn't relevant anymore and I don't really know if that's true, but I think it *should* be.

In order to interact with your running Mac applications, people often use AppleScript, a kind of strange programming language that comes with Macs and lets you script or automate user tasks. So whenever I want to close a tab without forgetting that it might matter somehow, I have to do these steps manually:

* open the omnifocus quick entry panel with the global hotkey
* write some kind of task title
* go back to the browser
* copy the URL
* go back to the quick entry panel
* type `⌘+'`, the keyboard shortcut to open the notes field
* paste the URL
* type `⌘+i` again to return to the title field
* press enter twice

Imagine having two dozen tabs open and kind of wanting to do that for each of them? Prime candidate for automation!

Given that this is my first AppleScript, I'm bizarrely confident that I can figure this out. I assume I can just ask Firefox for the list of currently open URLs, write some kind of loop, and then send OmniFocus a bunch of messages (in the background maybe) and have it all just work easily. Pretty quickly I learn that, unlike Safari and Chrome, Firefox exposes nothing to AppleScript. It's scriptable insoafar as every app is scriptable -- you can perform user actions like clicking and typing, but it doesn't expose anything nicely, and Mozilla's bugtracker has multiple tickets dating back several years of people saying they wish Firefox supported AppleScript without much movement as far as I can tell.

No worry! I'll find some clever solution. I open AppleScript Editor and start trying to figure out how to even do any of this.

{% highlight applescript %}
tell application "FirefoxNightly" # I'm using the nightly build, and I have to specifically say so
  activate # this opens or switches to the application
end tell
{% endhighlight %}

### a digression about running AppleScripts

You can write small things like this in the AppleScript Editor app and run them from there. This is what I was doing while writing the thing and tinkering. But it's not a great interface, really, as far as text editors go. Another option is to use the texteditor of your choice and run it from the terminal by writing `osascript your_file.scpt`. There's something kind of trippy about running something like this, and seeing your operating system react:

{% highlight text %}
[hardscrabble] [hardscrabble.net] [my-first-applescript branch]
⇥ osascript -e 'display alert "hello world"'
button returned:OK
{% endhighlight %}

Later on you can use tools like Alfred to run your scripts from anywhere at any time.

### back to struggling with this code

So if Firefox doesn't expose anything to us, how can we get the list of tabs open? I went down a few dead ends. I spent several minutes trying to make a bookmarks group of the currently opened tabs, then export the bookmarks, then parse the exported file before I realized I was definitely going the wrong way and I definitely didn't know how to do parse JSON in AppleScript.

After a little more googling I came upon [a comment on Bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=516502#c21) which provides a way to get the current page's URL at least. Here's how:

{% highlight applescript %}

tell application "FirefoxNightly"
  activate
  delay 2 # sleeps 2 seconds because idk... it doesn't work otherwise
  tell application "System Events"
    tell process "firefox"
      keystroke "l" using {command down} # ⌘+l is the keyboard shortcut to focus on the address bar
      keystroke "c" using {command down} # ⌘+c copies the current URL to the clipboard
      set tabUrl to get the clipboard    # stores the clipboard in a variable
    end tell
  end tell
end tell

display alert tabUrl
{% endhighlight %}

Yikes... AppleScript is interesting because it's an awkward, not fun language but also super powerful if you're a kind of nerdy Mac power user, or maybe even developer who wants to harness the power of GUI applications in their project. Fortunately the next major version of OS X, Yosemite, has a JavaScript API for doing all the same stuff. This might be my last AppleScript too, because of that.

Now that I have the URL I want to do something better than display an alert. Some googling points me to [a 2012 MacSparky](http://macsparky.com/blog/2012/8/applescript-omnifocus-tasks) blog post about AppleScripting with OmniFocus. The language is still awkward (`set theProject to first flattened project where its name = "Finance"`), but this is significantly better than Firefox because it exposes an API at all. Since then, there's been a major 2.0 update to OmniFocus, but I guess they made an effort to maintain consistency because these examples still work. I don't really blame Mozilla because they're maintaining applications across every operating sytem that will support them and are very consistent. In fact I wish there existed OmniFocus for Linux but, like, lol. Everyone compromises!

OK so I can get the current URL and add a task to OmniFocus. A [little more digging](https://github.com/pilotmoon/PopClip-Extensions/blob/master/source/OmniFocus/OmniFocusAddInboxTask.applescript) and this is what I came up with:

{% highlight applescript %}
tell application "FirefoxNightly"
  activate
  set taskTitle to name of front window

  tell application "System Events"
    tell process "firefox"
      keystroke "l" using {command down}
      keystroke "c" using {command down}
      set taskNote to get the clipboard
    end tell
  end tell
end tell

tell application "OmniFocus"
  tell quick entry
    open
    make new inbox task with properties {name:taskTitle, note:taskNote}
  end tell
end tell
{% endhighlight %}

It's kind of a dinky version of what I originally wanted to make. It's only for the current tab, and when it's done the quick entry panel is still open (by design: so I can still edit the details).

I packaged it as [an Alfred Workflow here](https://github.com/maxjacobson/alfred-workflows/blob/master/Firefox%20tab%20to%20OmniFocus.alfredworkflow) so I can invoke it from wherever by typing `⌘+space` and then just writing `tab`.

I wonder if this is useful to other people!

