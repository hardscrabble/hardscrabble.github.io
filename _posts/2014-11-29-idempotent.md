---
title: idempotent
layout: post
date: 2014-11-29 01:20
---

HTTP GET requests are supposed to be idempotent, but they often have the side
effect of appending some request details to a log file, which can eventually
grow so large that it fills the disk and takes down the server.

