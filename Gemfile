source "https://rubygems.org"

# this trick via:
# https://byparker.com/blog/2014/stay-up-to-date-with-the-latest-github-pages-gem/
require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)
gem 'github-pages', versions['github-pages']

group :development do
  gem 'mr_poole'
end
