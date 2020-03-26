---
title: "Are my blog posts getting longer?"
date: 2020-03-25 23:54 EDT
---

Earlier, I was chatting with a coworker about blogging and speculated that my blog posts have gotten longer over time.
Tonight, I thought I'd check if that was true, so I wrote a little script:

```
$ ruby app.rb
Avg word count by year
2011    1133.0
2012    554.57
2013    639.44
2014    676.81
2015    491.5
2016    1155.29
2017    1573.86
2018    816.0
2019    1125.0
2020    3757.0

▂▁▁▁▁▂▃▁▂█
```

Well, not as clean a trend as I thought.
Interesting.

Here's the quick-and-dirty script which should work for any Jekyll blog:

```ruby
Dir.glob("./_posts/*.md").each_with_object({}) do |path, obj|
  path.match(%r{^./_posts/(\d{4})})[1].to_i.tap do |year|
    obj[year] ||= []
    obj[year] << File.read(path).split(/\s+/).count
  end
end.
  sort_by(&:first).tap do |word_counts_by_year|
    puts "Avg word count by year"

    word_counts_by_year.map do |year, counts|
      [year, (counts.sum / counts.length.to_f).round(2)]
    end.map do |year, avg|
      puts "#{year}\t#{avg}"

      avg
    end.tap do |avgs|
      puts
      # https://github.com/holman/spark
      system *avgs.map(&:to_s).unshift("spark")
    end
  end
```

As a fun little exercise, I tried writing without using any local variables.
Not to sublog a former coworker, but I did work with someone who I _never_ saw use a local variable.
He never mentioned it, and I never asked.
Sound off in the comments if you think this is a fun style.

(I don't have comments but do take care).

The chef and food writer J. Kenji López-Alt makes [fantastic cooking videos] with names like "Late night dan dan noodles" in which he quietly whips himself up a midnight snack without overthinking it too much.

[fantastic cooking videos]: https://www.youtube.com/user/kenjialt/search?query=late+night

I'll call this: late night code.
