---
title: Didn't Ricky Gervais get in trouble for saying that? On MongoDB
layout: post
date: 2014-01-11 18:52
---

Remember when Ricky Gervais got in trouble for using the word "Mong" a lot to mean "stupid" and a lot of people were mad at him because it's an offensive thing to say? Anyway, I've been using MongoDB and Mongoid at work and I sometimes worry that the very name is kind of rude, but other than that I mostly like it.

My only database experience prior to this was with personal / school projects exclusively using SQLite3 and mostly with ActiveRecord as the interface to that database. Not coincidentally, this is the default Rails stack.

I want to make a simple rails project, a To Do List app becase duh, **twice**, once with ActiveRecord and once with Mongoid, and just see what kind of observations I have. OK I'm going to do that now. I'm going to use Rails 4.0.2.

## First, with ActiveRecord

Getting started by running these commands:

* `gem install rails` -- install the latest version of the Ruby on Rails gem
* `rails new todo_list` -- create a new rails project called "todo_list"
* `cd todo_list` -- change directories into that new project's folder
* `bin/rails generate model category name:string`
* `bin/rails generate model task name:string complete:boolean category_id:integer`
* `bin/rake db:migrate` -- to create a database "db/development.sqlite3" and update its schema. We'll come back to this when we talk about Mongoid because it's *way* different.

Then editing my freshly generated models to look like so:

{% highlight ruby %}
# app/models/task.rb
class Task < ActiveRecord::Base
  belongs_to :category
end
{% endhighlight %}

and

{% highlight ruby %}
# app/models/category.rb
class Category < ActiveRecord::Base
  has_many :tasks
end
{% endhighlight %}

That should be enough that we can now run `bin/rails console` and create some data:

{% highlight ruby %}
# we're in the rails console now
c = Category.new #=> #<Category id: nil, name: nil, created_at: nil, updated_at: nil>
c.name = "Things to buy" #=> "Things to buy"
c.save #=> true
c #=> #<Category id: 1, name: "Things to buy", created_at: "2014-01-11 22:10:47", updated_at: "2014-01-11 22:10:47">
c.tasks #=> #<ActiveRecord::Associations::CollectionProxy []>
c.tasks.build(name: "Buy some spinach") #=> #<Task id: nil, name: "Buy some spinach", complete: nil, category_id: 1, created_at: nil, updated_at: nil>
Task.count #=> 0
c.save #=> true
Task.count #=> 1
c.tasks #=> #<ActiveRecord::Associations::CollectionProxy [#<Task id: 1, name: "Buy some spinach", complete: nil, category_id: 1, created_at: "2014-01-11 22:22:24", updated_at: "2014-01-11 22:22:24">]>
Task.all.class #=> ActiveRecord::Relation::ActiveRecord_Relation_Task
{% endhighlight %}

So that whole way works fine. It's nice.

## Again, with Mongoid

The [Mongoid Installation page][] is kind of intimidating:

[Mongoid Installation page]: http://mongoid.org/en/mongoid/docs/installation.html#prerequisites

> There are a few things you need to have in your toolbox before tackling a web application using Mongoid.
>
> * A good to advanced knowledge of Ruby.
> * Have good knowledge of your web framework if using one.
> * A thorough understanding of MongoDB.
>
>This may seem like a "thank you Captain Obvious" moment, however if you believe that you can just hop over to Mongoid because you read a blog post on how cool Ruby and MongoDB were, you are in for a world of pain.
>
>Mongoid leverages many aspects of the Ruby programming language that are not for beginner use, and sending the core team into a frenzy tracking down a bug for a common Ruby mistake is a waste of our time, and all of the other users of the framework as well.

When I started using MongoDB I was kind of freaked because it promised to be so different. But honestly it's not that different. In a SQL database you need to write your queries using SQL, right? That stuff is so hard to write and inscrutable to read, at least for this blogger. MongoDB queries are written in JavaScript. That's a major upgrade in my book, even if it were otherwise the same underlying technology. And then, if you're using Mongoid, you can make another great upgrade by writing your queries in Ruby.

Of the three prerequisite bullet points listed on that page, I think I only disagree with the third one. If you're completely unfamiliar with MongoDB but fairly familiar with Rails, Ruby, and ActiveRecord I think you can make the leap. That's what I did. I started out by using Mongoid as if it were ActiveRecord, which is mostly totally possible. Then you can keep exploring the docs and branch out if you want.

One *setup* prerequisite is that you have MongoDB installed on your system. I think I have it on my laptop. I actually have no idea if I have it. Let's find out.

Getting started by running these commands:

* `gem install rails` -- install the latest version of the Ruby on Rails gem
* `rails new todo_list --skip-active-record` -- create a new rails project called "todo_list" *without* ActiveRecord[^confession]
* `cd todo_list` -- change directories into that new project's folder

