---
title: Normalizing surgical drain output
date: 2017-12-11 23:06 EST
---

Let's talk body fluids, and then math.

(Note: this isn't medical advice. Listen to your doctor.)

During a surgery, it's sometimes necessary to install a [drain] to prevent the build-up of fluids under your skin from whatever wound you've got.
When the patient leaves the hospital, it becomes their responsibility to care for the drain.
Here's what that entails:

[drain]: https://en.wikipedia.org/wiki/Drain_(surgery)

The drain is a tube connected to your body via some stitches.
It runs along until it empties into a bulb, which you may keep clipped to your undershirt throughout the day.
The bulb has most of the air squeezed out of it, to create suction.

Periodically, you must unplug the bulb and let in the air.
Pour out whatever fluids have collected into a small measuring cup.
Make a note of how much you've collected, and what time it is.
Then dispose of the fluids, squeeze the air back out of the bulb, and plug it back up.
Do this at least twice a day.

When you see your doctors, they'll want to know the rate of drain output so they can get a sense for:

1. how the wound is healing
1. if it's time to remove the drain

Let's say you've taken these notes:

```
2017-12-07 00:00 0
2017-12-07 14:09 30
2017-12-07 22:10 10
2017-12-08 10:20 7.5
2017-12-08 10:55 23
2017-12-08 22:00 2.5
2017-12-09 11:45 5
2017-12-09 19:15 8
2017-12-10 11:50 18
2017-12-10 17:40 7
2017-12-11 8:55 10
2017-12-11 22:10 12.5
```

Some days you've taken two measurements, and other days three.
Some of the measurements follow six hours after the previous one, and some much more.

Let's say the doctor wants to know the answer to this question:

**How many milliliters of serosanguineous fluids did you drain each day since your surgery?**

We can do some eye-ball math and determine:

```
2017-12-07: 0 + 30 + 10 = 40
2017-12-08: 7.5 + 23 + 2.5 = 33
2017-12-09: 5 + 8 = 13
2017-12-10: 18 + 7 = 25
2017-12-11: 10 + 12.5 = 22.5
```

And that would probably be good enough.
It gives you a sense for the trend:

```
40
33
13
25
22.5
```

Slowly going down, except for one weirdly quiet day.

But IMO this feels dissatisfying and wrong.

Let's look at these two measurements again:

```
2017-12-09 19:15 8
2017-12-10 11:50 18
```

Is it really fair to bucket those 18 milliliters of serosanguineous fluids solely on 2017-12-10?
You emptied the drain at 19:15 the day prior, so those 18 milliliters were trickling out for about five hours on one day, and about twelve hours the next.
If we can assume that it trickled out evenly, we should be able to smear that data across both days and get a more accurate picture of the daily trend.

This bugged me enough that I wrote a quick ruby script to do this for me:

```ruby
require "time"

Measure = Struct.new(:time, :value)

data = File.read("./data").lines.map { |line|
  date, time, amount = line.split(" ")

  Measure.new(
    DateTime.parse(date + " " + time).to_time,
    amount.to_f,
  )
}

all = [data.shift]

raise "no data!!!!" if all.empty?
raise "must start with zero value!!!" if all.first.value.nonzero?

data.each do |next_data_point|
  last_data_point = all.last

  amount = next_data_point.value
  diff = (next_data_point.time - last_data_point.time).to_i

  amount_per_diff = amount / diff.to_i

  diff.times do |n|
    all.push(Measure.new(
      (last_data_point.time + n),
      amount_per_diff,
    ))
  end
end

result = all.each_with_object({}) do |measure, obj|
  obj[measure.time.to_date] ||= 0
  obj[measure.time.to_date] += measure.value
end

result.sort_by(&:first).each do |(date, total)|
  puts "#{date} - #{total.round(2)}"
end
```

I hacked this together pretty quickly and I'm a little pleased with it.
Here's the idea:

Instead of having just a few measurements taken at odd intervals, let's pretend we have many thousands of measurements taken at regular intervals.
One per second, in this implementation.
And then use code instead of dumb eyeballs to add up all the measurements in each day.
I'm calling this **smearing the data** for want of a proper term.


After smearing the data (assuming an even trickle between measurements), the trend looks like this:

```
41.13
32.6
17.43
24.0
18.35
```

In this case, it's so close to the eyeball math that it may not have been worth doing, but I will rest easier nevertheless.

I just have one urgent question for you my dear reader: is there a name for what I did here?
I want to learn more about data.
As I learn things, I am often pleased to find out that all of the ideas already exist and have good names.
What's this one's?
