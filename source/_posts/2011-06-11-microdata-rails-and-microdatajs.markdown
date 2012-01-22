---
date: '2011-06-11 23:02:27'
layout: post
slug: microdata-rails-and-microdatajs
status: publish
title: microdata, Rails, and microdatajs
wordpress_id: '29'
categories:
- javascript
- microdata
- rails
- ruby
---

With the recent release of [schema.org](http://schema.org) and its use of [microdata](http://www.w3.org/TR/microdata/), I wanted to try to add some microdata to my pages. In development it would be nice to confirm what metadata can be extracted, but the tools I found were lacking.

There are few tools right now that I have found that will allow you to see the microdata. There's the [Rich Snippets Testing Tool](http://www.google.com/webmasters/tools/richsnippets) from Google, but you have to enter a URL which does not work well in development before a site is even up on any public server. The other current problem with the Rich Snippets tool is that it has yet to be updated for some of the schema.org item types. While the microdata parsing will work and display properly, the possible rich snippets will not show up.

I found an [extension for chrome](https://chrome.google.com/webstore/detail/docnladpefffgdocnidfngejcagdkedb) that displays an icon when microdata is detected on a page and allows you to explore down through the tree, but the javascript chokes on my page for some reason, even though I have no reason to believe that it is invalid. On other pages it seems to work well enough if look a bit crude.

The [mida gem](https://rubygems.org/gems/mida) allows for parsing microdata, but only works under Ruby 1.9, and my current project still relies on Ruby 1.8.7. It was easy enough with rvm to set up a separate gemset under Ruby 1.9 and do something like the follow:

[sourcecode language="bash"]
$ irb
> require 'mida'
> require 'pp'
> require 'open-uri'
> doc = nil
> url = "http://localhost:3000/"
> open(url) {|f| doc = Mida::Document.new(f, url)}; pp doc.items; nil
[/sourcecode]

That last `nil` insures that all of the items aren't displayed again non-pretty printed, so you only see the pretty printed version. The problem is the "pretty" version isn't so easy to read. It was also annoying to have to move back and forth between my code editor and a terminal just to run this.

The [Dive into HTML5](http://diveintohtml5.org/) book presents some [good links at the end of the chapter on microdata](http://diveintohtml5.org/extensibility.html#further-reading). One link is to [Live Microdata](http://foolip.org/microdatajs/live/) which allows you to enter whole pages or snippets containing microdata and it will parse it into JSON and Turtle. You can [download the source code](https://gitorious.org/microdatajs/) for this and easily load up the live microdata page and enter snippets.

What's better is that microdatajs includes two javascript implementations of a microdata parser. I thought I could include this within my project and display the result at the bottom of the page. Since I use [livereload](https://github.com/mockko/livereload), any time I make a change the browser would reload and the microdata parsing would also be triggered. I decided to use the non-jQuery version because it was fewer files to have to include in my project and the [README](https://gitorious.org/microdatajs/microdatajs/blobs/master/README) says that this version "mimics as closely as possible the syntax and behavior of the API defined in the HTML specification."

Here's what I did very quickly to do this in Rails. First, grab [microdata.js](https://gitorious.org/microdatajs/microdatajs/blobs/master/microdata.js) and [microdata.json.js](https://gitorious.org/microdatajs/microdatajs/blobs/master/microdata.json.js) and place them in /public/javascripts. Include the following snippet in the head of your application.html.erb template:

[sourcecode language="ruby"]
<%= render :partial => '/layouts/microdata' if Rails.env == 'development' %>
[/sourcecode]

Within /app/views/layouts/_microdata.html.erb place the following:

[sourcecode language="ruby"]
<%= javascript_include_tag 'microdata', 'microdata.json' %>
<script>
  $(function(){
    var items = getJSON(document.getItems());
    $('body').append('<pre><code>' + items + '</code></pre>');
  });

</script>
[/sourcecode]

The script does rely on jQuery to wait for the document ready, but that could be rewritten to work without it.

Now when you reload your page with embedded microdata you should see some pretty printed JSON at the bottom of the page with the microdata items from that page. I added [prettify](http://google-code-prettify.googlecode.com/svn/trunk/README.html) for JSON highlighting, but it doesn't add much benefit so I left it out of the above.

Hopefully more and better tools will be coming to help develop microdata rich sites. If you know of a good tool or browser extension for developing sites with microdata, I would be very interested in hearing about them.
