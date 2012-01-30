---
layout: post
title: "Common Crawl, Web Data Commons, and Microdata"
date: 2012-01-30 15:38:08
comments: true
categories: [microdata, rdf, crawl, aggregation]
published: true
---

The other day I discovered the [Web Data Commons](http://page.mi.fu-berlin.de/muehleis/ccrdf/), which is building on top of the [Common Crawl](http://www.commoncrawl.org/) to extract Microformat, Microdata, and RDFa data and make it available for free download. This means that there is starting to be free structured data from a big portion of the Web available for for anyone to play with at very low cost. Common Crawl takes care of the crawling and then Web Data Commons will do data extraction. This opens up new possibilities for services, specialized search, and aggregations of content. Big web data is being opened up for small startups and individuals. 

<!-- more -->

I have written recently about how [digital library aggregators](/blog/dpla-strawman-technical-proposal/) (like the [DPLA](http://dp.la/)) could crawl a small slice of the Web for digital collections. The crawled pages could then be analyzed to extract text and data from them. Web Data Commons significantly simplifies and reduces the cost of that approach. Digital library aggregators would not have to do their own crawling or data extraction, which would significantly lower the cost.

Once the data is available it would even be possible to determine which of the pages [describe an item-level resource](/blog/solving-the-item-level-problem-on-the-web/) and create aggregations around just those item-level resources. What the new big Web data from Common Crawl and Web Data Commons means is that it will soon be possible to create new aggregations or services around just the cultural heritage sector slice of this data at a very low cost. [Collection Profiles](go.ncsu.edu/dplacaps) could help curate which part of the Web is of interest and focus data analysis further reducing the expense. 

Libraries, archives, and museums (LAM) need to do a couple things though to be a part of the free big data Web which is forming. 

## 1. Annotate

LAM Web sites need to be annotated with some form of embedded semantic markup (Microformats, RDFa, or [Microdata](http://www.whatwg.org/specs/web-apps/current-work/multipage/microdata.html)). These annotations will not only benefit collections by providing new aggregations and services, but also enable the search engines to send better traffic. Because of the relative simplicity of Microdata and [Schema.org](http://schema.org), I will be focusing my efforts on understanding these technologies and how they could better work for LAMs. For instance, we already know that LAMs could advocate for better coverage in Schema.org.

## 2. Get Crawled

The Common Crawl [only crawls a portion of the Web](http://www.commoncrawl.org/blog/#Google), and it tries to crawl quality sites and not fetch or cache junk. In order to be included in Common Crawl, a site needs to allow the Common Crawl robot to have access. If your site has a [robots.txt](http://www.robotstxt.org/) then it should not restrict the [ccBot](http://api.commoncrawl.org/faq.htm). The Common Crawl does not support the sitemap protocol yet. I have not been able to find information on how to submit or request a site be crawled. As Common Crawl ramps up to doing more frequent crawls, LAMs will want to figure out how to have their trusted, unique content crawled.

Common Crawl does provide a way to check whether your site is already included. You can [query the URL database](http://api.commoncrawl.org/domainQuery.html). I searched for one of the digital collections sites I developed and discovered that they know about the existence of the site, but have not fetched any pages. I would be interested in hearing from others whether their digital collections or other sites are included and have been fetched and cached. 

Another use for this Common Crawl API is to discover the cache file location for a URL. It is then possible to run a map/reduce job on just the ARC files containing the desired URLs. If the Web Data Commons does not provide enough information, it would be possible in a targeted way to get the page from the Common Crawl.

## The Microdata

The data that Web Data Commons has extracted so far is from just a small portion (1%) of what is available from the Common Crawl. The analysis was also done on one of the older data sets. I still wanted to see what the [Microdata](https://s3.amazonaws.com/ccrdf1p/data/ccrdf.html-microdata.nq) looked like, so I downloaded it and ran the following script over it. The data is provided as N-Quads. There is probably much more interesting analysis that could be done, but I just wanted to see quickly what context domains were included and which vocabularies were used as predicates.

{% gist 1701852 %}

This Microdata set is one of the smaller sets of data Web Data Commons makes available, containing just 17890 triples from 1298 URLs. I found 122 hosts represented in this set. Since the Microdata is from before Schema.org was released, most of the 111 predicates used where from [data-vocabulary](http://data-vocabulary.org) which was Google's precursor to the more extensive Schema.org. I found an error in the set where one object of a statement was just "http:" with no more content. Removing that error and it ran through cleanly. 

I am interested in seeing what other folks are able to do with this new corpus of free data. Please let me know if you play with it and come up with anything. Any libraries, archives, or museums already represented in any of the data sets?

