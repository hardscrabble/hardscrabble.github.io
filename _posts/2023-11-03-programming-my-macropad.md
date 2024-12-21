---
title: Programming my macropad
date: 2023-11-03 18:30
category: personal computing
---

I [recently](/2023/the-apple-studio-displays-missing-volume-knob) wrote about a gadget that I've started using, a [DOIO KB04-01 Macro Keyboard 4 Keys + 1 Knob Macro Pad](https://www.whatgeek.com/products/doio-kb04-01-macro-keyboard-4-keys-1-knob-macro-pad). Weirdly enough, not long after I posted that, it stopped working. The buttons still worked, but the knob didn't, and for me, the knob was basically the whole point. I had no idea how to debug this either. I had never figured out how to program the macropad at all and was using its out of the box settings. There was some discussion online about how it can be programmed using [Via](https://usevia.app/), the popular app, but you needed to install an old version of it and load in a special JSON file in order for that old version of Via to recognize the device. Reader, I tried.

After hitting some dead ends, distraught, I decided to shop around a bit, and to look for a more reputable brand. I ordered a [Keychron Q0 Plus QMK Custom Number Pad](https://www.keychron.com/products/keychron-q0-plus-qmk-custom-number-pad), because Keychron is a good brand, and the product page has extensive details about how to program it with Via. I don't _really_ need a full numpad[^1] but I don't mind having one, and more importantly, it's got a beautiful knob and some keys that are reserved for doing whatever you want them to do.

[^1]: the numbers are already on my regular keyboard and I've never had any issue just using those, but if you're a numpad person I wish you all the peace in the world

When it came, I was thrilled to find that it worked out of the box. It controlled the volume when I turned the knob. And I was able to get Via to recognize the device by following the instructions on Keychron's product page. Great success.

It's neat actually. I'm simply using the web app in Chrome (it doesn't work in Firefox or Safari) rather than the downloadable app. This is powered by the [experimental WebHID API](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API).

But, uh, now what?

I had five physical keys reserved for running macros but no immediate ideas what to have them do.

I spent the next several days happily turning the knob to adjust volume and keeping one eye open for ideas for things to turn into a macro. Eventually, inspiration struck.

I mostly use my Apple Studio Display's speakers, but every now and then I like to use headphones, if I'm really zoning in and focusing. I keep my headphones permanently plugged in to my Mac Studio, and every now and then I'll click open Control Center and adjust the output device like so:

![Gif showing me tapping on the macOS Sonoma Control Center menu bar icon and changing my audio output to my headphones](/img/2023-11-03-toggle-audio-output.gif)

If I can find a way to script that, that would be a fine macro: a button that toggles the audio output between my headphones and my studio display.

I hoped that would be easy to script using [Shortcuts](https://support.apple.com/guide/shortcuts-mac/) but I couldn't find any shortcut actions that update the audio output device.

I googled around a bit and came upon this open source project: [switchaudio-osx](https://github.com/deweller/switchaudio-osx) which is easily installed with [Homebrew](https://brew.sh) with a command line interface. Sigh, okay, let's try that.

Here's the script I came up with[^2], depending on that tool, to toggle the output device:

```shell
set -e

# N.B. this depends on https://github.com/deweller/switchaudio-osx

# Fully qualified path to SwitchAudioSource
SAS="/opt/homebrew/bin/SwitchAudioSource"

# Get the current audio output device
current_device=$($SAS -c)

# Check if the current device is "External Headphones"
if [ "$current_device" == "External Headphones" ]; then
    # Set the audio output to "Studio Display Speakers"
    $SAS -s "Studio Display Speakers"
else
    # Set the audio output to "External Headphones"
    $SAS -s "External Headphones"
fi
```

This worked reliably when invoked from the command-line. I also wrapped it up in [a Shortcut](https://www.icloud.com/shortcuts/e3fc8cf8c01e4e87871ced94a70a1d62) and configured the shortcut to run when I type ⌃⌥⇧⌘H.

![Screenshot showing the Shortcuts app using the Run Shell Script action to run that shell script](/img/2023-11-03-toggle-audio-shortcut.png)

[^2]: I'll be real with you, I [used ChatGPT to actually write this](https://chat.openai.com/share/5536ddeb-ec8c-4c40-8c6b-a8436ccfe5c1)

I had always wondered what does it actually mean to program a macropad to run a macro? Like, can we load a shell script onto the keyboard?? Does it remember things??

The main screen in Via is called "Configure", and within that is the Keymap section. There, you can map each physical key (including the knob) to type whatever character you want, _or_ to invoke a macro. It seems that for this device, there are sixteen slots for macros, named  named M0, M1, M2, ... M15.

After the Keymap section is the Macro section where you can define what those sixteen macros actually are. The way it works is that you click "Record keystrokes", and then you type some stuff, and then you click "Stop recording" and then "Save changes". Now, whenever you invoke that macro, it will type in exactly what you typed in during the recording. That could be your billing address or a keyboard shortcut or whatever else you want. In this gif, I'm recording a macro that will perform the keyboard shortcut ⌃⌥⇧⌘H.

![Recording a macro to invoke the shortcut](/img/2023-11-03-recording-macro.gif)

Once the macro exists, I just need to go back to the Keymap section and map that physical key to that macro:

![Mapping the key to the macro](/img/2023-11-03-mapping-key.gif)

I'm happy to learn that this is all nicely decoupled. The keyboard doesn't need to know anything about my computer or any particular behavior I want my computer to have. It's simply an input device, and I can program it to send the inputs I want it to send. Then I can program my Mac to respond to those inputs how I want it to respond. The device does seem to remember how I've programmed it.

And now I can happily jam that button to toggle my audio output.

There may be better or simpler ways to do some of this stuff, and I'd be happy to hear about them if you'd like to share. I'm pretty new to all this.
