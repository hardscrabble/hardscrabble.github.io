---
layout: post
title: fuzzy search
date: 2012-12-14 23:59:00
category: coding
tags: search, fuzzy, arrays, ruby, regular expressions
---

I just made the search a little smarter on this blog. I think. I made it so that when you search a multi-word query, it'll include posts that match any of the words, not just posts that match *all* of the words. They're sorted chronologically, not based on relevance.

And you can put a query in quotes if you want it to match all of the words, in that order.

Here's how I did that (with some stuff paraphrased):

    if query =~ /^".+"$/
      query_array = [query.gsub!(/"/,'')]
    else
      query_array = query.split(' ')
    end
    # ... each post |the_text|
    query_array.each do |q|
      if the_text =~ Regexp.new(q, true)
        # then include the post
        break
      end
    end

So, first I check if the query is in quotes (I'm coming to really love using regular expressions), and if so I remove the quotes and put that whole string thru. If it's not in quotes, I split the string into an array of strings, using a space as the delimeter. Then I go through each post and check it against each item in the array. If the query was in quotes, the array only has one item in it. Once there's a match, I push it thru. The `break` makes it so once a post matches the query, we move on to the next post rather than keep checking other words in the query against it.

I wonder if I should allow single quotes too. Note to self, allow single quotes.

I wonder what new bugs I just introduced.
