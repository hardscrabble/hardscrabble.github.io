source "https://rubygems.org"

begin
  # this trick via:
  # https://byparker.com/blog/2014/stay-up-to-date-with-the-latest-github-pages-gem/
  require 'json'
  require 'open-uri'
  versions = JSON.parse(open('https://pages.github.com/versions.json').read)
  gem 'github-pages', versions.fetch('github-pages')
rescue SocketError => e
  STDERR.puts "Couldn't fetch remote github-pages: #{e.inspect}"
  gem 'github-pages'
end

group :development do
  gem 'scss_lint'
  gem 'html-proofer', '~> 3.4.0'
end
