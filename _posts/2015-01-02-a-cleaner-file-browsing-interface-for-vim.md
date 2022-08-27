---
title: A cleaner file browsing interface for vim
date: 2015-01-02 11:49
category: programming
---

{% include vimeo.html id="115783832" %}

TLDW: add this to your `~/.vimrc`:

```vim
" hide the giant banner at the top of netrw
let g:netrw_banner=0
" hide gitignored files from netrw
let g:netrw_list_hide=netrw_gitignore#Hide()
```

And then use netrw instead of NERDTree.

