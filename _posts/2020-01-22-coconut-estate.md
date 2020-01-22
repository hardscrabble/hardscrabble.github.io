---
title: Coconut Estate
date: 2020-01-22 00:31 EST
---

As a software engineer who has spent the last 6-7ish years working full-time jobs and listening to podcasts, I've spent a meaningful amount of time day-dreaming about starting my own company.
Here's how I'd do it:

First I'd make a side project, as a nights and weekends thing.
I'd charge for it, and people would buy it, and then I'd quit my day job.
Maybe I'd do some freelance work in the early days to make ends meet.
Maybe I'd do a podcast about the whole process and sell ads on it, to share some behind the scenes stories and get people interested.
Eventually I'd rent an office in Brooklyn with a few desks and start hiring people.

In 2018 this day-dreaming bubbled over the pot.
It was spring and I was in Rome, walking and looking at buildings and thinking.
At some point, on a bench outside Vatican City, I had an idea.
When I got back to New York, I spent the next seven months building a prototype.
I rented a desk at a co-working space.
I paid GitHub for private repos (this was before they were free).
I bought a domain name.
I made a twitter account.
I chose a tech stack.
I got a website online.

Eventually I gave up.
I turned my focus back to my day job.
I got into tennis and running.
I found a new day job.

And I never wrote about any of it here until now.

So, while I still remember all this, here's a bunch of information about what I did and how I did it and why I stopped.

## the name

I never had a proper name for it, but the whole time I worked on it, I called it Coconut Estate.
It's a reference to [my favorite song], which is about an obsessive zealot who destroys himself in his search for knowledge, and has no regrets.
As a product name, it's probably very bad, but there were times I thought about sticking with it.
Maybe people will find it intriguing, I would think.
I spent $5.94 on the domain `coconutestate.top`.
I would joke that the other name I was considering, which comes from [another mewithoutYou song], was Unbearably Sad.
That would make Coconut Estate sound better by comparison.
I liked that Coconut Estate sounded like a _place_ that you enter and enjoy spending time in.

[my favorite song]: https://mewithoutyou.bandcamp.com/track/the-king-beetle-on-a-coconut-estate
[another mewithoutYou song]: https://mewithoutyou.bandcamp.com/track/torches-together

## the product idea

Coconut Estate would be a website for **roadmaps**.
You could sign up, and then share a roadmap, such as "roadmap to get good at tennis".
Others could follow that roadmap, and learn to get good at tennis.
It would be kind of like a curriculum that you could annotate with whatever links, text, resources you want, for each step.
I imagined it as a kind of recursive thing, so perhaps one of the steps would be "learn how to serve", and you could drill down and that would be a whole roadmap unto itself.

This was inspired in part by a blog post, [Roadmap for Learning Rails][roadmap-inspiration][^1], published about ten years ago by one Wyatt Greene, who I do not know.
When I was starting to re-learn how to program in 2012 or so, I must have googled "ruby on rails roadmap", and found it.
It was _so_ helpful.
Web development was very complicated[^2].
I didn't know where to start.
I felt overwhelmed.
The blog post included a flow chart, which helped structure my learning.
It told me: forget all that, start here.
And that helped me relax.

[roadmap-inspiration]: https://web.archive.org/web/20181113010707/https://techiferous.com/2010/07/roadmap-for-learning-rails/
[^1]: Since, apparently, deleted. Thank goodness for the Internet Archive.
[^2]: I can't imagine how much more overwhelming it must seem now.

I thought: I'm sure programming isn't the only thing that's complicated.
I imagined a whole community flourishing, of people writing similar roadmaps out of the goodness of their hearts, about all kinds of topics.
I imagined people's lives changing as they self-improved by following roadmaps.
Because of the thing I made.

I also imagined that having a really nice interface that made it super easy to build and explore these roadmaps would be irresistible, and more useful than a JPEG embedded in a blog post.

## the product idea: phase two

The plan was to focus on getting that off the ground, and then to build out this second phase, which is geared to business.
I imagined a model kind of like GitHub: free to use for your personal, public stuff, but you pay to use it at work.
And maybe the fun, positive public side would make people feel good about the tool and want to bring it into their workplace.

Some of the business use-cases I was imagining:

- a roadmap for how to on-board a new team member
- a roadmap for how to onboard a new customer
- a roadmap for how to offboard a team member, including all of the things that you need to revoke their access to
- a roadmap for how to perform your team's monthly security audit

Et cetera.[^3]

