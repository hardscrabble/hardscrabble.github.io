root        = "http://hardscrabble.net"
current_url = document.URL

beefsteak = /(\d{4})\-\d{2}\-\d{2}\-([a-z\-]+)$/i
if current_url.match beefsteak
  alert "please update your bookmarks, the site has moved from maxjacobson.net!!!"
  match = current_url.match beefsteak
  window.location.replace "#{root}/#{match[1]}/#{match[2]}/"

octopress = /blog\/(\d{4}\/[a-z\-]+)$/i
if current_url.match octopress
  alert "please update your bookmarks, the site has moved from maxjacobson.github.io!!!"
  match = current_url.match octopress
  window.location.replace "#{root}/#{match[1]}/"

