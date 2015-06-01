source "https://rubygems.org"

begin
  # this trick via:
  # https://byparker.com/blog/2014/stay-up-to-date-with-the-latest-github-pages-gem/
  require 'json'
  require 'open-uri'
  versions = JSON.parse(open('https://pages.github.com/versions.json').read)
  gem 'github-pages', versions['github-pages']
rescue SocketError
  gem 'github-pages'
end

group :development do
  gem 'mr_poole'
end

group :jekyll_plugins do
  gem 'octopress-debugger'
end
