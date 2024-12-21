---
title: Streaming sites and their bad URLs
date: 2023-10-01 14:06
category: culture
---

Why do streaming sites have such poor URLs?

Here's a quick survey of the field:

| Site         | Example series                              | URL                                                                       |
|--------------|---------------------------------------------|---------------------------------------------------------------------------|
| Amazon Prime | Gen V                                       | <https://www.amazon.com/gp/video/detail/B0CBFTRGPZ/>                      |
| Apple TV+    | Ted Lasso                                   | <https://tv.apple.com/us/show/ted-lasso/umc.cmc.vtoh0mn0xn7t3c643xqonfzy> |
| Disney+      | Bluey                                       | <https://www.disneyplus.com/series/bluey/1xy9TAOQ0M3r>                    |
| Hulu         | Only Murders in the Building                | <https://www.hulu.com/series/ef31c7e1-cd0f-4e07-848d-1cbfedb50ddf>        |
| Max          | Friends                                     | <https://play.max.com/show/52dae4c7-2ab1-4bb9-ab1c-8100fd54e2f9>          |
| Netflix      | One Piece                                   | <https://www.netflix.com/title/80217863>                                  |
| Paramount+   | Star Trek: The Original Series (Remastered) | <https://www.paramountplus.com/shows/star_trek/>                          |
| Peacock      | Killing It                                  | <https://www.peacocktv.com/watch/asset/tv/killing-it/5156438808822262112> |
| Tubi         | Hannibal                                    | <https://tubitv.com/series/300000159/hannibal>                            |

Of these, the best one is clearly **Paramount+**, because it's human-readable and free of any junk.
If I were feeling uncharitable, I might ding it for using [snake case](https://en.wikipedia.org/wiki/Letter_case#Snake_case) rather than [kebab case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case), but I'm willing to concede that's a matter of taste.

In the second tier are **Apple TV+**, **Disney+**, **Peacock**, and **Tubi** which all contain the series name _somewhere_ in their URL.
They don't make it easy for you to read them, because there's some amount of junk mixed in there too, but it's possible.

When I see a URL like that, I want to test if they actually validate the human-readable bit. Let's see:

| Site      | Example series | Fake URL                                                                             |
|-----------|----------------|--------------------------------------------------------------------------------------|
| Apple TV+ | Ted Lasso      | <https://tv.apple.com/us/show/sad-soccer-show/umc.cmc.vtoh0mn0xn7t3c643xqonfzy>      |
| Disney+   | Bluey          | <https://www.disneyplus.com/series/sad-dog-show/1xy9TAOQ0M3r>                        |
| Peacock   | Killing It     | <https://www.peacocktv.com/watch/asset/tv/silly-snake-scenarios/5156438808822262112> |

And indeed, two out of those three work.
Good for **Peacock** going that extra mile.

In a distant last place, of course, are **Hulu**, **Netflix**, **Max**, and **Amazon Prime**, which don't make an effort to be human-readable at all.
Boo.
