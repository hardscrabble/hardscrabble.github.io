---
title: How I use git
date: 2021-08-05
category: programming
---

Here's a short blog post about how I use git.
If you're a software engineer using git at work and you're not that confident about it, I hope this helps.

You can use git for a number of workflows, but here I'm talking about my main one: you want to make a change to a repo which other people are also making changes to and you're using GitHub pull requests to help you do that.

Here's the golden rule: **keep your branch up-to-date with the main branch.**
Your branch's history should be exactly the same as the main branch's history except for the new commit(s) that you've added, and which you'd like to add to the main branch.

Isn't that a nice thought?

If you branch off of the main branch, add some new commits, and open a pull request, this will automatically be the case.
