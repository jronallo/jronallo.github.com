---
layout: post
title: "Web Data Commons Microdata"
date: 2012-01-29 18:18
comments: true
categories: [microdata, rdf, crawl, aggregation]
published: false
---

The other day I discovered the [Web Data Commons](http://page.mi.fu-berlin.de/muehleis/ccrdf/), which is building on top of the [Common Crawl](http://www.commoncrawl.org/) to extract Microformat, Microdata, and RDFa data and make it available for free download. This means that there is starting to be free structured data from the Web available for for anyone to play with at very low cost. Common Crawl takes care of the crawling and then Web Data Commons will do data extraction. This opens up new possibilities for services, specialized search, and aggregations of content from startups and individuals. 

I have written recently about how [digital library aggregators (like the DPLA)](/blog/dpla-strawman-technical-proposal/) could crawl a small slice of the Web. The crawled pages could then be analyzed to extract data from them. Web Data Commons significantly simplifies and reduces the cost of that approach. Digital library aggregators would not have to do their own crawling or data extraction, which would significantly lower the cost.

Once the data is available it would even be possible to determine which of the pages [describe an item-level resource](/blog/solving-the-item-level-problem-on-the-web/) and create aggregations around just those item-level resources. What the new big Web data from Common Crawl and Web Data Commons means is that at some point it would be possible to create new aggregations or services around just the cultural heritage sector slice of this data at a very low cost.  [Collection Profiles](go.ncsu.edu/dplacaps) could help curate which part of the Web is of interest and focus data analysis. 

The cultural heritage sector needs to do a couple things though to be a part of the free big data Web which is forming and realise this vision for digital libraries. 

## 1. Annotate

Web sites need to be annotated with some form of embedded semantic markup (Microformats, RDFa, or Microdata). Because of the relative simplicity of Microdata and Schema.org, I will be focusing my efforts promoting these technologies. YKK Advodate for better vocabularies. This will not only benefit collections by providing new aggregations and services, but also enable the search engines to send traffic 

## 2. Get Crawled

The Common Crawl [only crawls a portion of the Web](http://www.commoncrawl.org/blog/#Google), though it tries to crawl the most 

YKK where to check whether a URL is known by the common crawl







The data extracted so far is just a small portion of what is available and has also been done on an older data set

