---
layout: post
title: "Microdata and Schema.org Tools"
date: 2012-01-22 14:59
comments: true
categories: [microdata, schema.org]
published: false
---

These are tools which I have regularly used for working with Schema.org in 
Microdata. If you know of other tools that 
I should check out, please let me know. I'm especially interested in finding
good browser plugins for developers.

<!-- more -->

[Rich Snippets Testing Tool](http://www.google.com/webmasters/tools/richsnippets) 
----------------------------

Note that while it may not currently show a *rich* snippet example for 
every schema.org type, you can use the data at the bottom of the page to
insure that your Microdata is being parsed as you intended. The format
here breaks every item out and shows references between them in a flat
way.

[Structured Data Linter](http://linter.structured-data.org/) 
------------------------

The best feature of this tool is the way that it displays your nested
Microdata as nested tables, making it easy to spot problems. 
If the Rich Snippets Testing Tool doesn't show a rich snippet for your 
content, this is a good alternative to see what your snippets *might* 
look like.
The snippets here do not cover every type either, but they cover a few
different types from what the Rich Snippets Testing Tool does, for 
instance it will show images for more types.
The code is open source, so you can run your own instance to be able
to check your syntax while you are in development.
This is written by folks who have been part of the conversations around
Web vocabularies and structured data in HTML.

[Live Microdata](http://foolip.org/microdatajs/live/)
----------------

A good open-source tool for testing snippets of HTML marked up with
Microdata. The [MicrodataJS source code](https://gitorious.org/microdatajs/)
allows you to implement the Microdata DOM API on your own site, similar
to how this tutorial outputs the JSON from parsing the page.


[HTML5 Living Validator](http://html5.validator.nu/)
------------------------

Regularly the most up to date validator for HTML5.


[schema.rdfs.org list of tools and libraries](http://schema.rdfs.org/tools.html)
---------------------------------------------

Lists programming libraries, platforms with Schema.org support, and other tools.

[What properties do schema.org vocabularies require?](http://oli.jp/2011/schema-org-properties/)
-----------------------------------------------------

This is a blog post, but it includes one very interesting 
[link to the Google Rich Snippets Testing Tool](http://www.google.com/webmasters/tools/richsnippets?url=http%3A%2F%2Foli.jp%2Ftest%2Fmicrodata%2Frequired.html&view=) 
that gives the tool 
[an HTML page which includes all the schema.org types](http://oli.jp/test/microdata/required.html), 
but with no properties. This allows one to see which properties Google flags
as required in order to trigger a rich snippet. At the time of this writing only
certain types give warnings of missing fields. I expect that as Google supports
more types, that there will be more warnings for that page.
