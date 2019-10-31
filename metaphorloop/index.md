---
title: metaphor loop
---

![metaphor loop](/img/metaphorloop.png)

{% include metaphorloop_subscribe.html %}

This is a podcast about how we think about programming. There are a lot of ways!

## episodes

{% for episode in site.metaphorloop_episodes %}
  1. [{{episode.title}}]({{episode.url}}) -- {{episode.date | date_to_string}}
{% endfor %}

## license

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Sound" property="dct:title" rel="dct:type"><a href="/metaphorloop">metaphor loop</a></span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://hardscrabble.net/" property="cc:attributionName" rel="cc:attributionURL">Max Jacobson</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
