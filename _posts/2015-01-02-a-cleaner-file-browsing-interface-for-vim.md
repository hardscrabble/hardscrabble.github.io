---
title: A cleaner file browsing interface for vim
date: 2015-01-02 11:49
---

<iframe src="//player.vimeo.com/video/115783832" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<p><a href="http://vimeo.com/115783832">A cleaner file browsing interface for vim</a> from <a href="http://vimeo.com/maxjacobson">Max Jacobson</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

TLDW: add this to your `~/.vimrc`:

{% highlight vim %}
" hide the giant banner at the top of netrw
let g:netrw_banner=0
" hide gitignored files from netrw
let g:netrw_list_hide=netrw_gitignore#Hide()
{% endhighlight %}

And then use netrw instead of NERDTree.

