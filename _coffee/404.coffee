current_url = document.URL
pattern = /(\d{4})\-\d{2}\-\d{2}\-([a-z\-]+)$/i
if current_url.match pattern
  match = current_url.match pattern
  window.location.replace "http://maxjacobson.github.io/#{match[1]}/#{match[2]}/"
