---
---

window.puts = (thing) ->
  # maybe it's not defined, like in old IE browsers
  if console && console.log
    console.log thing