[^confession]: Confession: On my first attempt at this I skipped this flag and it created the application *with* ActiveRecord and I was trying to replace it and then I was like, hmm, maybe there's a better way to do this. Unfortunately, there's no `rails new --database=mongodb` like there's a `rails new --database=postgresql`, among others

Now, before I generate my models I need to indicate that this project is going to use Mongoid. To do this I'm going to add the following to my Gemfile:

{% highlight ruby %}
# Use MongoDB as the database
gem "mongoid", "4.0.0.alpha2"
{% endhighlight %}

I'm using the alpha version of Mongoid 4 because... well, I'm sticking with the basics, so why not?

Now let's continue with these commands:

* `bundle install` -- fetch the Mongoid code from RubyGems for our project
* `bin/rails generate mongoid:config` -- create a configuration file; this generator didn't exist a moment ago, I think that's cool
* `bin/rails generate model category name:string --timestamps` -- create the category model; *almost* exactly the same command as before, but using a new Mongoid generator, which doesn't include created and updated timestamps by default
* `bin/rails generate model task name:string complete:boolean --timestamps` -- create the task model

This is the step in the ActiveRecord version where we ran `bin/rake db:migrate`. We don't have to do that now. No migration files have been created. The database is flexible. How does that make you feel? If that sounds totally awesome, MongoDB might be for you. If that [freaks][] you [out][], probably not.

[freaks]: https://twitter.com/jcoglan/status/419164746663731202
[out]: https://twitter.com/jcoglan/status/419165559452749825

Let's take a look at the model files that were just created for us:

{% highlight ruby %}
# app/models/task.rb
class Task
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :complete, type: Mongoid::Boolean
  belongs_to :category # actually this line isn't from the generator, I just added it
end
{% endhighlight %}

And:

{% highlight ruby %}
# app/models/category.rb
class Category
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  has_many :tasks # same as the belongs_to above
end
{% endhighlight %}

First kind of interesting difference: instead of your models inheriting functionality from ActiveRecord via subclassing, our models now `include` functionality from the `Mongoid::Document` module. Among other things, this gives the class a `field` method. We use this to define the attributes that this model should have. Unlike ActiveRecord models, which know the attributes they can have by introspecting on their corresponding table in the database[^introspective], Mongoid models typically have a list right in the class definition of the name and type of its attributes. Later, when we call `category.name = "Homework"`, Mongoid is dynamically figuring out what we mean based on our list of fields; it gives categories a `name=` and `name` method. This centralization appeals to me on an organizational level.

[^introspective]: probably my favorite phrase I learned at Flatiron School was "introspecting on the database"

And an interesting similarity: `has_many` and `belongs_to` work pretty much exactly the same way. If you're used to thinking relationally, you can use that here too.

So let's try to create some data and see how that goes. Into the `bin/rails console` let's go.

{% highlight ruby %}
category = Category.new #=> #<Category _id: 52d1d2036d61633a9b000000, created_at: nil, updated_at: nil, name: nil>
category.name = "Homework" #=> "Homework"
category.save #=> true
category._id #=> BSON::ObjectId('52d1d29c6d61633b1b000000')
category.id #=> BSON::ObjectId('52d1d29c6d61633b1b000000')
category.tasks #=> []
category.tasks.class #=> Mongoid::Relations::Targets::Enumerable
category.tasks.build(name: "Study Mongoid") #=> #<Task _id: 52d1d62d6d61633c05000000, created_at: nil, updated_at: nil, name: "Study Mongoid", complete: nil, category_id: BSON::ObjectId('52d1d29c6d61633b1b000000')>
Task.count #=> 0
category.save #=> true
Task.count #=> 0
category.tasks.last.save #=> true
Task.count #=> 1
category.tasks.create(name: "Study Rails 4") #=> #<Task _id: 52d1d8596d61633cba040000, created_at: 2014-01-11 23:48:41 UTC, updated_at: 2014-01-11 23:48:41 UTC, name: "Study Rails 4", complete: nil, category_id: BSON::ObjectId('52d1d7696d61633cba010000')>
Task.count #=> 2
Task.all.class #=> Mongoid::Criteria
{% endhighlight %}

First of all: I guess I did have MongoDB installed and running on my system, who knew?

OK so *functionally* it's almost exactly the same right? But there are some interesting differences:

* the unique id attribute is now called `_id` instead of `id` (this comes from MongoDB, not Mongoid, though Mongoid helpfully aliases `id` to `_id` in case you forget) and is totally long and weird looking
* that thing where queries are assembled and chainable and not invoked until the last moment is called a "Criteria" and not a "Relation"

These two Rails apps are available here: <https://github.com/maxjacobson/comparing_mongoid_and_active_record>

This is a really brief introduction to the basics of Mongoid. I want to dig in more. My laptop battery is at 6%. More to come.
