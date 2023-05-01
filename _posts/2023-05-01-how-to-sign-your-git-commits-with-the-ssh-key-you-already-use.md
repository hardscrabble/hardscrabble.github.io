---
title: How to sign your git commits with the SSH key you already use
date: 2023-05-01 15:29
category: personal computing
---

It's surprisingly easy to impersonate other people in git and GitHub.
All you need to know is their name and email address, and then you can configure git with that information and start committing.
When you push those commits to GitHub, it looks up the user by email address and attributes the commit to that user, whether or not they actually made it.

For example, if you want to impersonate [dhh](https://en.wikipedia.org/wiki/David_Heinemeier_Hansson) on GitHub, all you have to do is:

```shell
git config --global user.name "David Heinemeier Hansson"
git config --global user.email "dhh@hey.com"
```
And then start committing and pushing.

![impersonating DHH](/img/2023-05-01-impersonating-dhh.png)

But, uh, please don't actually do that, I don't want to get in trouble.

Being impersonated is not likely to be a big problem for you, but if it's something you're worried about, you should start signing your commits.
Honestly, you should probably just start signing your commits anyway, because it's kind of neat and just got way, way easier[^1].

[^1]: it used to be that you would sign your commits with gpg, but gpg is kind of confusing and finicky to set up. For a while I used a tool called [bpb](https://andre.arko.net/2021/02/06/signing-git-commits-without-gpg/) which makes it a little easier, but it was still finicky. [Recently GitHub added support for signing commits with the SSH key you already have](https://github.blog/changelog/2022-08-23-ssh-commit-verification-now-supported/) and I was thrilled to ditch that bpb setup.

Here's what you do:

```shell
git config --global commit.gpgSign true
git config --global gpg.format ssh
git config --global user.signingKey "~/.ssh/id_ed25519"
```

The `user.signingKey` config should be a path to your _private_ SSH key.
It's possible that your private SSH key has a different path, such as `~/.ssh/id_rsa`, so you may need to tweak that.

This bit is optional, but if you use tags, you can also sign those:

```shell
git config --global tag.gpgSign true
git config --global tag.forceSignAnnotated true
```

If you're following along, now's a good time to try making a commit and confirm that it works.
If anything doesn't work, you can always undo those configuration changes by editing `~/.gitconfig`.
But hopefully it does!

When you push these commits to GitHub, you will see an "Unverified" badge next to them until you let GitHub know that you're using this SSH Key to sign commits now.
You can do that by copying your public key to your clipboard (`cat ~/.ssh/id_ed25519.pub | pbcopy`) and then [adding it](https://github.com/settings/ssh/new), taking care to select "Signing Key" as the key type.

If you're actually worried about being impersonated, you can also turn on [vigilant mode](https://docs.github.com/en/authentication/managing-commit-signature-verification/displaying-verification-statuses-for-all-of-your-commits) which will display that "Unverified" badge on any commits that aren't signed by one of your registered signing keys.

Note that this signature only exists for commits that are authored locally on your machine.
What about commits you author through GitHub's web interface?
For example when you merge a PR, or edit a file on the web.
Actions like those will create commits on GitHub's servers, which don't have access to your private key for signing.
You might be surprised to see that those commits _also_ have a "Verified" badge on them.
What gives?
If you look a little closer (by clicking on the badge to reveal some details) you'll see that those commits are signed by GitHub, not by you.

> This commit was created on GitHub.com and signed with GitHub’s verified signature.

GitHub is basically saying that they created the commit on behalf of a particular GitHub user.
They know who clicked the big green merge button, and they're vouching for you.
