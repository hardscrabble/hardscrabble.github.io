---
title: pro tip open firefox tabs in background
date: 2015-09-08 22:20 EDT
---

One good thing to know if you're a firefox person: visit `about:config` and poke
around, configuring things.

Here's what happened today: I was watching a youtube video while browsing
Twitter via [Tweetbot](http://tapbots.com/tweetbot/mac/). I clicked a link,
which opened a new tab, pushing my video into the background. I diligently
clicked the video's tab to bring it back to the foreground so I could continue
passively watching it while browsing twitter.

Then I clicked another link, and instinctively clicked the video's tab to bring
it back into the foreground again.

By the third time I did this, I realized I really wished there was a setting to
automatically open tabs in the background. I tried googling it, but wasn't
really finding anything. So I checked `about:config` and searched through for
"background". The screen is a list of every configuration you can control.
Many of them are boolean attributes, which can be toggled by simply double
clicking the attribute.

I saw one, `browser.tabs.loadDivertedInBackground;false` and thought "hmm,
maybe?" At this point, I'm not certain there's even a configuration that does
this, but I try toggling it... and ... click a link from a tweet... and...

It did what I wanted. Sweet.
