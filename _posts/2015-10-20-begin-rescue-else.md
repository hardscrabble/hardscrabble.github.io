---
title: begin rescue else
date: 2015-10-20 23:28 EDT
---

Quick ruby tip kinda post.

Today I learned, this is a valid Ruby program:

```ruby
begin
  raise if [true, false].sample
rescue
  puts "failed"
else
  puts "did not fail"
end
```

I'm used to using `else` after an `if`, but not after a `rescue`. This is like
saying "do this thing. if it fails, do this *other* thing. if it *doesn't fail*,
do this ***other, other*** thing.

Huh!

(Via [rails][])

[rails]: https://github.com/rails/rails/blob/0d216d1add9eaaddfc0b02813ccf08fd22910859/activesupport/lib/active_support/dependencies.rb#L760-L767