[^3]: [Et cetera. Et cetera!](https://mewithoutyou.bandcamp.com/track/seven-sisters)

If the public-facing option was to be basically "luxe wikihow", the private-facing part was basically a checklist-oriented knowledge base.
In fact, the other primary inspiration for this was [The Checklist Manifesto], a book that I never actually read past the first chapter.
As I understood it, it details how hospitals use checklists to ensure that they follow their processes every time, because the alternative inevitably leads to mistakes.

[The Checklist Manifesto]: https://en.wikipedia.org/wiki/The_Checklist_Manifesto

## how I organized myself

I created a git repository called coconut-estate internal.
I still have it.
It looks like this:

```text
.
├── PLAN.txt
├── README.md
├── TODOs
│   └── max.txt
├── TOLEARNS
│   └── max.txt
├── architecture
│   ├── dns.txt
│   ├── infrastructure.txt
│   ├── toolbox-design.txt
│   └── web-app-stack.txt
├── brainstorms
│   └── max
│       ├── 2018-04\ handbook\ product\ notes.txt
│       ├── 2018-04\ misc\ going\ indie\ thoughts.txt
│       ├── 2018-04\ security\ audit\ product\ notes.txt
│       ├── 2018-04-05\ roadmap\ product\ notes.txt
│       ├── 2018-05\ deploying\ to\ digital\ ocean\ thoughts.txt
│       ├── 2018-05-21\ private\ roadmaps\ I\ make\ for\ myself.txt
│       ├── 2018-06-03\ random\ thought.txt
│       ├── 2018-06-17\ women\ and\ email.txt
│       ├── 2018-07-29\ docker.txt
│       ├── 2018-08-10\ art.txt
│       ├── 2018-11-05\ perks.txt
│       ├── 2018-12-08\ dunbar.txt
│       ├── 2018-12-09\ more\ dunbar\ notes.txt
│       ├── 2018-12-11\ more\ dunbar\ thoughts.txt
│       └── 2019-04-07\ dunbar\ thought.txt
├── finance
│   └── expenses.rb
├── marketing
│   ├── competitive\ analysis.txt
│   ├── feedback
│   │   ├── 2018-04-05\ sarah.txt
│   │   ├── 2018-04-09\ nick.txt
│   │   ├── 2018-04-22\ gavin.txt
│   │   ├── 2018-05-01\ gordon.txt
│   │   ├── 2018-05-02\ dan.txt
│   │   └── 2018-07-19\ harsh.txt
│   ├── name-ideas.txt
│   ├── slogans.txt
│   └── strategy.txt
├── todo-list-to-revamp-terraform-and-digital-ocean.txt
└── work-logs
    └── max.txt

9 directories, 36 files
```

It was basically a junk drawer.
A place to put thoughts related to the project.
I'm very much a plaintext kind of person, and this suited me very well.
Some of the files were meant to be living documents that I could keep up-to-date over time, while others were snapshots of specific conversations or brainstorms.
I namespaced everything with my name in case anyone else joined in the future and also wanted to record their brainstorms or work logs there.

Here's an example excerpt from `brainstorms/max/2018-06-17\ women\ and\ email.txt`, since that file name jumped out at me as I was just reviewing this:


> Just yesterday I was chatting with three software engineers from Ellevest, a financial investing startup that caters primarily to women.
> I don't think I'd ever thought to cater Coconut Estate primarily to women, but why not?
> It's kinda like the "mobile first" of product design; it's harder to make a website mobile-friendly if you start by making it desktop friendly, and maybe it's true that it's harder to make a product women-friendly if you start by catering to "everyone".
>
> I shared that thought with Sarah and she was like ...
> I don't think that's a good analogy.

Huh!
I'd forgotten all of that.
I'm not sure how valuable that thought was, but if thoughts are like lightning bugs around you, the natural thing is for them to flicker off and disappear into the night.
Having a hole-punched jar nearby encourages capturing those thoughts, some of which might be valuable.

The file I updated most often was `work-logs/max.txt`.
This one was directly inspired by <https://brson.github.io/worklog.html>, the "work log" of a Rust programmer that I had stumbled on at some point.
There were times that I kept one at work, on a notebook at my desk, and found it helpful to remember how I had spent my time, and keep me somewhat accountable as I continued to spend my time.

Here's an excerpt:

> ## 2018-09-03
>
> - 11:39
> - At home, thinking about rewriting the front-end app in Elm.
>   I've been following the progress of Level.app, an indie slack competitor that Derrick Reimer is working on.
>   He's doing it as an OSS thing, which is neat.
>   He's using Elixir/Phoenix and Elm.
>   My coworker Scott is also interested in Elm, and my former colleague Todd was also enthusiastic about it.
>   The latest episode of Reimer's podcast talks about upgrading to Elm 0.19 and how it improved some performance and asset size stuff.
>   For me, the big appeal is the type safety and the "no runtime exceptions" promise.
>   I started working my way through the guide yesterday, and this morning I watched the "Let's be mainstream!" talk from Evan Czaplicki.
>   The guide is mostly clicking with me.
>   The other precipiating incident here is that at the day job, we're currently considering adopting a more modern front-end tool like React or Vue, and I'm wondering if we should be considering elm.
>   I haven't made much of a commitment to Ember.js at this point, and I haven't found it to be extraordinarily intuitive, so I'm tempted to give Elm a shot.
> - 14:23
> - At Konditori on Washington.
> - Plannning to keep working through the guide, with the goal of standing up a dockerized hello world web app today.
>   Stretch goal 1: deploy it to prod.
>   Stretch goal 2: have it load the roadmaps and display them on the page.
> - A few things that are appealing about elm so far:
>   - a static type system
>   - no nil, runtime exceptions
>   - fast
>   - an opinionated linter (third-party but still)
>   - A kind/entertaining leader (per the 1.5 talks I watched)
>   - At least attempts to be beginner-friendly with its emphasis on guides, docs, and error messages
>   - no npm
>   - Tests feel less necessary
> - A few things that are unappealing about elm so far
>   - learning curve on syntax
>   - tooling is a little minimalist and it's not super clear how I'm supposed to be using these
>   - Releases happen but maybe not that often?
> - 21:01
> - Took a bunch of breaks but more recently got to the good stuff in the guide and feel like I have the general idea of how this thing works and I kind of want to try to push thru to prod.
> - 22:37
> - Shipped a basic sketch of a site layout to prod and opened a PR (<https://github.com/maxjacobson/coconut-estate/pull/4>) so it'll be easy to pick up where I left off...
>   Big things to figure out next:
>
>   1. how to hook up graphql
>   1. how to do asset fingerprinting
>   1. how to use elm reactor with a spa (maybe won't?)
>
> - Overall quite pleased.

Others were more spartan:

> ## 2018-09-10
>
> - 22:57
> - refactoring some elm
> - 23:53
> - I give up!
>   Too complicated.

I'm really grateful that I took notes as I was working.
For me, putting thoughts to words helps me know what my thoughts are.
It also made me very aware of how much time I was putting into the project.
This reminded me that I was taking the project seriously, but also helped keep me very aware of how slowly it was going, which grew discouraging over time.

I did eventually open source the code, but the internal repo is just for me.

## the tech stack

Here's an overview of some of the most important technologies I used:

* Rust
* Elm
* Docker (for development)
* Digital Ocean
* Terraform
* Let's Encrypt
* PostgreSQL
* GraphQL
* systemd

I was motivated by a few things:

1. wanting to use things that I found interesting
2. wanting to use things that seemed like they'd help me build something very sturdy and reliable
3. wanting to use things that would keep costs down

Some things I wasn't motivated by:

1. Building quickly
2. Keeping things simple

In retrospect, these were the wrong motivations, if my goal was to actually finish something.
Which, nominally, it was.

## how I organized the code

I made a single repo that had all the code in it.
At work, we were having success using such a [monorepo](https://danluu.com/monorepo/), and it felt right.
I made the top-level of the repo into a [Cargo workspace], which is Rust's built-in monorepo-like concept.
The idea is that you can have several sibling Rust projects that you can think of as a family.
By the end, I had four members in my workspace:

[Cargo workspace]: https://doc.rust-lang.org/book/ch14-03-cargo-workspaces.html

1. api
2. secrets_keeper
3. toolbox
4. authorized_keys_generator

Additionally, alongside the rust projects, I had two non-Rust codebases, each in their own subdirectory:

1. website
2. terraform

I'll go through each of those in a bit of detail, providing some highlights of how and why they were built.

### api

The primary back-end service was called [api](https://github.com/maxjacobson/coconut-estate/tree/edge/api).
I chose Rust because I found Rust interesting.
I didn't really know it, beyond the basics.
I got much better at Rust while building this, although I still consider myself probably an advanced beginner at best.
Most of what I've learned in my career I've learned from colleagues, either by copying what they did or soliciting their feedback.
I've never had that with Rust, and so I really just have no idea if I'm doing anything right.
But I got to a point where I felt somewhat productive, which was very gratifying, and several years in the making.

I used [clap] to define a CLI interface for the api program.
This was mainly helpful because it gave me an easy way to [define][define-clap-api] a few required command line flags that the api needs to boot.
I particularly fell in love with clap while building this project, as it made it extremely easy to build a nice CLI program with subcommands and flags.

[clap]: https://crates.io/crates/clap
[define-clap-api]: https://github.com/maxjacobson/coconut-estate/blob/edge/api/src/cli.rs#L11-L38

I used [diesel] as an ORM for interacting with the database.
Diesel is created by Sean Griffin, who I had listened to talking about building Diesel on [The Bike Shed] for ages and was curious to try.
It's excellent.
I didn't really stress test it, but everything I wanted to do, it had thoughtfully modeled within Rust's type system.

[diesel]: https://crates.io/crates/diesel
[The Bike Shed]: https://bikeshed.fm/

I decided to build a GraphQL API rather than a RESTful one.
It felt trendy at the time.
Moreover, at work we were integrating with GitHub's GraphQL API, and I didn't understand how any of that integration code worked.
Learning about GraphQL APIs by building a simple one was very helpful for me to learn the important concepts, and that made it so much more clear what our client code was doing at work.
I used the [juniper] crate to define the schema, and used [actix-web][actix-web][^4] to serve the requests.
GraphQL is really cool.
I admire the web dev community for opening its heart to a perspective that entirely rejects REST.
I'm not anti-REST, but I like for established ideas to be challenged.
And I like that there is an option available for projects where it's important to give the maximum flexibility to front-end developers.

[juniper]: https://crates.io/crates/juniper
[actix-web]: https://crates.io/crates/actix-web
[^4]: Although I haven't worked on this project in ages, I was sad to [recently learn](https://words.steveklabnik.com/a-sad-day-for-rust) that the maintainer of actix-web got burnt out on negative feedback and walked away from the project. I found actix-web very easy to work with in large part because of the effort he put in to providing [examples](https://github.com/actix/examples). Hopefully he knows his work was appreciated by a lot of people. As I'm writing this, I'm seeing that the project is [actually going to carry on](https://github.com/actix/actix-web/issues/1289) under a new maintainer, who somehow saw that happen and thought "sign me up".

The one other interesting thing about the api was how I went about doing authentication and authorization.
I decided to do claims-based authorization using [JSON Web Tokens] (JWT).
To be totally honest, I'm not sure that I totally figured out a nice, ergonomic way of working with JWT, although the [jsonwebtokens] crate was very easy to work with.
The basic flow is:

[JSON Web Tokens]: https://jwt.io/
[jsonwebtokens]: https://crates.io/crates/jsonwebtoken

* User signs up or signs in via an API request
* In response, the API renders a token, which encodes their claims, which look like:
  ```json
  {
    "user_id": 3,
    "site_admin": false
  }
  ```
* The front-end can then do two things:
  1. store the token in local storage to use to authenticate future requests
  2. actually deserialize the claims from the token, and use that to make decisions about what to try and render (for example, whether to show an admin-only widget on a page)
* When the API receives subsequent requests to access data, it will inspect the provided token to determine:
  1. what claims are the requestor making about who they are?
  2. are the claims _signed_, meaning they were issued by the API itself?
  3. have the claims _expired_, meaning they were _once_ issued by the API itself, but we want to reject the request and force them to re-authenticate? (I didn't actually implement this part)

Overall this felt good.
Building something using JWT was a great way for me to learn about JWT.
For example, I learned that if you're using a JWT token for an API you're integrating with, you can Base64-decode the three segments of the token and actually inspect the claims that have been serialized into the token.
You could even attempt to change the claims, re-encode them, and make a new token, but it shouldn't work, because the signature will reveal that you've tampered with the claims.

Perhaps I would have felt more comfortable with JWT over time.

### secrets_keeper

I decided that I wanted to roll my own service for managing secrets: [secrets_keeper](https://github.com/maxjacobson/coconut-estate/tree/edge/secrets_keeper).
For example, api needs to know a PostgreSQL username and password to establish a database connection.
It reads those credentials from the environment, but how do they get to the environment?
I think I probably over-engineered my answer to that question.

secrets_keeper is a second API web service, designed to run behind a firewall.
It has exactly two routes:

1. `GET /secrets`
2. `POST /secrets`

I built this one as a RESTful API using [warp] rather than GraphQL and actix-web.
I was really just having fun poking around and taking my self-directed whistle-stop tour through the community.
Of course, like api, it also uses clap to define its CLI.

[warp]: https://crates.io/crates/warp

Here's how you use it:

1. Create a new secret by making a `POST /secrets` request, with a body that looks like:
   ```json
   {
     "group": "api",
     "name": "POSTGRES_USERNAME",
     "value": "coconutpg"
   }
   ```
2. Before starting up the api service, fetch the secrets for the api group by requesting `GET /secrets?group=api`, and then export all of secrets you get back into your environment

Internally, it just stores the secrets in plaintext files on the filesystem.
There's absolutely no authorization built into secrets_keeper, so it's very important that it run behind a firewall which will be responsible for making sure that only authorized personnel can read and write secrets.

### toolbox

At the beginning, I wanted to build all of the ops-related scripting in Rust, so I created [toolbox](https://github.com/maxjacobson/coconut-estate/tree/edge/toolbox).
I thought this would help me keep my Rust skills sharp.
I gradually let that go and shifted to doing lots of scripting in plain-old shell scripting.
But this exists.

Of course, it uses clap to define its CLI interface.
Here's what it looks like to use it:

```text
$ bin/toolbox secrets write --help
toolbox-secrets-write
Write secrets to the secrets keeper service

USAGE:
    toolbox secrets write [OPTIONS] <VARIABLE> <VALUE> --group <GROUP>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
    -e, --env <ENVIRONMENT>    Specifies which environment to target
    -g, --group <GROUP>        Which group of secrets does this secret belong to?

ARGS:
    <VARIABLE>    The environment variable name for the new secret
    <VALUE>       The value of the new secret
```

clap takes care of generating that help text based on the registered subcommands, which is pretty neat.

The main responsibility that lingered in toolbox was this command for registering a new secret with the production secrets_keeper.
It would have been much simpler and lighter-weight to make a shell script that uses [curl] to make the POST request.

[curl]: https://en.wikipedia.org/wiki/CURL

Because the secrets keeper is not publicly available, there's some extra work that you need to set up in order to make this request from your local environment.
You know what, let's talk about it.

We're going to illustrate the [bastion host] pattern.

[bastion host]: https://en.wikipedia.org/wiki/Bastion_host

The idea is that there are three computers involved:

```text
*************
* my laptop *
*************
    ||
    \/
***********
* bastion *
***********
    ||
    \/
***********
* secrets *
* keeper  *
***********
```

In words:
The networking is configured so that the only computer that is allowed to make requests to the secrets keeper is the bastion server.
Additionally, the only computer that is allowed to make SSH connections to the secrets keeper server is the bastion server.
The bastion and the secrets server have their [authorized keys] defined to only allow known administrators to SSH into them.

That means a few things:

1. if you were to SSH onto the bastion server, you could then SSH into the secrets keeper server, but if you were to try to SSH directly into the secrets keeper server, it would be like it didn't even exist.
1. if you were to SSH onto the bastion server, you would be able to use curl to read and write secrets, but if you try from your laptop it will be like the site doesn't even exist.

[authorized keys]: https://www.ssh.com/ssh/authorized_keys

My laptop has an SSH key on it that identifies me as a known adminstrator.
So it would be cool if I could make a request from my laptop that _tunnels_ all the way through the bastion server to the secrets server, and allows the response to tunnel all the way back.

Well, we can.

There's an `ssh` command you can run which creates an "ssh tunnel".
While the tunnel remains open, you can make network requests to a specified port on localhost, and ssh will take care of "forwarding" the request through the bastion server.

The bastion pattern is something I had learned at work, but building my own implementation of it helped reinforce why it is valuable and how it works.

### authorized_keys_generator

The final Rust service in my workspace was called [authorized_keys_generator](https://github.com/maxjacobson/coconut-estate/tree/edge/authorized_keys_generator).
In the last section, we talked a bit about how we use an authorized keys file to govern who can SSH into the production infrastructure.
We could manually generate that file, but I felt the need to automate it.
This was inspired by [codeclimate/popeye][popeye], a tool that generates an authorized keys file based on keys registered with AWS.

[popeye]: https://github.com/codeclimate/popeye

At one point, at Code Climate, we talked about instead pulling this from GitHub, which exposes each users's public keys at, e.g., <https://github.com/maxjacobson.keys>.
I thought I'd try building a simple version of that concept for my project, so I made a simple CLI (again, using clap), that lets you do:

```
$ authorized_keys_generator --usernames maxjacobson dhh
```

And it would print out:

```
# authorized keys generated from authorized_keys_generator

# @maxjacobson
<first key here>

# @maxjacobson
<second key here>

# @dhh
<another key here>
```

You could take that text and use it as an authorized keys file on a server.
I imagined later on I might build in support for you to provide a GitHub org and team, and it would then take care of looking up the users in that team, but it didn't come to that.

### website

The other significant directory in my monorepo with application code was [website](https://github.com/maxjacobson/coconut-estate/tree/edge/website), which represented the front-end of the website.
I used [create-elm-app] to scaffold a "hello world" Elm app, and boogied from there.

[create-elm-app]: https://github.com/halfzebra/create-elm-app

I had _really_ never used Elm before, and it was kind of a lark that very quickly started to feel very right.
At the time, all of my front-end experience was with JavaScript and jQuery.
This was my first exposure to:

1. a functional programming language
1. a front-end web app framework
1. the declarative UI pattern

I had been planning to use [Ember.js], which I'd been meaning to try for years.
I still do want to try it some day, I think.
Elm was just something I was curious to read about, and I got ensnared pretty quickly.
The [Elm guide] is just very good:
Very friendly and persuasive and not very long.
It feels like you can learn it in an afternoon, and you kind of can, if you're in the right mood.

[Ember.js]: https://emberjs.com/
[Elm guide]: https://guide.elm-lang.org/

Over time, I did sour a little bit on Elm, but I mostly blame myself.
I don't think I designed my system very well to scale to support many pages and many actions.
I would have appreciated more guidance from the guide on how I'm supposed to do that, I suppose.

I found that it was very easy to build something that was:

1. very fast
2. very reliable (they promise no runtime errors and the hype is real)
3. very easy to refactor, knowing the compiler will help you along

I definitely wrote a lot of [awkward Elm code].
I never fully mastered how to use the various functional programming combinators that keep your code natural and streamlined.

[awkward Elm code]: https://github.com/maxjacobson/coconut-estate/blob/edge/website/src/Token.elm#L23-L45

The relationship between Elm and JavaScript frequently made my brain melt a little bit.
Part of the idea with the Elm code is that the Elm code has no side effects.
Your program has an entry point, and it receives some parameters, and depending on what the parameters, are, it resolves to some value, and that's it.
You don't use it to actually _do_ anything, you just take in some parameters, and use those to deterministically produce a single value.

Here are some things you can't "do":

* You can't make a network request.
* You can't look up the current time
* You can't write to local storage

Here's what you can do:

You can define these 3-ish entrypoints, each of which answers a single question:

1. `init` -- what is the initial state of the application?
1. `update` -- if, hypothetically, someone _were_ to interact with the application, how might that change the state of the application?
1. `view` -- what does the application look like, based on the current state of the application?

Each of these is totally pure and has no side effects.
But like, of course, we... do want to have side effects.
So while you can't "do" those things in Elm, you can use Elm to do those things.
Here's what I mean:
The Elm code compiles to JavaScript code, and gets run as JavaScript code in a browser.
And JavaScript can do whatever it wants.
So when you want to write some Elm code that has a side effect, it's this sort of coy two step process:

1. whisper a "command" into the air, for example: would someone please [make this network request?][elm-get]
2. describe what should happen if someone _did_ perform that command

[elm-get]: https://package.elm-lang.org/packages/elm/http/latest/Http#get

This much is all outlined in [the Elm guide](https://guide.elm-lang.org/effects/), and grows to feel natural over time.
Kind of.

One major asset of the Elm community is its [very active Slack channel](https://elmlang.herokuapp.com/).
When I was getting stuck, I found myself spending time there lurking and occasionally asking questions.

One thing about Elm that strikes me as a liability is the [paucity of releases](https://elm-lang.org/news).
I think that Rust has the right idea with the [release train model], which helps them achieve the goal of "stability without stagnation".
Elm sometimes goes over a year without any release at all in the core compiler.
That doesn't tell the whole story: there is activity, in that time, in the package ecosystem, including in the core packages (in theory).
But it seems to take a deliberately slow, thoughtful pace that strikes me as a bit discomfiting.

[release train model]: https://doc.rust-lang.org/book/appendix-07-nightly-rust.html

I genuinely love to see the areas of focus that the Elm compiler developers choose.
In their 2019 release, 0.19.1, [they focused][elm-release-notes] mostly on improving their already-good compiler error messages.
That's excellent.
Given that they're taking the tack of keeping the language small and slow-moving, I admire that they're polishing that bauble as much as they can, which should help new people get into it even easier.

[elm-release-notes]: https://elm-lang.org/news/the-syntax-cliff

After I got my head over my skis with Elm, we started using [React] at work, and I found that the concept of a declarative UI framework with an internal state that you can update based on user interaction was oddly familiar.
React was all new to me, but it went down fairly easy, and I credit my experience with Elm.
And I did find myself missing the types.

[React]: https://reactjs.org/

### terraform

The final significant codebase in the monorepo was [terraform](https://github.com/maxjacobson/coconut-estate/tree/edge/terraform).
This directory contained the definitions of all of the components of my infrastructure.
I wanted to follow the "infrastructure as code" trend here, using [HashiCorp terraform](https://www.terraform.io/) because we were using it at work and I barely understood any of its core concepts.
Actually being responsible for setting it up from scratch was hugely valuable for me to learn terraform fundamentals.

Here's the idea for the not-yet-inducted who may be reading this:

Let's say you want to deploy your API service to the cloud, and you choose [Digital Ocean](https://www.digitalocean.com/) as your vendor.
You'll need to create a number of resources within Digital Ocean:

* a [server](https://www.terraform.io/docs/providers/do/r/droplet.html) (they call them droplets) to run the API binary on
* an [IP address](https://www.terraform.io/docs/providers/do/r/floating_ip.html) to [assign](https://www.terraform.io/docs/providers/do/r/floating_ip_assignment.html) to the server
* a [domain](https://www.terraform.io/docs/providers/do/r/domain.html) to assign to that IP address

And, actually a number of additional resources.
One way that you can create those is to log in to the website and click some buttons to create them for you.
That works well, but it's up to you to remember which buttons you pressed, which is not easy.

Another option is to write some scripts to interact with [the superb API](https://developers.digitalocean.com/documentation/v2/), creating all of the resources that you need.
That's also pretty good, but what if you want to just change one thing about a resource.
For example, Digital Ocean droplets can have tags.
Let's say you decide later on that you want to add a new tag to a droplet.
If your script is set up to only create the resource, it won't be easily changed to actually _update_ a resource.
Or, what if you want to delete some resources?
That's a whole new set of scripts.

This is all where terraform comes in.
You don't write any scripts to do anything, at all.
Instead you describe the resources that you want to exist, with the qualities that you want them to have.
Then you use the terraform CLI to apply those descriptions.
The CLI will figure out what it needs to create, update, or delete.
It just sort of figures it out.
It's excellent.

I really enjoyed using Digital Ocean with Terraform.
I was using AWS at work at the time, which was my first experience with a big cloud vendor.
It was very helpful for me to see what was in common and what was different between AWS and Digital Ocean.
It gave me an appreciation for the staggeringly vast number of services that AWS offers.
Digital Ocean is pretty quickly launching new things to close the gap, like Kubernetes support, managed databases, generating SSL certificates for your load balancers...
I like the idea of using smaller players sometimes, and I'd be happy to try Digital Ocean again for something else.

## deploys

All right, so that's my tour through the code.
The last section, about terraform, is a great segue into another topic I'd like to talk about: deploys.
Sigh.
This part is hard.
I did not do anything particularly elegant here.

It's possible to use terraform to help you deploy changes to your application code, but it requires a lot of cleverness.
I didn't do that.

Instead, I had terraform be responsible for:

* creating servers
* creating SSL certificates
* registering systemd units that define a service that ought to run, such as: the api service
* [install][dummy-install] a [dummy script] that stands in for the application code which doesn't actually do anything.

[dummy-install]: https://github.com/maxjacobson/coconut-estate/blob/edge/terraform/modules/website/prepare-droplet.bash#L53-L59
[dummy script]: https://github.com/maxjacobson/coconut-estate/blob/edge/terraform/modules/website/api-dummy.bash

Then, I wrote some manual deploy scripts which take care of:

1. building the new version of the code
1. uploading the new build to the production service
1. stopping the service in production
1. moving the new build into place
1. starting the service in production

Here's [an example](https://github.com/maxjacobson/coconut-estate/blob/edge/bin/deploy/api):

```sh
#!/bin/sh

set -ex

bin/prod/build api

bin/scp deploy-artifacts/api \
  www.coconutestate.top:/mnt/website/binary/api-new

bin/ssh www.coconutestate.top sudo systemctl stop api.service

bin/ssh www.coconutestate.top mv /mnt/website/binary/api-new /mnt/website/binary/api

bin/ssh www.coconutestate.top sudo systemctl restart api.service
```

As you can see, all of my helper scripts tend to reference other helper scripts.
It's a kind of rat's nest of helper scripts.

The downside of this approach is that it incurs a moment of downtime.
I tried to minimize it by uploading the assets before swapping it into place.
It didn't really matter, because no one was using the website at any point, so I was happy to compromise on uptime.

## types

This project was definitely the zenith of my interest in types:

* all of the data in the database hews to the **types** defined in the database's schema
* as data is loaded into memory in the Rust code, it is always deserialized into Rust types
* when requests are made to the API, the request must adhere to the types defined in the GraphQL schema
* when the API responds to requests, must adhere to the types defined in the GraphQL schema
* when the Elm front-end wants to talk to the API, it uses Elm types that represent the GraphQL schema's queries
* then of course the Elm front-end deserializes the responses into memory in the browser, using Elm types that represent the expected structure of the responses

Frankly, it was a lot.

It led to quite a lot of boilerplate, modeling all of those types.
And, of course, the more boilerplate the more opportunity for human error.
And, more pressingly, human boredom.

## cheapskate ci

So, did I write any tests?
Not really.
I felt like the types were keeping me in check enough.

I did use some code formatters:

* [terraform fmt](https://www.terraform.io/docs/commands/fmt.html)
* [elm-format](https://github.com/avh4/elm-format)
* [rustfmt](https://github.com/rust-lang/rustfmt)

I thought it would be cool to add some CI that made sure all of my code was well-formatted before I could merge anything into my default branch.
One challenge was that I had kept my repo private, and the various CI providers all required you to pay to run builds for your private repo.
As if to demonstrate the fact that I was more motivated by dorking around and learning things than actually launching a product, I took a detour to build something new:

[cheapskate-ci](https://github.com/maxjacobson/cheapskate-ci).

Here's the idea: instead of having a `.circleci/config.yml` in your codebase, add a `cheapskate-ci.toml`.
Mine looked like:

```
[ci]
steps = [
  "docker-compose run --rm build cargo fmt --all -- --check",
  "terraform fmt -write=false -check=true -list=true -diff=true terraform",
  "docker-compose run --rm build cargo check --quiet --all",
  "elm-format --validate website",
  "docker-compose run --rm website elm-app test",
]

[github]
repo = "maxjacobson/coconut-estate"
```

Then, feel free to run: `cheapskate-ci run --status` to run those steps, and report a pass/fail status to GitHub regarding the latest commit.
Then you can make that status a required status on GitHub.
All taken care of, for free.
You know, for cheapskates, like me.

It reminded me of my first programming job when we didn't have CI, we just had an honor system.
You open a pull request.
You get an approval
You run the tests locally, and if they pass, you merge the pull request.
Looking back that feels so hard to believe.

(We got CI eventually)

Oh, and also...

It will prompt you for a GitHub token so that it can [create a commit status on your behalf](https://developer.github.com/v3/repos/statuses/).
I actually made another library, called [psst], which cheapskate-ci uses to prompt you for info and persist the provided value for later use.
I was really into that kind of thing at the time.

[psst]: https://github.com/maxjacobson/psst

## what was rewarding about all this

I've tried to sprinkle in some things that I found rewarding about this process.
I'll summarize and sneak in a couple more:

1. Working independently meant that I was exposed to a lot of technical work that others were taking care of at work, or which were set up long before I joined and no one needed to think about anymore.
  This gave me opportunities to learn things that I otherwise wouldn't have, and which put me in a better position to debug and operate production issues, particularly networking issues
1. Working independently meant that I could make every technical decision, and make a lot of mistakes, in a low stakes environment.
   Sometimes following my curiosity worked out great and gave me some confidence in my technical instincts.
   Other times they were a disaster, which was genuinely humbling and helped clarify where I have room to grow.
1. Playing product manager was so fun.
   Thinking about what to build is so fun.
	 Talking to people about your idea and getting their feedback is so fun.
   Brainstorming how you might market your thing is actually so fun.
   * Oh: thank you very much to everyone who gave me feedback on this at any point, or listened to me talk about it.
     It meant a lot and I thought it was fun.

## what was discouraging

1. Actually finding time to work on it and feeling like progress is so slow is kind of a bummer
2. The valleys you go through when you doubt your idea and worry that all the effort you've put in is a bummer
3. As you do more market research and start finding that there are other things out there that are similar to your idea, and you start feeling like a bit of a fraud, it's kind of a bummer
4. I thought it would be more fun to join a coworking space, but working there on nights and evenings, it was always empty and a little lonesome

## what I learned about myself

When you work on a team, you can learn about how you work on a team.
On a team, hopefully, your team supports you, and provides you feedback to keep you on track.
On your own, if you start to drift out of your lane, you're going to just keep drifting.
On a team, if your energy flags, your teammates can pick up the slack and the project keeps moving forard.
On your own, it just ... kind of ... stops.

I think that everyone will drift in a different direction and probably stop somewhere interesting.
For myself, I learned that when my natural instincts are unchecked, I'm inclined to fuss over the code and try to get things just right, and I'm completely unmotivated by actually delivering completed products to other human beings at any point.

Good to know!

## why I stopped working on this

Oh, good question.

My enthusiasm petered out.
It was very, very slow going.
The technical choices I made were optimized more for my own curiosity and intellectual pleasure and less for actually being scrappy and shipping something.
Ultimately, for all the work I did, I built very, very few features, bordering on none at all.

What I actually built:

1. users can sign up, sign out, sign in
1. signed in users can create a roadmap, providing a name
1. signed in users can see the list of roadmap names

That's it!

Lol.

I believe that the backend architecture was fairly extensible and could have fairly easily grown to have more functionality.

The front-end, however, kind of stalled out.
I hit the limits of my Elm knowledge and wasn't able to keep extending it easily.
I needed to refactor it somehow but [didn't know how](https://github.com/maxjacobson/coconut-estate/pull/12).
Probably would have been surmountable but I ran out of steam.

The ops was a pain.
I made it too complicated, and doing things like renewing SSL certificates was tedious and required these very precise sequencings.
I should've just put it on Heroku.

Thinking about the possibility of launching it, I imagined it flopping.
I imagined no one actually signing up for it, or people coming by and finding it a ghost town with no roadmaps on it.
I thought about how much grit I'd need to keep promoting it, and I felt very tired.
At some point I found myself asking myself, how is this better than WikiHow again?

Around that time, two other things were going on:

1. I had a different idea that was new and shiny which I got more excited about, spent a while brainstorming and day-dreaming about that idea, and then [realized that a bunch of apps were already doing it](https://twitter.com/maxjacobson/status/1193739664387182592), and none of them seemed that cool
2. I got a mortgage and bought an apartment (another thing I haven't written about here) and in some ways I felt like I could do one or the other: buy an apartment or go independent.
   I'm not sure if that's actually true, but it's how I felt.

And so, I basically just made peace with moving on.
I felt like I got a ton out of the project.
Maybe one day I'll try something else.
I'm still listening to the podcasts.
