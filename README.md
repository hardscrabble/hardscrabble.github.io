# [hardscrabble.net](http://hardscrabble.net)

my personal site. powered by [jekyll](http://jekyllrb.com/) and hosted on [github pages](http://pages.github.com/)

## working on the site

* Run `bundle` to get the necessary gems.
* Run `bundle exec guard` to watch & compile the scss and coffeescript and preview the site at <http://localhost:1234>

## publishing a new post

I'm trying out [Mr. Poole](https://github.com/mmcclimon/mr_poole), a butler for Jekyll. It has good documentation but I'll jot down the basic flow for my own reference. This requires a fresh `bundle install`, to get the `poole` command.

* `poole draft "My Great New Post"`, which creates `_drafts/my_great_new_post.md`. The `_drafts` directory is great because the posts contained within it won't be included without a specific flag
* edit that file, write a great post
* `poole publish _drafts/my_great_new_draft.md` which moves the file into the `_posts` directory *and* (awesomely) updates the YAML frontmatter with the timestamp of right now
* then use git to commit and push

