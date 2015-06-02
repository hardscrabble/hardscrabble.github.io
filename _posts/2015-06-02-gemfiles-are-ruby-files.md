---
title: gemfiles are ruby files
date: 2015-06-02 00:29 EDT
---

A while back I saw this cool blog post: [Stay up to date with the latest github
pages gem][1] by Parker Moore, who maintains Jekyll. Jekyll is the static site
tool that powers [github pages][2], but github pages doesn't necessarily use
the latest version of Jekyll. If you're deploying your website to github pages,
you probably want to make sure your local Jekyll server behaves in the same way
as the Jekyll that runs on github pages.

[1]: https://byparker.com/blog/2014/stay-up-to-date-with-the-latest-github-pages-gem/
[2]: https://pages.github.com/

A Jekyll site is a Ruby project, and Ruby projects should have a Gemfile
listing their dependencies. Jekyll is a gem, so you might think that you should
add this to your Gemfile:

{% highlight ruby %}
gem 'jekyll'
{% endhighlight %}

But actually, maybe not!

Consider this intsead:

{% highlight ruby %}
gem 'github-pages'
{% endhighlight %}

This includes the exact version of Jekyll that github pages is using (and [a
few other things][things]).

That's great, because you know you can preview your website locally and know
that it will look the same when you deploy it to GitHub pages.

You may be asking: what about when they upgrade the version of Jekyll they're
using to compile your site?? Well, they release a new version of the
github-pages gem, which bumps its Jekyll dependency. So, ideally, before pushing
to your Jekyll site on github pages, you should know that you're using the
latest version of the github pages gem.

[things]: https://github.com/github/pages-gem/blob/master/lib/github-pages.rb#L9-L31

Here's how you can do that (so far I'm just summarizing that Parker Moore blog
post):

{% highlight ruby %}
require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)
gem 'github-pages', versions['github-pages']
{% endhighlight %}

Isn't that cool? Now, when you start your local server with `bundle exec jekyll
serve`, it will confirm that you have the appropriate version of github pages.

Happy ending? Sort of.

I did that a few months ago, and was happy for those months. Then, last
weekend, I found myself somewhere without internet access and a blog post idea,
but was sad to see that I was unable to run my local blog server because my
Gemfile was unable to connect to the internet to confirm it had the latest
dependencies.

When you're without internet access, you can't push changes to your blog
anyway, so there's not really any danger of seeing an offline preview of what
the site looks like without confirming you have the latest versions of
everything.

Now my Gemfile looks like this:

{% highlight ruby %}
begin
  require 'json'
  require 'open-uri'
  versions = JSON.parse(open('https://pages.github.com/versions.json').read)
  gem 'github-pages', versions['github-pages']
rescue SocketError
  gem 'github-pages'
end
{% endhighlight %}

Nice! When the network request fails, a `SocketError` is raised, so we're able
to rescue that error and fallback to any old version of the gem. This might
still fail; it assumes that we've previously successfully installed *a* version
of the gem to fall back to, and that version is cached locally by bundler.

It's neat that we're able to use whatever Ruby we want to in our Gemfile, but
kind of non-obvious because it doesn't end with `.rb`. Well, what if it was
just called something else? Turns out you can rename your Gemfile to
gems.rb, and your Gemfile.lock to gems.locked [since Bundler
1.8.0][gemsrb], and this will be the new normal in Bundler 2.0.

[gemsrb]: https://github.com/bundler/bundler/commit/0823e10ea01d36f6bdb764cc8754bda7236737e9

Neat! Now my Gemfile looks like the above, but it's now my gems.rb file.
