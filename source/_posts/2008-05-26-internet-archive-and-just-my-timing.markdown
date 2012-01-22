---
date: '2008-05-26 20:06:01'
layout: post
slug: internet-archive-and-just-my-timing
status: publish
title: Internet Archive and just my timing
wordpress_id: '8'
categories:
- code4lib
- ruby
- umlaut
tags:
- internet archive
- library
published: false
---

After Jonathan Rochkind's [post about the Internet Archive not providing an API](http://bibwild.wordpress.com/2008/05/23/what-i-wish-i-could-do-with-internet-archive/), I spent part of the weekend writing a screen scraper to get at what we want from the Internet Archive for the [Umlaut](http://umlaut.rubyforge.org/). Basically it uses the OpenURL metadata the Umlaut takes in to search Internet Archive by ISBN, and failing that, fall back on a title-author search.

And it was a real pain. For a user interface the Internet Archive site does some nice things like highlighting query terms. When it comes to screen scraping the page it is not so nice. I had to strip out a lot of spans used for these terms.

Now the spans that could have been helpful weren't there. For instance a span with a good id around the creator and description would have been nice. Instead I had to determine if the item had a creator (many don't). All that separated the creator from the description was a line break tag. Hpricot was fine for this, and luckily the documentation seemed to have improved since I last used this library (or I just understand more now). This lack of good spans with ids isn't just bad for screen scraping but for user defined CSS styles as well. (So in this way it could be an accessibility problem for some users?)

The thing that really got me was that I couldn't reliably search by ISBNs. Their advanced search had an "isbn" field, but I couldn't find an ISBN that could be found that way. If there was no way to test a search I didn't see much sense in writing something that relied on it. Instead I rigged it to just use a simple keyword query to catch ISBNs. This would pick up ISBNS in fields like the description. Problem was the ISBNs were not normalized. So sometimes ISBNs would show up without dashes (0860133923) and sometimes with (2-9527671-0-6). The method to insert dashes had to handle both 10 and 13 digit ISBNs. So my service tried searching both ISBN with and without dashes before falling back on the title-author query.

In the end it was good enough and I was happy that I was able to write my first Umlaut service. Writing the service I only had to create one file and edit two simple config files to enable the new service. Because of how the Umlaut is architected I could return my results to the view without writing any new controller or view code. I just had to provide a couple standard service methods. Then I had to learn how to add my service response and tell a listener that the service had completed whether it returned any results or not. And because of the use of background services, I could make several searches (actually multiple ISBN searches with a fallback on several title-author searches) and not worry too much about how long it took. When it finished if there were any results would show up in the view via some AJAX magic.

One other thing I learned made writing this very worthwhile. I have been using Netbeans for some time now on my Ruby projects. I finally learned how to use the integrated Ruby debugger. Saved me so much time in this case, since puts debugging certainly wouldn't work well in a Rails project.

And then...

Today I was cleaning out some email and decided to try a link I was given to where you used to be able to query Internet Archive and get an XML response. I thought I would try this link again even though I'd tried it on Friday. Well, to my surprise _it's back_.

They call it an [Advanced XML Search (for Admins and Curators)](http://www.archive.org/advancedsearch.php#col2). A couple nice things about this. It simply exposes their Solr index. I can have Solr do my relevancy ranking and sorting. And I can use solr-ruby to make connection and query creation super easy. It can return much more metadata about each object found.



I used the web interface to create this query that returns pretty printed xml, but if you're familiar with solr the link should look very familiar.

[http://homeserver7.us.archive.org:8983/solr/select?q=title%3A%22golden+fleece%22%3B&qin=title%3A%22golden+fleece%22&fl=collection%2Cidentifier%2Cmediatype%2Cpublisher%2Csubject%2Ctitle&wt=xml&rows=50&indent=yes](http://homeserver7.us.archive.org:8983/solr/select?q=title%3A%22golden+fleece%22%3B&qin=title%3A%22golden+fleece%22&fl=collection%2Cidentifier%2Cmediatype%2Cpublisher%2Csubject%2Ctitle&wt=xml&rows=50&indent=yes)

So it looks like I'll be going back to the IDE to rewrite the Internet Archive service using this Solr interface. Ought to make things a lot less fragile than screen scraping. Even still, screen scraping is less fragile than a disappearing API, so I'll likely just commit the service as written in case there are any other surprises from the Internet Archive.
