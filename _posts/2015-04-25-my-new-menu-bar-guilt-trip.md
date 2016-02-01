---
title: my new menu bar guilt trip
date: 2015-04-25 15:53 EDT
---

I just discovered [TextBar][] via [this article][1] and it's a pretty sweet Mac
app.

[TextBar]: http://www.richsomerfield.com/apps/
[1]: http://www.macstories.net/mac/textbar-puts-your-text-into-the-menu-bar/

You provide it a script and an interval, and it runs the script over and over,
and prints the result to your Mac menu bar.

It comes with a few neat starter scripts which tell you things like how full
your disk is and which wifi network you're attached to.

For some reason, my instinct was to make a script that told me how long it's
been since I updated this blog.

I tried writing it as a shell script but gave up halfway through and switched
to Ruby because, as much as I enjoy a challenge, parsing dates with the Mac
[date][] utility was making me sad.

[date]: https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/date.1.html

```sh
#!/bin/sh

function latestPost {
  local xml=$(curl http://www.hardscrabble.net/feed.xml 2>/dev/null)
  echo $xml > /tmp/feed.xml
  local lastPost=$(xmllint /tmp/feed.xml --xpath "//item[1]/pubDate/text()")
  echo $lastPost | ruby -rdate -e "
    def pluralize(number, word)
      %{#{number} #{word}#{'s' unless number == 1}}
    end
    diff = (DateTime.now - DateTime.parse(STDIN.read)).to_f
    days = diff.to_i
    hours = ((diff * 24) % 24).round
    STDOUT.write %{#{pluralize days, 'day'} and #{pluralize hours, 'hour'}}"
}

latestPost
```

This is kind of a Frankenstein script (it even has [a little Rails][2] in it)
but it works so :bowtie:.

[2]: http://apidock.com/rails/ActionView/Helpers/TextHelper/pluralize

To use it with TextBar, I put this in a file and made it executable, and then
just referenced the path to the file as the "Script":

![TextBar UI screenshot]({{ site.baseurl }}img/2015-04-25-textbar.png)

I'm having it refresh hourly, because the script is only specific to the
nearest hour, so it'll always be more-or-less right.

Here's what my menu bar currently looks like:

![menubar screenshot]({{ site.baseurl }}img/2015-04-25-textbar-guilt.png)

(Tweetbot, this script via textbar, postgres, 1password, dropbox with some
notification?, google drive, alfred, caffeine, and then some native Mac stuff)
