---
title: How and why to use an SSH passphrase
date: 2023-05-01 16:42
category: personal computing
---

While writing about [git commit signatures](/2023/how-to-sign-your-git-commits-with-the-ssh-key-you-already-use/) earlier today, a related memory came to mind.

A few months in to my working at Code Climate, back in mid 2016, I confessed to [a colleague](https://will.flemi.ng) that I didn't have a passphrase associated with my SSH key.
His eyes filled with horror, and he said "For God's sake, use a passphrase, man!"[^1]

[^1]: I paraphrase from memory 😅.


SSH Keys are used as an authentication mechanism for some **very sensitive things** like read/write access to remote git repositories and for managing access to remote servers.

But, anecdotally, I feel like a lot of people don't use passphrases with their SSH keys...
So let's talk about it.

When you generate an SSH Key, you get a pair of text files on your computer.
On my computer, I have these two files:

```
$ ls ~/.ssh
id_ed25519
id_ed25519.pub
```

The first one is the private key and the second one is the public key.
The public key is the one I give out, and the private one is really important for me not to share with anyone at all.

(Yours might be named `id_rsa` and `id_rsa.pub`, or something else, but it will come in a pair of a public key and a private key.)

When I add my public key to my github.com account, and that lets me clone private repositories as long as I have the corresponding private key.

We can imagine a scenario where my private key is compromised.
Maybe I'm at a coffee shop and I run to the bathroom and forget to lock my laptop.
The snoop sitting next to me might quickly run `cat ~/.ssh/id_ed25519`, take a photo, and then close the terminal window.
Now they have my private key, and they can use it from their computer to access whatever I can access.

Eep.

When generating an SSH key, the `ssh-keygen` command will ask you whether you would like your key to have a passphrase.
If you say no, you're vulnerable to the cafe snoopers of the world[^2].

[^2]: perhaps a more likely scenario is an attacker stealing your laptop, unscrewing the bottom, yanking the hard drive out, and rummaging around in your files. But if your disk is [encrypted](https://support.apple.com/en-us/HT204837), you shouldn't need to worry about this.

If, however, you _do_ provide a passphrase, your private key will be useless to the snooper, because they will need to type in the passphrase when they try to use the key.

Of course, that means that _you_ will also need to type in the passphrase when you try to use the key.
That's super annoying!
You probably push and pull several times throughout the day, and if your passphrase is convenient to type, it's probably not that strong of a passphrase.

To mitigate that annoyance, I have this line in my `~/.zshrc`:

```shell
ssh-add -q --apple-use-keychain
```

The effect of this is that I only need to enter the passphrase once, and it will remember it forever.
I guess it stores it in the keychain, some secure thing that the Mac manages.
I don't really get how the keychain works to be honest.

But the user experience is pretty great: I have a passphrase, so I can sleep easy at night, but I don't need to deal with the hassle of entering it all the time.
