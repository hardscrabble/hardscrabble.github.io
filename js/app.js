// via http://youmightnotneedjquery.com/#ready
function ready (fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

// setup search behavior
ready(function () {
  const searchBox = document.querySelectorAll('.search input')[0]
  if (!searchBox) {
    return
  }
  const searchList = document.querySelectorAll('.search-results ul')[0]
  const fullArchivesList = document.querySelectorAll('.full-archives')[0]

  function showSearch () {
    searchList.style.display = ''
    fullArchivesList.style.display = 'none'
  }

  function showArchives () {
    searchList.style.display = 'none'
    fullArchivesList.style.display = ''
  }

  if (window.location.hash) {
    showSearch()
    searchBox.value = decodeURI(window.location.hash.slice(1))
    const li = document.createElement('li')
    li.appendChild(document.createTextNode('Loading...'))
    searchList.appendChild(li)
  } else {
    showArchives()
  }

  const request = new window.XMLHttpRequest()
  request.open('GET', '/searchdata.json', true)
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const posts = JSON.parse(request.responseText).posts
      const index = window.lunr(function () {
        this.ref('id')
        this.field('title', { boost: 10 })
        this.field('content')
      })
      for (let i = 0; i < posts.length; i++) {
        posts[i].id = i
        index.add(posts[i])
      }

      searchBox.oninput = function () {
        if (this.value) {
          showSearch()
        } else {
          showArchives()
        }

        while (searchList.firstChild) {
          // empty out the search list
          searchList.removeChild(searchList.firstChild)
        }
        window.location.hash = encodeURI(this.value)
        const results = index.search(this.value)
        results.forEach(function (result, i) {
          const post = posts[result.ref]
          const li = document.createElement('li')
          const a = document.createElement('a')
          a.setAttribute('href', post.url)
          a.appendChild(document.createTextNode(post.title))
          li.appendChild(a)
          li.appendChild(document.createTextNode(' ' + post.date))
          searchList.appendChild(li)
        })
      }

      if (searchBox.value) {
        searchBox.oninput()
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
