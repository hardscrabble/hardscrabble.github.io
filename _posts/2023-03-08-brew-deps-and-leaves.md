---
title: Understanding your homebrew dependencies
date: 2023-03-08 17:20
category: personal computing
---

As a programmer who uses macOS, I greatly appreciate [Homebrew](https://brew.sh), the "Missing Package Manager for macOS".

I just learned about the [`brew leaves`](https://docs.brew.sh/Manpage#leaves---installed-on-request---installed-as-dependency) subcommand and was glad to discover it.
Here's a bit about how and why I'm using it.

This may be neurotic, or it may be some PTSD from when I used Arch Linux for a few years, but I try to upgrade all of my homebrew-managed dependencies regularly.

Here's how I do it.

First, I tell homebrew to phone home to GitHub and update its local list of packages, which it can use to tell if any of my locally-installed packages have updates:

```
$ brew update
```

Then I ask homebrew to list out which packages have updates available, if any:

```
$ brew outdated
```

Then, typically, I'll upgrade all of them[^1]:

```
$ brew upgrade
```

[^1]: If homebrew wants to upgrade vim, I'll usually quit any running vim processes, because it sometimes gets wonky when you upgrade it while it's already running.

Very often I'll find that some of my outdated packages have names that I do not recognize.
There are only about 30 packages that I explicitly install[^2], but most of those have dependencies which end up getting installed too, so I end up with way more than 30 packages total -- more like 138.

[^2]: Which I can see spelled out in [my Brewfile](/2023/brewfile/)

For example, I use vim, and vim has several dependencies that homebrew installs when it installs vim:

```text
$ brew deps vim --tree
vim
├── gettext
├── lua
├── ncurses
├── perl
│   ├── berkeley-db
│   │   └── openssl@1.1
│   │       └── ca-certificates
│   └── gdbm
├── python@3.11
│   ├── mpdecimal
│   ├── openssl@1.1
│   │   └── ca-certificates
│   ├── sqlite
│   │   └── readline
│   └── xz
└── ruby
    ├── libyaml
    ├── openssl@1.1
    │   └── ca-certificates
    └── readline
```

Wow, look at all of those!
So, because I installed vim, I also necessarily installed 15 other packages, and I'll be updating all of them as time goes on.

When homebrew tells me that, for example, xz is outdated, a few questions enter my mind:

1. what the heck is that?
2. ok, it's surely a dependency of something, but what is it a dependency of?
3. is it possible that it's actually not even necessary to have installed any longer? Maybe it was a dependency of something that I later uninstalled, but it just lingered around...

Answering all of those questions is possible, but I didn't actually know how to answer them until today.
Let's take them one-by-one.

## What the heck is that?

To answer this, we can use [`brew info`](https://docs.brew.sh/Manpage#info-abv-options-formulacask-):

```text
$ brew info xz
==> xz: stable 5.4.1 (bottled)
General-purpose data compression with high compression ratio
https://tukaani.org/xz/
/opt/homebrew/Cellar/xz/5.4.1 (95 files, 1.7MB) *
  Poured from bottle on 2023-01-16 at 04:20:15
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/xz.rb
License: Public Domain and LGPL-2.1-or-later and GPL-2.0-or-later and GPL-3.0-or-later
==> Analytics
install: 456,730 (30 days), 2,613,650 (90 days), 7,814,033 (365 days)
install-on-request: 22,257 (30 days), 150,853 (90 days), 422,948 (365 days)
build-error: 44 (30 days)
```

Which... sure, whatever.
Sounds important.

## What is this a dependency of?

This is a slightly tricky thing to answer.
As far as I can tell, there's no command such as `brew why xz` that could simply answer why is it installed (please [get in touch](/about) if I'm mistaken).

What we can do is use the [`brew deps`](https://docs.brew.sh/Manpage#deps-options-formulacask-) command to describe the relationships between packages, and then search through it to see exactly why it is installed.
For me, that prints out 1,580 lines of output, which I'll share in full behind a collapsible [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) widget here:

<details>
 <summary>Full output of <code>brew deps  --full-name --installed --tree</code></summary>

<pre>
<code>
aom
├── jpeg-xl
│   ├── brotli
│   ├── giflib
│   ├── highway
│   ├── imath
│   ├── jpeg-turbo
│   ├── libpng
│   ├── little-cms2
│   │   ├── jpeg-turbo
│   │   └── libtiff
│   │       ├── jpeg-turbo
│   │       └── zstd
│   │           ├── lz4
│   │           └── xz
│   ├── openexr
│   │   └── imath
│   └── webp
│       ├── giflib
│       ├── jpeg-turbo
│       ├── libpng
│       └── libtiff
│           ├── jpeg-turbo
│           └── zstd
│               ├── lz4
│               └── xz
└── libvmaf

autoconf
└── m4

bash

bat

bdw-gc

berkeley-db
└── openssl@1.1
    └── ca-certificates

indirect/tap/bpb

brotli

ca-certificates

cairo
├── fontconfig
│   └── freetype
│       └── libpng
├── freetype
│   └── libpng
├── glib
│   ├── pcre2
│   └── gettext
├── libpng
├── libx11
│   ├── libxcb
│   │   ├── libxau
│   │   │   └── xorgproto
│   │   └── libxdmcp
│   │       └── xorgproto
│   └── xorgproto
├── libxcb
│   ├── libxau
│   │   └── xorgproto
│   └── libxdmcp
│       └── xorgproto
├── libxext
│   ├── libx11
│   │   ├── libxcb
│   │   │   ├── libxau
│   │   │   │   └── xorgproto
│   │   │   └── libxdmcp
│   │   │       └── xorgproto
│   │   └── xorgproto
│   └── xorgproto
├── libxrender
│   ├── libx11
│   │   ├── libxcb
│   │   │   ├── libxau
│   │   │   │   └── xorgproto
│   │   │   └── libxdmcp
│   │   │       └── xorgproto
│   │   └── xorgproto
│   └── xorgproto
├── lzo
└── pixman

cloc

ctags

emacs
├── gnutls
│   ├── ca-certificates
│   ├── gmp
│   ├── libidn2
│   │   ├── libunistring
│   │   └── gettext
│   ├── libtasn1
│   ├── libunistring
│   ├── nettle
│   │   └── gmp
│   ├── p11-kit
│   │   ├── ca-certificates
│   │   └── libtasn1
│   └── unbound
│       ├── libevent
│       │   └── openssl@1.1
│       │       └── ca-certificates
│       ├── libnghttp2
│       └── openssl@1.1
│           └── ca-certificates
└── jansson

exa
└── libgit2
    └── libssh2
        └── openssl@1.1
            └── ca-certificates

fd

fnm

fontconfig
└── freetype
    └── libpng

freetype
└── libpng

fribidi

gd
├── fontconfig
│   └── freetype
│       └── libpng
├── freetype
│   └── libpng
├── jpeg-turbo
├── libavif
│   ├── aom
│   │   ├── jpeg-xl
│   │   │   ├── brotli
│   │   │   ├── giflib
│   │   │   ├── highway
│   │   │   ├── imath
│   │   │   ├── jpeg-turbo
│   │   │   ├── libpng
│   │   │   ├── little-cms2
│   │   │   │   ├── jpeg-turbo
│   │   │   │   └── libtiff
│   │   │   │       ├── jpeg-turbo
│   │   │   │       └── zstd
│   │   │   │           ├── lz4
│   │   │   │           └── xz
│   │   │   ├── openexr
│   │   │   │   └── imath
│   │   │   └── webp
│   │   │       ├── giflib
│   │   │       ├── jpeg-turbo
│   │   │       ├── libpng
│   │   │       └── libtiff
│   │   │           ├── jpeg-turbo
│   │   │           └── zstd
│   │   │               ├── lz4
│   │   │               └── xz
│   │   └── libvmaf
│   ├── jpeg-turbo
│   └── libpng
├── libpng
├── libtiff
│   ├── jpeg-turbo
│   └── zstd
│       ├── lz4
│       └── xz
└── webp
    ├── giflib
    ├── jpeg-turbo
    ├── libpng
    └── libtiff
        ├── jpeg-turbo
        └── zstd
            ├── lz4
            └── xz

gdbm

gdk-pixbuf
├── glib
│   ├── pcre2
│   └── gettext
├── jpeg-turbo
├── libpng
└── libtiff
    ├── jpeg-turbo
    └── zstd
        ├── lz4
        └── xz

gettext

gh

ghostscript
├── fontconfig
│   └── freetype
│       └── libpng
├── freetype
│   └── libpng
├── jbig2dec
├── jpeg-turbo
├── libidn
├── libpng
├── libtiff
│   ├── jpeg-turbo
│   └── zstd
│       ├── lz4
│       └── xz
├── little-cms2
│   ├── jpeg-turbo
│   └── libtiff
│       ├── jpeg-turbo
│       └── zstd
│           ├── lz4
│           └── xz
└── openjpeg
    ├── libpng
    ├── libtiff
    │   ├── jpeg-turbo
    │   └── zstd
    │       ├── lz4
    │       └── xz
    └── little-cms2
        ├── jpeg-turbo
        └── libtiff
            ├── jpeg-turbo
            └── zstd
                ├── lz4
                └── xz

giflib

git
├── gettext
└── pcre2

git-delta

glib
├── pcre2
└── gettext

gmp

gnutls
├── ca-certificates
├── gmp
├── libidn2
│   ├── libunistring
│   └── gettext
├── libtasn1
├── libunistring
├── nettle
│   └── gmp
├── p11-kit
│   ├── ca-certificates
│   └── libtasn1
└── unbound
    ├── libevent
    │   └── openssl@1.1
    │       └── ca-certificates
    ├── libnghttp2
    └── openssl@1.1
        └── ca-certificates

graphite2

graphviz
├── gd
│   ├── fontconfig
│   │   └── freetype
│   │       └── libpng
│   ├── freetype
│   │   └── libpng
│   ├── jpeg-turbo
│   ├── libavif
│   │   ├── aom
│   │   │   ├── jpeg-xl
│   │   │   │   ├── brotli
│   │   │   │   ├── giflib
│   │   │   │   ├── highway
│   │   │   │   ├── imath
│   │   │   │   ├── jpeg-turbo
│   │   │   │   ├── libpng
│   │   │   │   ├── little-cms2
│   │   │   │   │   ├── jpeg-turbo
│   │   │   │   │   └── libtiff
│   │   │   │   │       ├── jpeg-turbo
│   │   │   │   │       └── zstd
│   │   │   │   │           ├── lz4
│   │   │   │   │           └── xz
│   │   │   │   ├── openexr
│   │   │   │   │   └── imath
│   │   │   │   └── webp
│   │   │   │       ├── giflib
│   │   │   │       ├── jpeg-turbo
│   │   │   │       ├── libpng
│   │   │   │       └── libtiff
│   │   │   │           ├── jpeg-turbo
│   │   │   │           └── zstd
│   │   │   │               ├── lz4
│   │   │   │               └── xz
│   │   │   └── libvmaf
│   │   ├── jpeg-turbo
│   │   └── libpng
│   ├── libpng
│   ├── libtiff
│   │   ├── jpeg-turbo
│   │   └── zstd
│   │       ├── lz4
│   │       └── xz
│   └── webp
│       ├── giflib
│       ├── jpeg-turbo
│       ├── libpng
│       └── libtiff
│           ├── jpeg-turbo
│           └── zstd
│               ├── lz4
│               └── xz
├── gts
│   ├── glib
│   │   ├── pcre2
│   │   └── gettext
│   ├── netpbm
│   │   ├── jasper
│   │   │   └── jpeg-turbo
│   │   ├── jpeg-turbo
│   │   ├── libpng
│   │   └── libtiff
│   │       ├── jpeg-turbo
│   │       └── zstd
│   │           ├── lz4
│   │           └── xz
│   └── gettext
├── libpng
├── librsvg
│   ├── cairo
│   │   ├── fontconfig
│   │   │   └── freetype
│   │   │       └── libpng
│   │   ├── freetype
│   │   │   └── libpng
│   │   ├── glib
│   │   │   ├── pcre2
│   │   │   └── gettext
│   │   ├── libpng
│   │   ├── libx11
│   │   │   ├── libxcb
│   │   │   │   ├── libxau
│   │   │   │   │   └── xorgproto
│   │   │   │   └── libxdmcp
│   │   │   │       └── xorgproto
│   │   │   └── xorgproto
│   │   ├── libxcb
│   │   │   ├── libxau
│   │   │   │   └── xorgproto
│   │   │   └── libxdmcp
│   │   │       └── xorgproto
│   │   ├── libxext
│   │   │   ├── libx11
│   │   │   │   ├── libxcb
│   │   │   │   │   ├── libxau
│   │   │   │   │   │   └── xorgproto
│   │   │   │   │   └── libxdmcp
│   │   │   │   │       └── xorgproto
│   │   │   │   └── xorgproto
│   │   │   └── xorgproto
│   │   ├── libxrender
│   │   │   ├── libx11
│   │   │   │   ├── libxcb
│   │   │   │   │   ├── libxau
│   │   │   │   │   │   └── xorgproto
│   │   │   │   │   └── libxdmcp
│   │   │   │   │       └── xorgproto
│   │   │   │   └── xorgproto
│   │   │   └── xorgproto
│   │   ├── lzo
│   │   └── pixman
│   ├── gdk-pixbuf
│   │   ├── glib
│   │   │   ├── pcre2
│   │   │   └── gettext
│   │   ├── jpeg-turbo
│   │   ├── libpng
│   │   └── libtiff
│   │       ├── jpeg-turbo
│   │       └── zstd
│   │           ├── lz4
│   │           └── xz
│   ├── glib
│   │   ├── pcre2
│   │   └── gettext
│   └── pango
│       ├── cairo
│       │   ├── fontconfig
│       │   │   └── freetype
│       │   │       └── libpng
│       │   ├── freetype
│       │   │   └── libpng
│       │   ├── glib
│       │   │   ├── pcre2
│       │   │   └── gettext
│       │   ├── libpng
│       │   ├── libx11
│       │   │   ├── libxcb
│       │   │   │   ├── libxau
│       │   │   │   │   └── xorgproto
│       │   │   │   └── libxdmcp
│       │   │   │       └── xorgproto
│       │   │   └── xorgproto
│       │   ├── libxcb
│       │   │   ├── libxau
│       │   │   │   └── xorgproto
│       │   │   └── libxdmcp
│       │   │       └── xorgproto
│       │   ├── libxext
│       │   │   ├── libx11
│       │   │   │   ├── libxcb
│       │   │   │   │   ├── libxau
│       │   │   │   │   │   └── xorgproto
│       │   │   │   │   └── libxdmcp
│       │   │   │   │       └── xorgproto
│       │   │   │   └── xorgproto
│       │   │   └── xorgproto
│       │   ├── libxrender
│       │   │   ├── libx11
│       │   │   │   ├── libxcb
│       │   │   │   │   ├── libxau
│       │   │   │   │   │   └── xorgproto
│       │   │   │   │   └── libxdmcp
│       │   │   │   │       └── xorgproto
│       │   │   │   └── xorgproto
│       │   │   └── xorgproto
│       │   ├── lzo
│       │   └── pixman
│       ├── fontconfig
│       │   └── freetype
│       │       └── libpng
│       ├── freetype
│       │   └── libpng
│       ├── fribidi
│       ├── glib
│       │   ├── pcre2
│       │   └── gettext
│       └── harfbuzz
│           ├── cairo
│           │   ├── fontconfig
│           │   │   └── freetype
│           │   │       └── libpng
│           │   ├── freetype
│           │   │   └── libpng
│           │   ├── glib
│           │   │   ├── pcre2
│           │   │   └── gettext
│           │   ├── libpng
│           │   ├── libx11
│           │   │   ├── libxcb
│           │   │   │   ├── libxau
│           │   │   │   │   └── xorgproto
│           │   │   │   └── libxdmcp
│           │   │   │       └── xorgproto
│           │   │   └── xorgproto
│           │   ├── libxcb
│           │   │   ├── libxau
│           │   │   │   └── xorgproto
│           │   │   └── libxdmcp
│           │   │       └── xorgproto
│           │   ├── libxext
│           │   │   ├── libx11
│           │   │   │   ├── libxcb
│           │   │   │   │   ├── libxau
│           │   │   │   │   │   └── xorgproto
│           │   │   │   │   └── libxdmcp
│           │   │   │   │       └── xorgproto
│           │   │   │   └── xorgproto
│           │   │   └── xorgproto
│           │   ├── libxrender
│           │   │   ├── libx11
│           │   │   │   ├── libxcb
│           │   │   │   │   ├── libxau
│           │   │   │   │   │   └── xorgproto
│           │   │   │   │   └── libxdmcp
│           │   │   │   │       └── xorgproto
│           │   │   │   └── xorgproto
│           │   │   └── xorgproto
│           │   ├── lzo
│           │   └── pixman
│           ├── freetype
│           │   └── libpng
│           ├── glib
│           │   ├── pcre2
│           │   └── gettext
│           ├── graphite2
│           └── icu4c
├── libtool
│   └── m4
└── pango
    ├── cairo
    │   ├── fontconfig
    │   │   └── freetype
    │   │       └── libpng
    │   ├── freetype
    │   │   └── libpng
    │   ├── glib
    │   │   ├── pcre2
    │   │   └── gettext
    │   ├── libpng
    │   ├── libx11
    │   │   ├── libxcb
    │   │   │   ├── libxau
    │   │   │   │   └── xorgproto
    │   │   │   └── libxdmcp
    │   │   │       └── xorgproto
    │   │   └── xorgproto
    │   ├── libxcb
    │   │   ├── libxau
    │   │   │   └── xorgproto
    │   │   └── libxdmcp
    │   │       └── xorgproto
    │   ├── libxext
    │   │   ├── libx11
    │   │   │   ├── libxcb
    │   │   │   │   ├── libxau
    │   │   │   │   │   └── xorgproto
    │   │   │   │   └── libxdmcp
    │   │   │   │       └── xorgproto
    │   │   │   └── xorgproto
    │   │   └── xorgproto
    │   ├── libxrender
    │   │   ├── libx11
    │   │   │   ├── libxcb
    │   │   │   │   ├── libxau
    │   │   │   │   │   └── xorgproto
    │   │   │   │   └── libxdmcp
    │   │   │   │       └── xorgproto
    │   │   │   └── xorgproto
    │   │   └── xorgproto
    │   ├── lzo
    │   └── pixman
    ├── fontconfig
    │   └── freetype
    │       └── libpng
    ├── freetype
    │   └── libpng
    ├── fribidi
    ├── glib
    │   ├── pcre2
    │   └── gettext
    └── harfbuzz
        ├── cairo
        │   ├── fontconfig
        │   │   └── freetype
        │   │       └── libpng
        │   ├── freetype
        │   │   └── libpng
        │   ├── glib
        │   │   ├── pcre2
        │   │   └── gettext
        │   ├── libpng
        │   ├── libx11
        │   │   ├── libxcb
        │   │   │   ├── libxau
        │   │   │   │   └── xorgproto
        │   │   │   └── libxdmcp
        │   │   │       └── xorgproto
        │   │   └── xorgproto
        │   ├── libxcb
        │   │   ├── libxau
        │   │   │   └── xorgproto
        │   │   └── libxdmcp
        │   │       └── xorgproto
        │   ├── libxext
        │   │   ├── libx11
        │   │   │   ├── libxcb
        │   │   │   │   ├── libxau
        │   │   │   │   │   └── xorgproto
        │   │   │   │   └── libxdmcp
        │   │   │   │       └── xorgproto
        │   │   │   └── xorgproto
        │   │   └── xorgproto
        │   ├── libxrender
        │   │   ├── libx11
        │   │   │   ├── libxcb
        │   │   │   │   ├── libxau
        │   │   │   │   │   └── xorgproto
        │   │   │   │   └── libxdmcp
        │   │   │   │       └── xorgproto
        │   │   │   └── xorgproto
        │   │   └── xorgproto
        │   ├── lzo
        │   └── pixman
        ├── freetype
        │   └── libpng
        ├── glib
        │   ├── pcre2
        │   └── gettext
        ├── graphite2
        └── icu4c

gts
├── glib
│   ├── pcre2
│   └── gettext
├── netpbm
│   ├── jasper
│   │   └── jpeg-turbo
│   ├── jpeg-turbo
│   ├── libpng
│   └── libtiff
│       ├── jpeg-turbo
│       └── zstd
│           ├── lz4
│           └── xz
└── gettext

guile
├── bdw-gc
├── gmp
├── libtool
│   └── m4
├── libunistring
├── pkg-config
└── readline

harfbuzz
├── cairo
│   ├── fontconfig
│   │   └── freetype
│   │       └── libpng
│   ├── freetype
│   │   └── libpng
│   ├── glib
│   │   ├── pcre2
│   │   └── gettext
│   ├── libpng
│   ├── libx11
│   │   ├── libxcb
│   │   │   ├── libxau
│   │   │   │   └── xorgproto
│   │   │   └── libxdmcp
│   │   │       └── xorgproto
│   │   └── xorgproto
│   ├── libxcb
│   │   ├── libxau
│   │   │   └── xorgproto
│   │   └── libxdmcp
│   │       └── xorgproto
│   ├── libxext
│   │   ├── libx11
│   │   │   ├── libxcb
│   │   │   │   ├── libxau
│   │   │   │   │   └── xorgproto
│   │   │   │   └── libxdmcp
│   │   │   │       └── xorgproto
│   │   │   └── xorgproto
│   │   └── xorgproto
│   ├── libxrender
│   │   ├── libx11
│   │   │   ├── libxcb
│   │   │   │   ├── libxau
│   │   │   │   │   └── xorgproto
│   │   │   │   └── libxdmcp
│   │   │   │       └── xorgproto
│   │   │   └── xorgproto
│   │   └── xorgproto
│   ├── lzo
│   └── pixman
├── freetype
│   └── libpng
├── glib
│   ├── pcre2
│   └── gettext
├── graphite2
└── icu4c

heroku/brew/heroku
└── heroku/brew/heroku-node

heroku/brew/heroku-node

highway

htop
└── ncurses

icu4c

imagemagick
├── freetype
│   └── libpng
├── ghostscript
│   ├── fontconfig
│   │   └── freetype
│   │       └── libpng
│   ├── freetype
│   │   └── libpng
│   ├── jbig2dec
│   ├── jpeg-turbo
│   ├── libidn
│   ├── libpng
│   ├── libtiff
│   │   ├── jpeg-turbo
│   │   └── zstd
│   │       ├── lz4
│   │       └── xz
│   ├── little-cms2
│   │   ├── jpeg-turbo
│   │   └── libtiff
│   │       ├── jpeg-turbo
│   │       └── zstd
│   │           ├── lz4
│   │           └── xz
│   └── openjpeg
│       ├── libpng
│       ├── libtiff
│       │   ├── jpeg-turbo
│       │   └── zstd
│       │       ├── lz4
│       │       └── xz
│       └── little-cms2
│           ├── jpeg-turbo
│           └── libtiff
│               ├── jpeg-turbo
│               └── zstd
│                   ├── lz4
│                   └── xz
├── jpeg-turbo
├── libheif
│   ├── aom
│   │   ├── jpeg-xl
│   │   │   ├── brotli
│   │   │   ├── giflib
│   │   │   ├── highway
│   │   │   ├── imath
│   │   │   ├── jpeg-turbo
│   │   │   ├── libpng
│   │   │   ├── little-cms2
│   │   │   │   ├── jpeg-turbo
│   │   │   │   └── libtiff
│   │   │   │       ├── jpeg-turbo
│   │   │   │       └── zstd
│   │   │   │           ├── lz4
│   │   │   │           └── xz
│   │   │   ├── openexr
│   │   │   │   └── imath
│   │   │   └── webp
│   │   │       ├── giflib
│   │   │       ├── jpeg-turbo
│   │   │       ├── libpng
│   │   │       └── libtiff
│   │   │           ├── jpeg-turbo
│   │   │           └── zstd
│   │   │               ├── lz4
│   │   │               └── xz
│   │   └── libvmaf
│   ├── jpeg-turbo
│   ├── libde265
│   ├── libpng
│   ├── shared-mime-info
│   │   └── glib
│   │       ├── pcre2
│   │       └── gettext
│   └── x265
├── liblqr
│   └── glib
│       ├── pcre2
│       └── gettext
├── libpng
├── libraw
│   ├── jasper
│   │   └── jpeg-turbo
│   ├── jpeg-turbo
│   ├── little-cms2
│   │   ├── jpeg-turbo
│   │   └── libtiff
│   │       ├── jpeg-turbo
│   │       └── zstd
│   │           ├── lz4
│   │           └── xz
│   └── libomp
├── libtiff
│   ├── jpeg-turbo
│   └── zstd
│       ├── lz4
│       └── xz
├── libtool
│   └── m4
├── little-cms2
│   ├── jpeg-turbo
│   └── libtiff
│       ├── jpeg-turbo
│       └── zstd
│           ├── lz4
│           └── xz
├── openexr
│   └── imath
├── openjpeg
│   ├── libpng
│   ├── libtiff
│   │   ├── jpeg-turbo
│   │   └── zstd
│   │       ├── lz4
│   │       └── xz
│   └── little-cms2
│       ├── jpeg-turbo
│       └── libtiff
│           ├── jpeg-turbo
│           └── zstd
│               ├── lz4
│               └── xz
├── webp
│   ├── giflib
│   ├── jpeg-turbo
│   ├── libpng
│   └── libtiff
│       ├── jpeg-turbo
│       └── zstd
│           ├── lz4
│           └── xz
├── xz
└── libomp

imath

jansson

jasper
└── jpeg-turbo

jbig2dec

jpeg-turbo

jpeg-xl
├── brotli
├── giflib
├── highway
├── imath
├── jpeg-turbo
├── libpng
├── little-cms2
│   ├── jpeg-turbo
│   └── libtiff
│       ├── jpeg-turbo
│       └── zstd
│           ├── lz4
│           └── xz
├── openexr
│   └── imath
└── webp
    ├── giflib
    ├── jpeg-turbo
    ├── libpng
    └── libtiff
        ├── jpeg-turbo
        └── zstd
            ├── lz4
            └── xz

jq
└── oniguruma

krb5
└── openssl@1.1
    └── ca-certificates

libavif
├── aom
│   ├── jpeg-xl
│   │   ├── brotli
│   │   ├── giflib
│   │   ├── highway
│   │   ├── imath
│   │   ├── jpeg-turbo
│   │   ├── libpng
│   │   ├── little-cms2
│   │   │   ├── jpeg-turbo
│   │   │   └── libtiff
│   │   │       ├── jpeg-turbo
│   │   │       └── zstd
│   │   │           ├── lz4
│   │   │           └── xz
│   │   ├── openexr
│   │   │   └── imath
│   │   └── webp
│   │       ├── giflib
│   │       ├── jpeg-turbo
│   │       ├── libpng
│   │       └── libtiff
│   │           ├── jpeg-turbo
│   │           └── zstd
│   │               ├── lz4
│   │               └── xz
│   └── libvmaf
├── jpeg-turbo
└── libpng

libde265

libevent
└── openssl@1.1
    └── ca-certificates

libheif
├── aom
│   ├── jpeg-xl
│   │   ├── brotli
│   │   ├── giflib
│   │   ├── highway
│   │   ├── imath
│   │   ├── jpeg-turbo
│   │   ├── libpng
│   │   ├── little-cms2
│   │   │   ├── jpeg-turbo
│   │   │   └── libtiff
│   │   │       ├── jpeg-turbo
│   │   │       └── zstd
│   │   │           ├── lz4
│   │   │           └── xz
│   │   ├── openexr
│   │   │   └── imath
│   │   └── webp
│   │       ├── giflib
│   │       ├── jpeg-turbo
│   │       ├── libpng
│   │       └── libtiff
│   │           ├── jpeg-turbo
│   │           └── zstd
│   │               ├── lz4
│   │               └── xz
│   └── libvmaf
├── jpeg-turbo
├── libde265
├── libpng
├── shared-mime-info
│   └── glib
│       ├── pcre2
│       └── gettext
└── x265

libidn

libidn2
├── libunistring
└── gettext

liblqr
└── glib
    ├── pcre2
    └── gettext

libnghttp2

libomp

libpng

libraw
├── jasper
│   └── jpeg-turbo
├── jpeg-turbo
├── little-cms2
│   ├── jpeg-turbo
│   └── libtiff
│       ├── jpeg-turbo
│       └── zstd
│           ├── lz4
│           └── xz
└── libomp

librsvg
├── cairo
│   ├── fontconfig
│   │   └── freetype
│   │       └── libpng
│   ├── freetype
│   │   └── libpng
│   ├── glib
│   │   ├── pcre2
│   │   └── gettext
│   ├── libpng
│   ├── libx11
│   │   ├── libxcb
│   │   │   ├── libxau
│   │   │   │   └── xorgproto
│   │   │   └── libxdmcp
│   │   │       └── xorgproto
│   │   └── xorgproto
│   ├── libxcb
│   │   ├── libxau
│   │   │   └── xorgproto
│   │   └── libxdmcp
│   │       └── xorgproto
│   ├── libxext
│   │   ├── libx11
│   │   │   ├── libxcb
│   │   │   │   ├── libxau
│   │   │   │   │   └── xorgproto
│   │   │   │   └── libxdmcp
│   │   │   │       └── xorgproto
│   │   │   └── xorgproto
│   │   └── xorgproto
│   ├── libxrender
│   │   ├── libx11
│   │   │   ├── libxcb
│   │   │   │   ├── libxau
│   │   │   │   │   └── xorgproto
│   │   │   │   └── libxdmcp
│   │   │   │       └── xorgproto
│   │   │   └── xorgproto
│   │   └── xorgproto
│   ├── lzo
│   └── pixman
├── gdk-pixbuf
│   ├── glib
│   │   ├── pcre2
│   │   └── gettext
│   ├── jpeg-turbo
│   ├── libpng
│   └── libtiff
│       ├── jpeg-turbo
│       └── zstd
│           ├── lz4
│           └── xz
├── glib
│   ├── pcre2
│   └── gettext
└── pango
    ├── cairo
    │   ├── fontconfig
    │   │   └── freetype
    │   │       └── libpng
    │   ├── freetype
    │   │   └── libpng
    │   ├── glib
    │   │   ├── pcre2
    │   │   └── gettext
    │   ├── libpng
    │   ├── libx11
    │   │   ├── libxcb
    │   │   │   ├── libxau
    │   │   │   │   └── xorgproto
    │   │   │   └── libxdmcp
    │   │   │       └── xorgproto
    │   │   └── xorgproto
    │   ├── libxcb
    │   │   ├── libxau
    │   │   │   └── xorgproto
    │   │   └── libxdmcp
    │   │       └── xorgproto
    │   ├── libxext
    │   │   ├── libx11
    │   │   │   ├── libxcb
    │   │   │   │   ├── libxau
    │   │   │   │   │   └── xorgproto
    │   │   │   │   └── libxdmcp
    │   │   │   │       └── xorgproto
    │   │   │   └── xorgproto
    │   │   └── xorgproto
    │   ├── libxrender
    │   │   ├── libx11
    │   │   │   ├── libxcb
    │   │   │   │   ├── libxau
    │   │   │   │   │   └── xorgproto
    │   │   │   │   └── libxdmcp
    │   │   │   │       └── xorgproto
    │   │   │   └── xorgproto
    │   │   └── xorgproto
    │   ├── lzo
    │   └── pixman
    ├── fontconfig
    │   └── freetype
    │       └── libpng
    ├── freetype
    │   └── libpng
    ├── fribidi
    ├── glib
    │   ├── pcre2
    │   └── gettext
    └── harfbuzz
        ├── cairo
        │   ├── fontconfig
        │   │   └── freetype
        │   │       └── libpng
        │   ├── freetype
        │   │   └── libpng
        │   ├── glib
        │   │   ├── pcre2
        │   │   └── gettext
        │   ├── libpng
        │   ├── libx11
        │   │   ├── libxcb
        │   │   │   ├── libxau
        │   │   │   │   └── xorgproto
        │   │   │   └── libxdmcp
        │   │   │       └── xorgproto
        │   │   └── xorgproto
        │   ├── libxcb
        │   │   ├── libxau
        │   │   │   └── xorgproto
        │   │   └── libxdmcp
        │   │       └── xorgproto
        │   ├── libxext
        │   │   ├── libx11
        │   │   │   ├── libxcb
        │   │   │   │   ├── libxau
        │   │   │   │   │   └── xorgproto
        │   │   │   │   └── libxdmcp
        │   │   │   │       └── xorgproto
        │   │   │   └── xorgproto
        │   │   └── xorgproto
        │   ├── libxrender
        │   │   ├── libx11
        │   │   │   ├── libxcb
        │   │   │   │   ├── libxau
        │   │   │   │   │   └── xorgproto
        │   │   │   │   └── libxdmcp
        │   │   │   │       └── xorgproto
        │   │   │   └── xorgproto
        │   │   └── xorgproto
        │   ├── lzo
        │   └── pixman
        ├── freetype
        │   └── libpng
        ├── glib
        │   ├── pcre2
        │   └── gettext
        ├── graphite2
        └── icu4c

libtasn1

libtermkey
└── unibilium

libtiff
├── jpeg-turbo
└── zstd
    ├── lz4
    └── xz

libtool
└── m4

libunistring

libuv

libvmaf

libvterm

libx11
├── libxcb
│   ├── libxau
│   │   └── xorgproto
│   └── libxdmcp
│       └── xorgproto
└── xorgproto

libxau
└── xorgproto

libxcb
├── libxau
│   └── xorgproto
└── libxdmcp
    └── xorgproto

libxdmcp
└── xorgproto

libxext
├── libx11
│   ├── libxcb
│   │   ├── libxau
│   │   │   └── xorgproto
│   │   └── libxdmcp
│   │       └── xorgproto
│   └── xorgproto
└── xorgproto

libxrender
├── libx11
│   ├── libxcb
│   │   ├── libxau
│   │   │   └── xorgproto
│   │   └── libxdmcp
│   │       └── xorgproto
│   └── xorgproto
└── xorgproto

libyaml

little-cms2
├── jpeg-turbo
└── libtiff
    ├── jpeg-turbo
    └── zstd
        ├── lz4
        └── xz

lua

luajit

luv
└── libuv

lz4

lzo

m4

mpdecimal

msgpack

ncdu
└── ncurses

ncurses

neovim
├── gettext
├── libtermkey
│   └── unibilium
├── libuv
├── libvterm
├── luajit
├── luv
│   └── libuv
├── msgpack
├── tree-sitter
└── unibilium

netpbm
├── jasper
│   └── jpeg-turbo
├── jpeg-turbo
├── libpng
└── libtiff
    ├── jpeg-turbo
    └── zstd
        ├── lz4
        └── xz

nettle
└── gmp

oniguruma

openexr
└── imath

openjpeg
├── libpng
├── libtiff
│   ├── jpeg-turbo
│   └── zstd
│       ├── lz4
│       └── xz
└── little-cms2
    ├── jpeg-turbo
    └── libtiff
        ├── jpeg-turbo
        └── zstd
            ├── lz4
            └── xz

openssl@1.1
└── ca-certificates

openssl@3
└── ca-certificates

p11-kit
├── ca-certificates
└── libtasn1

pango
├── cairo
│   ├── fontconfig
│   │   └── freetype
│   │       └── libpng
│   ├── freetype
│   │   └── libpng
│   ├── glib
│   │   ├── pcre2
│   │   └── gettext
│   ├── libpng
│   ├── libx11
│   │   ├── libxcb
│   │   │   ├── libxau
│   │   │   │   └── xorgproto
│   │   │   └── libxdmcp
│   │   │       └── xorgproto
│   │   └── xorgproto
│   ├── libxcb
│   │   ├── libxau
│   │   │   └── xorgproto
│   │   └── libxdmcp
│   │       └── xorgproto
│   ├── libxext
│   │   ├── libx11
│   │   │   ├── libxcb
│   │   │   │   ├── libxau
│   │   │   │   │   └── xorgproto
│   │   │   │   └── libxdmcp
│   │   │   │       └── xorgproto
│   │   │   └── xorgproto
│   │   └── xorgproto
│   ├── libxrender
│   │   ├── libx11
│   │   │   ├── libxcb
│   │   │   │   ├── libxau
│   │   │   │   │   └── xorgproto
│   │   │   │   └── libxdmcp
│   │   │   │       └── xorgproto
│   │   │   └── xorgproto
│   │   └── xorgproto
│   ├── lzo
│   └── pixman
├── fontconfig
│   └── freetype
│       └── libpng
├── freetype
│   └── libpng
├── fribidi
├── glib
│   ├── pcre2
│   └── gettext
└── harfbuzz
    ├── cairo
    │   ├── fontconfig
    │   │   └── freetype
    │   │       └── libpng
    │   ├── freetype
    │   │   └── libpng
    │   ├── glib
    │   │   ├── pcre2
    │   │   └── gettext
    │   ├── libpng
    │   ├── libx11
    │   │   ├── libxcb
    │   │   │   ├── libxau
    │   │   │   │   └── xorgproto
    │   │   │   └── libxdmcp
    │   │   │       └── xorgproto
    │   │   └── xorgproto
    │   ├── libxcb
    │   │   ├── libxau
    │   │   │   └── xorgproto
    │   │   └── libxdmcp
    │   │       └── xorgproto
    │   ├── libxext
    │   │   ├── libx11
    │   │   │   ├── libxcb
    │   │   │   │   ├── libxau
    │   │   │   │   │   └── xorgproto
    │   │   │   │   └── libxdmcp
    │   │   │   │       └── xorgproto
    │   │   │   └── xorgproto
    │   │   └── xorgproto
    │   ├── libxrender
    │   │   ├── libx11
    │   │   │   ├── libxcb
    │   │   │   │   ├── libxau
    │   │   │   │   │   └── xorgproto
    │   │   │   │   └── libxdmcp
    │   │   │   │       └── xorgproto
    │   │   │   └── xorgproto
    │   │   └── xorgproto
    │   ├── lzo
    │   └── pixman
    ├── freetype
    │   └── libpng
    ├── glib
    │   ├── pcre2
    │   └── gettext
    ├── graphite2
    └── icu4c

pcre

pcre2

perl
├── berkeley-db
│   └── openssl@1.1
│       └── ca-certificates
└── gdbm

pixman

pkg-config

postgresql@14
├── icu4c
├── krb5
│   └── openssl@1.1
│       └── ca-certificates
├── lz4
├── openssl@1.1
│   └── ca-certificates
└── readline

pure
└── zsh-async

python@3.11
├── mpdecimal
├── openssl@1.1
│   └── ca-certificates
├── sqlite
│   └── readline
└── xz

rbenv
└── ruby-build
    ├── autoconf
    │   └── m4
    ├── pkg-config
    └── readline

rcm

readline

redis
└── openssl@1.1
    └── ca-certificates

ripgrep
└── pcre2

ruby
├── libyaml
├── openssl@1.1
│   └── ca-certificates
└── readline

ruby-build
├── autoconf
│   └── m4
├── pkg-config
└── readline

rust
├── openssl@1.1
│   └── ca-certificates
└── pkg-config

shared-mime-info
└── glib
    ├── pcre2
    └── gettext

sl

sqlite
└── readline

terminal-notifier

tig
├── ncurses
├── pcre2
└── readline

tmux
├── libevent
│   └── openssl@1.1
│       └── ca-certificates
├── ncurses
└── utf8proc

tree

tree-sitter

unbound
├── libevent
│   └── openssl@1.1
│       └── ca-certificates
├── libnghttp2
└── openssl@1.1
    └── ca-certificates

unibilium

utf8proc

vim
├── gettext
├── lua
├── ncurses
├── perl
│   ├── berkeley-db
│   │   └── openssl@1.1
│   │       └── ca-certificates
│   └── gdbm
├── python@3.11
│   ├── mpdecimal
│   ├── openssl@1.1
│   │   └── ca-certificates
│   ├── sqlite
│   │   └── readline
│   └── xz
└── ruby
    ├── libyaml
    ├── openssl@1.1
    │   └── ca-certificates
    └── readline

watch
└── ncurses

webp
├── giflib
├── jpeg-turbo
├── libpng
└── libtiff
    ├── jpeg-turbo
    └── zstd
        ├── lz4
        └── xz

wget
├── libidn2
│   ├── libunistring
│   └── gettext
└── openssl@3
    └── ca-certificates

x265

xorgproto

xz

yarn

youtube-dl
└── python@3.11
    ├── mpdecimal
    ├── openssl@1.1
    │   └── ca-certificates
    ├── sqlite
    │   └── readline
    └── xz

zsh
├── ncurses
└── pcre

zsh-async

zsh-syntax-highlighting

zstd
├── lz4
└── xz

</code>
</pre>
</details>

As we can see... tons of things depend on xz.

This output is slightly overwhelming, but if you want to be even more overwhelmed, you can run `brew deps  --full-name --installed --graph` to produce a visual graph representation, which I'll present to you here:

[![graph of brew dependencies](/img/2023-03-08-brew-graph.svg)](/img/2023-03-08-brew-graph.svg)

You can click on it to see it in more detail.

Maybe I'm not much of a visual learner, but I'll take the plain text representation any day.

## How do I know if I even need this package any longer?

One easy way to figure out if you need a package any longer is to just try uninstalling it and seeing what happens:

```text
$ brew uninstall xz
==> Downloading https://formulae.brew.sh/api/cask.jws.json
######################################################################## 100.0%
Error: Refusing to uninstall /opt/homebrew/Cellar/xz/5.4.1
because it is required by aom, gd, gdk-pixbuf, ghostscript, graphviz, gts, imagemagick, jpeg-xl, libavif, libheif, libraw, librsvg, libtiff, little-cms2, netpbm, openjpeg, python@3.11, vim, webp, youtube-dl and zstd, which are currently installed.
You can override this and force removal with:
  brew uninstall --ignore-dependencies xz
```

As you can see, homebrew refuses to uninstall it because it's a dependency of a bunch of stuff.
So, I guess, I do need this one.

It would be tedious to do this one-by-one, going through all ~100 or so of the packages I have installed that I don't recognize the name of, just to free up some space on my hard drive.

Thankfully, it turns out that homebrew has another command, [`brew leaves`](https://docs.brew.sh/Manpage#leaves---installed-on-request---installed-as-dependency), which will solve this problem.

If I run `brew list`, homebrew prints out 138 packages, many with names I don't recognize.

If I run `brew leaves` instead, it prints out 38 packages, most of which I recall asking homebrew to install.

Let's learn more about this subcommand:

```text
$ brew leaves --help
Usage: brew leaves [--installed-on-request] [--installed-as-dependency]

List installed formulae that are not dependencies of another installed formula.

  -r, --installed-on-request       Only list leaves that were manually
                                   installed.
  -p, --installed-as-dependency    Only list leaves that were installed as
                                   dependencies.
  -d, --debug                      Display any debugging information.
  -q, --quiet                      Make some output more quiet.
  -v, --verbose                    Make some output more verbose.
  -h, --help                       Show this message.
```

In other words, running `brew leaves` will print out all of the things that _can_ be uninstalled, because nothing depends on them.
In my case, that includes vim, but not xz.

So, if there's anything in the `brew leaves` output that you don't think you need, you can probably safely uninstall it.

There are two flags there that are particularly handy: `--installed-on-request` and `--installed-as-dependency`, which filter the output based on why exactly that package is installed on your system.

If you run `brew leaves --installed-as-dependency`, it will print out all of the things that:

1. were installed as a dependency of something else
2. but are no longer a dependency of anything

That sounds _eminently_ uninstallable if anything does.

Note that when you uninstall a package, homebrew does not uninstall that package's dependencies.
That means that many of that package's dependencies, which were previously not uninstallable become uninstallable.
In other words, they become leaves.

So, for example, if I run `brew uninstall imagemagick` and then check on my leaves, here's what I see:

```
$ brew leaves --installed-as-dependency
ghostscript
libheif
liblqr
libraw
```

I still have ghostscript, libheif, liblqr, and libraw hanging around, and I can use this command to identify that they are not actually needed anymore and continue trimming my hedge.
