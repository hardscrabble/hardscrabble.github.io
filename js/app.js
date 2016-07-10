// via http://youmightnotneedjquery.com/#ready
function ready (fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

function endsWithSlash (url) {
  var lastChar = url[url.length - 1]
  return lastChar === '/'
}

function withoutSlash (url) {
  return url.slice(0, -1)
}

// setup 404 behavior
ready(function () {
  if (document.querySelectorAll('.not-found').length) {
    var currentUrl = window.location.pathname
    if (endsWithSlash(currentUrl)) {
      var suggestion = document.querySelectorAll('.not-found-suggestion')[0]
      var link = suggestion.querySelectorAll('.not-found-suggestion-url')[0]
      var newUrl = withoutSlash(currentUrl)

      link.setAttribute('href', newUrl)
      link.textContent = newUrl

      suggestion.setAttribute('style', 'display: block')
    }
  }
})

// setup search behavior
ready(function () {
  var searchBox = document.querySelectorAll('.search input')[0]
  if (!searchBox) { return }

  var request = new window.XMLHttpRequest()
  request.open('GET', '/searchdata.json', true)
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var posts = JSON.parse(request.responseText).posts
      var index = window.lunr(function () {
        this.ref('id')
        this.field('title', { boost: 10 })
        this.field('content')
      })
      for (var i = 0; i < posts.length; i++) {
        posts[i]['id'] = i
        index.add(posts[i])
      }

      searchBox.oninput = function () {
        var list = document.querySelectorAll('.search-results ul')[0]
        while (list.firstChild) { list.removeChild(list.firstChild) }
        var results = index.search(this.value)
        results.forEach(function (result, i) {
          var post = posts[result.ref]
          var li = document.createElement('li')
          var a = document.createElement('a')
          a.setAttribute('href', post.url)
          a.appendChild(document.createTextNode(post.title))
          li.appendChild(document.createTextNode(post.date + ' — '))
          li.appendChild(a)
          list.appendChild(li)
        })
      }
    } else {
      window.alert('Sorry, search is broken. Feel free to let me know.')
    }
  }

  request.onerror = function () {
    window.alert('Something went wrong... Please try again in a bit.')
  }

  request.send()
})
